"use client";

import * as React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// ===== Types (match your API: course_review[]) =====
type Review = {
  id?: number;
  name?: string | null;
  desc?: string | null;    // review text
  star?: number | null;
  created_at?: string | null;
};

// —— Fallback content (UNCHANGED)
const fallback = [
  {
    name: "Tahiya Faiza",
    role: "Teaching Assistant, Brac University",
    quote:
      "কোর্সটির প্রতিটি সেকশনে ছিল স্পষ্ট নির্দেশনা । বিশেষ করে, “Reading” এবং “Writing” সেকশন এতটাই informative ছিল যা আমার জন্য Mock Test এবং Real Exam কে সহজ করে তুলেছিল। আমার সবচেয়ে ভালো লেগেছে “Writing Part”。",
  },
  {
    name: "Zakirul Islam",
    role: "Businessman",
    quote:
      "অফলাইনে শেখার মত সময় হয়ে উঠছিল না তাই অনলাইন কোর্স কে বেছে নেওয়া । কোর্সটিতে খুব সুন্দর করে হরফ তানভীন মাদ পড়ানো হয়েছে । খুব সহজেই প্রতিদিন প্র্যাকটিস করে খুব দ্রুত শুদ্ধ তেলাওয়াত আয়ত্ত করতে পেরেছি।",
  },
  {
    name: "Hasibur Rahman",
    role: "Online Business Owner",
    quote:
      "আমার একটি অনলাইন পেজ ছিল কিন্তু পেইজটিকে নিয়ে কিভাবে সামনে আগাবে কোন কিছু বুঝতে পারছিলাম না । কোর্সটি করার মাধ্যমে কিভাবে একটি বেসিক পোস্ট দিবো কিভাবে ইউজ করব কিভাবে কন্টাক্ট করবো শিখতে পেরেছি।",
  },
  {
    name: "Mushfik Jaman",
    role: "Class 8, Bedkashi Collegiate School, Khulna",
    quote:
      "টেন মিনিট স্কুলের অনলাইন ব্যাচে ইংরেজি ক্লাস করার পর ইংরেজি বিষয়ে আমি ৯০+ মার্কস পেয়েছি। এছাড়াও টেন মিনিট স্কুলের লাইভ চ্যাট, পোল এবং লিডারবোর্ড ফিচারটি চমৎকার যা আমাদের প্রতিনিয়ত পড়াশোনার আগ্রহ বাড়াতে সাহায্য করেছে।",
  },
  {
    name: "Miftahul Jannat",
    role: "Class 7",
    quote:
      "অনলাইন ব্যাচের ক্লাসের সবচেয়ে চমৎকার বিষয় হলো ক্লাসে পড়ানোর টেকনিক। প্রত্যেকটি শিক্ষক এত যত্ন করে ক্লাসগুলো করান যে আমার বাচ্চা ক্লাসগুলো খুব এঞ্জয় করে। পড়াশোনা এমন মজারই হওয়া দরকার! এছাড়া, মান্থলি এক্সাম, লেকচার শীট গুলো ও খুবই মানসম্মত।",
  },
];

export default function Testimonials({
  reviews,
  loading = false,
}: {
  reviews?: Review[] | null;
  loading?: boolean;
}) {
  // normalize incoming reviews -> {name, role, quote}
  const normalized =
    reviews
      ?.filter((r) => (r?.desc || "").trim().length > 0)
      .map((r) => ({
        name: r.name || "Anonymous",
        role: "Student", // role নেই API-তে, UI-consistent রাখতে ডিফল্ট
        quote: r.desc!.trim(),
      })) ?? [];

  const items = normalized.length > 0 ? normalized : fallback;

  // Skeleton card (same card wrappers/classes)
  const SkelCard = ({ i }: { i: number }) => (
    <CarouselItem key={`skel-${i}`} className="pl-4 md:basis-1/2 lg:basis-1/3">
      <div className="lg:p-1 h-full">
        <div className="flex flex-col border border-gray-200 rounded-xl p-6 h-full min-h-[320px]">
          <div className="mb-4 h-[25px] w-[32px] bg-gray-200 animate-pulse rounded" />
          <div className="flex-grow space-y-3 mb-6">
            <div className="h-3 w-full bg-gray-200 animate-pulse rounded" />
            <div className="h-3 w-5/6 bg-gray-200 animate-pulse rounded" />
            <div className="h-3 w-4/6 bg-gray-200 animate-pulse rounded" />
            <div className="h-3 w-3/6 bg-gray-200 animate-pulse rounded" />
          </div>
          <div className="flex items-center gap-4 mt-auto">
            <div className="rounded-full bg-gray-200 animate-pulse h-12 w-12" />
            <div className="space-y-2 w-2/3">
              <div className="h-3 w-1/2 bg-gray-200 animate-pulse rounded" />
              <div className="h-3 w-2/3 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    </CarouselItem>
  );

  return (
    <section className="bg-background text-foreground py-20 lg:px-4">
      <div className="container mx-auto max-w-7xl">
        <h2
          className="text-center text-3xl md:text-4xl font-bold mb-12 text-gray-700"
          style={{ fontFamily: "var(--font-bengali)" }}
        >
        আমাদের সম্মানিত ক্লাইন্টের রিভিউ
        </h2>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {loading
              ? [1, 2, 3].map((i) => <SkelCard key={i} i={i} />)
              : items.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="lg:p-1 h-full">
                      <div className="flex flex-col  border  border-gray-200 hover:border-green-300 rounded-xl p-6 h-full min-h-[320px]">
                        <Image
                          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/icons/1667372177810-5.png?"
                          alt="Quote icon"
                          width={32}
                          height={25}
                          className="mb-4"
                        />
                        <p
                          className="text-gray-800 mb-6 flex-grow"
                          style={{ fontFamily: "var(--font-bengali)" }}
                        >
                          {testimonial.quote}
                        </p>
                        <div className="flex items-center gap-4 mt-auto">
                          <Image
                            src="https://cdn.10minuteschool.com/images/1667372177810.png"
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="rounded-full object-cover"
                          />
                          <div>
                            <h3
                              className="font-semibold text-gray-800 text-base"
                              style={{ fontFamily: "var(--font-primary)" }}
                            >
                              {testimonial.name}
                            </h3>
                            <p
                              className="text-muted-foreground text-sm"
                              style={{ fontFamily: "var(--font-primary)" }}
                            >
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-6 bg-card border- hover:bg-card/80 text-foreground" />
          <CarouselNext className="hidden md:flex -right-6 bg-card border-border hover:bg-card/80 text-foreground" />
        </Carousel>
      </div>
    </section>
  );
}
