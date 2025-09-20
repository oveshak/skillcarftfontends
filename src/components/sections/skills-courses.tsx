"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Course = {
  title: string;
  instructor?: string;
  image: string;
  href: string;
};

type Category = {
  name: string;
};

const stats = [
  { text: 'দেশসেরা শিক্ষক' },
  { text: '৫ লাখ+ শিক্ষার্থী' },
  { text: '৭০+ অনলাইন কোর্স' },
];

const categories: Category[] = [
  { name: 'ভাষা শিক্ষা' },
  { name: 'ফ্রিল্যান্সিং' },
  { name: 'বান্ডেল' },
  { name: 'স্কিলস এন্ড আইটি' },
  { name: 'ডিজাইন এন্ড ক্রিয়েটিভ' },
  { name: 'ক্যারিয়ার রেডিনেস' },
  { name: 'কিডস কোর্সসমূহ' },
  { name: 'প্রফেশনাল কোর্সসমূহ' },
  { name: 'ফ্রি কোর্সসমূহ' },
];

const courses: Course[] = [
  {
    title: 'IELTS Course by Munzereen Shahid',
    instructor: 'Munzereen Shahid',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/IELTS_new_16_9.png',
    href: 'https://10minuteschool.com/product/ielts-course/',
  },
  {
    title: 'ঘরে বসে Spoken English',
    instructor: 'Munzereen Shahid',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/ghore-boshe-Spoken-English-course-thumbnail-by-Munzereen-Shahid-16x9-28.jpg?',
    href: 'https://10minuteschool.com/product/ghore-boshe-spoken-english/',
  },
  {
    title: 'IELTS LIVE Batch',
    instructor: 'Uttam Deb +4',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/batch-12-ielts-live-batch-thumbnails.jpg',
    href: 'https://10minuteschool.com/product/ielts-live-batch/',
  },
  {
    title: 'Spoken English Junior LIVE Batch',
    instructor: 'Rukhsar Sanjaree +4',
    image: 'https://cdn.10minuteschool.com/images/catalog/media/sej-thumbnial_1734278669669.jpg',
    href: 'https://10minuteschool.com/product/spoken-english-junior-live-batch/',
  },
  {
    title: '২৪ ঘণ্টায় কোরআন শিখি',
    instructor: 'মাওলানা শাইখ মুহাম্মাদ জামাল উদ্দীন',
    image: 'https://cdn.10minuteschool.com/images/catalog/media/%C3%A0%C2%A7%C2%A8%C3%A0%C2%A7%C2%AA-%C3%A0%C2%A6%C2%98%C3%A0%C2%A6%C2%A3%C3%A0%C2%A7%C2%8D%C3%A0%C2%A6%C2%9F%C3%A0%C2%A6%C2%BE%C3%A0%C2%A6%C2%AF%C3%A0%C2%A6%C2%BC-%C3%A0%C2%A6%C2%95%C3%A0%C2%A7%C2%8B%C3%A0%C2%A6%C2%B0%C3%A0%C2%A6%C2%86%C3%A0%C2%A6%C2%A8-%C3%A0%C2%A6%C2%B6%C3%A0%C2%A6%C2%BF%C3%A0%C2%A6%C2%96%C3%A0%C2%A6%C2%BF---Course-Thumbnail-PSD_1732445930516.jpg',
    href: 'https://10minuteschool.com/product/easy-quran-reading/',
  },
  {
    title: 'English Communication for Professionals',
    instructor: 'Munzereen Shahid',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/english-communication-for-professionals/english-communication-for-professsionals-course-thumbnail---16x9.jpg',
    href: 'https://10minuteschool.com/product/english-for-professionals-course/',
  },
  {
    title: 'অর্থ বুঝে কুরআন শিখি',
    instructor: 'Hafiz Mawlana Muhammad Muhsin Mashkur',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/best-quran-shikhi-course-thumbnail.jpg',
    href: 'https://10minuteschool.com/product/quran-shikhi-course/',
  },
  {
    title: 'Complete English Grammar Course',
    instructor: 'Munzereen Shahid',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/complete-grammar-course-thumbnail.jpg',
    href: 'https://10minuteschool.com/product/english-grammar-course/',
  },
  {
    title: 'IELTS Reading & Listening Mock Tests',
    image: 'https://cdn.10minuteschool.com/images/Thumbnails/IELTS-Listening-Reading-Mock-Tests-Course-Thumbnail_discount-30_16_9.jpg',
    href: 'https://10minuteschool.com/product/ielts-reading-and-listening-mock-tests/',
  },
  {
    title: 'English for Everyday',
    instructor: 'Munzereen Shahid',
    image: 'https://cdn.10minuteschool.com/images/Thumbnails/english_for_everyday_16x9.png',
    href: 'https://10minuteschool.com/product/english-for-everyday/',
  },
];


const CategoryFilters = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0].name);
  
    return (
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-2 pb-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={cn(
                'whitespace-nowrap rounded-lg border px-5 py-3 text-sm font-medium transition-colors',
                activeCategory === category.name
                  ? 'bg-card border-primary text-foreground'
                  : 'bg-card border-border text-muted-foreground hover:bg-border/50'
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    );
};
  
const CourseCard = ({ title, instructor, image, href }: Course) => (
    <a href={href} className="block overflow-hidden transition-transform duration-300 ease-in-out transform bg-card rounded-card group hover:-translate-y-1">
      <div className="relative w-full aspect-[16/9]">
        <Image src={image} alt={title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105"/>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
      </div>
      <div className="flex flex-col h-[calc(100%-56.25%)] p-4">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {instructor && <p className="mt-1 text-sm text-muted-foreground">{instructor}</p>}
        <div className="flex items-center gap-1 mt-auto text-sm font-medium text-primary">
          <span>বিস্তারিত</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </a>
);
  
const SkillsCourses = () => {
    return (
      <section className="py-20 bg-background text-foreground">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl" role="img" aria-label="rocket">🚀</span>
            <p className="font-medium text-accent-purple">স্কিলস</p>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-center md:text-5xl">
            দেশসেরা স্কিল ডেভেলপমেন্ট প্লাটফর্ম
          </h2>
          <ul className="flex flex-wrap items-center justify-center gap-4 mt-6 md:gap-8 text-muted-foreground">
            {stats.map((stat, index) => (
              <li key={index} className="flex items-center gap-2">
                 <CheckCircle className="w-5 h-5 text-secondary" />
                 <span>{stat.text}</span>
              </li>
            ))}
          </ul>
          
          <CategoryFilters />
  
          <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {courses.slice(0, 8).map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
  
          <div className="mt-12 text-center">
            <a href="https://10minuteschool.com/categories/language-learning/" className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white transition-colors rounded-button bg-primary hover:bg-primary/90">
              সকল কোর্স
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    );
};
  
export default SkillsCourses;