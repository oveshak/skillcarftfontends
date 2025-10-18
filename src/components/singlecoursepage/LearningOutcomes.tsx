"use client";
import React from "react";

type Topic = { id?: number; title: string; status?: boolean; is_deleted?: boolean };

const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ——— Static fallbacks (unchanged content) ———
const fallbackCol1 = [
  "Email Marketing এর ফান্ডামেন্টালস থেকে শুরু করে এডভান্সড বিষয়াদি",
  "প্রফেশনাল কাজের জন্য কাস্টম ইমেইল টেমপ্লেট ডিজাইন তৈরি করা",
  "ফ্রিল্যান্সিং মার্কেটপ্লেস Upwork এবং Fiverr-এ একাউন্ট খোলা থেকে শুরু করে, প্রোফাইল সাজানো এবং ক্লায়েন্ট খুঁজে বের করার যথাযথ গাইডলাইন",
  "ইমেইল মার্কেটিং এবং ফ্রিল্যান্সিং সংক্রান্ত কিছু গোপন হ্যাকস এবং ইন্সট্রাক্টর স্পেশালিস্ট টিপস এন্ড ট্রিক্স",
];

const fallbackCol2 = [
  "ইমেইল মার্কেটিং এর সবচেয়ে বেশী ব্যবহৃত ও পপুলার প্ল্যাটফর্ম Mailchimp এবং Klaviyo এর সঠিক ব্যবহার",
  "ChatGPT দিয়ে Email Marketing-এর জন্য কন্টেন্ট লেখার কৌশল",
  "Freelancing সংক্রান্ত কাজ পাওয়া থেকে শুরু করে নিজের ব্যাংক একাউন্টে টাকা ট্রান্সফারের সকল গাইডলাইন",
];

export default function LearningOutcomes({
  topics,
  loading = false,
}: {
  topics?: Topic[];
  loading?: boolean;
}) {
  // filter valid topics if provided
  const valid = (topics || []).filter(t => (t.title || "").trim().length > 0 && !t.is_deleted && t.status !== false);

  // Split into 2 columns (keep exact DOM: two <ul>)
  const half = Math.ceil(valid.length / 2);
  const col1 = valid.length ? valid.slice(0, half).map(t => t.title) : fallbackCol1;
  const col2 = valid.length ? valid.slice(half).map(t => t.title) : fallbackCol2;

  // Skeleton items (same DOM structure; just shimmering text blocks)
  const skelItems = Array.from({ length: 4 }).map((_, i) => (
    <li key={`skel-${i}`} className="flex items-start text-base font-normal text-[#4B5563]">
      <span className="mr-4 flex-shrink-0 text-primary">
        <CheckIcon />
      </span>
      <span className="text-sm lg:text-base w-full">
        <span className="block h-3 rounded bg-gray-200 animate-pulse w-5/6 mb-2" />
        <span className="block h-3 rounded bg-gray-200 animate-pulse w-3/5" />
      </span>
    </li>
  ));

  return (
    <section id="learning-outcomes" className=" pb-6 md:pb-14">
      <div className="">
        <h2 className="mb-4  text-gray-900  text-xl font-bold text-left md:text-2xl">
          কোর্সটি করে যা শিখবেন
        </h2>

        <div className="rounded-lg border-[1.5px] border-gray-200 p-4  md:py-12">
          <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 md:gap-x-6">
            {/* Column 1 (unchanged DOM) */}
            <ul className="list-none space-y-4">
              {loading
                ? skelItems
                : col1.map((item, index) => (
                    <li
                      key={`col1-${index}`}
                      className="flex items-start text-base font-normal text-[#4B5563]"
                    >
                      <span className="mr-4 flex-shrink-0 text-primary">
                        <CheckIcon />
                      </span>
                      <span className="text-sm lg:text-base">{item}</span>
                    </li>
                  ))}
            </ul>

            {/* Column 2 (unchanged DOM) */}
            <ul className="list-none space-y-4">
              {loading
                ? skelItems
                : col2.map((item, index) => (
                    <li
                      key={`col2-${index}`}
                      className="flex items-start text-base font-normal text-[#4B5563]"
                    >
                      <span className="mr-4 flex-shrink-0 text-primary">
                        <CheckIcon />
                      </span>
                      <span className="text-sm lg:text-base">{item}</span>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
