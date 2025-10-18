"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CourseInfoSidebar from "./CourseInfoSidebar";
import RichText from "../layout/RichText";

type CourseType = {
  title?: string;
  intro_video_url?: string;
  description?: string;
};

// ---- helpers (YouTube embed) ----
function getYouTubeId(url?: string | null) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/watch")) return u.searchParams.get("v");
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/").pop() || null;
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/").pop() || null;
    }
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
  } catch {}
  return null;
}
function toEmbed(url?: string) {
  const id = getYouTubeId(url);
  return id
    ? `https://www.youtube.com/embed/${id}?autoplay=0&mute=1&controls=1&rel=0`
    : (url ?? "");
}

// ---- Mobile-only single intro video (no gallery) ----
const MobileIntroPlayer: React.FC<{ introUrl?: string }> = ({ introUrl }) => {
  const src = toEmbed(introUrl);
  if (!src) return null;
  return (
    <div className="w-full">
      <div className="relative mb-2 aspect-video overflow-hidden rounded-lg bg-black">
        <iframe
          src={src}
          title="Intro video"
          className="h-full w-full"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default function HeroBanner({
  course,
  fullApiJson,                   // ✅ এখানে প্রপ্স নিচ্ছে
}: {
  course: CourseType | null;
  fullApiJson?: any;             // ✅ এবং টাইপড
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const asideRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [styleState, setStyleState] = useState<{
    position: "absolute" | "fixed";
    top: number;
    left: number;
    width: number;
    translateY: number;
  }>({ position: "absolute", top: 0, left: 0, width: 0, translateY: 0 });

  useEffect(() => {
    const onScrollOrResize = () => {
      const cont = containerRef.current;
      const aside = asideRef.current;
      const card = cardRef.current;
      if (!cont || !aside || !card) return;

      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (!isDesktop) {
        setStyleState({ position: "absolute", top: 0, left: 0, width: 0, translateY: 0 });
        return;
      }

      const containerRect = cont.getBoundingClientRect();
      const asideRect = aside.getBoundingClientRect();

      const stickTop = 48; // md:top-12
      const scrollY = window.scrollY || window.pageYOffset;
      const containerTop = scrollY + containerRect.top;
      const containerBottom = scrollY + containerRect.bottom;

      const cardHeight = card.offsetHeight;
      const startStickY = containerTop + 12;
      const stopStickY = containerBottom - cardHeight - 12;
      const width = asideRect.width;

      if (scrollY < startStickY) {
        setStyleState({ position: "absolute", top: 0, left: 0, width, translateY: 0 });
      } else if (scrollY <= stopStickY) {
        setStyleState({ position: "fixed", top: stickTop, left: asideRect.left, width, translateY: 0 });
      } else {
        const delta = stopStickY - startStickY;
        setStyleState({ position: "absolute", top: 0, left: 0, width, translateY: delta });
      }
    };

    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#1a1d3a] to-[#2563eb] min-h-[300px]">
      <div
        ref={containerRef}
        className="container relative mx-auto flex flex-col px-4 pt-6 pb-8 md:flex-row md:gap-12 md:py-12 md:px-7"
      >
        {/* Left */}
        <div className="order-2 flex flex-1 flex-col justify-center md:order-1 md:max-w-[calc(100%_-_330px_-_3rem)] lg:max-w-[calc(100%_-_400px_-_3rem)]">
          <div className="mt-4 md:hidden">
            <MobileIntroPlayer introUrl={course?.intro_video_url} />
          </div>

          <h1 className="mt-4 text-[22px] font-semibold text-white md:mt-0 md:text-[48px] md:leading-[1.2]">
            {course?.title}
          </h1>

          <div className="my-3 flex flex-wrap items-center gap-2 md:my-4">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/images/Dev_Handoff_Q1_24_Frame_2_1725444418666-5.png"
              alt="5-star rating"
              width={140}
              height={24}
              className="h-auto w-[110px] md:w-[140px]"
            />
            <span className="text-sm text-white/90 md:text-base">
              (71.9% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)
            </span>
          </div>

          <RichText
            html={course?.description ?? ""}
            className="text-base text-gray-100 md:text-lg"
          />
        </div>

        {/* Right */}
        <aside
          ref={asideRef}
          className="order-1 w-full md:order-2 md:absolute md:right-7 md:top-12 md:max-w-[330px] lg:max-w-[400px]"
        >
          <div className="hidden md:block overflow-hidden rounded-lg">
            <div
              ref={cardRef}
              className="rounded-lg"
              style={{
                position: styleState.position as any,
                top: styleState.top,
                left: styleState.position === "fixed" ? styleState.left : undefined,
                width: styleState.width ? `${styleState.width}px` : undefined,
                transform: styleState.translateY ? `translateY(${styleState.translateY}px)` : undefined,
                willChange: "transform, top, left",
              }}
            >
              {/* ✅ fullApiJson প্রপ্স পাস করা হচ্ছে */}
              <CourseInfoSidebar course={course ?? null} fullApiJson={fullApiJson} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
