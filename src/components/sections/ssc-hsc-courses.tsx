"use client";

import Image from "next/image";
import { GraduationCap, ArrowRight, Briefcase } from "lucide-react";
import CoursesFetcher, { UiCourse } from "@/lib/api/course/CoursesFetcher";


interface Course {
  title: string;
  imageUrl: string;
  link: string;
  isFree?: boolean;
  price?: number;
  badge?: string;
}

const CourseCard = ({ course }: { course: Course }) => {
  const { title, imageUrl, link } = course;
  return (
    <a
      href={link}
      className="group block w-[272px] flex-shrink-0 snap-start bg-[#fff] rounded-lg overflow-hidden  border border-gray-300 hover:border-green-300 transition-transform duration-300 hover:scale-[1.03] "
    >
      <div className="relative h-[190px] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 272px, (max-width: 1024px) 272px, 272px"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h3 className="font-bengali font-semibold text-gray-700 leading-6 min-h-[3.5rem] mb-2 text-base lg:text-xl">
          {title}
        </h3>
        <div className="mt-5 mb-1 text-primary flex items-center">
          <span className="flex items-center gap-1 font-semibold font-bengali">
            বিস্তারিত <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </a>
  );
};

export default function SscHscCourses() {
  return (
    <CoursesFetcher>
      {({ loading, err, courses }) => (
        <section className="bg-[#f4f7fd] py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="mb-5 flex justify-center items-center gap-2">
                <div className="flex items-center justify-center p-2 rounded-lg bg-secondary/10">
<Briefcase className="h-6 w-6 text-secondary" />
                </div>
                <p className="font-bold text-secondary">প্রফেশনাল</p>
              </div>
              <h2 className="font-bengali text-3xl font-bold text-gray-700 sm:text-4xl">
                  আমাদের পপুলার কোর্স সমূহ
              </h2>
            </div>

            <div className="mt-12">
              <div className="relative">
                {/* Loading state: skeletons (ডিজাইন ভাঙে না) */}
                {loading ? (
                  <div className="flex gap-6 pb-4 -mx-4 px-4 overflow-x-auto snap-x snap-mandatory">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-[272px] h-[260px] flex-shrink-0 rounded-lg bg-gray-200 border border-gray-200 animate-pulse"
                      />
                    ))}
                  </div>
                ) : err ? (
                  <div className="text-center py-12">
                    <p className="text-red-600 font-semibold">কোর্স লোড হয়নি</p>
                    <p className="text-gray-600">{err}</p>
                  </div>
                ) : (
                  <div className="flex gap-6 pb-4 -mx-4 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                    {courses.map((course: UiCourse, index: number) => (
                      <CourseCard key={index} course={course} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </CoursesFetcher>
  );
}
