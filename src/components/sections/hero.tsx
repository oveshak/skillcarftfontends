'use client'
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import OfflineCenters from "./offline-centers";
import img1 from "../../../public/1a.jpg"
import img2 from "../../../public/2b.jpg"
import img3 from "../../../public/3c.jpeg"
import img4 from "../../../public/4d.jpeg"
import CoursesFetcher, { UiCourse } from "@/lib/api/course/CoursesFetcher";
// const classCardData = [
//   {
//     name: "ক্লাস ৬,৭,৮",
//     imgSrc:
//       "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/image_6344663_1733036653015-2.png?",
//     link: "#",
//   },
//   {
//     name: "ক্লাস ৯, ১০",
//     imgSrc:
//       "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/9-10_1732778140427-3.png?",
//     link: "#",
//   },
//   {
//     name: "HSC ২৫, ২৬ ",
//     imgSrc:
//       "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/ssc_1732778162589-4.png?",
//     link: "#",
//   },
//   {
//     name: "HSC ২৭",
//     imgSrc:
//       "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/hscbag_1732778180651-5.png?",
//     link: "#",
//   },
//   {
//     name: "HSC ২৭",
//     imgSrc:
//       "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/hscbag_1732778180651-5.png?",
//     link: "#",
//   },
//   {
//     name: "ক্লাস ৯, ১০",
//     imgSrc:
//       "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/9-10_1732778140427-3.png?",
//     link: "#",
//   },
// ];
interface Course {
  slug:string;
  title: string;
  imageUrl: string;
  link: string;
  isFree?: boolean;
  price?: number;
  badge?: string;
  subtitle?:string;
}
const skillCardData = [
  {
    imgSrc:img1,
    href: "https://forms.gle/5iaCnxHTHoCK8Heb9",
  },
  {
    imgSrc: img2,
    href: "https://forms.gle/5iaCnxHTHoCK8Heb9",
  },
  {
    imgSrc:
      img3,
    href: "https://forms.gle/5iaCnxHTHoCK8Heb9",
  },
  {
    imgSrc:
     img4,
    href: "https://forms.gle/5iaCnxHTHoCK8Heb9",
  },
  // {
  //   imgSrc:
  //     "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/SEJ_Live_Batch_new_2_1739180955021-6.png?",
  //   href: "/product/spoken-english-junior-live-batch/",
  // },
  // {
  //   imgSrc:
  //     "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/SEJ_Live_Batch_new_2_1739180955021-6.png?",
  //   href: "/product/spoken-english-junior-live-batch/",
  // },
  // {
  //   imgSrc:
  //     "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/CEGC_1737226615398-9.jpg?",
  //   href: "/product/english-grammar-course/",
  // },
  // {
  //   imgSrc:
  //     "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/GBSE_%281%29_1737226645568-10.jpg?",
  //   href: "/product/ghore-boshe-spoken-english/",
  // },
];

const programCardData = [
  {
    title: "Kids' English",
    subtitle: "ভর্তি চলছে",
    imgSrc:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/kids-english-sqr-thumbnail-new-11.png?",
    href: "/en/product/kids-english-programme/",
  },
  {
    title: "Spoken English Junior",
    subtitle: "সকল ব্রাঞ্চে ভর্তি চলছে ",
    imgSrc:
      "https://cdn.10minuteschool.com/images/thumbnails/spoken-english-junior-sqr-thumbnail.png",
    href: "/spoken-english-junior-programme/",
  },
  {
    title: "Spoken English Junior LIVE ব্যাচ",
    subtitle: "সকল ব্যাচে ভর্তি চলছে ",
    imgSrc:
      "https://cdn.10minuteschool.com/images/catalog/media/sej-sqrt-thumbnial_1734278679106.jpg",
    href: "/junior-spoken-english-live-batch/",
  },
  {
    title: "Study Abroad",
    subtitle: "ফ্রী কন্সাল্টেসন বুক করুন",
    imgSrc:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/Study-Abroad-150_1755758870578-4.png?",
    href: "/en/product/study-abroad/",
  },
  {
    title: "Kids' English",
    subtitle: "ভর্তি চলছে",
    imgSrc:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/kids-english-sqr-thumbnail-new-11.png?",
    href: "/en/product/kids-english-programme/",
  },
];

const HeroSection = () => {
  return (
    <div className="bg-[#1a1b23] text-foreground py-10 bg-[url('https://cdn.10minuteschool.com/json/Background_Noise_1732776287934_1736059620396.png')]">
      <div className="px-2 md:container md:px-0 mx-auto">
        <div className="items-center justify-center hidden pb-10 md:flex h-[100px]">
          {/* <Image
            alt="শেখার যাত্রা শুরু এখানেই"
            src="https://cdn.10minuteschool.com/images/Frame_2147223622%402x_%281%29_1732776618989.png"
            width={616}
            height={200}
            className="w-auto h-auto"
          /> */} <h1 className="text-5xl"> ক্যারিয়ারকে এগিয়ে নিন — সঠিক কোর্স বেছে নিন!!</h1>
        </div>

        <div className="flex flex-col gap-10 md:flex-row md:gap-6">
          <div className="relative flex-1 min-w-0 bg-[linear-gradient(180deg,rgba(19,57,146,0.40)_0%,rgba(6,14,83,0.40)_100%)] rounded-[34px] border border-[#253A71] text-center px-4 md:px-6 pt-10 pb-4 md:pb-8">
            <h2 className="absolute text-[#2B72FF] border border-[#2B72FF] inline-block rounded-full px-[20px] py-[4px] bg-[#15275D] left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-sm md:text-base">
              অনলাইন কোর্স
            </h2>
            <h3 className="text-base md:text-2xl md:max-w-[360px] mb-4 mx-auto font-bengali">
              অনলাইন ব্যাচ ২০২৫ এর সকল কোর্সে ভর্তি চলছে!
            </h3>
            <div className="flex gap-2 pb-1 pr-1 mb-4 relative  flex-nowrap mx-auto overflow-x-auto scroll-smooth md:gap-4 md:mb-6">
              {/* {classCardData.map((card) => (
                <Link
                  href={card.link}
                  key={card.name}
                  className="group flex flex-shrink-0 w-[100px] md:w-[122px] lg:h-[129px] backdrop-blur-md cursor-pointer flex-col items-center justify-between rounded-2xl text-white bg-white/10 px-2 py-5 transition-all duration-300"
                >
                  <Image
                    alt={card.name}
                    src={card.imgSrc}
                    width={65}
                    height={65}
                    className="max-w-[40px] md:max-w-[65px]"
                  />
                  <h4 className="text-xs text-center md:text-base whitespace-nowrap font-bengali">
                    {card.name}
                  </h4>
                </Link>
              ))} */}
              {skillCardData.map((card, index) => (
                  <Link
                    key={index}
                    className="w-auto flex-shrink-0"
                    href="/categories/language-learning"
                  >
                    <Image
                      alt={`Skill course ${index + 1}`}
                      src={card.imgSrc}
                      width={282}
                      height={399}
                      className="transition-all duration-300 rounded-md shadow-lg hover:shadow-xl"
                    />
                  </Link>
                ))}
            </div>
            <div className="flex items-center justify-center gap-6">
              <Link
                className="flex items-center gap-1 text-primary hover:underline font-bengali"
                href="/categories/language-learning"
              >
                অনলাইনে কোর্স করতে এখনই এনরোল করুন
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative flex-1 min-w-0 bg-[linear-gradient(180deg,rgba(150,96,20,0.40)_0%,rgba(59,37,6,0.40)_100%)] rounded-[34px] border border-[#64523D] text-center px-6 pt-10 pb-4 md:pb-8">
            <h2 className="absolute text-[#F29D1F] border border-[#F29D1F] inline-block rounded-full px-[20px] py-[4px] bg-[#583112] left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-sm md:text-base">
             অফলাইনে কোর্স
            </h2>
            <h3 className="text-base md:text-2xl max-w-[360px] mb-4 mx-auto font-bengali">
              পছন্দের স্কিল শিখুন, নিজেকে সেরা করে গড়ে তুলুন
            </h3>
            <div className="mb-4 md:mb-6">
              <div className="relative flex flex-nowrap gap-4 overflow-x-auto scroll-smooth">
                {skillCardData.map((card, index) => (
                  <Link
                    key={index}
                    className="w-auto flex-shrink-0"
                    href={card.href}
                  >
                    <Image
                      alt={`Skill course ${index + 1}`}
                      src={card.imgSrc}
                      width={282}
                      height={399}
                      className="transition-all duration-300 rounded-md shadow-lg hover:shadow-xl"
                    />
                  </Link>
                ))}
              </div>
            </div>
            <Link
              className="flex items-center justify-center gap-1 text-primary hover:underline font-bengali"
              href="/categories/language-learning"
            >
             অফলাইনে কোর্স করতে বুক করুন {" "}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto relative flex flex-nowrap gap-4 overflow-x-auto scroll-smooth  px-4 py-10 mt-4">
        <CoursesFetcher>
      {({ loading, err, courses }) => (
        <section className="">
          <div className="">
            {/* Loading State: Skeletons */}
            {loading ? (
              <div className="flex gap-6 pb-4 -mx-4 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center flex-shrink-0 w-4/5 gap-3 px-4 py-3 transition-colors bg-card/60 hover:bg-card/90 rounded-lg sm:w-auto sm:min-w-[300px] md:min-w-[320px]"
                  />
                ))}
              </div>
            ) : err ? (
              <div className="text-center py-12">
                <p className="text-red-600 font-semibold">কোর্স লোড হয়নি</p>
                <p className="text-gray-600">{err}</p>
              </div>
            ) : (
              // Displaying Courses Dynamically
              <div className="flex gap-6 pb-4 -mx-4 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                {courses.map((course: UiCourse, index: number) => (
                  // <Link
                  //   key={index}
                  //   href={course.link}
                  //   className="flex items-center flex-shrink-0 w-4/5 gap-3 px-4 py-3 transition-colors bg-card/60 hover:bg-card/90 rounded-lg sm:w-auto sm:min-w-[300px] md:min-w-[320px]"
                  // >
                  //   <div className="h-[50px] w-[50px] flex-shrink-0">
                  //     <Image
                  //       alt={course.title}
                  //       src={course.imageUrl}
                  //       width={50}
                  //       height={50}
                  //       className="rounded-lg"
                  //     />
                  //   </div>
                  //   <div className="flex-1">
                  //     <h4 className="text-sm font-semibold text-foreground">
                  //       {course.title}
                  //     </h4>
                  //     <p className="text-xs text-muted-foreground font-bengali">
                  //       {course.subtitle || "No subtitle"}
                  //     </p>
                  //   </div>
                  //   <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  // </Link>

                  <Link
            key={course.title}
            href={course.link}
            className="flex items-center flex-shrink-0 w-4/5 gap-3 px-4 py-3 transition-colors bg-card/60 hover:bg-card/90 rounded-lg sm:w-auto sm:min-w-[300px] md:min-w-[320px] "
          >
            <div className="h-[50px] w-[50px] flex-shrink-0">
              <Image
                alt={course.title}
                src={course.imageUrl}
                width={50}
                height={50}
                className="rounded-lg h-[50px] w-[50px]"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground">
                {course.title}
              </h4>
              <p className="text-xs text-muted-foreground font-bengali">
               ভর্তি চলছে
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </CoursesFetcher>
      </div>

      <OfflineCenters />
    </div>
  );
};

export default HeroSection;