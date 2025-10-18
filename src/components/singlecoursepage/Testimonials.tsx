"use client";

import * as React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Testimonial {
  review: string;
  avatar: string;
  name: string;
  role: string;
}

const testimonialsData: Testimonial[] = [
  {
    review: "আমি আমার জীবনকে নতুনভাবে সাজানোর প্রেরণা পেয়েছি এই কোর্সের মাধ্যমে।",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/icons/user1-10.png",
    name: "Pronab Kumar Biswas",
    role: "শিক্ষার্থী",
  },
  {
    review: "It was a great course, definitely under the best teacher. But in the future, whenever I face any problem, I want to communicate with Tisat Apu for her valuable suggestion.",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/icons/user2-11.png",
    name: "Tanjila Ahmed",
    role: "শিক্ষার্থী",
  },
  {
    review: "Mentor is highly knowledgeable, but I cannot talk or discuss my problems with my mentor, though there is a group. The group is hardly responsive.",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/icons/user1-10.png",
    name: "Md Sabuz Hossain",
    role: "শিক্ষার্থী",
  },
  {
    review: "I like it very much. I have confidence that I can do Freelancing now.",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/icons/user1-10.png",
    name: "Rabindranath Roy",
    role: "শিক্ষার্থী",
  },
    {
    review: "Every word of the speeches of Tia Apu in this course is very important. Thanks a lot.",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/icons/user1-10.png",
    name: "Shimul Chowdhury",
    role: "শিক্ষার্থী",
  },
  {
    review: "আলহামদুলিললাহ খুব ভালোভাবেই কোর্সটি সম্পন্ন করতে পেরেছি। খুবই সুন্দর এবং সহজভাবে বুঝিয়েছেন আপু। অসংখ্য ধন্যবাদ এই কোর্সটি শেখানোর জন্য।",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/icons/user2-11.png",
    name: "Samiya Hashem Arpa",
    role: "Student",
  },
];


const QuoteIcon = () => (
  <span className="mb-4 inline-block h-9 w-9">
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="17" r="17" fill="#FFEBEB"/>
      <path d="M12.9141 21.0156C13.6328 21.0156 14.1641 20.4844 14.1641 19.7969C14.1641 19.4531 14.0469 19.0469 13.8438 18.6719C14.5938 18.2969 15.0156 17.5469 15.0156 16.7031C15.0156 15.1406 13.8125 14.0312 12.1094 14.0312C10.25 14.0312 9 15.2812 9 17.1406C9 19.25 10.6875 21.0156 12.9141 21.0156ZM12.1719 15.3906C12.8281 15.3906 13.2812 15.8438 13.2812 16.5938C13.2812 17.3438 12.7969 17.7656 12.1406 17.7656C11.4531 17.7656 11.0312 17.2969 11.0312 16.5938C11.0312 15.9375 11.5156 15.3906 12.1719 15.3906Z M21.9141 21.0156C22.6328 21.0156 23.1641 20.4844 23.1641 19.7969C23.1641 19.4531 23.0469 19.0469 22.8438 18.6719C23.5938 18.2969 24.0156 17.5469 24.0156 16.7031C24.0156 15.1406 22.8125 14.0312 21.1094 14.0312C19.25 14.0312 18 15.2812 18 17.1406C18 19.25 19.6875 21.0156 21.9141 21.0156ZM21.1719 15.3906C21.8281 15.3906 22.2812 15.8438 22.2812 16.5938C22.2812 17.3438 21.7969 17.7656 21.1406 17.7656C20.4531 17.7656 20.0312 17.2969 20.0312 16.5938C20.0312 15.9375 20.5156 15.3906 21.1719 15.3906Z" fill="#F15152"/>
    </svg>
  </span>
);

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white pt-8 pb-12">
      <div className="">
        <h2 className="mb-6  text-gray-900  text-xl font-bold text-left md:text-2xl">
          শিক্ষার্থীরা যা বলছে
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative w-full"
        >
          <CarouselContent className="-ml-4 pb-4">
            {testimonialsData.map(({ review, avatar, name, role }, index) => (
              <CarouselItem key={index} className="pl-4 basis-auto min-w-[340px]">
                <div className="h-full p-1">
                  <div className="flex h-full min-h-[250px] flex-col justify-between rounded-lg border border-gray-300 p-5 ">
                    <div className="flex flex-grow flex-col">
                      <QuoteIcon />
                      <div className="mb-4 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="mb-6 flex-grow text-base text-gray-700">{review}</p>
                    </div>

                    <div className="mt-auto flex items-center">
                      <Image
                        src={avatar}
                        alt={name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-3">
                        <h3 className="text-base font-semibold text-gray-900">{name}</h3>
                        <p className="text-sm text-gray-500">{role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 disabled:hidden md:flex" />
          <CarouselNext className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 disabled:hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}