"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Course = {
  title: string;
  instructor?: string;
  image: string;
  href: string;
};

const categories = [
  { name: "IELTS" },
  { name: "Spoken English" },
  { name: "Kids English" },
  { name: "Quran & Arabic" },
  { name: "Grammar" },
  { name: "Communication" },
];

const courses: Course[] = [
  {
    title: "IELTS Course by Munzereen Shahid",
    instructor: "Munzereen Shahid",
    image: "https://cdn.10minuteschool.com/images/thumbnails/IELTS_new_16_9.png",
    href: "/product/ielts-course",
  },
  {
    title: "IELTS LIVE Batch",
    instructor: "Uttam Deb +4",
    image: "https://cdn.10minuteschool.com/images/thumbnails/batch-12-ielts-live-batch-thumbnails.jpg",
    href: "https://10minuteschool.com/product/ielts-live-batch/",
  },
  {
    title: "ঘরে বসে Spoken English",
    instructor: "Munzereen Shahid",
    image:
      "https://cdn.10minuteschool.com/images/thumbnails/ghore-boshe-Spoken-English-course-thumbnail-by-Munzereen-Shahid-16x9-28.jpg?",
    href: "https://10minuteschool.com/product/ghore-boshe-spoken-english/",
  },
  {
    title: "Spoken English Junior LIVE Batch",
    instructor: "Rukhsar Sanjaree +4",
    image: "https://cdn.10minuteschool.com/images/catalog/media/sej-thumbnial_1734278669669.jpg",
    href: "https://10minuteschool.com/product/spoken-english-junior-live-batch/",
  },
  {
    title: "English Communication for Professionals",
    instructor: "Munzereen Shahid",
    image:
      "https://cdn.10minuteschool.com/images/thumbnails/english-communication-for-professionals/english-communication-for-professsionals-course-thumbnail---16x9.jpg",
    href: "https://10minuteschool.com/product/english-for-professionals-course/",
  },
  {
    title: "Complete English Grammar Course",
    instructor: "Munzereen Shahid",
    image: "https://cdn.10minuteschool.com/images/thumbnails/complete-grammar-course-thumbnail.jpg",
    href: "https://10minuteschool.com/product/english-grammar-course/",
  },
  {
    title: "English for Everyday",
    instructor: "Munzereen Shahid",
    image: "https://cdn.10minuteschool.com/images/Thumbnails/english_for_everyday_16x9.png",
    href: "https://10minuteschool.com/product/english-for-everyday/",
  },
  {
    title: "IELTS Reading & Listening Mock Tests",
    image:
      "https://cdn.10minuteschool.com/images/Thumbnails/IELTS-Listening-Reading-Mock-Tests-Course-Thumbnail_discount-30_16_9.jpg",
    href: "https://10minuteschool.com/product/ielts-reading-and-listening-mock-tests/",
  },
  {
    title: "২৪ ঘণ্টায় কোরআন শিখি",
    instructor: "মাওলানা শাইখ মুহাম্মাদ জামাল উদ্দীন",
    image:
      "https://cdn.10minuteschool.com/images/catalog/media/%C3%A0%C2%A7%C2%A8%C3%A0%C2%A7%C2%AA-%C3%A0%C2%A6%C2%98%C3%A0%C2%A6%C2%A3%C3%A0%C2%A7%C2%8D%C3%A0%C2%A6%C2%9F%C3%A0%C2%A6%C2%BE%C3%A0%C2%A6%C2%AF%C3%A0%C2%A6%C2%BC-%C3%A0%C2%A6%C2%95%C3%A0%C2%A7%C2%8B%C3%A0%C2%A6%C2%B0%C3%A0%C2%A6%C2%86%C3%A0%C2%A6%C2%A8-%C3%A0%C2%A6%C2%B6%C3%A0%C2%A6%C2%BF%C3%A0%C2%A6%C2%96%C3%A0%C2%A6%C2%BF---Course-Thumbnail-PSD_1732445930516.jpg",
    href: "https://10minuteschool.com/product/easy-quran-reading/",
  },
  {
    title: "অর্থ বুঝে কুরআন শিখি",
    instructor: "Hafiz Mawlana Muhammad Muhsin Mashkur",
    image:
      "https://cdn.10minuteschool.com/images/thumbnails/best-quran-shikhi-course-thumbnail.jpg",
    href: "https://10minuteschool.com/product/quran-shikhi-course/",
  },
];

const CategoryFilters = () => {
  const [active, setActive] = useState(categories[0].name);
  return (
    <div className="mt-8 flex justify-center">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((c) => (
          <button
            key={c.name}
            onClick={() => setActive(c.name)}
            className={cn(
              "whitespace-nowrap rounded-lg border px-5 py-2 text-sm font-medium transition-colors",
              active === c.name
                ? "bg-card border-primary text-foreground"
                : "bg-card border-border text-muted-foreground hover:bg-border/50"
            )}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const CourseCard = ({ title, instructor, image, href }: Course) => (
  <a
    href={href}
    className="group block overflow-hidden rounded-card bg-card transition-transform duration-300 ease-in-out hover:-translate-y-1"
  >
    <div className="relative aspect-[16/9] w-full">
      <Image src={image} alt={title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
    </div>
    <div className="flex h-[calc(100%-56.25%)] flex-col p-4">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {instructor && (
        <p className="mt-1 text-sm text-muted-foreground">{instructor}</p>
      )}
      <div className="mt-auto flex items-center gap-1 text-sm font-medium text-primary">
        <span>বিস্তারিত</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </div>
  </a>
);

export const LanguageLearningSection = () => {
  return (
    <section className="bg-background py-14 text-foreground md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl" role="img" aria-label="books">
            📚
          </span>
          <p className="font-medium text-accent-purple">ভাষা শিক্ষা</p>
        </div>
        <h1 className="mt-3 text-center text-3xl font-bold md:mt-4 md:text-5xl">
          ভাষা শিক্ষার সেরা কোর্সসমূহ
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-center text-muted-foreground">
          IELTS, Spoken English, Grammar, Communication এবং আরও অনেক কোর্স —
          নিজের প্রয়োজন অনুযায়ী বেছে নিন।
        </p>

        <CategoryFilters />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course, i) => (
            <CourseCard key={i} {...course} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://10minuteschool.com/categories/language-learning/"
            className="inline-flex items-center justify-center gap-2 rounded-button bg-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
          >
            10 Minute School-এ দেখুন
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};