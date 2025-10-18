"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ---------- Types ----------
type DetailSection = {
  value?: string;           // optional unique id for accordion
  trigger: string;          // heading text
  html?: string;            // raw HTML (optional)
  bullets?: string[];       // bullet list (optional)
};
type CourseDetailsData =
  | { sections: DetailSection[] }                                   // option A
  | { course_details_faqs: { questions: string; answear: string }[] } // option B
  | { questions: string; answear: string }[];                         // option C (array directly)

// ---------- Fallback (UNCHANGED ORIGINAL CONTENT) ----------
const fallback = [
  {
    value: "item-1",
    trigger: "Email Marketing Course-টি যাদের জন্য",
    content: (
      <ul className="list-disc pl-5 space-y-2 text-muted-foreground  text-sm lg:text-base leading-relaxed">
        <li>কলেজ-বিশ্ববিদ্যালয়ে পড়ুয়া, যে কোন গ্রুপ/ ডিপার্টমেন্টের ছাত্র-ছাত্রী</li>
        <li>বিভিন্ন বয়স-শ্রেণির চাকুরিজীবী কিংবা ব্যবসায়ী</li>
        <li>চাকরি সন্ধানী কিংবা যারা শূন্য থেকে ক্যারিয়ার গড়ার কথা ভাবছেন</li>
        <li>যারা অবসর সময়কে কাজে লাগিয়ে বাড়তি আয় করতে চান</li>
        <li>যারা সহজ একটা স্কিল শিখে, টেকনিক্যাল ঝামেলা ছাড়া ফ্রিল্যান্সিং শিখে পড়াশুনা বা চাকরির পাশাপাশি আয় করতে চান, কিংবা ফ্রিল্যান্সিং সেক্টরে ক্যারিয়ার গড়তে চান</li>
      </ul>
    ),
  },
  {
    value: "item-2",
    trigger: "Email Marketing Course-টির ডিফিকাল্টি লেভেল (কাঠিন্য মাত্রা):",
    content: (
      <div className="space-y-2 text-muted-foreground text-sm lg:text-base leading-relaxed">
        <p><strong className="text-foreground">বেসিক টু ইন্টারমেডিয়েট</strong></p>
        <p>অর্থাৎ, শূন্য থেকে শুরু করে প্রফেশনাল ইমেইল মার্কেটার হওয়ার গাইডলাইন</p>
      </div>
    ),
  },
  {
    value: "item-3",
    trigger: "Email Marketing Course-টি কমপ্লিট করে আপনি কী কী করতে পারবেন?",
    content: (
      <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm lg:text-base leading-relaxed">
        <li>একজন প্রফেশনাল ইমেইল মার্কেটার বা ইমেইল মার্কেটিং এক্সপার্ট হতে পারবেন</li>
        <li>যে কোন অনলাইন ও অফলাইন প্রতিষ্ঠানের জন্য Email Marketing-এর কমপ্লিট সার্ভিস দিতে পারবেন</li>
        <li>বিভিন্ন অনলাইন মার্কেটপ্লেসে ফ্রিল্যান্সিং করে টাকা আয় করতে পারবেন</li>
        <li>ডিজিটাল মার্কেটিং এজেন্সিতে চাকরি করতে পারবেন</li>
      </ul>
    ),
  },
  {
    value: "item-4",
    trigger: "কেন Email Marketing Course-টি করবেন?",
    content: (
      <div className="space-y-4 text-muted-foreground text-sm lg:text-base leading-relaxed">
        <p>স্বল্প আয়, দ্রব্য মূল্যের ঊর্ধ্বগতি ... অনলাইন জগতে ফ্রিল্যান্সিং করা।</p>
        <p>অনলাইন ডিজিটাল মার্কেটিং এর জগতে ইমেইল মার্কেটিং খুবই জনপ্রিয় ... একটি উত্তম সমাধান।</p>
      </div>
    ),
  },
  {
    value: "item-5",
    trigger: "Email Marketing Course-এর ইন্সট্রাক্টর সম্পর্কে বিস্তারিত:",
    content: (
      <div className="space-y-4 text-muted-foreground text-sm lg:text-base leading-relaxed">
        <p>... তিসাত ফাতেমা টিয়া ... Fiverr/Upwork ...</p>
        <p>৯ বছরেরও বেশী সময় ... ১০ হাজারেরও বেশী স্টুডেন্ট ...</p>
      </div>
    ),
  },
  {
    value: "item-6",
    trigger: "শেষ কথা:",
    content: (
      <div className="space-y-4 text-muted-foreground text-sm lg:text-base leading-relaxed">
        <p>আমাদের কারো ভাগ্য কখনোই পরিবর্তন হয়না ... এখনই এনরোল করুন ...</p>
      </div>
    ),
  },
];

// ---------- Component (DOM & classes UNCHANGED) ----------
export default function CourseDetails({
  coursedetails,
  loading = false,
}: {
  coursedetails?: CourseDetailsData | null;
  loading?: boolean;
}) {
  // --- Normalize multiple possible shapes to [{value, trigger, content}]
  let items:
    | { value: string; trigger: string; content: React.ReactNode }[]
    | null = null;

  if (coursedetails) {
    // A) sections shape
    if ("sections" in coursedetails && Array.isArray(coursedetails.sections)) {
      items = coursedetails.sections.map((s, i) => {
        const value = s.value ?? `item-${i + 1}`;
        const content = s.html ? (
          <div
            className="space-y-4 text-muted-foreground text-sm lg:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: s.html }}
          />
        ) : s.bullets?.length ? (
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground  text-sm lg:text-base leading-relaxed">
            {s.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
          </ul>
        ) : (
          <div className="space-y-2">
            <div className="h-3 w-5/6 bg-gray-200 rounded" />
            <div className="h-3 w-4/6 bg-gray-200 rounded" />
          </div>
        );
        return { value, trigger: s.trigger, content };
      });
    }
    // B) course_details_faqs on object
    else if ("course_details_faqs" in coursedetails && Array.isArray((coursedetails as any).course_details_faqs)) {
      const arr = (coursedetails as any).course_details_faqs as { questions: string; answear: string }[];
      items = arr.map((d, i) => ({
        value: `item-${i + 1}`,
        trigger: d.questions,
        content: (
          <div
            className="space-y-4 text-muted-foreground text-sm lg:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: d.answear || "" }}
          />
        ),
      }));
    }
    // C) passed directly as array of {questions, answear}
    else if (Array.isArray(coursedetails)) {
      items = (coursedetails as any[]).map((d, i) => ({
        value: `item-${i + 1}`,
        trigger: d.questions,
        content: (
          <div
            className="space-y-4 text-muted-foreground text-sm lg:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: d.answear || "" }}
          />
        ),
      }));
    }
  }

  // fallback if nothing valid
  const finalItems = items && items.length ? items : fallback;

  // Skeleton (same wrapper/classes)
  const skeleton = (
    <div className=" rounded-lg md:border border-gray-200 ">
      <Accordion type="single" collapsible className="w-full" defaultValue="skel-1">
        {[1, 2, 3].map((i) => (
          <AccordionItem
            value={`skel-${i}`}
            key={i}
            className="border-b border-dashed border-gray-300 last:border-b-0"
          >
            <AccordionTrigger className="text-left text-sm lg:text-base font-bold text-gray-900 hover:no-underline py-4 px-2 md:px-4">
              <span className="inline-block h-4 w-44 bg-gray-200 animate-pulse rounded" />
            </AccordionTrigger>
            <AccordionContent className="px-2 md:px-4 text-gray-200 pb-4">
              <div className="space-y-2">
                <div className="h-3 w-5/6 bg-gray-200 animate-pulse rounded" />
                <div className="h-3 w-4/6 bg-gray-200 animate-pulse rounded" />
                <div className="h-3 w-3/6 bg-gray-200 animate-pulse rounded" />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );

  return (
    <section className=" ">
      <div className="">
        <div className="mb-8">
          <h2 className="mb-4  text-gray-900  text-xl font-bold text-left md:text-2xl">
            কোর্স সম্পর্কে বিস্তারিত
          </h2>
        </div>

        {loading ? (
          skeleton
        ) : (
          <div className=" rounded-lg md:border border-gray-200 ">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue={finalItems[0]?.value ?? "item-1"}
            >
              {finalItems.map((item) => (
                <AccordionItem
                  value={item.value}
                  key={item.value}
                  className="border-b border-dashed border-gray-300 last:border-b-0"
                >
                  <AccordionTrigger className="text-left text-sm lg:text-base font-bold text-gray-900 hover:no-underline py-4 px-2 md:px-4">
                    {item.trigger}
                  </AccordionTrigger>
                  <AccordionContent className="px-2 md:px-4 text-gray-200 pb-4">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </section>
  );
}
