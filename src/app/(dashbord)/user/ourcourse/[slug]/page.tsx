'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Download, MessageSquare, Play, FileText, File } from 'lucide-react';
import AuthGuard from '@/lib/hooks/isLogingNavigation/AuthGuard';
import { useParams } from 'next/navigation';
import { CourseContent } from '@/type/course';
import { Course } from '@/lib/api/course/CoursesFetcher';
import { useCourseData } from '@/lib/api/course/singleCourse';

// ---------- Local view models ----------
type LessonKind = 'video' | 'pdf' | 'text' | 'quiz' | 'unknown';

interface ViewItem {
  mid: number;        // milestone id
  moid: number;       // module id
  cid: number;        // content id
  milestoneTitle: string;
  moduleTitle: string;
  contentTitle: string;
  kind: LessonKind;
  duration?: string | null;
  source?: string | null;       // video/pdf/quiz payload (sanitized)
  description?: string | null;  // rich text or quiz fallback
}

interface QuizQ {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

// ===== Normalized course (so TS errors go away) =====
type AnyObj = Record<string, any>;

interface NormalizedCourse {
  title: string;
  created_at: string;
  intro_video_url: string | null;
  milestones: AnyObj[];
  milestone_count: number;
  module_count: number;
  video_count: number;
  quiz_count: number;
}

// ---------- small helpers (logic only; UI unchanged) ----------
const isNonEmpty = (v?: string | null) => !!(v && String(v).trim().length > 0);

/** href/src-এ খালি স্ট্রিং যাতে না যায় */
function safeUrl(u?: string | null): string | null {
  if (!u) return null;
  const t = String(u).trim();
  return t.length ? t : null;
}

/** course.data বা course টপ-লেভেল—দুইভাবেকেই সাপোর্ট */
function normalizeCourse(raw: Course | AnyObj | null | undefined): NormalizedCourse | null {
  if (!raw) return null;
  const c: AnyObj = (raw as AnyObj).data ?? raw;

  return {
    title: c.title ?? 'কোর্স',
    created_at: c.created_at ?? new Date().toISOString(),
    intro_video_url: c.intro_video_url ?? null,
    milestones: Array.isArray(c.milestones) ? c.milestones : [],
    milestone_count: c.milestone_count ?? (Array.isArray(c.milestones) ? c.milestones.length : 0),
    module_count:
      c.module_count ??
      (Array.isArray(c.milestones)
        ? c.milestones.reduce((acc: number, m: AnyObj) => acc + ((m?.modules?.length) || 0), 0)
        : 0),
    video_count: c.video_count ?? 0,
    quiz_count: c.quiz_count ?? 0,
  };
}

// parse "t=521s" / "t=3m12s" / "start=120" → seconds
function secondsFromT(t?: string | null): number | null {
  if (!t) return null;
  if (/^\d+$/.test(t)) return parseInt(t, 10);
  const m = t.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/i);
  if (!m) return null;
  const h = parseInt(m[1] || '0', 10);
  const min = parseInt(m[2] || '0', 10);
  const s = parseInt(m[3] || '0', 10);
  const total = h * 3600 + min * 60 + s;
  return total > 0 ? total : null;
}

function getYouTubeIdAndStart(raw?: string | null): { id: string | null; start: number | null } {
  const url = safeUrl(raw);
  if (!url) return { id: null, start: null };
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    let start: number | null = null;
    if (u.searchParams.get('t')) start = secondsFromT(u.searchParams.get('t'));
    if (u.searchParams.get('start') && !start) start = parseInt(u.searchParams.get('start')!, 10) || null;

    let id: string | null = null;
    if (host.includes('youtube.com')) {
      if (u.pathname.startsWith('/watch')) id = u.searchParams.get('v');
      else if (u.pathname.startsWith('/embed/')) id = u.pathname.split('/').pop() || null;
      else if (u.pathname.startsWith('/shorts/')) id = u.pathname.split('/').pop() || null;
    } else if (host === 'youtu.be') {
      id = u.pathname.slice(1) || null;
    }
    return { id, start };
  } catch {
    return { id: null, start: null };
  }
}

function toEmbedWithStart(raw?: string | null): string | null {
  const { id, start } = getYouTubeIdAndStart(raw);
  if (!id) return safeUrl(raw); // already embed or non-YouTube → 그대로
  const base = `https://www.youtube.com/embed/${id}`;
  return start && start > 0 ? `${base}?start=${start}` : base;
}

// Try to parse quiz JSON from content.source / description
function tryParseQuiz(content: CourseContent): QuizQ[] {
  const buckets: string[] = [];
  if (isNonEmpty(content.source)) buckets.push(content.source as string);
  if (isNonEmpty(content.description)) buckets.push(content.description as string);

  for (const raw of buckets) {
    const maybeJson = raw
      .replace(/<\/?pre>|<\/?code>/gi, '')
      .replace(/```json|```/gi, '')
      .trim();

    try {
      const obj = JSON.parse(maybeJson);
      if (obj && Array.isArray(obj.questions)) {
        const qs: QuizQ[] = obj.questions
          .filter((q: any) =>
            q &&
            typeof q.question === 'string' &&
            Array.isArray(q.options) &&
            typeof q.correctIndex === 'number'
          )
          .map((q: any, idx: number) => ({
            id: q.id ?? `q${idx + 1}`,
            question: q.question,
            options: q.options,
            correctIndex: q.correctIndex,
          }));
        if (qs.length) return qs;
      }
    } catch {}
  }
  return [];
}

function normalizeKind(c: CourseContent): LessonKind {
  const t = (c.content_type || '').toLowerCase();
  if (t.includes('video')) return 'video';
  if (t === 'pdf' || t.includes('pdf')) return 'pdf';
  if (t === 'text' || t.includes('text') || t.includes('slide')) return 'text';
  if (t === 'quiz' || t.includes('quiz')) return 'quiz';
  return 'unknown';
}

// --------- Build flattened items from normalized course ----------
function flattenCourse(nc: NormalizedCourse): ViewItem[] {
  const out: ViewItem[] = [];
  for (const ms of nc.milestones || []) {
    for (const mod of (ms.modules ?? []) as AnyObj[]) {
      for (const c of (mod.contents ?? []) as CourseContent[]) {
        const kind = normalizeKind(c);
        out.push({
          mid: ms.id,
          moid: mod.id,
          cid: c.id,
          milestoneTitle: ms.title,
          moduleTitle: mod.title,
          contentTitle: c.title,
          kind,
          duration: (c as any).subtitle ?? null, // some APIs place duration in subtitle
          source: kind === 'video' ? toEmbedWithStart(c.source ?? null) : safeUrl(c.source),
          description: c.description ?? null,
        });
      }
    }
  }
  return out;
}

export default function Page() {
  const { slug } = useParams<{ slug: string }>();
  const { course, loading, error } = useCourseData(slug) as {
    course: Course | AnyObj | null;
    loading: boolean;
    error: unknown;
  };

  // -------- Normalize the course so TS stops complaining --------
  const ncourse = useMemo(() => normalizeCourse(course), [course]);

  // Build syllabus tree with open/close states
  const [openMilestones, setOpenMilestones] = useState<Record<number, boolean>>({});
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({});

  const items: ViewItem[] = useMemo(
    () => (ncourse ? flattenCourse(ncourse) : []),
    [ncourse]
  );

  // Build first playable item as default (prefer non-unknown)
  const firstItem = useMemo(() => {
    const preferred = items.find(i => i.kind !== 'unknown') ?? null;
    return preferred ?? items[0] ?? null;
  }, [items]);

  const [current, setCurrent] = useState<ViewItem | null>(null);

  // quiz state
  const quizQuestions: QuizQ[] = useMemo(() => {
    if (!current || current.kind !== 'quiz' || !ncourse) return [];
    const ms = (ncourse.milestones || []).find((m: AnyObj) => m.id === current.mid);
    const mod = (ms?.modules || []).find((mm: AnyObj) => mm.id === current.moid);
    const cc = (mod?.contents || []).find((c: AnyObj) => c.id === current.cid);
    if (!cc) return [];
    return tryParseQuiz(cc as CourseContent);
  }, [current, ncourse]);

  const [answers, setAnswers] = useState<Record<string, number | null>>({});

  // initialize open states and current once course loads
  useEffect(() => {
    if (!ncourse) return;
    const msOpen: Record<number, boolean> = {};
    (ncourse.milestones || []).forEach((m: AnyObj, idx: number) => (msOpen[m.id] = idx === 0));
    setOpenMilestones(msOpen);

    const moOpen: Record<number, boolean> = {};
    (ncourse.milestones || []).forEach((m: AnyObj) =>
      (m.modules || []).forEach((mo: AnyObj, idx: number) => (moOpen[mo.id] = idx === 0))
    );
    setOpenModules(moOpen);

    setCurrent(firstItem);
  }, [ncourse, firstItem]);

  const onPick = useCallback((vi: ViewItem) => {
    setCurrent(vi);
    if (vi.kind === 'quiz') setAnswers({});
  }, []);

  const goPrev = () => {
    if (!current) return;
    const idx = items.findIndex(it => it.mid === current.mid && it.moid === current.moid && it.cid === current.cid);
    if (idx > 0) onPick(items[idx - 1]);
  };

  const goNext = () => {
    if (!current) return;
    const idx = items.findIndex(it => it.mid === current.mid && it.moid === current.moid && it.cid === current.cid);
    if (idx >= 0 && idx < items.length - 1) onPick(items[idx + 1]);
  };

  const finishQuiz = () => {
    const total = quizQuestions.length;
    let score = 0;
    quizQuestions.forEach(q => {
      if (answers[q.id] === q.correctIndex) score++;
    });
    alert(`কুইজ শেষ! স্কোর: ${score}/${total}`);
  };

  // helper: source URL নাকি JSON—এটা বুঝতে
  const isProbablyUrl = (s?: string | null) => !!safeUrl(s)?.match(/^https?:\/\//i);

  // --------------- Render ---------------
  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen container py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-1/2 bg-gray-200 rounded" />
            <div className="h-64 bg-gray-200 rounded" />
            <div className="h-6 w-1/3 bg-gray-200 rounded" />
          </div>
        </div>
      </AuthGuard>
    );
  }

  if (error) {
    return (
      <AuthGuard>
        <div className="min-h-screen container py-12">
          <p className="text-red-600">কোর্স লোড করার সময় সমস্যা হয়েছে। অনুগ্রহ করে পরে চেষ্টা করুন।</p>
        </div>
      </AuthGuard>
    );
  }

  if (!ncourse) {
    return (
      <AuthGuard>
        <div className="min-h-screen container py-12">
          <p className="text-gray-600">কোর্স পাওয়া যায়নি।</p>
        </div>
      </AuthGuard>
    );
  }

  const headerTitle = ncourse.title || 'কোর্স';

  return (
    <AuthGuard>
      <div className="min-h-screen container py-10 px-3 lg:px-1">
        {/* Header */}
        <header className="pb-6 pt-3 flex items-center gap-3">
          <button className="p-1 text-gray-950 rounded" aria-label="Back">
            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 448 512" className="cursor-pointer text-[#111827] text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {headerTitle}
          </h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Main */}
          <div className="flex-1 lg:w-2/3">
            <div className="aspect-video relative bg-black/5 rounded-lg overflow-hidden">
              {!current ? (
                <div className="w-full h-full grid place-items-center text-gray-500">
                  কোনো কন্টেন্ট নেই
                </div>
              ) : current.kind === 'video' ? (
                <>
                  <iframe
                    src={
                      safeUrl(current.source) ??
                      toEmbedWithStart(ncourse.intro_video_url) ??
                      'about:blank'
                    }
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={current.contentTitle}
                  />
                </>
              ) : current.kind === 'pdf' ? (
                <div className="w-full h-full grid place-items-center p-6">
                  <div className="text-center">
                    <p className="mb-3 text-gray-800 font-medium">{current.contentTitle}</p>
                    {isNonEmpty(current.source) ? (
                      <a
                        href={current.source as string}  // কখনোই "" যাবে না; safeUrl আগেই হ্যান্ডেল করেছে
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Download className="w-5 h-5" />
                        PDF দেখুন/ডাউনলোড
                      </a>
                    ) : (
                      <p className="text-sm text-gray-500">PDF লিংক দেওয়া নেই</p>
                    )}
                  </div>
                </div>
              ) : current.kind === 'text' ? (
                <div className="w-full h-full overflow-y-auto p-5">
                  {isNonEmpty(current.description) ? (
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: current.description as string }}
                    />
                  ) : (
                    <div className="text-gray-600">এই লেসনে টেক্সট কনটেন্ট নেই।</div>
                  )}
                </div>
              ) : current.kind === 'quiz' ? (
                // ✅ quiz: যদি source এ URL থাকে → iframe embed
                isProbablyUrl(current.source) ? (
                  <iframe
                    src={current.source as string}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={current.contentTitle}
                  />
                ) : (
                  // না থাকলে JSON কুইজ UI
                  <div className="overflow-y-auto inset-0 flex items-stretch px-3 scrollbar-hide" style={{ maxHeight: 'calc(60vh - 0px)' }}>
                    <style jsx>{`
                      .scrollbar-hide::-webkit-scrollbar { display: none; }
                      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                    `}</style>
                    <div className="max-w-3xl w-full h-full overflow-y-auto py-4">
                      {quizQuestions.length ? (
                        <>
                          {quizQuestions.map((q, idx) => {
                            const chosen = answers[q.id];
                            return (
                              <div key={q.id} className="mb-8">
                                <h2 className="text-base md:text-lg text-gray-950 font-semibold mb-3 leading-snug">
                                  {idx + 1}. {q.question}
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                                  {q.options.map((opt, oi) => (
                                    <button
                                      key={oi}
                                      onClick={() =>
                                        setAnswers(prev => ({ ...prev, [q.id]: oi }))
                                      }
                                      className={`w-full text-left px-4 py-3 rounded-lg border whitespace-normal break-words ${
                                        chosen === oi
                                          ? 'bg-gray-900 text-gray-50 border-gray-900'
                                          : 'bg-white border-gray-300 text-black'
                                      }`}
                                    >
                                      {String.fromCharCode(65 + oi)}. {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            );
                          })}

                          <div className="flex items-center gap-3 mt-6 pb-6">
                            <button
                              onClick={finishQuiz}
                              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                            >
                              জমা দিন
                            </button>
                            <button
                              onClick={() => setAnswers({})}
                              className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                              রিসেট
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-600">এই কন্টেন্টে কুইজ ডেটা পাওয়া যায়নি।</div>
                      )}
                    </div>
                  </div>
                )
              ) : (
                <div className="w-full h-full grid place-items-center text-gray-600">Unsupported content</div>
              )}
            </div>

            {/* Meta / Title */}
            <div className="bg-white py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">
                  {new Date(ncourse.created_at).toLocaleString()}
                </span>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded" title="Download">
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded" title="Comments">
                    <MessageSquare className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                {current?.contentTitle ?? ncourse.title}
              </h2>
              <p className="text-xs text-gray-500">
                {current?.milestoneTitle} • {current?.moduleTitle}
              </p>
            </div>

            {/* Controls */}
            <div className="bottom-0 inset-x-0 z-20 flex justify-center items-center gap-2 p-2 sm:p-3">
              <button onClick={goPrev} className="px-3 py-1.5 rounded-lg border border-gray-900 text-black hover:bg-white/10">Prev</button>
              <button onClick={goNext} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Next</button>
            </div>
          </div>

          {/* Sidebar Syllabus */}
          <div className="lg:w-1/3 bg-white border border-gray-200 overflow-y-auto scrollbar-hide" style={{ maxHeight: 'calc(100vh - 60px)' }}>
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar { display: none; }
              .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
              <h3 className="font-semibold text-gray-900">কোর্স সিলেবাস</h3>
              <p className="text-xs text-gray-500">
                {ncourse.milestone_count} Milestones • {ncourse.module_count} Modules • {ncourse.video_count} Videos • {ncourse.quiz_count} Quizzes
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {(ncourse.milestones || []).map((ms: AnyObj) => {
                const isMsOpen = !!openMilestones[ms.id];
                return (
                  <div key={ms.id}>
                    <button
                      onClick={() => setOpenMilestones(prev => ({ ...prev, [ms.id]: !prev[ms.id] }))}
                      className="w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-gray-500">{ms.modules?.length ?? 0} মডিউল</span>
                        </div>
                        <h4 className="text-sm font-medium text-gray-900 leading-snug">{ms.title}</h4>
                      </div>
                      {isMsOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>

                    {isMsOpen && (
                      <div className="bg-gray-50">
                        {(ms.modules || []).map((mo: AnyObj) => {
                          const isMoOpen = !!openModules[mo.id];
                          return (
                            <div key={mo.id} className="border-t border-gray-200">
                              <button
                                onClick={() => setOpenModules(prev => ({ ...prev, [mo.id]: !prev[mo.id] }))}
                                className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-100"
                              >
                                <span className="text-sm font-medium text-gray-800">{mo.title}</span>
                                {isMoOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                              </button>

                              {isMoOpen && (
                                <div className="bg-white">
                                  {(mo.contents || []).map((c: CourseContent) => {
                                    const kind = normalizeKind(c);
                                    const vi: ViewItem = {
                                      mid: ms.id,
                                      moid: mo.id,
                                      cid: c.id,
                                      milestoneTitle: ms.title,
                                      moduleTitle: mo.title,
                                      contentTitle: c.title,
                                      kind,
                                      duration: (c as any).subtitle ?? null,
                                      source: kind === 'video' ? toEmbedWithStart(c.source ?? null) : safeUrl(c.source),
                                      description: c.description ?? null,
                                    };
                                    const active = current && current.mid === vi.mid && current.moid === vi.moid && current.cid === vi.cid;

                                    const kindIcon =
                                      vi.kind === 'video' ? <Play className="w-5 h-5 text-white" fill="white" /> :
                                      vi.kind === 'pdf'   ? <File className="w-5 h-5 text-white" /> :
                                      vi.kind === 'text'  ? <FileText className="w-5 h-5 text-white" /> :
                                      vi.kind === 'quiz'  ? <MessageSquare className="w-5 h-5 text-white" /> :
                                      <File className="w-5 h-5 text-white" />;

                                    const badge =
                                      vi.kind === 'video' ? 'from-pink-500 to-red-500' :
                                      vi.kind === 'pdf'   ? 'from-orange-400 to-orange-500' :
                                      vi.kind === 'text'  ? 'from-sky-500 to-blue-600' :
                                      vi.kind === 'quiz'  ? 'from-emerald-500 to-green-600' :
                                                            'from-purple-500 to-purple-600';

                                    return (
                                      <button
                                        key={c.id}
                                        onClick={() => onPick(vi)}
                                        className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors border-l-4 ${
                                          active ? 'border-l-blue-500 bg-blue-50' : 'border-l-transparent'
                                        }`}
                                      >
                                        <div className={`w-14 h-10 rounded flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${badge}`}>
                                          {kindIcon}
                                        </div>
                                        <div className="flex-1 text-left">
                                          <p className="text-sm text-gray-900 leading-snug mb-1">{c.title}</p>
                                          <div className="text-xs text-gray-500 flex items-center gap-2">
                                            <span className="inline-block px-2 py-0.5 rounded-full bg-gray-100">
                                              {vi.kind.toUpperCase()}
                                            </span>
                                            {vi.duration && <span>{vi.duration}</span>}
                                          </div>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
