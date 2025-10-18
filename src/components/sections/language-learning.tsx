"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CoursesFetcher, { Course } from "@/lib/api/course/CoursesFetcher";

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=225&fit=crop&crop=center";

/** ✅ small inner component to host hooks */
function AutoSwitch({
  loading,
  err,
  activeTab,
  paidLen,
  freeLen,
  onSwitch,
}: {
  loading: boolean;
  err: string | null;
  activeTab: "paid" | "free";
  paidLen: number;
  freeLen: number;
  onSwitch: (tab: "paid" | "free") => void;
}) {
  useEffect(() => {
    if (!loading && !err && activeTab === "paid" && paidLen === 0 && freeLen > 0) {
      onSwitch("free");
    }
  }, [loading, err, activeTab, paidLen, freeLen, onSwitch]);
  return null;
}

const CourseCard = ({ title, image, price, badge, href, isFree }: Course) => (
  <a
    href={href}
    className="group relative block overflow-hidden md:border  hover:border-1 md:rounded-sm hover:border-green-200 transition-all duration-300 ease-in-out hover:-translate-y-1   border-gray-300"
  >
    <div className="flex gap-5 md:gap-0  flex-row md:flex-col">
      <div className="relative w-40 md:w-full overflow-hidden">
        <div className="relative w-full md:w-full md:h-auto aspect-[16/9]">
          <Image
            src={image || FALLBACK_IMG}
            alt={title}
            fill
            className="rounded-sm md:rounded-none object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
            priority={false}
          />
        </div>
        {badge && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] md:text-xs px-2 py-0.5 rounded">
            {badge}
          </span>
        )}
      </div>

      <div className="md:p-4">
        <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 mb-3">Tisat Fatema Tia</p>
        <div className="flex items-center justify-between">
          {isFree ? (
            <span className="text-xs md:text-sm font-bold text-green-600">ফ্রি</span>
          ) : (
            <span className="text-xs md:text-sm font-bold text-green-600">৳ {price}</span>
          )}
        </div>
      </div>
    </div>
  </a>
);

const FreelancingSection = () => {
  const [activeTab, setActiveTab] = useState<"paid" | "free">("paid");

  return (
    <CoursesFetcher>
      {({ loading, err, paidCourses, freeCourses }) => {
        const paidLen = paidCourses?.length ?? 0;
        const freeLen = freeCourses?.length ?? 0;
        const visible: Course[] = activeTab === "paid" ? paidCourses ?? [] : freeCourses ?? [];

        return (
          <div className="min-h-screen bg-gray-50">
            {/* ✅ run effect safely here */}
            <AutoSwitch
              loading={!!loading}
              err={err ?? null}
              activeTab={activeTab}
              paidLen={paidLen}
              freeLen={freeLen}
              onSwitch={setActiveTab}
            />

            <div className="bg-gray-900 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"></div>
              <div className="container mx-auto px-4 pt-7 relative z-10">
                <div className="mb-6 flex items-center gap-2 text-sm text-gray-300">
                  <span>কোর্সসমূহ</span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="text-white ">ফ্রিল্যান্সিং</span>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-12">
                  <div className="flex-1 max-w-2xl">
                    <h1 className="text-xl lg:text-3xl font-bold mb-6">ফ্রিল্যান্সিং</h1>
                    <p className=" text-xs lg:text-sm text-gray-300 leading-relaxed mb-8">
                      ফ্রিল্যান্সিং মার্কেটপ্লেসে বিভিন্ন দেশের সহজ ফ্রিল্যান্সিং বিষয়ে কর্মীরা পরস্পর চো
                      দিয়ে দিয়ে রয় নিয়ে আসছে দেশ বিদেশ Freelancing Courses! SEO বিজ, ডাটা এন্ট্রি, Logo
                      Design, T- Shirt ডিজাইনের মতো ক্রিয়েটিভ শিল্প কার্স শেখরার মর কাল চে দিয়ে দিয়ে
                      Freelancing Course শেখানো।
                    </p>

                    <div className="flex  rounded-lg gap-6  backdrop-blur-sm ">
                      <button
                        onClick={() => setActiveTab("paid")}
                        className={`px-6 pb-1 text-sm lg:text-lg font-medium transition-all duration-200 ${
                          activeTab === "paid"
                            ? " text-green-600 shadow-lg  border-b-4 border-b-green-600"
                            : "text-gray-300 hover:text-white "
                        }`}
                      >
                        Paid Courses ({paidLen})
                      </button>
                      <button
                        onClick={() => setActiveTab("free")}
                        className={`px-6 pb-1 text-sm lg:text-lg font-medium transition-all duration-200 ${
                          activeTab === "free"
                            ? " text-green-600 shadow-lg  border-b-4 border-b-green-600"
                            : "text-gray-300 hover:text-white "
                        }`}
                      >
                        Free Courses ({freeLen})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container mx-auto px-4 py-5 md:pt-16">
              <div className="mb-8">
                <h2 className="text-xl flex justify-between items-center font-bold text-gray-900 mb-2">
                  <p className=" text-xl lg:text-2xl font-bold text-gray-900">
                    {activeTab === "paid" ? "Paid Courses" : "Free Courses"}
                  </p>
                  <p className="text-lg font-normal text-gray-500 ">
                    ({activeTab === "paid" ? paidLen : freeLen} courses)
                  </p>
                </h2>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pb-10">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse h-28 sm:h-56 bg-gray-200 md:rounded-sm border border-gray-200"
                    />
                  ))}
                </div>
              ) : err ? (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold text-red-600 mb-2">কোর্স লোড হয়নি</h3>
                  <p className="text-gray-600">{err}</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pb-10">
                    {(visible ?? []).map((course, i) => (
                      <CourseCard key={`${course.href}-${i}`} {...course} />
                    ))}
                  </div>

                  {activeTab === "free" && freeLen === 0 && (
                    <div className="text-center py-16">
                      <div className="text-6xl mb-4">📚</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">কোন ফ্রি কোর্স নেই</h3>
                      <p className="text-gray-600">শীঘ্রই নতুন ফ্রি কোর্স আসছে!</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      }}
    </CoursesFetcher>
  );
};

export default FreelancingSection;
