import Image from "next/image";
import { Search, Globe, Phone } from "lucide-react";

const MobileAppSection = () => {
  return (
    <section className="dark bg-background pt-20 pb-10">
      <div className="container px-4 md:px-0">
        <div className="relative overflow-hidden rounded-[14px] bg-gradient-to-t from-[#00030A] to-[#002620]">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-14">
            <div className="my-auto py-12 text-center md:pl-20 md:py-20 md:text-left">
              <h2 className="mx-auto max-w-[400px] text-3xl font-bold text-white md:text-3xl">
                ডাউনলোড করুন আমাদের মোবাইল অ্যাপ, শেখা শুরু করুন আজ থেকেই
              </h2>
              <div className="mt-6 flex justify-center gap-x-2.5 md:justify-start">
                <a
                  href="https://play.google.com/store/apps/details?id=com.a10minuteschool.tenminuteschool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-300 hover:scale-105"
                >
                  <Image
                    src="https://10minuteschool.com/images/home/googlePlay.svg"
                    alt="Get it on Google Play"
                    width={168}
                    height={50}
                  />
                </a>
                <a
                  href="https://apps.apple.com/us/app/10-minute-school/id1577061772"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-300 hover:scale-105"
                >
                  <Image
                    src="https://10minuteschool.com/images/home/appStore.svg"
                    alt="Download on the App Store"
                    width={168}
                    height={50}
                  />
                </a>
              </div>
            </div>

            <div className="relative mt-8 h-[25rem] md:mt-0">
              <Image
                src="https://cdn.10minuteschool.com/images/download_app_1668328988106.png"
                alt="10 Minute School App Preview"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          <div className="z-10 hidden md:block">
            <div className="mx-auto flex h-[65px] max-w-full items-center justify-between gap-3 bg-white px-7 shadow-[0_-2px_8px_0_rgba(0,0,0,0.14)]">
              <div className="flex items-center">
                <a href="/">
                  <Image
                    src="https://10minuteschool.com/images/logo.svg"
                    alt="10 Minute School Logo"
                    width={100}
                    height={27}
                  />
                </a>
              </div>

              <div className="w-full flex-1 max-w-lg pr-4">
                <div className="relative flex w-full items-center gap-2 rounded-full border border-gray-300 px-3 py-2">
                  <Search className="h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="কিসে আগ্রহ, কিংবা কোন স্কিল সেট খুঁজছেন?"
                    className="w-full flex-1 bg-transparent text-sm text-gray-900 placeholder:text-[#7C818A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center gap-6">
                  <button className="flex cursor-pointer items-center gap-1 rounded border border-gray-200 px-2 py-1 text-sm text-[#111827] hover:bg-slate-50">
                    <Globe className="h-4 w-4 text-[#111827]" />
                    <span>EN</span>
                  </button>
                  <a href="tel:16910" className="flex items-center gap-1 text-primary">
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">16910</span>
                  </a>
                </div>
                <a
                  href="/auth/login/"
                  className="flex items-center rounded-md bg-primary px-6 py-2 text-base font-medium text-primary-foreground"
                >
                  লগ-ইন
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;