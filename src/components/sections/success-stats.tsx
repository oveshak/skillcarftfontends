"use client";

import { useState, useEffect, useRef } from "react";

const StatCounter = ({
  end,
  label,
  suffix,
}: {
  end: number;
  label: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const duration = 2000;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentCount = Math.floor(progress * end);
            
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end); // Ensure it ends on the exact value
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [end]);

  const formattedCount = count.toLocaleString("bn-BD");

  return (
    <div className="space-y-4" ref={ref}>
      <h2
        className="text-6xl font-black"
        style={{ fontFamily: "Hind Siliguri, sans-serif" }}
      >
        {formattedCount}
        {suffix}
      </h2>
      <p className="text-xl font-medium">{label}</p>
    </div>
  );
};

const SuccessStats = () => {
  return (
    <div
      className="bg-center bg-no-repeat bg-cover px-7 py-16 text-center text-white"
      style={{
        backgroundImage:
          "url('https://cdn.10minuteschool.com/images/admission_test_success_bg_1_1667232230107.png')",
      }}
    >
      <h2 className="mb-4 text-4xl font-bold">
        ২০২২-২৪ শিক্ষাবর্ষে টেন মিনিট স্কুলের এডমিশন সাফল্য
      </h2>
      <p className="mb-10 text-xl font-medium">তোমাদের সাফল্যই আমাদের অনুপ্রেরণা</p>
      <div className="grid grid-cols-1 gap-14 md:grid-cols-3">
        <StatCounter end={11868} label="মোট শিক্ষার্থী" />
        <StatCounter end={8312} label="চান্সপ্রাপ্ত শিক্ষার্থী" suffix="+" />
        <StatCounter end={32} label="টপ ১০০-তে চান্সপ্রাপ্ত শিক্ষার্থী" />
      </div>
    </div>
  );
};

export default SuccessStats;