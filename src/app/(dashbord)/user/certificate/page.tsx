'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import AuthGuard from '@/lib/hooks/isLogingNavigation/AuthGuard';

export default function CertificateVerification() {
  const [certificateName, setCertificateName] = useState('ove');
  const [submitted, setSubmitted] = useState(false);

  const isEmpty = useMemo(() => certificateName.trim().length === 0, [certificateName]);

  const handleConfirm = () => {
    if (isEmpty) return;
    setSubmitted(true);
    alert(`নাম কনফার্ম হয়েছে: ${certificateName}`);
  };

  return (
    <AuthGuard>
<div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Card */}
        <div className="p-0 sm:p-12 lg:p-16 mb-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Certificate Preview */}
            <div className="relative w-full">
              {/* Responsive, maintains shape without changing design */}
              <div className="relative w-full rounded-xl overflow-hidden">
                {/* aspect ratio: square on mobile, video-like on md+ for nicer preview */}
                <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-video bg-white/40">
                  <Image
                    src="https://app.10minuteschool.com/assets/images/skills/locked-certificate.svg"
                    alt="Certificate preview"
                    fill
                    priority={false}
                    loading="lazy"
                    className="object-contain opacity-90"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="certName"
                  className="block text-base sm:text-xl font-bold text-gray-900 mb-4"
                >
                  সার্টিফিকেটের জন্য নাম লিখুন
                </label>

                <div className="relative">
                  <input
                    type="text"
                    id="certName"
                    value={certificateName}
                    onChange={(e) => {
                      setCertificateName(e.target.value);
                      setSubmitted(false);
                    }}
                    className="text-gray-800 w-full px-4 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    placeholder="আপনার পূর্ণ নাম"
                    aria-describedby="nameHelp"
                    autoComplete="name"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    title="Quick edit"
                    onClick={() => {
                      if (!certificateName) setCertificateName('ove');
                    }}
                    aria-label="Quick edit"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                    </svg>
                  </button>
                </div>

                <p id="nameHelp" className="mt-2 text-sm text-gray-600">
                  দয়া করে আপনার সরকারি নথির মতো একই নাম লিখুন।
                </p>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                <p className="text-sm text-amber-800 leading-relaxed">
                  সার্টিফিকেটটি একবার তৈরি হয়ে গেলে পরে নাম পরিবর্তন করা যাবে না। তাই জমা দেওয়ার আগে বানান ভালোভাবে
                  মিলিয়ে নিন।
                </p>
              </div>

              {submitted && (
                <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                  নাম কনফার্ম করা হয়েছে।
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleConfirm}
                  disabled={isEmpty}
                  className={`px-8 py-2 sm:py-4 rounded-lg font-bold text-base sm:text-lg  transition-colors duration-200
                    ${isEmpty ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                >
                  সর্বশেষ কনফার্ম
                </button>

                <button
                  type="button"
                  onClick={() => setCertificateName('')}
                  className="px-6 py-2 sm:py-4 rounded-lg font-medium border-2 border-gray-300 hover:bg-gray-100 text-gray-800"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 lg:px-4">
            বর্তমানে আপনার কোনো সার্টিফিকেট নেই! আজই একটি কোর্স এনরোল করুন!
          </h2>
          <button className="px-8 py-3 sm:py-4 bg-gray-900 hover:bg-black text-white font-bold text-base sm:text-lg rounded-lg transition-colors duration-200 ">
            শুরু করুন
          </button>
        </div>
      </div>
    </div>

    </AuthGuard>
    
  );
}
