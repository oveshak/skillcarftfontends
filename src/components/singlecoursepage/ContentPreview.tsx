"use client";
import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from "lucide-react";

// ====== Types ======
type ContentItem = {
  id: number;
  title: string;
  status?: boolean;
  is_deleted?: boolean;
  content_type?: "video" | string;
  preview?: boolean;
  source?: string | null;
};
type ModuleApi = {
  id: number;
  title: string;
  status?: boolean;
  is_deleted?: boolean;
  contents?: ContentItem[];
};
type MilestoneApi = {
  id: number;
  title?: string;
  status?: boolean;
  is_deleted?: boolean;
  modules?: ModuleApi[];
};

// ====== Local UI types ======
interface Lesson {
  title: string;
  isFree: boolean;
  videoUrl?: string;
}
interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

// ====== YouTube helpers ======
function getYouTubeId(url?: string | null) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/watch")) return u.searchParams.get("v");
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/").pop() || null;
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/").pop() || null;
    }
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
  } catch {}
  return null;
}
function toEmbed(url?: string | null) {
  const id = getYouTubeId(url || "");
  return id ? `https://www.youtube.com/embed/${id}` : url || "";
}

// ====== Normalizer ======
function buildModulesFromMilestones(milestones?: MilestoneApi[] | null): Module[] {
  if (!milestones?.length) return [];
  const modules: Module[] = [];

  for (const ms of milestones) {
    if (ms.is_deleted || ms.status === false) continue;
    for (const m of ms.modules ?? []) {
      if (m.is_deleted || m.status === false) continue;

      const lessons: Lesson[] =
        (m.contents ?? [])
          .filter(
            (c) =>
              (c.title || "").trim().length > 0 &&
              c.is_deleted !== true &&
              c.status !== false &&
              (c.content_type ? c.content_type.toLowerCase() === "video" : true)
          )
          .map((c) => ({
            title: c.title,
            isFree: !!c.preview,
            videoUrl: c.source ? toEmbed(c.source) : undefined,
          })) ?? [];

      modules.push({
        id: String(m.id),
        title: m.title || `Module ${m.id}`,
        lessons,
      });
    }
  }
  return modules;
}

// ====== Skeleton Loader ======
function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4 border border-gray-200 rounded-lg p-4">
      <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
      <div className="h-4 w-full bg-gray-200 rounded"></div>
      <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
      <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
    </div>
  );
}

// ====== Component ======
export default function ContentPreview({
  milestones,
  loading = false,
}: {
  milestones?: MilestoneApi[] | null;
  loading?: boolean;
}) {
  const modules: Module[] = useMemo(() => {
    const fromApi = buildModulesFromMilestones(milestones);
    return fromApi; // ❌ no fallback fake data
  }, [milestones]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [currentVideoTitle, setCurrentVideoTitle] = useState("");

  const openModal = (videoUrl: string, title: string) => {
    if (!videoUrl) return;
    setCurrentVideoUrl(videoUrl);
    setCurrentVideoTitle(title);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideoUrl("");
    setCurrentVideoTitle("");
  };

  // 🧠 Show skeleton if loading or no data
  if (loading || !modules.length) {
    return (
      <section className="bg-white py-10">
        <h2 className="text-gray-900 text-xl font-bold text-left md:text-2xl pb-7">
          কন্টেন্ট প্রিভিউ
        </h2>
        <SkeletonLoader />
      </section>
    );
  }

  return (
    <section className="bg-white py-10">
      <div>
        <h2 className="text-gray-900 text-xl font-bold text-left md:text-2xl pb-7">
          কন্টেন্ট প্রিভিউ
        </h2>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <Accordion
            type="single"
            collapsible
            defaultValue={modules[0]?.id}
            className="w-full"
          >
            {modules.map((module, moduleIndex) => (
              <AccordionItem
                value={module.id}
                key={module.id}
                className={
                  moduleIndex === modules.length - 1
                    ? ""
                    : "border-b border-dashed border-gray-300 last:border-b-0"
                }
              >
                <AccordionTrigger className="text-left text-sm lg:text-base font-bold text-gray-900 hover:no-underline py-4 px-2 md:px-4">
                  {module.title}
                </AccordionTrigger>
                <AccordionContent className="bg-white">
                  <div className="px-2 lg:px-4 pb-6 pt-0">
                    {module.lessons.length > 0 && (
                      <div className="space-y-4 pt-4 border-t border-border">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-3 text-gray-700">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="w-6 h-6 text-primary flex-shrink-0"
                              >
                                <path d="M8 5v14l11-7z" strokeWidth="2" />
                              </svg>
                              <span className="text-sm lg:text-base">
                                {lesson.title}
                              </span>
                            </div>

                            {/* ✅ Only show “ফ্রি দেখুন” for the first lesson of first module */}
                            {moduleIndex === 0 && lessonIndex === 0 && (
                              <button
                                onClick={() =>
                                  openModal(lesson.videoUrl || "", lesson.title)
                                }
                                className="text-primary font-semibold text-xs lg:text-sm flex-shrink-0 whitespace-nowrap hover:underline transition-all"
                              >
                                ফ্রি দেখুন
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 truncate pr-4">
                {currentVideoTitle}
              </h3>
              <button
                onClick={closeModal}
                className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={currentVideoUrl}
                title={currentVideoTitle}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
