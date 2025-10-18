"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const items: { id: string; label: string }[] = [
  { id: "structure", label: "কোর্স স্ট্রাকচার" },
  { id: "instructor", label: "কোর্স ইন্সট্রাক্টর" },
  { id: "learning-outcomes", label: "যা শিখবেন" },
  { id: "details", label: "ডিটেইলস" },
  { id: "content", label: "কনটেন্ট" },
  { id: "features", label: "ফিচারস" },
  { id: "certificate", label: "সার্টিফিকেট" },
  { id: "testimonials", label: "রিভিউ" },
  { id: "requirements", label: "রিকোয়েরমেন্ট" },
  { id: "faq", label: "FAQ" },
  { id: "related", label: "রিলেটেড কোর্স" },
];

export const SectionNav: React.FC = () => {
  const [active, setActive] = React.useState<string>(items[0].id);
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActive(id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 1] }
    );

    const sectionEls = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as Element[];

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  const scrollBy = (dir: "left" | "right") => {
    const node = scrollerRef.current;
    if (!node) return;
    const delta = dir === "left" ? -240 : 240;
    node.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className=" top-20 z-30 ">
      <div className=" ">
        <div className="relative py-3">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollBy("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:inline-flex h-8 w-8 items-center justify-center rounded-full  bg-gray-400 shadow "
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div
            ref={scrollerRef}
            className="no-scrollbar flex overflow-x-auto scroll-smooth px-1 md:px-10"
          >
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={
                  "shrink-0 rounded-full  px-3  text-base transition-colors " +
                  (active === item.id
                    ? "  text-primary border-primary"
                    : " text-gray-500 hover:text-gray-600 ")
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollBy("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-400"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};