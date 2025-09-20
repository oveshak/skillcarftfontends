import Image from 'next/image';
import Link from 'next/link';
import { Gem, ArrowRight, ChevronRight } from 'lucide-react';

interface CourseCardProps {
  imageSrc: string;
  title: string;
  instructors: string;
  href: string;
}

const coursesData: CourseCardProps[] = [
  {
    imageSrc: "https://cdn.10minuteschool.com/images/varsity-a-unit-and-gst-admission-course-2025-thumbnail.jpg",
    title: "ভার্সিটি A Unit + গুচ্ছ এডমিশন কোর্স - ২০২৫",
    instructors: "Aman Islam Siam +12",
    href: "https://10minuteschool.com/programs/10447/varsity-a-unit-admission-course-2025/",
  },
  {
    imageSrc: "https://cdn.10minuteschool.com/images/varsity-b-unit-and-gst-admission-course-2025-thumbnail.jpg",
    title: "ভার্সিটি B Unit + গুচ্ছ এডমিশন কোর্স - ২০২৫",
    instructors: "Ridwan Kabir Beacon +7",
    href: "https://10minuteschool.com/programs/10448/varsity-b-unit-admission-course-2025/",
  },
  {
    imageSrc: "https://cdn.10minuteschool.com/images/thumbnails/varsity-c-unit-and-gst-admission-course-2025-thumbnail.jpg",
    title: "ভার্সিটি C Unit + গুচ্ছ এডমিশন কোর্স - ২০২৫",
    instructors: "Faiza Tasnim +10",
    href: "https://10minuteschool.com/programs/10449/varsity-c-unit-admission-course-2025/",
  },
];

const CourseCard = ({ imageSrc, title, instructors, href }: CourseCardProps) => (
  <Link href={href} className="block group">
    <div className="bg-card rounded-xl border border-border-subtle overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 md:p-5">
        <h3 className="font-semibold text-text-primary h-12">{title}</h3>
        <p className="text-sm text-text-secondary mt-2">{instructors}</p>
        <div className="flex items-center gap-1 mt-4 text-sm font-medium text-primary">
          <span>বিস্তারিত</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  </Link>
);

const AdmissionCourses = () => {
  return (
    <section className="bg-background text-text-primary py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 mb-4">
          <Gem className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-accent">ভর্তি পরীক্ষা</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">
          স্বপ্নের ভার্সিটির সম্পূর্ণ প্রস্তুতি
        </h2>
        <p className="mt-4 text-base md:text-lg text-text-secondary max-w-3xl mx-auto">
          ইঞ্জিনিয়ারিং-মেডিকেল কিংবা ভার্সিটি-গুচ্ছ - লক্ষ্য যাই হোক, অর্জনের পথ এখানেই।
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 text-left">
          {coursesData.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="https://10minuteschool.com/admission/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-primary-foreground bg-primary rounded-lg transition-colors hover:bg-primary/90"
          >
            সকল কোর্স
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdmissionCourses;