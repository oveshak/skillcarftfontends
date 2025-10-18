"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CoursesFetcher, { UiCourse } from "@/lib/api/course/CoursesFetcher";

// ---------- Card type (unchanged) ----------
interface Course {
  id: number;
  title: string;
  instructor: string | null;
  price: string;
  originalPrice?: string | null;
  imageSrc: string;
  href: string;
  isPopular?: boolean;
}

// ---------- Card component (UNCHANGED DESIGN) ----------
const CourseCard = ({ course }: { course: Course }) => (
  <div className="w-[282px] flex-shrink-0 border border-gray-300 rounded-sm hover:border-green-500">
    <a href={course.href} className="group block">
      <div className="relative overflow-hidden">
        <Image
          src={course.imageSrc}
          alt={course.title}
          width={282}
          height={159}
          className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="py-3 px-4">
        <h3 className="text-base font-semibold text-gray-700 group-hover:text-green-accent transition-colors">
          {course.title}
        </h3>
        {course.instructor && (
          <p className="mt-1 text-sm text-[#4A4A4A]">{course.instructor}</p>
        )}
        <div className="mt-1 flex items-center gap-2">
          <p className="text-base font-semibold text-green-accent">
            {course.price}
          </p>
          {course.originalPrice && (
            <del className="text-sm text-gray-text">{course.originalPrice}</del>
          )}
        </div>
      </div>
    </a>
  </div>
);

// ---------- Safe mapper: UiCourse -> CourseCard props ----------
function mapUiToCard(ui: UiCourse, fallbackIndex: number): Course {
  // অনেক API-তে ফিল্ড নাম আলাদা হতে পারে—সব জায়গায় null-safe fallback
  const anyUi = ui as any;

  const id: number =
    Number(anyUi.id) || Number(anyUi.course_id) || fallbackIndex + 1;

  const title: string =
    anyUi.title ||
    anyUi.name ||
    anyUi.course_title ||
    "Untitled Course";

  const instructor: string | null =
    anyUi.instructor ||
    anyUi.instructor_name ||
    anyUi.teacher ||
    null;

  const slug: string | undefined =
    anyUi.slug || anyUi.course_slug || undefined;

  const link: string | undefined =
    anyUi.link || anyUi.href || (slug ? `/courses/${slug}` : undefined);

  const href: string =
    typeof link === "string" && link.length > 0 ? link : "#";

  const thumb: string =
    anyUi.course_thumbnail ||
    anyUi.imageUrl ||
    anyUi.thumbnail ||
    anyUi.image ||
    "https://cdn.10minuteschool.com/images/catalog/media/16x9_1732445853307.jpg";

  const priceNum: number | null =
    Number(anyUi.price) || Number(anyUi.course_price) || null;

  const offerNum: number | null =
    Number(anyUi.offer_price) || Number(anyUi.discount_price) || null;

  const price: string =
    offerNum && priceNum && offerNum < priceNum
      ? `৳ ${offerNum}`
      : priceNum
      ? `৳ ${priceNum}`
      : anyUi.isFree || anyUi.free
      ? "Free"
      : "Free";

  const originalPrice: string | null =
    offerNum && priceNum && offerNum < priceNum ? `৳ ${priceNum}` : null;

  const isPopular: boolean =
    Boolean(anyUi.is_popular) ||
    (typeof anyUi.badge === "string" &&
      anyUi.badge.toLowerCase().includes("popular"));

  return {
    id,
    title,
    instructor,
    price,
    originalPrice,
    imageSrc: thumb,
    href,
    isPopular,
  };
}

// ---------- RelatedCourses (API-driven, DESIGN UNCHANGED) ----------
const RelatedCourses = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <CoursesFetcher>
      {({ loading, err, courses }) => (
        <section className=" py-20">
          <div className="container">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="  text-gray-900  text-lg font-bold text-left md:text-2xl">
                আপনার জন্য আরও কিছু কোর্স
              </h2>
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => scroll("left")}
                  aria-label="Scroll left"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f4f6] transition-colors hover:bg-gray-200"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  aria-label="Scroll right"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f4f6] transition-colors hover:bg-gray-200"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="relative">
              {loading ? (
                // Skeletons — exact width/height to match card; design intact
                <div
                  ref={scrollContainerRef}
                  className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-[282px] flex-shrink-0 border border-gray-200 rounded-sm"
                    >
                      <div className="w-full aspect-[16/9] bg-gray-200 animate-pulse" />
                      <div className="py-3 px-4">
                        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-3 w-3/6 bg-gray-200 rounded animate-pulse mb-1" />
                        <div className="h-4 w-2/6 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : err ? (
                <div className="text-center py-8">
                  <p className="text-red-600 font-semibold">
                    রিলেটেড কোর্স লোড হয়নি
                  </p>
                  <p className="text-gray-600">{String(err)}</p>
                </div>
              ) : (
                <div
                  ref={scrollContainerRef}
                  className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {(courses as UiCourse[]).map((c, idx) => (
                    <CourseCard key={idx} course={mapUiToCard(c, idx)} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </CoursesFetcher>
  );
};

export default RelatedCourses;
