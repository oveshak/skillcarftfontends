"use client";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import React from "react";

// ===== Minimal types (তোমার API শেপের সাথে ম্যাচ করে) =====
type CertificateBullet = { id?: number; title: string; status?: boolean; is_deleted?: boolean };
type CourseCertificate = {
  id?: number;
  title?: string;               // section title optional (UI নীচে ব্যবহার করা হয়নি)
  image?: string;               // certificate image url
  subtitle?: CertificateBullet[]; // bullets array
  status?: boolean;
  is_deleted?: boolean;
};

export default function CertificateSection({
  certificate,
  loading = false,
}: {
  certificate?: CourseCertificate | null;
  loading?: boolean;
}) {
  // —— bullets: API থেকে এলে সেটা, নাহলে fallback (DOM অপরিবর্তিত)
  const bullets =
    certificate?.subtitle
      ?.filter(b => (b.title || "").trim().length > 0 && b.status !== false && !b.is_deleted)
      .map(b => b.title) ??
    [
      "আপনার সিভিতে যোগ করতে পারবেন",
      "লিংকডইন প্রোফাইলে সরাসরি শেয়ার করতে পারবেন",
      "ফেসবুকে এক ক্লিকেই শেয়ার করতে পারবেন",
    ];

  const imageSrc =
    certificate?.image ??
    "https://cdn.10minuteschool.com/images/catalog/product/certificate/10MS_Certificate_Design_-_Email_Marketing_%C3%A0%C2%A6%C2%95%C3%A0%C2%A6%C2%B0%C3%A0%C2%A7%C2%87_Freelancing_1732016609327.png";

  // —— simple skeleton (same wrapper/classes)
  const SkelRow = () => (
    <div className="mb-5 flex items-start gap-4">
      <CheckCircle className="h-6 w-6 flex-shrink-0 text-primary" aria-hidden="true" />
      <div className="h-3 w-3/4 bg-gray-200 animate-pulse rounded" />
    </div>
  );

  return (
    <div id="course-certificate" className="">
      <h2 className="mb-4  text-gray-900  text-xl font-bold text-left md:text-2xl">
        কোর্স সার্টিফিকেট
      </h2>

      <div className="rounded-lg border border-gray-300 p-4 flex flex-col xl:flex-row md:items-center md:gap-10 md:p-10">
        <div className="flex-1">
          <h3 className="mb-4 text-sm font-bold text-[#424242] lg:text-xl">
            কোর্সটি সফলভাবে শেষ করলে আপনার জন্য আছে সার্টিফিকেট যা আপনি-
          </h3>

          {loading ? (
            <>
              <SkelRow />
              <SkelRow />
              <SkelRow />
            </>
          ) : (
            bullets.map((text, i) => (
              <div key={i} className="mb-5 flex items-start gap-4">
                <CheckCircle className="h-6 w-6 flex-shrink-0 text-primary" aria-hidden="true" />
                <h3 className="mb-0 text-[14px] font-medium leading-[25px] text-gray-700 md:text-base">
                  {text}
                </h3>
              </div>
            ))
          )}
        </div>

        <div className="mt-6  md:mt-0 xl:w-1/2">
          <Image
            src={imageSrc}
            alt={certificate?.title || "Course certificate preview"}
            width={800}
            height={600}
            className="w-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
