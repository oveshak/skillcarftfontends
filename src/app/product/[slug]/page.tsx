// // src/app/courses/[slug]/page.tsx
// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useParams } from "next/navigation";

// import RelatedCourses from "@/components/singlecoursepage/RelatedCourses";
// import FaqSection from "@/components/singlecoursepage/FaqSection";
// import RequirementsSection from "@/components/singlecoursepage/RequirementsSection";
// import CertificateSection from "@/components/singlecoursepage/CertificateSection";
// import ExclusiveFeatures from "@/components/singlecoursepage/ExclusiveFeatures";
// import ContentPreview from "@/components/singlecoursepage/ContentPreview";
// import CourseInfoSidebar from "@/components/singlecoursepage/CourseInfoSidebar";
// import CourseDetails from "@/components/singlecoursepage/CourseDetails";
// import LearningOutcomes from "@/components/singlecoursepage/LearningOutcomes";
// import CourseStructure from "@/components/singlecoursepage/CourseStructure";
// import HeroBanner from "@/components/singlecoursepage/HeroBanner";
// import InstructorSection from "@/components/singlecoursepage/InstructorSection";
// import { SectionNav } from "@/components/singlecoursepage/SectionNav";
// import { useCourseData } from "@/lib/api/course/singleCourse";
// import Testimonials from "@/components/sections/testimonials";



// export default function IELTSCoursePage() {
//   const { slug } = useParams<{ slug: string }>();
//   const { course, loading, error } = useCourseData(slug);

//   // ==== Scroll-wise sidebar visibility (unchanged design) ====
//   const [showSidebar, setShowSidebar] = useState(false);
//   const heroRef = useRef<HTMLElement | null>(null);
//   const relatedRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const heroEl = document.querySelector("section[data-hero]") as HTMLElement | null;
//     heroRef.current = heroEl;
//     const relEl = document.getElementById("related");
//     relatedRef.current = relEl as HTMLDivElement | null;

//     const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

//     const onScroll = () => {
//       if (!isDesktop()) {
//         setShowSidebar(false);
//         return;
//       }
//       const topThreshold = 120;
//       const scY = window.scrollY || window.pageYOffset;
//       let visible = scY > topThreshold;

//       if (relatedRef.current) {
//         const rect = relatedRef.current.getBoundingClientRect();
//         const vh = window.innerHeight || document.documentElement.clientHeight;
//         if (rect.top < vh - 120) {
//           visible = false;
//         }
//       }
//       setShowSidebar(visible);
//     };

//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onScroll);
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onScroll);
//     };
//   }, []);

//   // === ডিজাইন/DOM অপরিবর্তিত রাখছি; data bind শুধু child কম্পোনেন্টে করা হবে ===
//   // Loading/Error-এ কিছু না দেখালেও ঠিক আছে; চাইলে skeleton দিন।
//   if (error) {
//     console.error("Course fetch error:", error);
//   }

//   return (
//     <main className="bg-white">
//       {/* Hero কে data-hero মার্ক, আগের মতোই */}
//       <section data-hero>
//         <HeroBanner /* ভেতরে useCourseData না ডেকে course propও দিতে পারো */
//           // উদাহরণ: <HeroBanner course={course} />
//         />
//       </section>

//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col md:flex-row md:gap-4 lg:gap-8">
//           <div className="flex-1 md:w-[40%] lg:w-[54%] xl:w-[63%] 2xl:w-[70%]">
//             <div id="structure" className="scroll-mt-24 md:scroll-mt-28" />
//             <div><SectionNav /></div>

//             <div id="instructor" className="scroll-mt-24 md:scroll-mt-28">
//               <InstructorSection /* course={course} */ />
//             </div>

//             <div><CourseStructure /* course={course} */ /></div>

//             <div id="learning-outcomes" className="scroll-mt-24 md:scroll-mt-28">
//               <LearningOutcomes /* course={course} */ />
//             </div>

//             <div id="details" className="scroll-mt-24 md:scroll-mt-28">
//               <CourseDetails /* course={course} */ />
//             </div>

//             <div id="content" className="scroll-mt-24 md:scroll-mt-28">
//               <ContentPreview /* course={course} */ />
//             </div>

//             <div id="features" className="scroll-mt-24 md:scroll-mt-28">
//               <ExclusiveFeatures /* course={course} */ />
//             </div>

//             <div id="certificate" className="scroll-mt-24 md:scroll-mt-28">
//               <CertificateSection /* course={course} */ />
//             </div>

//             <div id="testimonials" className="scroll-mt-24 md:scroll-mt-28">
//               <Testimonials /* course={course} */ />
//             </div>

//             <div id="requirements" className="scroll-mt-24 md:scroll-mt-28">
//               <RequirementsSection /* course={course} */ />
//             </div>

//             <div id="faq" className="scroll-mt-24 md:scroll-mt-28">
//               <FaqSection /* course={course} */ />
//             </div>
//           </div>

//           <div className=" relative hidden lg:block">
//             <aside
//               className={`order-first md:order-last md:w-[330px] lg:w-[400px] md:sticky top-[90px] self-start h-fit max-h-[calc(100vh-5rem)] overflow-y-auto 
//               transition-opacity duration-300 md:block
//               ${showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//               aria-hidden={!showSidebar}
//             >
//               <CourseInfoSidebar /* course={course} */ />
//             </aside>
//           </div>
//         </div>
//       </div>

//       <div id="related" className="scroll-mt-24 md:scroll-mt-28">
//         <RelatedCourses /* course={course} */ />
//       </div>
//     </main>
//   );
// }
