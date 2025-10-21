"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone } from "lucide-react";
import Link from "next/link";

// ---- API টাইপ (minimal) ----
type Faq = {
  id?: number;
  questions: string;        // text
  answear: string;          // HTML string
  status?: boolean;
  is_deleted?: boolean;
};

// ---- আগের static fallback (unchanged) ----
const fallbackFaqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: "কোর্সটি কিনে কিভাবে শুরু করবো?",
    answer: (
      <div className="space-y-4 text-gray-800">
        <p>১) 'কোর্সটি কিনুন' বাটনে ক্লিক করুন</p>
        <p>২) 'শুরু করুন' বাটনে ক্লিক করুন</p>
        <p>৩) আপনার ফোন নম্বর বা ইমেইল দিয়ে লগ-ইন করুন</p>
        <p>৪) লগ-ইন করা হয়ে গেলে 'এগিয়ে যান' বাটনে ক্লিক করুন</p>
        <p>৫) আপনার পছন্দের পেমেন্ট মাধ্যমটি বেছে নিন এবং 'পেমেন্ট করুন' বাটনে ক্লিক করুন</p>
        <div className="pl-6 space-y-2">
          <p>বিকাশে পেমেন্ট-এর ক্ষেত্রে:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>পেমেন্ট মাধ্যম থেকে 'বিকাশ' বেছে নিন। ভবিষ্যৎ ব্যবহারের জন্য আপনি চাইলে বিকশ নম্বরটি সেইভ করে রাখতে পারবেন।</li>
            <li>'পেমেন্ট করুন' বাটনে ক্লিক করুন। আপনাকে বিকাশ পেমেন্ট গেটওয়েতে নিয়ে যাওয়া হবে</li>
            <li>আপনার বিকাশ নম্বর এবং পিন নম্বর দিয়ে কনফার্ম করুন, আপনার পেমেন্ট সম্পূর্ণ নিরাপদ</li>
            <li>
              বিকাশ পেমেন্ট সম্পর্কে আরও জানতে ভিডিওটি দেখতে পারেন:{" "}
              <a
                href="https://youtu.be/5wfn60rmWX4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://youtu.be/5wfn60rmWX4
              </a>
            </li>
          </ul>
        </div>
        <p>৬) পেমেন্ট সম্পন্ন করার পর 'কোর্স শুরু করুন' বাটনে ক্লিক করলে সরাসরি আপনি কোর্সটি শুরু করতে পারবেন</p>
        <p>৭) আপনার কেনা কোর্সটি আপনার প্রোফাইলের 'আমার কোর্সসমূহ' সেকশনে দেখতে পাবেন</p>
        <p>৮) আপনার এনরোল করা সকল কোর্স এখানে পেয়ে যাবেন, সেক্ষেত্রে অবশ্যই আপনাকে লগইন করা থাকতে হবে</p>
        <p>
          আরো জানতে ভিডিওটি দেখুন:{" "}
          <a
            href="https://youtu.be/eDrXWrl-SOU"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            https://youtu.be/eDrXWrl-SOU
          </a>
        </p>
      </div>
    ),
  },
  {
    question:
      "যেকোনো টেকনিকাল সমস্যায় (পাসওয়ার্ড ভুলে যাওয়া, পাসওয়ার্ড পরিবর্তন, কোর্স রিফান্ড ইত্যাদি) কোথায় যোগাযোগ করবো?",
    answer: (
      <div className="space-y-4 text-muted-foreground">
        <div>
          <p className="font-semibold text-muted-foreground">১) পাসওয়ার্ড ভুলে গেলে/ পাসওয়ার্ড পরিবর্তন</p>
          <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
            <li>লগ-ইন করার সময় নিচে "Forget Password/পাসওয়ার্ড ভুলে গেছেন?" অপশনটিতে ক্লিক করুন</li>
            <li>আপনার ফোন নম্বর বা ইমেইলে পাওয়া 4 সংখ্যার OTP কোডটি লিখুন এবং 'সাবমিট' বাটন এ ক্লিক করুন</li>
            <li>এবার আপনার নতুন পাসওয়ার্ডটি দিয়ে 'সাবমিট' বাটন এ ক্লিক করুন।</li>
            <li>ভবিষ্যতে পাসওয়ার্ড পরিবর্তন করতে চাইলে আপনার প্রোফাইলের 'পাসওয়ার্ড পরিবর্তন করুন' অপশন থেকে পুনরায় নতুন পাসওয়ার্ড সেট করতে পারবেন।</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-muted-foreground">২) আপনি কোর্স কেনার পর রিফান্ড চাইলে</p>
          <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
            <li>কোর্সটি কেনার পর 48 ঘণ্টার মধ্যে 16910 নম্বরে কল করে রিফান্ড চাওয়ার কারণ সহ অ্যাপ্লাই করুন</li>
            <li>রিফান্ডের কারণের উপর ভিত্তি করে ৭ থেকে ১৪ কার্যদিবসের মধ্যে রিফান্ড করা হবে</li>
          </ul>
          <p className="mt-2">বিঃ দ্রঃ কোর্স কেনার পরে কোর্স ভালো লাগেনি কিংবা ম্যাটেরিয়ালস পছন্দ হয়নি - এরকম কারণে রিফান্ড করা হয় না।</p>
        </div>
        <div>
          <p className="font-semibold text-muted-foreground">এছাড়া, যেকোনো সমস্যার ক্ষেত্রে,</p>
          <p>কল করুনঃ 16910</p>
          <p>ইমেইল করুনঃ support@10minuteschool.com</p>
          <p>
            অথবা এই ফর্মটি পূরণ করুনঃ{" "}
            <a
              href="https://forms.gle/buwAfFXP8V6c7gbY7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://forms.gle/buwAfFXP8V6c7gbY7
            </a>
          </p>
        </div>
      </div>
    ),
  },
  {
    question: "টেন মিনিট স্কুলের পক্ষ থেকে কি কোনো কাজ দেওয়া হবে?",
    answer: (
      <p className="text-muted-foreground">
        জ্বি না। আপনাকে ফ্রিল্যাংন্সিং মার্কেটপ্লেসের গাইডলাইন অনুযায়ী নিজের পরিশ্রম ও দক্ষতার মাধ্যমে কাজ পেতে হবে।
        এই জার্নিতে যেকোনো সমস্যার সমাধান দিতে ফেসবুক সাপোর্ট গ্রুপের মাধ্যমে এক্সপার্ট টিচাররা যুক্ত থাকবে আপনার সাথে।
      </p>
    ),
  },
  {
    question: "সরাসরি ইন্সট্রাক্টর-এর সাথে যোগাযোগ করা যাবে?",
    answer: (
      <p className="text-muted-foreground">
        আপনাদের জন্য থাকবে একটি "ফেসবুক সাপোর্ট গ্রুপ" যেখানে কোর্স সম্পর্কিত যেকোনো সমস্যার সমাধান দিতে এক্সপার্ট টিচাররা
        যুক্ত থাকবে আপনার সাথে। এছাড়াও প্রতি সপ্তাহে Zoom ক্লাসে সরাসরি ইন্সট্রাক্টর-এর সাথে প্রবলেম সলভিং-এর সুযোগ রয়েছে।
      </p>
    ),
  },
  {
    question:
      "কোর্সের সার্টিফিকেট দিয়ে মার্কেটপ্লেসের প্রোফাইলে কি কোনো অ্যাডভান্টেজ পাওয়া যাবে?",
    answer: (
      <p className="text-muted-foreground">
        একজন ক্লায়েন্ট যখন একটা প্রোফাইলে সার্টিফিকেট দেখে তখন সেই প্রোফাইলকে অন্য আরেকটা প্রোফাইল যেটিতে সার্টিফিকেট নেই,
        সেটার থেকে অবশ্যই বেশি গুরুত্ব দিবে। তবে মাথায় রাখবেন, ফ্রিল্যান্সিং মার্কেটপ্লেসে আপনার কাজ পাওয়া নির্ভর করছে
        আপনার অধ্যবসায়, স্কিল এবং আপনি কতোটা অ্যাক্টিভলি মার্কেটপ্লেসে কাজ খুঁজছেন তার উপরে।
      </p>
    ),
  },
];

export default function FaqSection({
  faqs,
  loading = false,
}: {
  faqs?: Faq[] | null;
  loading?: boolean;
}) {
  // ইনপুট থেকে valid FAQ নাও
  const normalized =
    faqs
      ?.filter((f) => (f.questions || "").trim().length > 0 && !f.is_deleted && f.status !== false)
      .map((f) => ({
        question: f.questions,
        // answer HTML string → React via dangerouslySetInnerHTML
        answer: (
          <div
            className="space-y-4 text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: f.answear || "" }}
          />
        ),
      })) ?? null;

  const items = normalized && normalized.length > 0 ? normalized : fallbackFaqs;

  // Skeleton (same wrappers/classes)
  const skeleton = (
    <div className="rounded-lg md:border border-gray-200">
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        {[1, 2, 3].map((i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
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
    <div id="faq" className="py-3 ">
      <div className="">
        <h2 className="mb-6  text-gray-900  text-xl font-bold text-left md:text-2xl">
          সচরাচর জিজ্ঞাসা
        </h2>

        {loading ? (
          skeleton
        ) : (
          <div className="rounded-lg md:border border-gray-200">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              {items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index + 1}`}
                  className="border-b border-dashed border-gray-300 last:border-b-0"
                >
                  <AccordionTrigger className="text-left text-sm lg:text-base font-bold text-gray-900 hover:no-underline py-4 px-2 md:px-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-2 md:px-4 text-gray-200 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        <div className="mt-16 text-left">
          <h3 className="mb-6  text-gray-900  text-xl font-bold text-left md:text-2xl">
            আরও কোন জিজ্ঞাসা আছে?
          </h3>
          <Link
            href="tel:01926-917452"
            className="inline-flex border-gray-400 border-dashed items-center gap-2 rounded-md border hover:border-primary  p-4 text-primary font-semibold  "
          >
            <Phone className="h-5 w-5" />
            <span>কল করুন </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
