"use client";

import Image from "next/image";
import { CheckCircle2, Clock, Users, PlayCircle, Star, ChevronRight, ShieldCheck, CreditCard, RefreshCcw, BadgeCheck, ArrowRight } from "lucide-react";

export const IELTSProduct = () => {
  return (
    <section className="bg-background text-foreground">
      {/* Hero */}
      <div className="container mx-auto px-4 pt-10 md:pt-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.5fr_1fr]">
          <div>
            {/* breadcrumb */}
            <nav className="text-xs text-muted-foreground">
              <a href="/categories/language-learning" className="hover:text-foreground">ভাষা শিক্ষা</a>
              <span className="px-2">/</span>
              <span>IELTS</span>
            </nav>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Language Learning • IELTS
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              IELTS Course by Munzereen Shahid
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              সম্পূর্ণ বিগিনার থেকে ব্যান্ড ৭+ লক্ষ্যে পৌঁছাতে সাজানো ১০০% অনলাইন IELTS কোর্স।
              ভিডিও লেসন, প্র্যাকটিস, মক টেস্ট—সব এক জায়গায়।
            </p>

            {/* Meta badges */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-md bg-card px-3 py-1"><Clock className="h-4 w-4"/> 60+ ঘন্টা</span>
              <span className="inline-flex items-center gap-2 rounded-md bg-card px-3 py-1"><Users className="h-4 w-4"/> ৫০,০০০+ শিক্ষার্থী</span>
              <span className="inline-flex items-center gap-2 rounded-md bg-card px-3 py-1"><PlayCircle className="h-4 w-4"/> ২০০+ ভিডিও</span>
              <span className="inline-flex items-center gap-2 rounded-md bg-card px-3 py-1"><Star className="h-4 w-4"/> 4.9/5 রেটিং</span>
            </div>

            {/* Guarantees / Includes */}
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1"><ShieldCheck className="h-3.5 w-3.5 text-primary"/> লাইফটাইম এক্সেস</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1"><BadgeCheck className="h-3.5 w-3.5 text-primary"/> সার্টিফিকেট</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1"><RefreshCcw className="h-3.5 w-3.5 text-primary"/> রিফান্ড গ্যারান্টি</span>
            </div>

            {/* What you'll learn */}
            <div className="mt-8 rounded-lg border border-border bg-card p-4 md:p-6">
              <h3 className="text-lg font-semibold">কোর্স থেকে যা যা শিখবেন</h3>
              <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-muted-foreground md:grid-cols-2">
                {[
                  "Listening section-এ স্কোর বাড়ানোর কৌশল",
                  "Reading passage দ্রুত পড়ে উত্তর বের করা",
                  "Writing Task 1 & 2 এর complete structure",
                  "Speaking-এ fluency ও vocabulary বাড়ানো",
                  "ফুললেংথ মক টেস্ট ও ফিডব্যাক",
                  "প্রতিটি module-এর common mistakes এড়ানো",
                ].map((item) => (
                  <li key={item} className="inline-flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Purchase Card */}
          <aside className="md:sticky md:top-24">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative aspect-video w-full">
                <Image
                  src="https://cdn.10minuteschool.com/images/thumbnails/IELTS_new_16_9.png"
                  alt="IELTS Course"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className="p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">৳ ৩,৯৯০</div>
                    <div className="text-xs text-muted-foreground line-through">৳ ৬,৯৯০</div>
                  </div>
                  <div className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium text-green-400">
                    ৪৩% ছাড় চলছে
                  </div>
                </div>
                <a
                  href="#enroll"
                  className="mt-4 block w-full rounded-lg bg-primary px-5 py-3 text-center font-semibold text-white hover:bg-primary/90"
                >
                  এখনই ভর্তি হোন
                </a>
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span>সারা জীবন এক্সেস</span>
                  <span>•</span>
                  <span>সার্টিফিকেট</span>
                  <span>•</span>
                  <span>রিফান্ড গ্যারান্টি</span>
                </div>
                {/* EMI / Payment note */}
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  <span>কিস্তিতে পরিশোধ সুবিধা</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Instructor */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 items-center gap-6 rounded-xl border border-border bg-secondary-dark p-6 md:grid-cols-[auto_1fr]">
          <div className="relative h-24 w-24 overflow-hidden rounded-full">
            <Image src="https://cdn.10minuteschool.com/images/instructors/munzereen-shahid-1735798730427.png" alt="Munzereen Shahid" fill className="object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">কোর্স ইন্সট্রাক্টর: মুনজেরিন শহীদ</h3>
            <p className="mt-2 text-muted-foreground">
              অক্সফোর্ড ইউনিভার্সিটি থেকে মাস্টার্স। বাংলাদেশে ইংরেজি শেখানোর ক্ষেত্রে সবচেয়ে জনপ্রিয় ইন্সট্রাক্টরদের একজন।
            </p>
          </div>
        </div>
      </div>

      {/* Curriculum snapshot */}
      <div className="container mx-auto px-4 pb-12 md:pb-16">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">কারিকুলামের সংক্ষিপ্তসার</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                title: "Listening Mastery",
                items: ["Question types & traps", "Note completion", "Map & diagram"]
              },
              {
                title: "Reading Strategies",
                items: ["Skimming & scanning", "True/False/Not Given", "Matching headings"]
              },
              {
                title: "Writing Task 1 & 2",
                items: ["Graphs & charts", "Essay structures", "Band descriptors"]
              },
              {
                title: "Speaking Excellence",
                items: ["Part 1-3 frameworks", "Cue card practice", "Pronunciation & fluency"]
              }
            ].map((sec) => (
              <div key={sec.title} className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{sec.title}</h4>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {sec.items.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right text-sm text-accent">
            সম্পূর্ণ সিলেবাস দেখতে স্ক্রল করুন
          </div>
        </div>
      </div>

      {/* Reviews strip */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 md:flex-row">
          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="font-medium">4.9/5</span>
            <span className="text-muted-foreground">(১২,৫০০+ রিভিউ)</span>
          </div>
          <div className="flex -space-x-3">
            {/* simple avatar group using course image crop placeholders */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted" />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">৫০,০০০+ শিক্ষার্থীর আস্থা</div>
        </div>
      </div>

      {/* What's inside + Who for */}
      <div className="container mx-auto px-4 pb-12 md:pb-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold">কোর্সে যা যা রয়েছে</h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-muted-foreground">
              {[
                "২০০+ HD ভিডিও লেসন",
                "মডিউলভিত্তিক কুইজ ও প্র্যাকটিস",
                "ফুল-লেংথ মক টেস্ট",
                "ব্যান্ড ৭+ টার্গেট স্টাডি-প্ল্যান",
                "ডাউনলোডেবল রিসোর্স",
                "লাইফটাইম এক্সেস ও আপডেট",
              ].map((f) => (
                <li key={f} className="inline-flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold">কার জন্য উপযোগী</h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-muted-foreground">
              {[
                "IELTS একদম নতুনদের জন্য",
                "ব্যান্ড ৬ থেকে ৭+ এ যেতে চান যারা",
                "Listening/Reading-এ বারবার ভুল হয় যাদের",
                "Writing Task-এ কাঠামো পরিষ্কার নয়",
                "Speaking-এ fluency ও vocabulary কম",
              ].map((w) => (
                <li key={w} className="inline-flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Syllabus (Accordion) */}
      <div className="container mx-auto px-4 pb-12 md:pb-16">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">পূর্ণ সিলেবাস</h3>
          <div className="mt-4 divide-y divide-border">
            {[
              { title: "Module 1: IELTS Overview & Study Plan", lessons: ["Exam format & bands", "Target setting", "Study planner"] },
              { title: "Module 2: Listening", lessons: ["Question types", "Common traps", "Timed practice"] },
              { title: "Module 3: Reading", lessons: ["Skim/scan drills", "TFNG & YNNG", "Matching headings"] },
              { title: "Module 4: Writing", lessons: ["Task 1 visuals", "Task 2 essays", "Samples & feedback"] },
              { title: "Module 5: Speaking", lessons: ["Part 1-3 frameworks", "Cue cards", "Pronunciation"] },
              { title: "Module 6: Mock Tests", lessons: ["Full-length test 1", "Full-length test 2", "Review & strategy"] },
            ].map((m, idx) => (
              <details key={m.title} className="group py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-base font-medium">
                  <span>{m.title}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-90" />
                </summary>
                <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-muted-foreground md:grid-cols-2">
                  {m.lessons.map((l) => (
                    <li key={l} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {l}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="container mx-auto px-4 pb-28 md:pb-20" id="enroll">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">প্রায় জিজ্ঞাসিত প্রশ্ন</h3>
          <div className="mt-4 space-y-4">
            {[
              {
                q: "কোর্সে কতদিন এক্সেস থাকবে?",
                a: "এই কোর্সের এক্সেস লাইফ-টাইম। যেকোনো সময় ফিরে এসে পড়তে পারবেন।",
              },
              {
                q: "সার্টিফিকেট কি পাবো?",
                a: "হ্যাঁ, কোর্স সম্পন্ন করলে ডিজিটাল সার্টিফিকেট প্রদান করা হবে।",
              },
              {
                q: "রিফান্ড পলিসি কী?",
                a: "কোর্সে অসন্তুষ্ট হলে নির্দিষ্ট শর্তসাপেক্ষে রিফান্ড পাওয়া যাবে।",
              },
            ].map((f) => (
              <div key={f.q} className="rounded-lg border border-border bg-background p-4">
                <div className="font-medium">{f.q}</div>
                <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/90 backdrop-blur md:hidden">
        <div className="container flex items-center justify-between gap-3 py-3">
          <div>
            <div className="text-sm text-muted-foreground line-through">৳ ৬,৯৯০</div>
            <div className="-mt-1 text-xl font-semibold text-white">৳ ৩,৯৯০</div>
          </div>
          <a href="#enroll" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white">
            এখনই ভর্তি হোন <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Desktop sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-border bg-card/90 backdrop-blur md:block">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-end gap-3">
            <span className="text-sm text-muted-foreground line-through">৳ ৬,৯৯০</span>
            <span className="-mt-1 text-2xl font-semibold text-white">৳ ৩,৯৯০</span>
            <span className="rounded-full bg-green-500/15 px-2.5 py-1 text-xs font-medium text-green-400">৪৩% ছাড়</span>
          </div>
          <a href="#enroll" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-primary/90">
            এখনই ভর্তি হোন <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};