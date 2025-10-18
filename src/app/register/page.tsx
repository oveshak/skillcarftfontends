"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { registerUser, saveTokens } from "@/lib/api"; // আগের api.ts থেকে
import { useRouter } from "next/navigation";

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

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isBDPhone(v: string) {
  // +88 optional, 01[3-9]xxxxxxxx
  return /^(\+88)?01[3-9]\d{8}$/.test(v);
}
function strongPassword(v: string) {
  // 8+ chars, at least 1 letter & 1 digit
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v);
}
function extractApiError(e: any) {
  try {
    // DRF এর error JSON ধরার চেষ্টা
    if (e?.message && typeof e.message === "string") return e.message;
    const data = e?.response?.data ?? e?.data;
    if (!data) return "Something went wrong";
    if (typeof data === "string") return data;
    if (typeof data === "object") {
      // {"email":["This field must be unique."]} টাইপ এর জন্য
      const firstKey = Object.keys(data)[0];
      const val = (data as any)[firstKey];
      if (Array.isArray(val)) return val.join(" ");
      if (typeof val === "string") return val;
      return JSON.stringify(data);
    }
    return "Registration failed";
  } catch {
    return "Registration failed";
  }
}

export default function RegisterSection() {
  const router = useRouter();

  // slider
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % slides.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  // form states
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState(""); // email OR phone
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const contactValid = isEmail(contact) || isBDPhone(contact);
  const passValid = strongPassword(password);
  const confirmValid = confirm === password && confirm.length > 0;
  const nameValid = fullName.trim().length >= 2;

  async function handleSubmit() {
    const nextErrors: Record<string, string> = {};
    if (!nameValid) nextErrors.fullName = "পুরো নাম দিন (কমপক্ষে ২ অক্ষর)।";
    if (!contactValid) nextErrors.contact = "সঠিক ইমেইল বা মোবাইল নম্বর দিন।";
    if (!passValid)
      nextErrors.password = "পাসওয়ার্ড ৮+ অক্ষর (অন্তত ১টি letter ও ১টি digit) হতে হবে।";
    if (!confirmValid) nextErrors.confirm = "পাসওয়ার্ড নিশ্চিতকরণ মিলছে না।";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      // আপনার backend কী কী ফিল্ড নেয় তার উপর নির্ভর করবে
      // উদাহরণ পে-লোড:
      const payload: Record<string, any> = {
        name: fullName,
        password,
        roles:3
      };
      if (isEmail(contact)) payload.email = contact;
      else payload.phone = contact.replace(/^\+88/, ""); // +88 থাকলে কেটে দিলাম

      const data = await registerUser(payload);
      // যদি backend সরাসরি tokens দেয়, সেভ করে redirect
      if (data?.access && data?.refresh) {
        saveTokens({ access: data.access, refresh: data.refresh, user: data?.user });
        alert("রেজিস্ট্রেশন সফল! লগইন হয়ে গেলেন।");
        router.push("/");
      } else {
        alert("রেজিস্ট্রেশন সফল! এখন লগইন করুন।");
        router.push("/login");
      }
    } catch (e: any) {
      const msg = extractApiError(e);
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <div className="container mx-auto grid grid-cols-1 items-start md:grid-cols-2">
        {/* Left: Form */}
        <div className="flex items-center w-full flex-col pt-[100px] md:pt-[200px] px-4 lg:px-3">
          <div className="mx-auto w-full max-w-[372px] md:mx-0">
            <p className="mb-4 w-full text-lg font-semibold text-[#4A5568] md:mb-5 md:text-[21px]">
              মোবাইল নাম্বার/ ইমেইল দিয়ে রেজিস্টার করুন
            </p>

            <div className="space-y-3">
              <div>
                <Input
                className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-base text-gray-700 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none shadow-sm transition-all duration-300"
                  type="text"
                  placeholder="পূর্ণ নাম"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div>
                <Input
                className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-base text-gray-700 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none shadow-sm transition-all duration-300"
                  type="text"
                  placeholder="ইমেইল বা মোবাইল নম্বর"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                {contact && (
                  <p
                    className={`mt-1 text-sm ${
                      contactValid ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {contactValid ? "✓ সঠিক ফরম্যাট" : "সঠিক ইমেইল বা মোবাইল নম্বর দিন"}
                  </p>
                )}
                {errors.contact && (
                  <p className="mt-1 text-sm text-red-500">{errors.contact}</p>
                )}
              </div>

              <div>
                <Input
                className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-base text-gray-700 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none shadow-sm transition-all duration-300"
                  type="password"
                  placeholder="পাসওয়ার্ড"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                {password && (
                  <p
                    className={`mt-1 text-sm ${
                      passValid ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {passValid
                      ? "✓ শক্ত পাসওয়ার্ড"
                      : "কমপক্ষে ৮ অক্ষর, ১টি letter ও ১টি digit রাখুন"}
                  </p>
                )}
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div>
                <Input
                className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-base text-gray-700 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none shadow-sm transition-all duration-300"
                  type="password"
                  placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                />
                {confirm && (
                  <p
                    className={`mt-1 text-sm ${
                      confirmValid ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {confirmValid ? "✓ মিলেছে" : "পাসওয়ার্ড মিলছে না"}
                  </p>
                )}
                {errors.confirm && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirm}</p>
                )}
              </div>

              <Button
                onClick={handleSubmit}
                className={`h-12 w-full rounded-md font-medium text-white transition-colors ${
                  nameValid && contactValid && passValid && confirmValid && !isSubmitting
                    ? "bg-[#4B5563] hover:bg-[#4B5563]/90"
                    : "bg-gray-400"
                }`}
                disabled={
                  !(nameValid && contactValid && passValid && confirmValid) || isSubmitting
                }
              >
                {isSubmitting ? "রেজিস্ট্রেশন হচ্ছে..." : "রেজিস্টার করুন"}
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
  );
}
