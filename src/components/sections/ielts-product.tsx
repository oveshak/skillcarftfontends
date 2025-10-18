'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, Star, Award, Users, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react'

interface CourseModule {
  id: number
  title: string
  description: string
  duration: string
  color: string
}

interface FAQ {
  id: number
  question: string
  answer: string
}

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  avatar: string
}

const EmailMarketingPage: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const courseModules: CourseModule[] = [
    {
      id: 1,
      title: "Email Marketing এর মূলনীতি",
      description: "Email marketing এর বেসিক কনসেপ্ট এবং কৌশল শিখুন",
      duration: "২ ঘন্টা",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "List Building কৌশল",
      description: "কিভাবে একটি মানসম্পন্ন email list তৈরি করবেন",
      duration: "৩ ঘন্টা",
      color: "bg-purple-500"
    },
    {
      id: 3,
      title: "Campaign Design",
      description: "আকর্ষণীয় email campaign ডিজাইন করুন",
      duration: "২.৫ ঘন্টা",
      color: "bg-green-500"
    },
    {
      id: 4,
      title: "Automation Setup",
      description: "Email automation এর জন্য সেটআপ করুন",
      duration: "৪ ঘন্টা",
      color: "bg-orange-500"
    },
    {
      id: 5,
      title: "Analytics & Optimization",
      description: "Performance track করুন এবং optimize করুন",
      duration: "২ ঘন্টা",
      color: "bg-red-500"
    }
  ]

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "এই কোর্স কতদিনের জন্য?",
      answer: "এই কোর্সটি ৬ সপ্তাহের জন্য ডিজাইন করা হয়েছে। আপনি আপনার সুবিধা অনুযায়ী নিজের গতিতে শিখতে পারবেন।"
    },
    {
      id: 2,
      question: "কোর্স সম্পূর্ণ করার পর কি সার্টিফিকেট পাবো?",
      answer: "হ্যাঁ, কোর্স সফলভাবে সম্পূর্ণ করার পর আপনি একটি verified সার্টিফিকেট পাবেন যা আপনি LinkedIn এবং অন্যান্য প্ল্যাটফর্মে ব্যবহার করতে পারবেন।"
    },
    {
      id: 3,
      question: "কোন পূর্ব অভিজ্ঞতা প্রয়োজন আছে কি?",
      answer: "না, এই কোর্সটি beginner-friendly। আপনার শুধু basic computer এবং internet জ্ঞান থাকলেই যথেষ্ট।"
    },
    {
      id: 4,
      question: "কোর্স ফি কত এবং পেমেন্ট কিভাবে করবো?",
      answer: "কোর্স ফি ৫,০০০ টাকা। আপনি bKash, Nagad, বা bank transfer এর মাধ্যমে পেমেন্ট করতে পারবেন।"
    },
    {
      id: 5,
      question: "লাইভ সাপোর্ট পাবো কি?",
      answer: "হ্যাঁ, আমাদের dedicated support team আছে যারা ২৪/৭ আপনাকে সাহায্য করবে। এছাড়াও weekly live Q&A session আছে।"
    }
  ]

  const reviews: Review[] = [
    {
      id: 1,
      name: "রাহুল আহমেদ",
      rating: 5,
      comment: "অসাধারণ কোর্স! Email marketing সম্পর্কে সব কিছু পরিষ্কারভাবে বোঝানো হয়েছে।",
      avatar: "RA"
    },
    {
      id: 2,
      name: "ফাতিমা খাতুন",
      rating: 5,
      comment: "খুবই practical কোর্স। ইতিমধ্যে আমার business এ ভালো ফলাফল পাচ্ছি।",
      avatar: "FK"
    },
    {
      id: 3,
      name: "করিম উদ্দিন",
      rating: 4,
      comment: "ভালো content এবং instructor খুবই helpful।",
      avatar: "KU"
    }
  ]

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % courseModules.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + courseModules.length) % courseModules.length)
  }

  const toggleFaq = (faqId: number) => {
    setOpenFaq(openFaq === faqId ? null : faqId)
  }

  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth
      sliderRef.current.scrollTo({
        left: activeSlide * slideWidth,
        behavior: 'smooth'
      })
    }
  }, [activeSlide])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Email Marketing এবং Freelancing
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="ml-2">৪.৮ (১২৩৪+ স্টুডেন্ট রেটিং)</span>
              </div>
              <p className="text-lg mb-6 opacity-90">
                Professional Email Marketing শিখে Freelancing career শুরু করুন। 
                Industry expert দের কাছ থেকে practical knowledge পান।
              </p>
              <button className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                এখনই শুরু করুন
              </button>
            </div>
            
            <div className="relative">
              <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                  <img 
                    src="/api/placeholder/400/225" 
                    alt="Course Preview"
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all">
                      <Play className="w-8 h-8 text-gray-800 ml-1" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Course Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">৫০০০+</h3>
              <p className="text-gray-600">সন্তুষ্ট শিক্ষার্থী</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">৯৮%</h3>
              <p className="text-gray-600">সফলতার হার</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">৮৫%</h3>
              <p className="text-gray-600">জব প্লেসমেন্ট</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">৪.৮</h3>
              <p className="text-gray-600">গড় রেটিং</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules Slider */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">কোর্স মডিউলসমূহ</h2>
          
          <div className="relative">
            <div 
              ref={sliderRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {courseModules.map((module, index) => (
                <div 
                  key={module.id}
                  className="flex-none w-80 snap-start"
                >
                  <div className={`${module.color} text-white p-6 rounded-lg shadow-lg h-48 flex flex-col justify-between`}>
                    <div>
                      <h3 className="text-xl font-bold mb-3">{module.title}</h3>
                      <p className="text-sm opacity-90">{module.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                        {module.duration}
                      </span>
                      <span className="text-2xl font-bold opacity-20">
                        {String(module.id).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex justify-center mt-6 gap-2">
            {courseModules.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">শিক্ষার্থীদের মতামত</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">সচরাচর জিজ্ঞাসা</h2>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq) => (
              <div key={faq.id} className="mb-4">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full bg-white p-4 rounded-lg shadow-sm flex justify-between items-center text-left hover:shadow-md transition-shadow"
                >
                  <span className="font-semibold">{faq.question}</span>
                  {openFaq === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {openFaq === faq.id && (
                  <div className="bg-white mt-2 p-4 rounded-lg shadow-sm border-t">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">আজই শুরু করুন আপনার সফল ক্যারিয়ার</h2>
          <p className="text-xl mb-6 opacity-90">
            ৫০০০+ সফল শিক্ষার্থীর সাথে যুক্ত হন
          </p>
          <button className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            কোর্সে এনরোল করুন
          </button>
        </div>
      </section>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default EmailMarketingPage