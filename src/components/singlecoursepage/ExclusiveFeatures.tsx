"use client";
import Image from "next/image";
import React from "react";

type FeatureBullet = { id?: number; title: string; status?: boolean; is_deleted?: boolean };
type ExclusiveFeature = {
  id?: number;
  title?: string;
  image?: string;
  subtitle?: FeatureBullet[]; // bullets list
  status?: boolean;
  is_deleted?: boolean;
};

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    stroke="currentColor"
    fill="#1CAB55"
    strokeWidth="0"
    viewBox="0 0 16 16"
    className="text-[#1CAB55]"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path>
  </svg>
);

// —— static fallbacks (design unchanged)
const fallbackBullets = [
  "ফ্রিল্যান্সিং কী, কিভাবে ফ্রিল্যান্সিং করতে হয় তার প্র্যাক্টিক্যাল বর্ণনা",
  "হাতে-কলমে ইমেইল মার্কেটিং স্কিল ডেভেলপমেন্ট ও প্ল্যাটফর্ম অপারেশন শিক্ষা",
  "Fiverr এবং Upwork-এ ইমেইল মার্কেটিং করে ফ্রিল্যান্সিং করার পূর্ণাঙ্গ উপায় ও গাইডলাইন",
];
const fallbackImg =
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/images/Email_Marketing___Freelancing_E_book-removebg-preview_1725957828215-9.png";

export default function ExclusiveFeatures({
  feature,
  loading = false,
}: {
  feature?: ExclusiveFeature | null;
  loading?: boolean;
}) {
  const title =
    feature?.title ?? "Digital Book: ফ্রিল্যান্সিং এবং ইমেইল মার্কেটিং করে আয়";

  const bullets =
    feature?.subtitle?.filter((b) => (b.title || "").trim().length > 0 && b.status !== false && !b.is_deleted)
      .map((b) => b.title) ?? fallbackBullets;

  const imageSrc = feature?.image || fallbackImg;

  // simple skeleton lines matching layout (DOM wrapper/classes unchanged)
  const SkelLine = () => (
    <div className="mb-4">
      <div className="flex items-start">
        <div className="mr-2 mt-[5px] min-w-[15px]">
          <CheckIcon />
        </div>
        <div className="w-full">
          <div className="h-3 w-5/6 bg-gray-200 animate-pulse rounded mb-2" />
          <div className="h-3 w-3/5 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );

  return (
    <section id="course-exclusive-feature" className="bg-white">
      <div className=" py-8">
        <div className="px-0">
          <h2 className="mb-6  text-gray-900  text-xl font-bold text-left md:text-2xl">
            কোর্স এক্সক্লুসিভ ফিচার
          </h2>

          <div className="gap-4 rounded-lg border border-gray-300 px-4 py-8 md:grid lg:grid-cols-2 md:items-center">
            <div className="order-2 mb-8 md:order-1 md:mb-0">
              <h3 className="mb-4 text-lg font-semibold text-gray-700 xl:text-xl 2xl:text-2xl">
                {title}
              </h3>

              {loading
                ? (
                  <>
                    <SkelLine />
                    <SkelLine />
                    <SkelLine />
                  </>
                ) : (
                  bullets.map((text, index) => (
                    <div key={index}>
                      <div className="mb-4">
                        <div className="flex items-start">
                          <div className="mr-2 mt-[5px] min-w-[15px]">
                            <CheckIcon />
                          </div>
                          <p className="text-[#4a5568] text-sm lg:text-base">{text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
            </div>

            <div className="order-1 flex justify-center md:order-2">
              <Image
                src={imageSrc}
                alt={title}
                width={379}
                height={248}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
