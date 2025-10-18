"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Course = {
  title: string;
  instructor?: string;
  image: string;
  href: string;
  category: string;
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
    href: '/product/ielts-course/',
    category: 'ভাষা শিক্ষা'
  },
  {
    title: 'ঘরে বসে Spoken English',
    instructor: 'Munzereen Shahid',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/ghore-boshe-Spoken-English-course-thumbnail-by-Munzereen-Shahid-16x9-28.jpg?',
    href: '/product/ghore-boshe-spoken-english/',
    category: 'ভাষা শিক্ষা'
  },
  {
    title: 'IELTS LIVE Batch',
    instructor: 'Uttam Deb +4',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/batch-12-ielts-live-batch-thumbnails.jpg',
    href: '/product/ielts-live-batch/',
    category: 'ভাষা শিক্ষা'
  },
  {
    title: 'Spoken English Junior LIVE Batch',
    instructor: 'Rukhsar Sanjaree +4',
    image: 'https://cdn.10minuteschool.com/images/catalog/media/sej-thumbnial_1734278669669.jpg',
    href: '/product/spoken-english-junior-live-batch/',
    category: 'কিডস কোর্সসমূহ'
  },
  {
    title: '২৪ ঘণ্টায় কোরআন শিখি',
    instructor: 'মাওলানা শাইখ মুহাম্মাদ জামাল উদ্দীন',
    image: 'https://cdn.10minuteschool.com/images/catalog/media/%C3%A0%C2%A7%C2%A8%C3%A0%C2%A7%C2%AA-%C3%A0%C2%A6%C2%98%C3%A0%C2%A6%C2%A3%C3%A0%C2%A7%C2%8D%C3%A0%C2%A6%C2%9F%C3%A0%C2%A6%C2%BE%C3%A0%C2%A6%C2%AF%C3%A0%C2%A6%C2%BC-%C3%A0%C2%A6%C2%95%C3%A0%C2%A7%C2%8B%C3%A0%C2%A6%C2%B0%C3%A0%C2%A6%C2%86%C3%A0%C2%A6%C2%A8-%C3%A0%C2%A6%C2%B6%C3%A0%C2%A6%C2%BF%C3%A0%C2%A6%C2%96%C3%A0%C2%A6%C2%BF---Course-Thumbnail-PSD_1732445930516.jpg',
    href: '/product/easy-quran-reading/',
    category: 'ভাষা শিক্ষা'
  },
  {
    title: 'English Communication for Professionals',
    instructor: 'Munzereen Shahid',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/english-communication-for-professionals/english-communication-for-professsionals-course-thumbnail---16x9.jpg',
    href: '/product/english-for-professionals-course/',
    category: 'প্রফেশনাল কোর্সসমূহ'
  },
  {
    title: 'অর্থ বুঝে কুরআন শিখি',
    instructor: 'Hafiz Mawlana Muhammad Muhsin Mashkur',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/best-quran-shikhi-course-thumbnail.jpg',
    href: '/product/quran-shikhi-course/',
    category: 'ভাষা শিক্ষা'
  },
  {
    title: 'Complete English Grammar Course',
    instructor: 'Munzereen Shahid',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/complete-grammar-course-thumbnail.jpg',
    href: '/product/english-grammar-course/',
    category: 'ভাষা শিক্ষা'
  },
  {
    title: 'IELTS Reading & Listening Mock Tests',
    image: 'https://cdn.10minuteschool.com/images/Thumbnails/IELTS-Listening-Reading-Mock-Tests-Course-Thumbnail_discount-30_16_9.jpg',
    href: '/product/ielts-reading-and-listening-mock-tests/',
    category: 'ভাষা শিক্ষা'
  },
  {
    title: 'English for Everyday',
    instructor: 'Munzereen Shahid',
    image: 'https://cdn.10minuteschool.com/images/Thumbnails/english_for_everyday_16x9.png',
    href: '/product/english-for-everyday/',
    category: 'ভাষা শিক্ষা'
  },
  {
    title: 'Web Development Complete Course',
    instructor: 'Rabbil Hasan',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/web-development-course-thumbnail.jpg',
    href: '/product/web-development-course/',
    category: 'স্কিলস এন্ড আইটি'
  },
  {
    title: 'Digital Marketing Course',
    instructor: 'Sadman Sadik',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/digital-marketing-course-thumbnail.jpg',
    href: '/product/digital-marketing-course/',
    category: 'ফ্রিল্যান্সিং'
  },
  {
    title: 'Graphic Design Complete Course',
    instructor: 'Mizanur Rahman',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/graphic-design-course-thumbnail.jpg',
    href: '/product/graphic-design-course/',
    category: 'ডিজাইন এন্ড ক্রিয়েটিভ'
  },
  {
    title: 'Python Programming Course',
    instructor: 'Tamim Shahriar',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/python-programming-course-thumbnail.jpg',
    href: '/product/python-programming-course/',
    category: 'স্কিলস এন্ড আইটি'
  },
  {
    title: 'Career Development Bundle',
    instructor: 'Multiple Instructors',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/career-bundle-thumbnail.jpg',
    href: '/product/career-bundle/',
    category: 'বান্ডেল'
  },
  {
    title: 'Interview Preparation Course',
    instructor: 'Saiful Islam',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/interview-preparation-thumbnail.jpg',
    href: '/product/interview-preparation/',
    category: 'ক্যারিয়ার রেডিনেস'
  },
  {
    title: 'Kids Math Fun Course',
    instructor: 'Rashida Begum',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/kids-math-course-thumbnail.jpg',
    href: '/product/kids-math-course/',
    category: 'কিডস কোর্সসমূহ'
  },
  {
    title: 'Free Basic English Course',
    instructor: 'Free Instructor',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/free-english-course-thumbnail.jpg',
    href: '/product/free-english-course/',
    category: 'ফ্রি কোর্সসমূহ'
  }
];


const CategoryFilters = ({ activeCategory, setActiveCategory }: { activeCategory: string; setActiveCategory: (category: string) => void }) => {
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
    <Link href={href} className="block overflow-hidden transition-transform duration-300 ease-in-out transform bg-card rounded-card group hover:-translate-y-1">
      <div className="relative w-full aspect-[16/9]">
        <Image src={image} alt={title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105"/>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
      </div>
      <div className="flex flex-col  p-4">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {instructor && <p className="mt-1 text-sm text-muted-foreground">{instructor}</p>}
        <div className="flex items-center pt-2 gap-1 mt-auto text-sm font-medium text-primary">
          <span>বিস্তারিত</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
);
  
const SkillsCourses = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0].name);

    // Filter courses based on active category
    const filteredCourses = courses.filter(course => course.category === activeCategory);

    return (
      <section className="py-20 bg-black text-foreground">
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
          
          <CategoryFilters activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
  
          <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {filteredCourses.slice(0, 8).map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">এই ক্যাটেগরিতে কোন কোর্স পাওয়া যায়নি</p>
            </div>
          )}
  
          <div className="mt-12 text-center">
            <Link href="/categories/language-learning/" className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white transition-colors rounded-button bg-primary hover:bg-primary/90">
              সকল কোর্স
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    );
};
  
export default SkillsCourses;