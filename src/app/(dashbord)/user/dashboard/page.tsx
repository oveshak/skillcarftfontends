'use client'
import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import AuthGuard from '@/lib/hooks/isLogingNavigation/AuthGuard';
import EnrolledCoursesOnly from '../buycourse/page';

type ClassItem = {
  date: string;
  time: string;
  label: string;
  title: string;
  course: string;
};

export default function BengaliEduPlatform() {
  const [activeTab, setActiveTab] = useState('সব');
  const [currentSlide, setCurrentSlide] = useState(0);

  // NEW: modal state for "আমারিক ক্লাস"
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);

  const categories = [
    { icon: '📱', label: 'অ্যাপস ডাউনলোড', color: 'bg-pink-500' },
    { icon: '🎓', label: 'ক্লাস', color: 'bg-cyan-500' },
    { icon: '📚', label: 'ফ্রি কোর্সগুলি', color: 'bg-purple-500' },
    { icon: '📝', label: 'নোটস নিলাম', color: 'bg-orange-500' },
    { icon: '📥', label: 'সংগ্রহস্থল', color: 'bg-red-500' },
    { icon: '☎️', label: 'কল ১৬৯১০', color: 'bg-green-500' },
    { icon: '🧪', label: 'সায়েন্স ল্যাব', color: 'bg-blue-500' },
    { icon: '🧮', label: 'ম্যাথ প্র্যাকটিস', color: 'bg-indigo-500' },
    { icon: '🖊️', label: 'মডেল টেস্ট', color: 'bg-emerald-500' },
  ];

  const games = [
    { id: 1, title: 'Game 1', subtitle: 'খেলা ও জ্ঞানার্জন করুন', color: 'from-purple-900 to-purple-700' },
    { id: 2, title: 'Game 2', subtitle: 'খেলা ও জ্ঞানার্জন করুন', color: 'from-teal-900 to-teal-700' },
    { id: 3, title: 'Game 3', subtitle: 'খেলা ও জ্ঞানার্জন করুন', color: 'from-blue-900 to-blue-700' },
    { id: 4, title: 'Game 4', subtitle: 'খেলা ও জ্ঞানার্জন করুন', color: 'from-orange-900 to-orange-700' }
  ];

  const tabData: Record<string, Array<ClassItem>> = {
    'সব': [
      { date: '15 OCT', time: '05:30 PM', label: 'CLASS', title: 'বাংলা ১ম পত্র | বাক্যগঠন থেকে বাছাই পরীক্ষায় আসার মতো প্রশ্ন ৫০ টি MCQ Solve', course: '১৬ নোটিস বার্ষিক পরীক্ষা এক্সপ্রেস ক্লাস - ২০২৫ • বার্ষিক পরীক্ষা এক্সপ্রেস One Shot Class' },
    { date: '19 OCT', time: '05:30 PM', label: 'CLASS', title: 'বিজ্ঞান | অভ্যাস্য ৮-১৪ থেকে বাছাই পরীক্ষায় আসার মতো প্রশ্ন ৫০ টি MCQ Solve', course: '১৬ নোটিস বার্ষিক পরীক্ষা এক্সপ্রেস ক্লাস - ২০২৫ • বার্ষিক পরীক্ষা এক্সপ্রেস One Shot Class' },
      { date: '21 OCT', time: '5:20 PM', label: 'CLASS', title: 'আইসিটি | অধ্যায় ১,২ থেকে বাছাই পরীক্ষায় আসার মতো প্রশ্ন ৫০ টি MCQ Solve', course: '১৬ নোটিস বার্ষিক পরীক্ষা এক্সপ্রেস ক্লাস - ২০২৫ • বার্ষিক পরীক্ষা এক্সপ্রেস One Shot Class' }
    ],
    'প্রবাসিক': [
      { date: '16 OCT', time: '06:00 PM', label: 'CLASS', title: 'প্রবাসিক বিষয়ক ক্লাস - গণিত সমাধান', course: 'প্রবাসিক শিক্ষা কর্মসূচি - ২০২৫' },
      { date: '18 OCT', time: '07:00 PM', label: 'CLASS', title: 'প্রবাসিক পরীক্ষার জন্য প্রস্তুতি', course: 'প্রবাসিক শিক্ষা কর্মসূচি - ২০২৫' }
    ],
    'ছাত্র তথ্যস্থানীয়': [
      { date: '17 OCT', time: '04:00 PM', label: 'CLASS', title: 'ছাত্র তথ্য ব্যবস্থাপনা - ডাটাবেস ম্যানেজমেন্ট', course: 'তথ্য প্রযুক্তি কোর্স - ২০২৫' }
    ],
    'কবিগুরু': [
      { date: '20 OCT', time: '05:00 PM', label: 'CLASS', title: 'রবীন্দ্রনাথ ঠাকুরের কবিতা বিশ্লেষণ', course: 'বাংলা সাহিত্য কোর্স - ২০২৫' },
      { date: '22 OCT', time: '06:00 PM', label: 'CLASS', title: 'গীতাঞ্জলি থেকে নির্বাচিত কবিতা', course: 'বাংলা সাহিত্য কোর্স - ২০২৫' }
    ]
  };

  const tabs = ['সব', 'প্রবাসিক', 'ছাত্র তথ্যস্থানীয়', 'কবিগুরু'];

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % games.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + games.length) % games.length);

  /** ------------ Category carousel states/refs ------------ **/
  const catRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const EPS = 2;

  const updateCatArrows = () => {
    const el = catRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > EPS);
    setCanRight(scrollLeft + clientWidth < scrollWidth - EPS);
  };

  useEffect(() => {
    updateCatArrows();
    const el = catRef.current;
    if (!el) return;

    const onScrollOrResize = () => updateCatArrows();

    el.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    const ro = new ResizeObserver(() => updateCatArrows());
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', onScrollOrResize as any);
      window.removeEventListener('resize', onScrollOrResize);
      ro.disconnect();
    };
  }, []);

  const scrollCategories = (dir: 'left' | 'right') => {
    const el = catRef.current;
    if (!el) return;
    const amount = Math.max(240, el.clientWidth * 0.75);
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const onCatKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') scrollCategories('right');
    if (e.key === 'ArrowLeft') scrollCategories('left');
  };

  /** ------------ Games slider touch handlers ------------ **/
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const onGameTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const onGameTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onGameTouchEnd = () => {
    const THRESHOLD = 50;
    if (touchDeltaX.current <= -THRESHOLD) {
      nextSlide();
    } else if (touchDeltaX.current >= THRESHOLD) {
      prevSlide();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  // NEW: lock body scroll when modal open + ESC to close
  useEffect(() => {
    if (selectedClass) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedClass(null);
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener('keydown', onKey);
      };
    }
  }, [selectedClass]);

  return (
   <AuthGuard>
     <div className=" mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Section - Main Content */}
          <div className="lg:col-span-2">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-blue-600 via-purple-500 to-pink-400 rounded-3xl pt-6 pb-10 px-4 sm:px-6 mb-6">
              {/* Profile Section */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-white rounded-full overflow-hidden border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-9 sm:w-10 h-9 sm:h-10 bg-gray-300 rounded-full"></div>
                </div>
                <div className="text-white">
                  <div className="text-[11px] sm:text-xs font-light opacity-90">সুস্বাগতম Love</div>
                  <div className="text-base sm:text-lg font-bold flex items-center gap-2">
                    হই রোগী <span className="text-sm sm:text-base">🔊</span>
                  </div>
                </div>
              </div>

              {/* ===== Category Carousel ===== */}
              <div className="relative bg-accent">
                <div className={`pointer-events-none absolute inset-y-0 left-0 w-6 ${canLeft ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`pointer-events-none absolute inset-y-0 right-0 w-6 ${canRight ? 'opacity-100' : 'opacity-0'}`} />

                <div
                  ref={catRef}
                  tabIndex={0}
                  onKeyDown={onCatKeyDown}
                  className="bg-white rounded-2xl sm:rounded-3xl px-6 shadow-xl p-4 sm:p-5 overflow-x-auto md:overflow-x-hidden scroll-smooth flex gap-3 sm:gap-4 snap-x -mx-4  md:mx-0 md:px-0"
                  style={{ scrollbarWidth: 'none', touchAction: 'pan-x', WebkitOverflowScrolling: 'touch', overscrollBehaviorX: 'contain' }}
                  aria-label="Categories"
                >
                  {categories.map((cat, idx) => (
                    <div key={idx} className="snap-start shrink-0 w-[88px] sm:w-[96px] md:w-[104px] flex flex-col items-center">
                      <div className={`${cat.color} w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl shadow-md mb-2 hover:scale-105 transition-transform cursor-pointer`}>
                        {cat.icon}
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-gray-700 text-center leading-tight">
                        {cat.label}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollCategories('left')}
                  className={`hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full items-center justify-center shadow-md transition ${canLeft ? 'bg-gray-200 hover:bg-gray-300 opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                  aria-label="Scroll categories left"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>

                <button
                  onClick={() => scrollCategories('right')}
                  className={`hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full items-center justify-center shadow-md transition ${canRight ? 'bg-gray-200 hover:bg-gray-300 opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                  aria-label="Scroll categories right"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Classes Section */}
            {/* <div className="px-4 sm:px-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className=" text-lg lg:text-xl font-bold text-gray-900">আমারিক ক্লাস</h2>
                <button className="flex items-center gap-1 text-green-600 text-xs lg:text-sm font-medium">
                  <span className="text-base">📅</span>
                  ক্লাস ক্যালেন্ডার দেখুন
                </button>
              </div>

            
              <div className="space-y-3 mb-6">
                {tabData['সব'].map((cls, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-xl  transition p-3 cursor-pointer"
                    onClick={() => setSelectedClass(cls)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedClass(cls)}
                    aria-label={`Open class details for ${cls.title}`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="bg-gray-50 rounded-lg p-2 text-center w-16">
                          <div className="text-xs font-bold text-gray-800 whitespace-nowrap">{cls.date}</div>
                          <div className="text-[10px] text-gray-600 mt-0.5">{cls.time}</div>
                          <div className="bg-orange-500 text-white text-[9px] px-2 py-0.5 rounded mt-1.5 font-medium">
                            {cls.label}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] lg:text-xs font-semibold text-blue-600 mb-1.5">{cls.course}</div>
                        <h3 className="text-xs sm:text-lg font-bold text-gray-900 leading-snug">{cls.title}</h3>
                      </div>

                      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 self-center" />
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Bottom Course Section (unchanged) */}
            <EnrolledCoursesOnly/>
          </div>

          {/* Right Section - Sidebar */}
          <div className="lg:col-span-1 p-4">
            {/* Weather Widget (placeholder) */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-sm">
              <div className="text-gray-900 text-base sm:text-lg font-bold pb-4 flex items-center gap-2">গত সাত দিনের শিখন কার্যক্রম</div>

              <div className="flex items-center gap-2 justify-center  mb-3">
                               <svg xmlns="http://www.w3.org/2000/svg"  width="28" height="29" fill="#EAEEF4"><path fill="#EAEEF4" d="M21.727 9.41a.82.82 0 0 0-1.302.212c-.192.375-.41.736-.65 1.08-.254.364-.799.13-.799-.315 0-.903-.12-1.832-.36-2.762A11.098 11.098 0 0 0 12.969.537a.82.82 0 0 0-1.195.664 9.418 9.418 0 0 1-3.925 6.931l-.09.066c-.062.045-.12.088-.175.124a11.177 11.177 0 0 0-3.442 3.97 10.97 10.97 0 0 0-1.23 5.063c0 .903.12 1.832.359 2.763A11.078 11.078 0 0 0 14 28.445c6.115 0 11.09-4.975 11.09-11.09 0-3.015-1.195-5.837-3.363-7.945Z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg"  width="28" height="29" fill="#EAEEF4"><path fill="#EAEEF4" d="M21.727 9.41a.82.82 0 0 0-1.302.212c-.192.375-.41.736-.65 1.08-.254.364-.799.13-.799-.315 0-.903-.12-1.832-.36-2.762A11.098 11.098 0 0 0 12.969.537a.82.82 0 0 0-1.195.664 9.418 9.418 0 0 1-3.925 6.931l-.09.066c-.062.045-.12.088-.175.124a11.177 11.177 0 0 0-3.442 3.97 10.97 10.97 0 0 0-1.23 5.063c0 .903.12 1.832.359 2.763A11.078 11.078 0 0 0 14 28.445c6.115 0 11.09-4.975 11.09-11.09 0-3.015-1.195-5.837-3.363-7.945Z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg"  width="28" height="29" fill="#EAEEF4"><path fill="#EAEEF4" d="M21.727 9.41a.82.82 0 0 0-1.302.212c-.192.375-.41.736-.65 1.08-.254.364-.799.13-.799-.315 0-.903-.12-1.832-.36-2.762A11.098 11.098 0 0 0 12.969.537a.82.82 0 0 0-1.195.664 9.418 9.418 0 0 1-3.925 6.931l-.09.066c-.062.045-.12.088-.175.124a11.177 11.177 0 0 0-3.442 3.97 10.97 10.97 0 0 0-1.23 5.063c0 .903.12 1.832.359 2.763A11.078 11.078 0 0 0 14 28.445c6.115 0 11.09-4.975 11.09-11.09 0-3.015-1.195-5.837-3.363-7.945Z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg"  width="28" height="29" fill="#EAEEF4"><path fill="#EAEEF4" d="M21.727 9.41a.82.82 0 0 0-1.302.212c-.192.375-.41.736-.65 1.08-.254.364-.799.13-.799-.315 0-.903-.12-1.832-.36-2.762A11.098 11.098 0 0 0 12.969.537a.82.82 0 0 0-1.195.664 9.418 9.418 0 0 1-3.925 6.931l-.09.066c-.062.045-.12.088-.175.124a11.177 11.177 0 0 0-3.442 3.97 10.97 10.97 0 0 0-1.23 5.063c0 .903.12 1.832.359 2.763A11.078 11.078 0 0 0 14 28.445c6.115 0 11.09-4.975 11.09-11.09 0-3.015-1.195-5.837-3.363-7.945Z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg"  width="28" height="29" fill="#EAEEF4"><path fill="#EAEEF4" d="M21.727 9.41a.82.82 0 0 0-1.302.212c-.192.375-.41.736-.65 1.08-.254.364-.799.13-.799-.315 0-.903-.12-1.832-.36-2.762A11.098 11.098 0 0 0 12.969.537a.82.82 0 0 0-1.195.664 9.418 9.418 0 0 1-3.925 6.931l-.09.066c-.062.045-.12.088-.175.124a11.177 11.177 0 0 0-3.442 3.97 10.97 10.97 0 0 0-1.23 5.063c0 .903.12 1.832.359 2.763A11.078 11.078 0 0 0 14 28.445c6.115 0 11.09-4.975 11.09-11.09 0-3.015-1.195-5.837-3.363-7.945Z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg"  width="28" height="29" fill="#EAEEF4"><path fill="#EAEEF4" d="M21.727 9.41a.82.82 0 0 0-1.302.212c-.192.375-.41.736-.65 1.08-.254.364-.799.13-.799-.315 0-.903-.12-1.832-.36-2.762A11.098 11.098 0 0 0 12.969.537a.82.82 0 0 0-1.195.664 9.418 9.418 0 0 1-3.925 6.931l-.09.066c-.062.045-.12.088-.175.124a11.177 11.177 0 0 0-3.442 3.97 10.97 10.97 0 0 0-1.23 5.063c0 .903.12 1.832.359 2.763A11.078 11.078 0 0 0 14 28.445c6.115 0 11.09-4.975 11.09-11.09 0-3.015-1.195-5.837-3.363-7.945Z"></path></svg>

               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" fill="none"><path fill="#644DFF" d="M21.727 9.41a.82.82 0 0 0-1.302.212c-.192.375-.41.736-.65 1.08-.254.364-.799.13-.799-.315 0-.903-.12-1.832-.36-2.762A11.098 11.098 0 0 0 12.969.537a.82.82 0 0 0-1.195.664 9.418 9.418 0 0 1-3.925 6.931l-.09.066c-.062.045-.12.088-.175.124a11.177 11.177 0 0 0-3.442 3.97 10.97 10.97 0 0 0-1.23 5.063c0 .903.12 1.832.359 2.763A11.078 11.078 0 0 0 14 28.445c6.115 0 11.09-4.975 11.09-11.09 0-3.015-1.195-5.837-3.363-7.945Z"></path><path stroke="url(#b)" stroke-opacity="0.21" stroke-width="0.866" d="m3.69 20.01-.42.108.42-.108Zm0 0a10.7 10.7 0 0 1-.347-2.655c0-1.702.398-3.338 1.183-4.865l-.837 7.52ZM8.1 8.484a9.851 9.851 0 0 0 4.105-7.249L8.014 8.547m.087-.063H8.1l-.252-.352.253.352Zm0 0-.068.05-.02.013m0 0-.255-.35.256.35Zm4.39-7.62a.387.387 0 0 1 .366-.005 10.665 10.665 0 0 1 5.428 6.81L12.403.928Zm0 0-.21-.378.21.378Zm9.324 8.483-.302.31.302-.31Zm-.916.41-.386-.198.386.199ZM7.823 8.684l-.24-.36.238.36h.002Z"></path><defs><linearGradient id="a" x1="14.095" x2="14.095" y1="-48.555" y2="39.645" gradientUnits="userSpaceOnUse"><stop stop-color="#121637" stop-opacity="0"></stop><stop offset="1" stop-color="#FFA14A"></stop></linearGradient><linearGradient id="b" x1="14" x2="14" y1="0.445" y2="28.445" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient></defs></svg>
              
              </div>
             
             
              
              
              
             

              <div className="flex items-center justify-between mb-4 pt-4">
                <div className="flex items-center gap-1.5 ">
                  
                  <span className="text-xs lg:text-sm text-gray-600">মাঝারি</span>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span className="text-xs lg:text-sm text-gray-600">আজা</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-xs lg:text-sm text-gray-600">আজা</span>
                </div>
              </div>

             
            </div>

            {/* Popular Games */}
            <div className='mt-10 pb-7'>
              <div className="flex items-center justify-between mb-3">
                <h3 className=" text-lg lg:text-xl font-bold text-gray-900">পপুলার অ্যাপ্লিকেট</h3>
                <div className="hidden gap-1">
                  <button onClick={prevSlide} className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={nextSlide} className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)`, touchAction: 'pan-x', overscrollBehaviorX: 'contain' }}
                  onTouchStart={onGameTouchStart}
                  onTouchMove={onGameTouchMove}
                  onTouchEnd={onGameTouchEnd}
                >
                  {games.map((game) => (
                    <div key={game.id} className="min-w-full px-1">
                      <div className={`bg-gradient-to-br ${game.color} rounded-xl p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="inline-block bg-orange-500 text-white font-bold text-xs lg:text-[14px] px-4 py-1 rounded-full lg:font-medium">
                            বিনামূল্যে
                          </div>
                          <div className="text-white text-xs font-bold">SEASON GAME</div>
                        </div>
                        <div className="text-white/90 text-sm lg:base mb-1">{game.subtitle}</div>
                        <h4 className="text-white text-lg font-bold mb-2">{game.title}</h4>
                        <div className="flex items-center text-white text-[13px]">
                          <span>আরও জানুন</span>
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-1.5 mt-3">
                {games.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all ${currentSlide === idx ? 'w-6 bg-orange-500' : 'w-1.5 bg-gray-300'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>{/* /Sidebar */}
        </div>
      </div>

      {/* ========= MODAL (only for "আমারিক ক্লাস" clicks) ========= */}
      {selectedClass && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          aria-modal="true"
          role="dialog"
          aria-labelledby="class-modal-title"
          onClick={(e) => {
            // close if click on backdrop (not on panel)
            if (e.target === e.currentTarget) setSelectedClass(null);
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

          {/* Panel */}
          <div className="relative bg-white w-[92%] max-w-lg rounded-2xl shadow-2xl p-5 sm:p-6 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="bg-gray-50 rounded-lg p-2 text-center w-16 shrink-0">
                <div className="text-xs font-bold text-gray-800 whitespace-nowrap">{selectedClass.date}</div>
                <div className="text-[10px] text-gray-600 mt-0.5">{selectedClass.time}</div>
                <div className="bg-orange-500 text-white text-[9px] px-2 py-0.5 rounded mt-1.5 font-medium">
                  {selectedClass.label}
                </div>
              </div>

              <div className="min-w-0">
                <div className="text-[10px] lg:text-xs font-semibold text-blue-600 mb-1.5">{selectedClass.course}</div>
                <h3 id="class-modal-title" className="text-base font-bold text-gray-900 leading-snug">
                  {selectedClass.title}
                </h3>

                <p className="text-xs text-gray-600 mt-2">
                  👉 এই ক্লাস সম্পর্কে আরও তথ্য, যোগদান লিংক, রিমাইন্ডার/ক্যালেন্ডার অপশন ইত্যাদি এখানে দেখাতে পারেন।
                </p>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                className="flex-1 bg-green-500 text-white text-sm py-2.5 rounded-lg font-medium hover:bg-green-600 transition shadow-sm"
                onClick={() => alert('Join/Details action')}
              >
                যোগ দিন / বিস্তারিত
              </button>
              <button
                className="px-5 border border-gray-300 text-gray-700 text-sm py-2.5 rounded-lg font-medium hover:bg-gray-50 transition"
                onClick={() => setSelectedClass(null)}
              >
                বন্ধ করুন
              </button>
            </div>

            <button
              className="absolute top-2.5 right-3 text-gray-500 hover:text-gray-700 text-xl leading-none"
              aria-label="Close"
              onClick={() => setSelectedClass(null)}
              title="Close (Esc)"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Optional: global scrollbar-hide helper
      <style jsx global>{`
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
      */}
    </div>
   </AuthGuard>
  );
}
