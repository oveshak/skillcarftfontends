'use client'
import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Download, MessageSquare, Play } from 'lucide-react';
import AuthGuard from '@/lib/hooks/isLogingNavigation/AuthGuard';

interface Lesson {
  id: string;
  title: string;
  type: 'recorded' | 'slide' | 'upcoming';
  duration?: string;
  videoUrl?: string;
}

interface QuizQ { 
  id: string; 
  question: string; 
  options: string[]; 
  correctIndex: number; 
}

interface Milestone { 
  id: string; 
  title: string; 
  lessons: Lesson[]; 
  isOpen: boolean; 
  quiz?: QuizQ[]; 
}

const Page = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: '1',
      title: 'বাংলা ১ম পত্র | গদ্য ও পদ্য থেকে বার্ষিক পরীক্ষায় আসার মতো দ্রুম ৫০ টি MCQ Solve',
      isOpen: true,
      lessons: [
        { id: '1-1', title: 'বাংলা ১ম পত্র | গদ্য ও পদ্য থেকে বার্ষিক পরীক্ষায় আসার মতো দ্রুম ৫০ টি MCQ Solve', type: 'recorded', duration: '81:52', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: '1-2', title: 'Slide: বাংলা ১ম পত্র | গদ্য ও পদ্য থেকে বার্ষিক পরীক্ষায় আসার মতো দ্রুম ৫০ টি MCQ Solve', type: 'slide' }
      ],
      quiz: [
        { id: 'q1a', question: '"রবীন্দ্রনাথ ঠাকুর" কোন ধারার সাহিত্যিক?', options: ['উপন্যাস', 'কবিতা', 'নাটক', 'প্রবন্ধ'], correctIndex: 1 },
        { id: 'q2a', question: 'গদ্যে সাধারণত কী বেশি থাকে?', options: ['ছন্দ', 'অলঙ্কার', 'স্বাভাবিক ভাষা', 'ছন্দবদ্ধতা'], correctIndex: 2 },
        { id: 'q3a', question: 'পদ্য সাধারণত কিসে সাজানো?', options: ['ছন্দ ও মাত্রা', 'গদ্যভাষা', 'যন্ত্রসংগীত', 'উপাখ্যান'], correctIndex: 0 },
      ],
    },
    {
      id: '2',
      title: 'বিজ্ঞান | অধ্যায় ১-৭ থেকে বার্ষিক পরীক্ষায় আসার মতো দ্রুম ৫০ টি MCQ Solve',
      isOpen: false,
      lessons: [
        { id: '2-1', title: 'বিজ্ঞান | অধ্যায় ১-৭ থেকে বার্ষিক পরীক্ষায় আসার মতো দ্রুম ৫০ টি MCQ Solve', type: 'recorded', duration: '75:30' },
        { id: '2-2', title: 'Slide: বিজ্ঞান | অধ্যায় ১-৭ থেকে বার্ষিক পরীক্ষায় আসার মতো দ্রুম ৫০ টি MCQ Solve', type: 'slide' }
      ],
      quiz: [
        { id: 'q1b', question: 'জলের রাসায়নিক সংকেত কী?', options: ['H2O', 'CO2', 'O2', 'NaCl'], correctIndex: 0 },
        { id: 'q2b', question: 'বেগের একক কী?', options: ['মিটার', 'মিটার/সেকেন্ড', 'সেকেন্ড', 'নিউটন'], correctIndex: 1 },
      ],
    },
    {
      id: '3',
      title: 'বাংলা ২য় পত্র | ব্যাকরণ থেকে বার্ষিক পরীক্ষায় আসার মতো দ্রুম ৫০ টি MCQ Solve',
      isOpen: false,
      lessons: [
        { id: '3-1', title: 'বাংলা ২য় পত্র | ব্যাকরণ থেকে বার্ষিক পরীক্ষায় আসার মতো দ্রুম ৫০ টি MCQ Solve', type: 'recorded', duration: '68:45' },
        { id: '3-2', title: 'Slide: বাংলা ২য় পত্র | ব্যাকরণ থেকে বার্ষিক পরীক্ষায় আসার মতো দ্রুম ৫০ টি MCQ Solve', type: 'slide' }
      ],
      quiz: [
        { id: 'q1c', question: 'সমাসের সঠিক অর্থ কী?', options: ['ভাগ', 'সংক্ষেপ', 'বিস্তৃতি', 'বিভাজন'], correctIndex: 1 },
      ],
    },
    {
      id: '4',
      title: 'বিজ্ঞান | অধ্যায় ৮-১৪ থেকে বার্ষিক পরীক্ষায় আসার মতো দ্রুম ৫০ টি MCQ Solve',
      isOpen: false,
      lessons: [{ id: '4-1', title: 'বিজ্ঞান | অধ্যায় ৮-১৪ থেকে বার্ষিক পরীক্ষায় আসার মতো দ্রুম ৫০ টি MCQ Solve', type: 'upcoming' }],
      quiz: [{ id: 'q1d', question: 'বিদ্যুৎ প্রবাহের একক কী?', options: ['ভোল্ট', 'অ্যাম্পিয়ার', 'ওহম', 'ওয়াট'], correctIndex: 1 }],
    },
    {
      id: '5',
      title: 'আইসিটি | অধ্যায় ১,২ থেকে বার্ষিক পরীক্ষায় আসার মতো দ্রুম ৫০ টি MCQ Solve',
      isOpen: false,
      lessons: [{ id: '5-1', title: 'আইসিটি | অধ্যায় ১,২ থেকে বার্ষিক পরীক্ষায় আসার মতো দ্রুম ৫০ টি MCQ Solve', type: 'upcoming' }],
      quiz: [{ id: 'q1e', question: 'CPU এর পূর্ণরূপ কী?', options: ['Central Process Unit', 'Central Processing Unit', 'Control Processing Unit', 'Central Processor Unit'], correctIndex: 1 }],
    }
  ]);

  const [currentLesson, setCurrentLesson] = useState<Lesson>(milestones[0].lessons[0]);
  const [currentMilestoneId, setCurrentMilestoneId] = useState<string>(milestones[0].id);

  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [showDescription, setShowDescription] = useState(true);

  const currentMilestone = useMemo(() => milestones.find(m => m.id === currentMilestoneId), [milestones, currentMilestoneId]);
  const currentQuiz = currentMilestone?.quiz ?? [];
  const quizKey = (qid: string) => `${currentMilestoneId}:${qid}`;

  const toggleMilestone = (milestoneId: string) => {
    setMilestones(prev => prev.map(m => (m.id === milestoneId ? { ...m, isOpen: !m.isOpen } : m)));
  };

  const handleLessonClick = (lesson: Lesson, milestoneId: string) => {
    if (lesson.type === 'upcoming') return;
    setCurrentLesson(lesson);
    setCurrentMilestoneId(milestoneId);
    if (lesson.type === 'slide') {
      setShowQuiz(true);
    } else {
      setShowQuiz(false);
    }
  };

  const startQuizFromVideo = () => {
    if (!currentQuiz.length) return;
    setShowQuiz(true);
  };

  const finishQuiz = () => {
    const total = currentQuiz.length;
    let score = 0;
    currentQuiz.forEach(q => {
      const a = answers[quizKey(q.id)];
      if (a === q.correctIndex) score++;
    });
    alert(`কুইজ শেষ! স্কোর: ${score}/${total}`);
    setShowQuiz(false);
  };

  const goToNextModule = () => {
    const currentMilestoneIndex = milestones.findIndex(m => m.id === currentMilestoneId);
    const currentLessonIndex = currentMilestone?.lessons.findIndex(l => l.id === currentLesson.id) ?? -1;
    if (currentMilestone && currentLessonIndex < currentMilestone.lessons.length - 1) {
      const nextLesson = currentMilestone.lessons[currentLessonIndex + 1];
      handleLessonClick(nextLesson, currentMilestoneId);
    } else if (currentMilestoneIndex < milestones.length - 1) {
      const nextMilestone = milestones[currentMilestoneIndex + 1];
      if (nextMilestone.lessons.length > 0) {
        handleLessonClick(nextMilestone.lessons[0], nextMilestone.id);
      }
    }
  };

  const goToPrevModule = () => {
    const currentMilestoneIndex = milestones.findIndex(m => m.id === currentMilestoneId);
    const currentLessonIndex = currentMilestone?.lessons.findIndex(l => l.id === currentLesson.id) ?? -1;
    if (currentLessonIndex > 0 && currentMilestone) {
      const prevLesson = currentMilestone.lessons[currentLessonIndex - 1];
      handleLessonClick(prevLesson, currentMilestoneId);
    } else if (currentMilestoneIndex > 0) {
      const prevMilestone = milestones[currentMilestoneIndex - 1];
      if (prevMilestone.lessons.length > 0) {
        const lastLesson = prevMilestone.lessons[prevMilestone.lessons.length - 1];
        handleLessonClick(lastLesson, prevMilestone.id);
      }
    }
  };

  return (
     <AuthGuard>
      <div className="min-h-screen container py-10 px-3 lg:px-1">
      <header className="pb-6 pt-3 flex items-center gap-3">
        <button className="p-1 text-gray-950 rounded" aria-label="Back">
          <svg stroke="currentColor" fill="currentColor" viewBox="0 0 448 512" className="cursor-pointer text-[#111827] text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-900">
          বার্ষিক পরীক্ষা প্রস্তুতি One Shot Class
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left/Main column — full width when quiz is shown */}
        <div className={`flex-1 ${showQuiz ? 'w-full' : 'lg:w-2/3'}`}>
          <div className="aspect-video relative">
            {!showQuiz ? (
              <>
                {currentLesson.type === 'recorded' && (
                  <>
                    <iframe
                      src={currentLesson.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                      className="w-full h-full pointer-events-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <button
                      aria-label="Start quiz"
                      title="Start quiz"
                      onClick={startQuizFromVideo}
                      className="absolute inset-0 z-10"
                    />
                  </>
                )}
              </>
            ) : (
              <div className="overflow-y-auto inset-0 flex items-stretch px-3  scrollbar-hide" style={{ maxHeight: 'calc(60vh - 0px)' }}>
                <div className="max-w-3xl w-full h-full overflow-y-auto ">
                  <style jsx>{`
                    .scrollbar-hide::-webkit-scrollbar { display: none; }
                    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                  `}</style>

                  {/* সব প্রশ্ন একসাথে দেখাও */}
                  {currentQuiz.map((quiz, qIdx) => (
                    <div key={quiz.id} className="mb-8">
                      <h2 className="text-base md:text-lg text-gray-950 font-semibold mb-3 leading-snug">
                        {qIdx + 1}. {quiz.question}
                      </h2>

                      {/* ✅ Overflow-free layout: 1-col (mobile) / 2-col (md+) */}
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                        {quiz.options.map((opt, optIdx) => {
                          const chosen = answers[quizKey(quiz.id)] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                setAnswers(prev => ({ ...prev, [quizKey(quiz.id)]: optIdx }));
                              }}
                              className={`w-full text-nowrap text-left px-4 py-3 rounded-lg border whitespace-normal break-words ${
                                chosen ? 'bg-gray-900 text-gray-50 border-gray-900' : 'bg-white border-gray-300 text-black'
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}. {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* জমা দিন বাটন */}
                  <div className="flex justify-center mt-6 pb-6">
                    <button 
                      onClick={finishQuiz}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                      জমা দিন
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white py-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Oct 8, 2025, 6:16:19 PM</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded">Absent</span>
                <button className="p-2 hover:bg-gray-100 rounded" title="Download">
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded" title="Comments">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{currentLesson.title}</h2>
          </div>

          <div 
            className={`bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
              showDescription ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-gray-600">≡</span>
                <h3 className="font-medium text-gray-900">বিবরণসমূহ</h3>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p>এই কোর্সে বার্ষিক পরীক্ষার জন্য গুরুত্বপূর্ণ সকল টপিক কভার করা হয়েছে।</p>
                <p>প্রতিটি লেসনে MCQ প্র্যাকটিস এবং বিস্তারিত ব্যাখ্যা রয়েছে।</p>
                <p>নিয়মিত অনুশীলন করলে পরীক্ষায় ভালো ফলাফল পাবেন।</p>
              </div>
            </div>
          </div>

          <div className="bottom-0 inset-x-0 z-20 flex justify-center items-center gap-2 p-2 sm:p-3">
            <button onClick={goToPrevModule} className="px-3 py-1.5 rounded-lg border border-gray-900 text-black hover:bg-white/10">Prev</button>
            <button onClick={goToNextModule} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Next</button>
            <button 
              onClick={() => setShowDescription(!showDescription)}
              className="px-3 py-1.5 rounded-lg border border-gray-900 text-black hover:bg-white/10"
              title={showDescription ? 'Hide details' : 'Show details'}
            >
              {showDescription ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* ✅ Sidebar quiz চলাকালীন দেখাবে না */}
    
          <div className="lg:w-1/3 bg-white border border-gray-200 overflow-y-auto scrollbar-hide" style={{ maxHeight: 'calc(100vh - 60px)' }}>
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar { display: none; }
              .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
              <h3 className="font-semibold text-gray-900">কোর্স সিলেবাস</h3>
            </div>

            <div className="divide-y divide-gray-200">
              {milestones.map((milestone) => (
                <div key={milestone.id}>
                  <button
                    onClick={() => toggleMilestone(milestone.id)}
                    className="w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500">{milestone.lessons.length} রিসোর্স</span>
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 leading-snug">{milestone.title}</h4>
                    </div>
                    {milestone.isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>

                  {milestone.isOpen && (
                    <div className="bg-gray-50">
                      {milestone.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonClick(lesson, milestone.id)}
                          disabled={lesson.type === 'upcoming'}
                          className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-100 transition-colors border-l-4 ${
                            currentLesson.id === lesson.id ? 'border-l-blue-500 bg-blue-50' : 'border-l-transparent'
                          } ${lesson.type === 'upcoming' ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                          <div className={`w-16 h-12 rounded flex-shrink-0 flex items-center justify-center ${
                            lesson.type === 'recorded'
                              ? 'bg-gradient-to-br from-pink-500 to-red-500'
                              : lesson.type === 'slide'
                              ? 'bg-gradient-to-br from-orange-400 to-orange-500'
                              : 'bg-gradient-to-br from-purple-500 to-purple-600'
                          }`}>
                            <Play className="w-6 h-6 text-white" fill="white" />
                          </div>

                          <div className="flex-1 text-left">
                            <p className="text-sm text-gray-900 leading-snug mb-1">
                              {lesson.type === 'slide' ? 'Slide: ' : ''}
                              {lesson.title}
                            </p>
                            {lesson.duration && <span className="text-xs text-gray-500">{lesson.duration}</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
    
      </div>
    </div>
     </AuthGuard>
  );
};

export default Page;
