// "use client";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Navigation from "@/components/sections/navigation";
// import Footer from "@/components/sections/footer";
// import { useState, useEffect } from "react";

// const LoginSection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [inputValue, setInputValue] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Slider data
//   const slides = [
//     {
//       title: "দৈনিক লাইভ ক্লাসে অংশ নিয়ে বজায় রাখুন রুটিনমাফিক পড়াশোনা",
//       image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fea1338a-a1de-49ea-a916-8b382f535378-10minuteschool-com/assets/svgs/routine1_1722246290896-2.svg?",
//       alt: "Illustration of a person watching an online class on a laptop"
//     },
//     {
//       title: "বিশেষজ্ঞ শিক্ষকদের সাথে শিখুন নতুন কিছু প্রতিদিন",
//       image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fea1338a-a1de-49ea-a916-8b382f535378-10minuteschool-com/assets/svgs/routine1_1722246290896-2.svg?",
//       alt: "Expert teachers illustration"
//     },
//     {
//       title: "ইন্টারেক্টিভ কুইজ এবং অ্যাসাইনমেন্ট দিয়ে পরীক্ষার প্রস্তুতি নিন",
//       image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fea1338a-a1de-49ea-a916-8b382f535378-10minuteschool-com/assets/svgs/routine1_1722246290896-2.svg?",
//       alt: "Interactive quiz illustration"
//     },
//     {
//       title: "যেকোনো সময় যেকোনো জায়গা থেকে অ্যাক্সেস করুন আপনার কোর্স",
//       image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fea1338a-a1de-49ea-a916-8b382f535378-10minuteschool-com/assets/svgs/routine1_1722246290896-2.svg?",
//       alt: "Mobile access illustration"
//     }
//   ];

//   // Auto slider functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 3000); // Change slide every 3 seconds

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   // Manual slider control
//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   // Validate email or phone number
//   const validateInput = (value) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^(\+88)?01[3-9]\d{8}$/; // Bangladesh phone format
//     return emailRegex.test(value) || phoneRegex.test(value);
//   };

//   // Handle input change with auto-submit
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInputValue(value);

//     // Auto submit if valid input is detected
//     if (validateInput(value) && !isSubmitting) {
//       setTimeout(() => {
//         handleSubmit(value);
//       }, 500); // Small delay to prevent accidental submissions
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (value = inputValue) => {
//     if (!validateInput(value) || isSubmitting) return;

//     setIsSubmitting(true);
    
//     try {
//       // Simulate API call
//       console.log("Submitting:", value);
      
//       // Replace this with your actual API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Handle success (redirect, show success message, etc.)
//       alert("সফলভাবে সাবমিট হয়েছে!");
      
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const isValidInput = validateInput(inputValue);

//   return (
//     <>
//       <Navigation />
      
//       <main>
//         <div className="container mx-auto grid  grid-cols-1 items-start md:grid-cols-2">
//           {/* Left Column - Form */}
//           <div className="flex w-full flex-col pt-[100px] md:pt-[200px]">
//             <div className="mx-auto w-full max-w-[372px] md:mx-0">
//               <p className="mb-4 w-full text-lg font-semibold text-[#4A5568] md:mb-5 md:text-[21px]">
//                 মোবাইল নাম্বার/ ইমেইল দিয়ে এগিয়ে যান
//               </p>
//               <div className="w-full">
//                 <div className="mb-6 h-12 w-full relative">
//                   <Input
//                     type="text"
//                     placeholder="মোবাইল নাম্বার/ ইমেইল"
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     className={`h-full w-full rounded-md border-[#E2E8F0] bg-white px-4 text-base text-[#4A5568] placeholder:text-[#718096] focus-visible:ring-0 transition-colors ${
//                       isValidInput 
//                         ? 'focus-visible:border-green-500 border-green-500' 
//                         : 'focus-visible:border-link-blue-accent'
//                     }`}
//                     disabled={isSubmitting}
//                   />
//                   {isSubmitting && (
//                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                       <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-[#4B5563] rounded-full"></div>
//                     </div>
//                   )}
//                 </div>
//                 <Button
//                   onClick={() => handleSubmit()}
//                   className={`h-12 w-full rounded-md font-medium text-white transition-colors ${
//                     isValidInput && !isSubmitting
//                       ? 'bg-[#4B5563] hover:bg-[#4B5563]/90 cursor-pointer'
//                       : 'bg-gray-400 cursor-not-allowed'
//                   }`}
//                   disabled={!isValidInput || isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <div className="flex items-center justify-center space-x-2">
//                       <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
//                       <span>সাবমিট হচ্ছে...</span>
//                     </div>
//                   ) : (
//                     "সাবমিট করুন"
//                   )}
//                 </Button>
                
//                 {/* Input validation feedback */}
//                 {inputValue && (
//                   <p className={`mt-2 text-sm ${
//                     isValidInput ? 'text-green-600' : 'text-red-500'
//                   }`}>
//                     {isValidInput 
//                       ? '✓ সঠিক ফরম্যাট' 
//                       : 'সঠিক মোবাইল নাম্বার বা ইমেইল দিন'
//                     }
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Interactive Slider */}
//           <div className="items-center justify-center pt-[100px] pb-10 flex">
//             <div className="w-full">
//               <p className="text-center text-xl font-bold text-[#4A5568] min-h-[60px] flex items-center justify-center px-4">
//                 {slides[currentSlide].title}
//               </p>
//               <div className="mt-12 flex flex-col items-center justify-center">
//                 <div className="relative overflow-hidden rounded-lg">
//                   <Image
//                     src={slides[currentSlide].image}
//                     alt={slides[currentSlide].alt}
//                     width={450}
//                     height={300}
//                     priority
//                     className="transition-all duration-500 ease-in-out"
//                   />
//                 </div>
                
//                 {/* Slider Navigation Dots */}
//                 <div className="mt-8 flex cursor-pointer items-center justify-center space-x-2">
//                   {slides.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => goToSlide(index)}
//                       className={`inline-block h-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
//                         index === currentSlide
//                           ? 'w-4 bg-gray-400'
//                           : 'w-2 bg-gray-300 hover:bg-gray-400'
//                       }`}
//                       aria-label={`Go to slide ${index + 1}`}
//                     />
//                   ))}
//                 </div>
                
//                 {/* Slide Counter */}
//                 <p className="mt-4 text-sm text-gray-500">
//                   {currentSlide + 1} / {slides.length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
      
//       <Footer/>
//     </>
//   );
// };

// export default LoginSection;


"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { loginUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import GuestGuard from "@/lib/hooks/isLogingNavigation/GuestGuard";

const slides = [
  {
    title: "দৈনিক লাইভ ক্লাসে অংশ নিয়ে বজায় রাখুন রুটিনমাফিক পড়াশোনা",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fea1338a-a1de-49ea-a916-8b382f535378-10minuteschool-com/assets/svgs/routine1_1722246290896-2.svg?",
    alt: "Illustration of a person watching an online class on a laptop",
  },
  {
    title: "বিশেষজ্ঞ শিক্ষকদের সাথে শিখুন নতুন কিছু প্রতিদিন",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fea1338a-a1de-49ea-a916-8b382f535378-10minuteschool-com/assets/svgs/routine1_1722246290896-2.svg?",
    alt: "Expert teachers illustration",
  },
  {
    title: "ইন্টারেক্টিভ কুইজ এবং অ্যাসাইনমেন্ট দিয়ে পরীক্ষার প্রস্তুতি নিন",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fea1338a-a1de-49ea-a916-8b382f535378-10minuteschool-com/assets/svgs/routine1_1722246290896-2.svg?",
    alt: "Interactive quiz illustration",
  },
  {
    title: "যেকোনো সময় যেকোনো জায়গা থেকে অ্যাক্সেস করুন আপনার কোর্স",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fea1338a-a1de-49ea-a916-8b382f535378-10minuteschool-com/assets/svgs/routine1_1722246290896-2.svg?",
    alt: "Mobile access illustration",
  },
];

export default function LoginSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Auto slider
  useEffect(() => {
    const t = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % slides.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const handleLogin = async () => {
  if (!email || !password) {
    alert("Email ও Password দিন!");
    return;
  }
  setIsSubmitting(true);
  try {
    await loginUser(email, password);        // -> tokens saved to localStorage
    setIsSubmitting(false);

    // 🔁 Immediately update UI & navigate
    router.replace("/");                     // or "/dashboard"
    router.refresh();

    // (Optional) toast/alert AFTER navigation (non-blocking):
    // setTimeout(() => toast.success("লগইন সফল হয়েছে!"), 100);
  } catch (err: any) {
    console.error("Login error:", err);
    setIsSubmitting(false);
    alert(err?.message || "লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
  }
};


  return (
    <GuestGuard redirectTo="/">
      <main>
      <div className="container mx-auto grid grid-cols-1 items-start md:grid-cols-2">
        {/* Left: Form */}
        <div className="flex w-full flex-col pt-[100px] md:pt-[200px] items-center px-4 lg:px-3">
          <div className="mx-auto w-full max-w-[372px] md:mx-0">
            <p className="mb-4 w-full text-lg font-semibold text-[#4A5568] md:mb-5 md:text-[21px]">
              মোবাইল নাম্বার/ ইমেইল দিয়ে এগিয়ে যান
            </p>
            <div className="w-full">
              <div className="mb-6 space-y-3 relative">
                <Input
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-base text-gray-700 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none shadow-sm transition-all duration-300"
                
                  type="email"
                  placeholder="ইমেইল"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <Input
                  type="password"
                  placeholder="পাসওয়ার্ড"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-base text-gray-700 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none shadow-sm transition-all duration-300"
                />


                {isSubmitting && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#4B5563]" />
                  </div>
                )}
              </div>

              <Button
                onClick={handleLogin}
                className="w-full bg-[#4B5563] hover:bg-[#4B5563]/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "লগইন হচ্ছে..." : "লগইন করুন"}
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Slider */}
        <div className="items-center justify-center pt-[100px] pb-10 flex">
          <div className="w-full">
            <p className="text-center text-xl font-bold text-[#4A5568] min-h-[60px] flex items-center justify-center px-4">
              {slides[currentSlide].title}
            </p>
            <div className="mt-12 flex flex-col items-center justify-center">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].alt}
                  width={450}
                  height={300}
                  priority
                  className="transition-all duration-500 ease-in-out"
                />
              </div>
              <div className="mt-8 flex cursor-pointer items-center justify-center space-x-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`inline-block h-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                      i === currentSlide ? "w-4 bg-gray-400" : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-500">
                {currentSlide + 1} / {slides.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
    </GuestGuard>
    
  );
}
