// import FreelancingSection from "@/components/sections/singlecategory";

// export default function LanguageLearningPage() {
//   return (
//     <main className="">
     
//       <FreelancingSection />
     
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { url } from "@/lib/api/baseurl";

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=225&fit=crop&crop=center";

type Category = {
  id: number;
  title: string;
  description: string;
  slug: string | null;
};

type Course = {
  id: number;
  title: string;
  course_thumbnail: string;
  price: number;
  offer_price: number;
  slug: string;
};

/** JWT decoder */
function decodeJwt<T = unknown>(token: string): T {
  const [, payload] = token.split(".");
  const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
  return JSON.parse(json) as T;
}

/** Slugify helper */
function slugify(s: string) {
  return s.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

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

const CourseCard = ({ course, isFree }: { course: Course; isFree: boolean }) => (
  <a
    href={`/courses/${course.slug}`}
    className="group relative block overflow-hidden md:border hover:border-1 md:rounded-sm hover:border-green-200 transition-all duration-300 ease-in-out hover:-translate-y-1 border-gray-300"
  >
    <div className="flex gap-5 md:gap-0 flex-row md:flex-col">
      <div className="relative w-40 md:w-full overflow-hidden">
        <div className="relative w-full md:w-full md:h-auto aspect-[16/9]">
          <Image
            src={course.course_thumbnail || FALLBACK_IMG}
            alt={course.title}
            fill
            className="rounded-sm md:rounded-none object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
            priority={false}
          />
        </div>
      </div>

      <div className="md:p-4">
        <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight">
          {course.title}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 mb-3">MD. MAHABUB ALOM</p>
        <div className="flex items-center justify-between">
          {isFree ? (
            <span className="text-xs md:text-sm font-bold text-green-600">ফ্রি</span>
          ) : (
            <div className="flex items-center gap-2">
              {course.offer_price < course.price && (
                <span className="text-xs text-gray-400 line-through">৳ {course.price}</span>
              )}
              <span className="text-xs md:text-sm font-bold text-green-600">
                ৳ {course.offer_price || course.price}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  </a>
);

export default function CategoryCoursesPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [activeTab, setActiveTab] = useState<"paid" | "free">("paid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [paidCourses, setPaidCourses] = useState<Course[]>([]);
  const [freeCourses, setFreeCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (!slug) return;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        

        // Step 1: Fetch all categories
        const catRes = await fetch(`${url}/category/`);
        if (!catRes.ok) throw new Error("Failed to fetch categories");

        const catJson = await catRes.json();
        const catPayload = decodeJwt<{ data: Category[] }>(catJson.data.results.token);
        const categories = catPayload.data || [];

        // Step 2: Find category by slug
        let foundCategory = categories.find((c) => {
          const safeSlug = c.slug && c.slug.trim() ? c.slug : `${slugify(c.title)}-${c.id}`;
          return safeSlug === slug;
        });

        // Try by ID if not found
        if (!foundCategory) {
          const maybeId = Number(slug.split("-").pop());
          if (!Number.isNaN(maybeId)) {
            foundCategory = categories.find((c) => c.id === maybeId);
          }
        }

        if (!foundCategory) throw new Error("Category not found");
        setCategory(foundCategory);

        // Step 3: Fetch courses for this category
        const coursesRes = await fetch(`${url}/courses?course_category=${foundCategory.id}`);
        if (!coursesRes.ok) throw new Error("Failed to fetch courses");

        const coursesJson = await coursesRes.json();
        const coursesPayload = decodeJwt<{ data: Course[] }>(coursesJson.data.results.token);
        const allCourses = coursesPayload.data || [];

        // Step 4: Separate paid and free courses
        const paid = allCourses.filter((c) => c.price > 0 && c.offer_price > 0);
        const free = allCourses.filter((c) => c.price === 0 || c.offer_price === 0);

        setPaidCourses(paid);
        setFreeCourses(free);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  const paidLen = paidCourses.length;
  const freeLen = freeCourses.length;
  const visible = activeTab === "paid" ? paidCourses : freeCourses;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gray-900 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 pt-7 pb-16">
            <div className="h-8 w-48 bg-gray-700 animate-pulse rounded mb-4"></div>
            <div className="h-12 w-64 bg-gray-700 animate-pulse rounded mb-4"></div>
            <div className="h-20 w-full max-w-2xl bg-gray-700 animate-pulse rounded"></div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-5 md:pt-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pb-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse h-28 sm:h-56 bg-gray-200 md:rounded-sm border border-gray-200"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-red-600 mb-2">কোর্স লোড হয়নি</h3>
          <p className="text-gray-600">{error || "Category not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AutoSwitch
        loading={false}
        err={null}
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
            <span className="text-white">{category.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-12">
            <div className="flex-1 max-w-2xl">
              <h1 className="text-xl lg:text-3xl font-bold mb-6">{category.title}</h1>
              <div
                className="text-xs lg:text-sm text-gray-300 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: category.description }}
              />

              <div className="flex rounded-lg gap-6 backdrop-blur-sm">
                <button
                  onClick={() => setActiveTab("paid")}
                  className={`px-6 pb-1 text-sm lg:text-lg font-medium transition-all duration-200 ${
                    activeTab === "paid"
                      ? "text-green-600 shadow-lg border-b-4 border-b-green-600"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Paid Courses ({paidLen})
                </button>
                <button
                  onClick={() => setActiveTab("free")}
                  className={`px-6 pb-1 text-sm lg:text-lg font-medium transition-all duration-200 ${
                    activeTab === "free"
                      ? "text-green-600 shadow-lg border-b-4 border-b-green-600"
                      : "text-gray-300 hover:text-white"
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
            <p className="text-xl lg:text-2xl font-bold text-gray-900">
              {activeTab === "paid" ? "Paid Courses" : "Free Courses"}
            </p>
            <p className="text-lg font-normal text-gray-500">
              ({activeTab === "paid" ? paidLen : freeLen} courses)
            </p>
          </h2>
        </div>

        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pb-10">
            {visible.map((course) => (
              <CourseCard key={course.id} course={course} isFree={activeTab === "free"} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activeTab === "free" ? "কোন ফ্রি কোর্স নেই" : "কোন পেইড কোর্স নেই"}
            </h3>
            <p className="text-gray-600">শীঘ্রই নতুন কোর্স আসছে!</p>
          </div>
        )}
      </div>
    </div>
  );
}
