'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import AuthGuard from '@/lib/hooks/isLogingNavigation/AuthGuard';
import { api } from '@/lib/api';
import { jwtDecode } from 'jwt-decode';

// ===== Types =====
type DecodedToken = {
  data?: Array<{
    id?: number;
    course_id?: number;
    course_details?: {
      id?: number;
      title?: string;
      slug?: string;
      course_thumbnail?: string;
      price?: number;
      offer_price?: number;
      created_at?: string;
    };
    created_at?: string;
  }>;
};

// ===== Utils =====
function formatDate(iso?: string) {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    const s = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Dhaka',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(d);
    return s.toUpperCase();
  } catch {
    return '—';
  }
}

type CourseCard = {
  id: number;
  title: string;
  slug?: string;
  thumb?: string;
  price?: number;
  offerPrice?: number;
  enrolledAt?: string;
};

export default function EnrolledCoursesOnly() {
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [courses, setCourses]   = useState<CourseCard[]>([]);
  const featureCourseTitle      = courses[0]?.title ?? '';

  const TABS = ['সব', 'ফিল্টার্ড'] as const;
  type Tab = typeof TABS[number];
  const [activeTab, setActiveTab] = useState<Tab>('সব');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get('/enrolled-courses/');
        const token: string | undefined = res?.data?.data?.results?.token;
        if (!token) throw new Error('Token not found in response');

        const decoded = jwtDecode<DecodedToken>(token);
        const rows = decoded?.data ?? [];

        if (!Array.isArray(rows) || rows.length === 0) {
          setCourses([]);
          setLoading(false);
          return;
        }

        const map = new Map<number, CourseCard>();
        for (const r of rows) {
          const cd = r?.course_details;
          if (!cd?.id) continue;
          if (!map.has(cd.id)) {
            map.set(cd.id, {
              id: cd.id,
              title: cd.title || 'Unnamed Course',
              slug: cd.slug,
              thumb: cd.course_thumbnail,
              price: cd.price,
              offerPrice: cd.offer_price,
              enrolledAt: r?.created_at,
            });
          }
        }
        setCourses(Array.from(map.values()));
      } catch (e: any) {
        setError(e?.message || 'Failed to load enrolled courses');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 👇 Filtered ট্যাবে কিছুই দেখাবো না
  const visibleCourses = useMemo(() => {
    if (activeTab === 'সব') return courses;
    return []; // Filtered => empty
  }, [activeTab, courses]);

  const emptyState = !loading && !error && visibleCourses.length === 0;

  return (
    <AuthGuard>
      <div className="mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 sm:px-6 pb-6">
            <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">
              আমার পুডাওয়া
            </h2>

            {/* Tabs (responsive) */}
            <div className="flex gap-5 sm:gap-6 mb-4 border-b border-gray-200 overflow-x-auto px-1">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-base lg:text-lg font-medium whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Loading / Error */}
            {loading && <div className="text-sm text-gray-600 py-4">লোড হচ্ছে…</div>}
            {error && (
              <div className="text-sm text-red-600 py-4">
                {error === 'Token not found in response'
                  ? 'লগইন করা নেই বা টোকেন পাওয়া যায়নি। আগে লগইন করুন।'
                  : `ত্রুটি: ${error}`}
              </div>
            )}

            {/* Courses */}
            {!loading && !error && (
              <div className="space-y-3 mb-4">
                {visibleCourses.map((c) => {
                  const href = c.slug ? `/user/ourcourse/${c.slug}` : `/user/ourcourse/id/${c.id}`;
                  return (
                    <Link
                      key={c.id}
                      href={href}
                      className="block bg-white border border-gray-200 rounded-xl transition p-3 hover:shadow-sm cursor-pointer"
                    >
                      <div className="flex gap-3">
                        {/* Left info box */}
                        <div className="flex-shrink-0">
                          <div className="bg-gray-50 rounded-lg p-2 text-center w-20">
                            <div className="text-[10px] text-gray-600">ENROLLED</div>
                            <div className="text-[11px] font-semibold text-gray-800 mt-0.5">
                              {formatDate(c.enrolledAt)}
                            </div>
                            <div className="bg-orange-500 text-white text-[9px] px-2 py-0.5 rounded mt-1.5 font-medium">
                              COURSE
                            </div>
                          </div>
                        </div>

                        {/* Course info only */}
                        <div className="flex flex-col flex-1 min-w-0 justify-center ">
                          <div className="flex items-center gap-2 mb-1.5">
                            {typeof c.offerPrice === 'number' ? (
                              <>
                                <span className="text-[10px] lg:text-xs font-semibold text-green-600">
                                  Offer ৳{c.offerPrice}
                                </span>
                                {typeof c.price === 'number' && (
                                  <span className="text-[10px] lg:text-xs text-gray-400 line-through">
                                    ৳{c.price}
                                  </span>
                                )}
                              </>
                            ) : (
                              typeof c.price === 'number' && (
                                <span className="text-[10px] lg:text-xs font-semibold text-blue-600">
                                  ৳{c.price}
                                </span>
                              )
                            )}
                          </div>

                          <h3 className="text-xs sm:text-lg font-bold text-gray-900 leading-snug">
                            {c.title}
                          </h3>

                          {/* {c.thumb ? (
                            <div className="mt-2">
                              <img
                                src={c.thumb}
                                alt={c.title}
                                className="w-full max-w-md rounded-lg border border-gray-100"
                                loading="lazy"
                              />
                            </div>
                          ) : null} */}
                        </div>

                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 self-center" />
                      </div>
                    </Link>
                  );
                })}

                {emptyState && (
                  <div className="text-sm text-gray-500 py-6">
                    {activeTab === 'সব'
                      ? 'আপনার কোনো কোর্স পাওয়া যায়নি।'
                      : 'এই ফিল্টারে কোনো কোর্স নেই।'}
                  </div>
                )}
              </div>
            )}

            {/* Right Section - Sidebar (unchanged) */}
            {/* <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex gap-3 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0 shadow-md">
                  <div className="text-[9px] mb-0.5">১৬ নোটিস</div>
                  <div className="text-[9px]">বার্ষিক পরীক্ষা</div>
                  <div className="text-[9px] mb-1">এক্সপ্রেস ক্লাস</div>
                  <div className="text-xl font-bold">২০২৫</div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-2 leading-tight">
                    {featureCourseTitle || 'কোর্স তথ্য'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-500 text-xs">C</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-500 text-xs">C</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-500 text-xs">O</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">সেশন তৈরী হচ্ছে?</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href={courses[0]?.slug ? `/courses/${courses[0].slug}` : (courses[0]?.id ? `/courses/id/${courses[0].id}` : '#')}
                  className="flex-1 bg-green-500 text-white text-sm py-2.5 rounded-lg font-medium hover:bg-green-600 transition shadow-sm text-center"
                >
                  কোর্স দেখুন
                </Link>
                <button className="px-5 border border-gray-300 text-gray-700 text-sm py-2.5 rounded-lg font-medium hover:bg-gray-50 transition">
                  নোটস নিন
                </button>
              </div>

              <button className="w-full text-center text-blue-600 text-sm font-medium py-2 mt-4 hover:bg-blue-50 rounded-lg transition">
                সব দেখুন
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
