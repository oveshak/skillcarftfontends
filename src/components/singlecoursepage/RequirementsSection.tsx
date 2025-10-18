"use client";
import { Check } from "lucide-react";
import React from "react";

// ====== Types ======
type Prerequisite = {
  id?: number;
  title: string;
  status?: boolean;
  is_deleted?: boolean;
};

export default function RequirementsSection({
  prerequisites,
  loading = false,
}: {
  prerequisites?: Prerequisite[] | null;
  loading?: boolean;
}) {
  // ফিল্টার করা (active) প্রয়োজনীয়তা
  const requirements =
    prerequisites?.filter(
      (item) =>
        (item.title || "").trim().length > 0 &&
        item.status !== false &&
        !item.is_deleted
    )?.map((i) => i.title) ?? [
      "ইন্টারনেট সংযোগ (ওয়াইফাই বা মোবাইল ইন্টারনেট)",
      "স্মার্টফোন অথবা পিসি",
    ];

  // skeleton design (unchanged DOM)
  const SkelLine = () => (
    <p className="mb-4 flex items-start gap-3 text-base text-[#4A4A4A] last:mb-0">
      <span className="inline-block flex-shrink-0 pt-1">
        <Check className="h-5 w-5 text-gray-300" strokeWidth={2} />
      </span>
      <span className="h-3 w-2/3 bg-gray-200 animate-pulse rounded" />
    </p>
  );

  return (
    <div className="bg-white pb-10">
      <div className="">
        <div className="">
          <div className="flex flex-col gap-10 md:gap-12">
            {/* Requirements Section */}
            <div>
              <h2 className="mb-6 text-gray-900 text-xl font-bold text-left md:text-2xl">
                ক্লাস করার জন্য প্রয়োজন হবে
              </h2>
              <div>
                {loading ? (
                  <>
                    <SkelLine />
                    <SkelLine />
                  </>
                ) : (
                  requirements.map((item, index) => (
                    <p
                      key={index}
                      className="mb-4 flex items-start gap-3 text-base text-[#4A4A4A] last:mb-0"
                    >
                      <span className="inline-block flex-shrink-0 pt-1">
                        <Check className="h-5 w-5 text-primary" strokeWidth={2} />
                      </span>
                      <span>{item}</span>
                    </p>
                  ))
                )}
              </div>
            </div>

            {/* Payment Instructions Section */}
            <div>
              <h2 className="mb-6 text-gray-900 text-xl font-bold text-left md:text-2xl">
                যেভাবে পেমেন্ট করবেন
              </h2>
              <div className="rounded-md md:border border-gray-300 md:px-4 py-3 text-base text-[#4A4A4A]">
                <p className="mb-0">
                  <span className="text-gray-700">
                    কীভাবে পেমেন্ট করবেন তা বিস্তারিত জানতে এই{" "}
                  </span>
                  <button className="font-medium text-primary underline">
                    ভিডিওটি দেখুন
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
