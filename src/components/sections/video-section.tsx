import Image from "next/image";
import Link from "next/link";

const VideoSection = () => {
  return (
    <section className="bg-background py-16 md:py-20 text-text-primary">
      <div className="container mx-auto px-4">
        <h2 className="font-[var(--font-bengali)] text-center text-3xl md:text-4xl font-bold mb-4">
          বছর জুড়ে অনলাইন ব্যাচে কী কী থাকছে?
        </h2>
        <p className="font-[var(--font-bengali)] text-center text-text-secondary max-w-2xl mx-auto mb-10 md:mb-12 text-base md:text-lg">
          সেরা শিক্ষকদের পরিচর্যায় দেশের যেকোন প্রান্ত থেকে অব্যাহত থাকুক পড়াশুনার অগ্রযাত্রা
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Video Card 1 */}
          <div className="bg-secondary-dark rounded-xl overflow-hidden flex flex-col">
            <div className="relative group">
              <Image
                src="https://cdn.10minuteschool.com/images/C9zD3gaMIoo-HD_%281%29_1735814324424.jpg"
                alt="অনলাইন ব্যাচে কী কী হচ্ছে তার ভিডিও"
                width={576}
                height={324}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 cursor-pointer">
                <Image
                  src="https://10minuteschool.com/images/annual_exam/play_icon_2.svg"
                  alt="Play Video"
                  width={80}
                  height={80}
                  className="w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="p-6 flex-grow">
              <h3 className="font-[var(--font-bengali)] text-xl font-bold mb-3 text-text-primary">
                সারা বছরে কী কী হচ্ছে অনলাইন ব্যাচে?
              </h3>
              <p className="text-text-secondary font-[var(--font-bengali)]">
                এক্সপার্ট টিচারদের লাইভ ক্লাস, গোছানো মাস্টারবুক, ও মডেল টেস্ট দিয়ে ঘরে বসেই ৬ষ্ঠ-১০ম শ্রেণির পড়াশোনার কমপ্লিট প্রিপারেশন!
              </p>
            </div>
          </div>

          {/* Video Card 2 */}
          <div className="bg-secondary-dark rounded-xl overflow-hidden flex flex-col">
            <div className="relative group">
              <Image
                src="https://cdn.10minuteschool.com/images/JNk0Q-oDP4w-HD_%281%29_1735814406251.jpg"
                alt="সেরা রেজাল্টের প্রস্তুতির ভিডিও"
                width={576}
                height={324}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 cursor-pointer">
                 <Image
                    src="https://10minuteschool.com/images/annual_exam/play_icon_2.svg"
                    alt="Play Video"
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 group-hover:scale-110"
                  />
              </div>
            </div>
            <div className="p-6 flex-grow">
              <h3 className="font-[var(--font-bengali)] text-xl font-bold mb-3 text-text-primary">
                সারা বছর সেরা রেজাল্ট
              </h3>
              <p className="text-text-secondary font-[var(--font-bengali)]">
                পুরো বছরের পারফেক্ট পড়াশোনার প্ল্যানে সারা বছর ৬ষ্ঠ-১০ম শ্রেণির সব পরীক্ষার সেরা প্রস্তুতি ঘরে বসেই।
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
            <Link href="https://10minuteschool.com/online-batch/" className="inline-block bg-accent-green text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-colors hover:bg-green-600 font-[var(--font-bengali)] text-lg">
                আপনার ক্লাস বেছে নিন
            </Link>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;