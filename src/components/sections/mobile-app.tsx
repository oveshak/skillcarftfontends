import Image from "next/image";
import { Search, Globe, Phone } from "lucide-react";

const MobileAppSection = () => {
  return (
    <section className="dark bg-background pt-20 pb-10">
      <div className="container px-4 md:px-0">
        <div className="relative overflow-hidden rounded-[14px] bg-gradient-to-t from-[#00030A] to-[#002620]">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-14">
            <div className="my-auto py-12 text-center md:pl-20 md:py-20 md:text-left">
              <h2 className=" text-3xl font-bold text-white md:text-3xl">
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

          
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;