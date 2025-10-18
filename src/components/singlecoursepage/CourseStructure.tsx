"use client";
import Image from "next/image";

// ===== Types (minimal, to match your data shape) =====
type StructureCard = {
  id: number;
  title: string;
  subtitle: string;
  image?: string | null;
  status?: boolean;
  is_deleted?: boolean;
};

type Guideline = {
  title?: string;
  subtitle?: string;
  coursegidline_image?: string;
  gidline_pdf?: string; // pdf url
};

// Reusable card component for the top two cards (UNCHANGED DESIGN)
const InfoCard = ({
  icon,
  alt,
  title,
  description,
}: {
  icon: string;
  alt: string;
  title: string | undefined;
  description: string | undefined;
}) => (
  <div className="flex flex-row  gap-4 justify-center rounded-lg   text-center text-white">
    <div className=" ">
      <Image src={icon} alt={alt} width={80} height={20} className="" priority />
    </div>
    <div className="flex flex-col text-left">
      <h3 className="mb-2 text-lg font-semibold lg:text-xl">{title}</h3>
      <p className="text-sm font-normal text-gray-300 lg:text-base">{description}</p>
    </div>
  </div>
);

// ===== Component (UNCHANGED DESIGN) =====
export default function CourseStructure({
  cards,
  // তুমি page.tsx এ যেটা পাঠাচ্ছ — freegide
  freegide,
  // backward-compat: guideline নামেও নিতে পারবে (single বা array)
  guideline,
}: {
  cards: StructureCard[];
  freegide?: Guideline;               // <- single object supported
  guideline?: Guideline | Guideline[]; // <- single OR array supported
}) {
  // normalize guideline data (object or array → single object)
  const gRaw = freegide ?? guideline;
  const g: Guideline | undefined = Array.isArray(gRaw) ? gRaw[0] : gRaw;

  // pick first two items safely
  const c0 = cards?.[0];
  const c1 = cards?.[1];

  // Fallbacks keep your original static content (UNCHANGED COPY)
  const card1Title = c0?.title ?? "৬০+ Hands-on  ভিডিও লেকচার";
  const card1Desc =
    c0?.subtitle ?? "হাতে কলমে ইমেইল মার্কেটিং স্কিল শেখানো এবং ফ্রিল্যান্সিং সংক্রান্ত বিষয়াদি নিয়ে আলোচনা";

  const card2Title = c1?.title ?? "১৪৪ পৃষ্ঠার ডিজিটাল গাইডবুক";
  const card2Desc =
    c1?.subtitle ?? "বইটিতে রয়েছে Email Marketing করে Freelancing ক্যারিয়ার গড়ার প্রয়োজনীয় সব গাইডলাইন";

  const guideTitle =
    g?.title ?? "Email Marketing করে Freelancing: Digital Minibook";
  const guideSubtitle =
    g?.subtitle ?? "শূন্য থেকে শুরু করে প্রফেশনাল ইমেইল মার্কেটার হওয়ার গাইডলাইন।";
  const guideImg =
    g?.coursegidline_image ??
    "https://cdn.10minuteschool.com/images/catalog/product/pointer/Email_Marketing_Thumbnail_1732621748586.png";
  const guidePdfHref = g?.gidline_pdf ?? "#";

  return (
    <section id="course-structure" className="bg-white py-12 md:py-16">
      <div className="  space-y-6">
        <div className="text-left">
          <h2 className="mb-4  text-gray-900  text-xl font-bold text-left md:text-2xl">
            কোর্সটি যেভাবে সাজানো হয়েছে
          </h2>
        </div>

        {/* Top two info cards (UNCHANGED DOM & CLASSES) */}
        <div className="grid grid-cols-1 gap-6 py-10 px-8 lg:grid-cols-2 rounded-2xl bg-[#111827]">
          <InfoCard
            icon="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/icons/Lecture_Video_%281%29_1725951550079-8.png"
            alt="৬০+ Hands-on ভিডিও লেকচার"
            title={card1Title}
            description={card1Desc}
          />
          <InfoCard
            icon="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97e8b9e9-e848-45c1-950c-5a711b181395-10minuteschool-com/assets/icons/Digital_Book_1725951632999-9.png"
            alt="১৪৪ পৃষ্ঠার ডিজিটাল গাইডবুক"
            title={card2Title}
            description={card2Desc}
          />
        </div>

        {/* Guidebook block (UNCHANGED DOM & CLASSES) */}
        <div className="grid grid-cols-1 items-center gap-8 rounded-lg bg-[#272727] p-6 text-white xl:grid-cols-2 md:gap-x-12 md:p-8">
          <div className="flex  flex-col  items-start md:text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EA580C]">
                <span className="font-bold text-lg text-white">A</span>
              </div>
              <p className="text-3xl font-bold text-[#F97316]">ফ্রি গাইডবুক</p>
            </div>
            <h3 className="mb-4 text-lg lg:text-xl font-bold">{guideTitle}</h3>
            <p className="mb-5 text-sm md:text-base text-gray-300">{guideSubtitle}</p>
            <a
              href={guidePdfHref}
              target={guidePdfHref !== "#" ? "_blank" : undefined}
              rel={guidePdfHref !== "#" ? "noopener noreferrer" : undefined}
              className="w-fit rounded-md bg-primary px-6 py-2 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 md:px-8 md:text-lg"
            >
              ফ্রি PDF Download করুন
            </a>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={guideImg}
              alt={guideTitle}
              width={300}
              height={379}
              className="w-auto h-auto max-w-[250px] object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
