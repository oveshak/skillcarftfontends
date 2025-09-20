import Image from 'next/image';
import { GraduationCap, ArrowRight } from 'lucide-react';

const courses = [
  {
    title: 'HSC 27 অনলাইন ব্যাচ (ফাইন্যান্স ও একাউন্টিং)',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/hsc-27-bundle-1-19.JPG?',
    link: 'https://10minuteschool.com/product/hsc-27-finance-and-accounting-online-batch/',
  },
  {
    title: 'HSC 27 অনলাইন ব্যাচ (জিওগ্রাফি ও ইকোনমিক্স)',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/hsc-27-bundle-2-20.JPG?',
    link: 'https://10minuteschool.com/product/hsc-27-geography-and-economics-online-batch/',
  },
  {
    title: 'HSC 27 অনলাইন ব্যাচ (ফিজিক্স, কেমিস্ট্রি, ম্যাথ, বায়োলজি)',
    imageUrl: 'https://cdn.10minuteschool.com/images/thumbnails/HSC_OB_27/hsc-2027-online-batch-science-group-thumbnail.png',
    link: 'https://10minuteschool.com/product/hsc-27-science-group-online-batch/',
  },
  {
    title: 'HSC 27 অনলাইন ব্যাচ (বাংলা, ইংরেজি, তথ্য ও যোগাযোগ প্রযুক্তি)',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/hsc-27-bangla-english-ict-online-batch-thumbnail-new-22.png?',
    link: 'https://10minuteschool.com/product/hsc-27-bangla-english-ict-online-batch/',
  },
  {
    title: 'HSC 26 অনলাইন ব্যাচ ২.০ (বাংলা, ইংরেজি, তথ্য ও যোগাযোগ প্রযুক্তি)',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/hsc-26-online-batch-2-bangla-english-ict-thumbnail-23.png?',
    link: 'https://10minuteschool.com/product/hsc-26-online-batch-2-bangla-english-ict/',
  },
  {
    title: 'HSC 26 অনলাইন ব্যাচ (ফিজিক্স, কেমিস্ট্রি, ম্যাথ, বায়োলজি)',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/hsc-2026-online-batch-science-group-thumbnail-24.jpg?',
    link: 'https://10minuteschool.com/product/hsc-2026-online-batch/',
  },
  {
    title: '১০ম শ্রেণি [সকল বিভাগ] বাংলা, ইংরেজি, আই.সি.টি., সাধারণ গণিত [SSC 2026 ব্যাচ]',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/class-10-bangla-english-ict-g-math-thumbnail-25.jpg?',
    link: 'https://10minuteschool.com/product/class-10-bangla-english-ict-math-for-ssc-2026/',
  },
  {
    title: '১০ম শ্রেণি - অনলাইন ব্যাচ ২০২৫ (বিজ্ঞান বিভাগ) [SSC 2026 ব্যাচ]',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/JNk0Q-oDP4w-HD_1735798898974-26.jpg?',
    link: 'https://10minuteschool.com/product/class-10-online-batch-2025/',
  },
];

interface Course {
  title: string;
  imageUrl: string;
  link: string;
}

const CourseCard = ({ course }: { course: Course }) => {
  const { title, imageUrl, link } = course;
  return (
    <a
      href={link}
      className="group block w-[272px] flex-shrink-0 snap-start bg-card rounded-lg overflow-hidden shadow-lg border border-border-subtle transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl"
    >
      <div className="relative h-[152px] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-3">
        <h3 className="font-bengali font-semibold text-foreground leading-6 min-h-[3.5rem] mb-2 text-base">
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
    <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="mb-5 flex justify-center items-center gap-2">
            <div className="flex items-center justify-center p-2 rounded-lg bg-secondary/10">
              <GraduationCap className="h-6 w-6 text-secondary" />
            </div>
            <p className="font-bold text-secondary">SSC & HSC</p>
          </div>
          <h2 className="font-bengali text-3xl font-bold text-foreground sm:text-4xl">
            SSC ও HSC শিক্ষার্থীদের জন্য
          </h2>
        </div>

        <div className="mt-12">
          <div className="relative">
            <div className="flex gap-6 pb-4 -mx-4 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
              {courses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}