"use client";

import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";

type CourseLike = {
  id?: number | null;
  title?: string | null;
  intro_video_url?: string | null;
  price?: number | null;
  offer_price?: number | null;
};

interface CourseStat {
  icon: string;
  text: string;
}

const courseStats: CourseStat[] = [
  {
    icon:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/icons/course_participants-1.png",
    text: "কোর্সটি করছেন ৭৮৬৬ জন",
  },
  {
    icon:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/icons/time-2.png",
    text: "২০+ ঘণ্টার ভিডিও লেসন",
  },
  {
    icon:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/icons/video-3.png",
    text: "৬২টি ভিডিও",
  },
  {
    icon:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/icons/pdf-note-4.png",
    text: "৩টি নোট",
  },
  {
    icon:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/icons/digital-book_work-book-6.png",
    text: "১৪৪ পৃষ্ঠার ডিজিটাল গাইডবুক",
  },
  {
    icon:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/icons/time-limit-7.png",
    text: "কোর্সের মেয়াদ আজীবন",
  },
];

// ===== helpers (intro video dynamic) =====
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
function toEmbed(url?: string | null) {
  const id = getYouTubeId(url || "");
  return id ? `https://www.youtube.com/embed/${id}` : url || "";
}
function thumbFromYoutube(url?: string | null) {
  const id = getYouTubeId(url || "");
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

const StatItem = ({ icon, text }: CourseStat) => (
  <div className="mb-3 flex items-center">
    <div className="relative h-5 w-5">
      <Image src={icon} alt="icon" fill className="object-contain" />
    </div>
    <h4 className="mb-0 inline-block pl-4 text-sm font-normal tracking-[0.005em] text-slate-800">
      {text}
    </h4>
  </div>
);

// ✅ fullApiJson প্রপ্স যুক্ত
const CourseInfoSidebar = ({
  course,
  fullApiJson,
}: {
  course?: CourseLike | null;
  fullApiJson?: any;
}) => {
  const router = useRouter();

  // শুধুমাত্র intro ভিডিওকে গ্যালারির প্রথম/একটি আইটেম হিসেবে নেবো
  const galleryItems = useMemo(() => {
    const intro = course?.intro_video_url;
    const embed = toEmbed(intro);
    const thumb =
      thumbFromYoutube(intro) ??
      // খালি হলে 1x1 transparent gif
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    return [
      {
        thumb,
        videoUrl: embed || "",
        active: true,
      },
    ];
  }, [course?.intro_video_url]);

  // price binding (same placement)
  const priceBlock = useMemo(() => {
    const offer = course?.offer_price ?? undefined;
    const price = course?.price ?? undefined;

    if (offer && price && offer < price) {
      return (
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl hidden md:block font-bold text-gray-900">৳{offer}</span>
            <span className="hidden md:inline-block text-gray-500 line-through">৳{price}</span>
          </div>
        </div>
      );
    }
    const finalPrice = offer ?? price ?? 0;
    return (
      <div className="mb-3">
        <span className="text-3xl hidden md:block font-bold text-gray-900">৳{finalPrice}</span>
      </div>
    );
  }, [course?.offer_price, course?.price]);

  const [activeIndex] = useState(0);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeItem = galleryItems[activeIndex];

  const handleVideoPlay = () => setIsVideoMode(true);

  const handleBuy = () => {
    if (typeof window === "undefined") return;

    // 🧹 পুরনো কার্ট আরে/সিঙ্গেল কনফ্লিক্ট এড়াতে অ্যারে ক্লিয়ার করুন
    try { sessionStorage.removeItem("checkout_products"); } catch {}

    // ✅ অরিজিনাল API JSON থাকলে সেখান থেকেই নাম/আইডি নিন
    if (fullApiJson?.data) {
      const c = fullApiJson.data;
      const payload = {
        id: String(c.id),                               // original course ID
        name: String(c.title ?? "কোর্স"),               // original title
        nameEn: String(c.slug ?? "Course"),
        image:
          (c.course_thumbnail ? String(c.course_thumbnail) : "") ||
          (thumbFromYoutube(c.intro_video_url) ?? "📚"),
        originalPrice: Number(c.price ?? c.offer_price ?? 0),
        discountedPrice: Number(c.offer_price ?? c.price ?? 0),
        quantity: 1,
        meta: { intro_video_url: c.intro_video_url ?? null },
      };

      try { sessionStorage.setItem("checkout_course", JSON.stringify(payload)); } catch {}
      const qp = encodeURIComponent(JSON.stringify(payload));
      router.push(`/order?item=${qp}`);
      return;
    }

    // ❇️ fallback: course প্রপ্স থেকেই (type-safe guard সহ)
    if (!course) return; // <-- 🔒 এই গার্ডের জন্যই TS error যাবে

    const payload = {
      id: String(course.id ?? ""),                      // string-এ normalize
      name: String(course.title ?? "কোর্স"),
      nameEn: "Course",
      image: thumbFromYoutube(course.intro_video_url) ?? "📚",
      originalPrice: Number(course.price ?? course.offer_price ?? 0),
      discountedPrice: Number(course.offer_price ?? course.price ?? 0),
      quantity: 1,
      meta: { intro_video_url: course.intro_video_url ?? null },
    };

    try { sessionStorage.setItem("checkout_course", JSON.stringify(payload)); } catch {}
    const qp = encodeURIComponent(JSON.stringify(payload));
    router.push(`/order?item=${qp}`);
  };

  return (
    <section className="order-2 w-full rounded-lg bg-white md:max-w-[330px] lg:max-w-[400px]">
      <div className="md:sticky md:top-24">
        <div className="overflow-hidden rounded-lg border md:border-gray-200 md:shadow-lg">
          <div className="hidden md:block">
            <div className="p-1.5">
              <div className="group relative aspect-video overflow-hidden rounded-md bg-black">
                {isVideoMode && activeItem.videoUrl ? (
                  <iframe
                    src={`${activeItem.videoUrl}?autoplay=1`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <Image
                      src={activeItem.thumb}
                      alt="Course intro"
                      fill
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40"
                      onClick={handleVideoPlay}
                    >
                      <PlayCircle className="h-14 w-14 text-white opacity-90 transition-transform group-hover:scale-110" />
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Thumbnail Gallery with Navigation — বর্তমানে একটাই আইটেম, তাই হাইড */}
          </div>

          <div className="w-full p-4">
            {priceBlock}
            <button
              onClick={handleBuy}
              className="w-full cursor-pointer rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              কোর্সটি কিনুন
            </button>
          </div>

          <div className="block">
            <div className="border-t border-gray-200 p-4">
              <p className="mb-4 text-xl font-semibold text-gray-700">এই কোর্সে যা থাকছে</p>
              <div>
                {courseStats.map((stat, index) => (
                  <StatItem key={index} {...stat} />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 p-4 text-center">
            <a href="tel:16910" className="text-muted-foreground">
              <p className="text-[15px] font-normal leading-7">
                কোর্সটি সম্পর্কে বিস্তারিত জানতে
                <br />
                ফোন করুন <span className="font-bold text-primary">(16910)</span>
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseInfoSidebar;
