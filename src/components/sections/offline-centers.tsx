import Image from "next/image";
import { ArrowRight, Captions, MapPin } from "lucide-react";
import Link from "next/link";

const locations = [
  { name: 'Fleet Management			', href: '' },
  { name: 'Workplace Safety', href: 'https://maps.app.goo.gl/5S6zt16obZspNfA28?g_st=com.google.maps.preview.copy' },
  { name: 'Road Safety', href: 'https://www.google.com/maps/place/10+Minute+School+English+Centre+(Mirpur)/@23.8044657,90.3693722,15z/data=!4m6!3m5!1s0x3755c1ad1ad1b665:0x6bca269305be939d!8m2!3d23.8044657!4d90.3693722!16s%2Fg%2F11lnrxpzk8?entry=tts&g_ep=EgoyMDI0MDkxMS4wKgBIAVAD' },
  { name: 'Health & Safety', href: 'https://www.google.com/maps/place/10+Minute+School+English+Centre+Moghbazar/@23.7490976,90.4048202,17z/data=!4m6!3m5!1s0x3755b9b9609f3105:0xa35b9e083d068494!8m2!3d23.7490979!4d90.4078299!16s%2Fg%2F11wqdj3dp1?entry=tts&g_ep=EgoyMDI0MTAyOS4wIPu8ASoASAFQAw%3D%3D' },
  // { name: 'চকবাজার, চট্টগ্রাম', href: 'https://maps.app.goo.gl/1krk3XZiwDQknqMb8' },
];

const courseData = [
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/kids-english-sqr-thumbnail-new-11.png?",
    title: "Kids' English",
    description: "কেজি- ৩য় শ্রেণির শিক্ষার্থীদের জন্য",
    cta: "ফ্রি প্লে ডে বুক করুন",
    ctaColorClass: 'bg-[#2D8659]',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSfX6YBGXnY8YxNlVZOEP6Y9GVCWVo9Qe-aeCuGM_4NV5Hu30Q/viewform'
  },
  {
    image: "https://cdn.10minuteschool.com/images/SEJ_Thumbnails_1x1_%281%29_1732778436068.png",
    title: "Spoken English Junior",
    description: "৪র্থ-১০ম শ্রেণির শিক্ষার্থীদের জন্য",
    cta: "ফ্রি ক্লাস বুক করুন",
    ctaColorClass: 'bg-[#2D8659]',
    href: '/event/free-class-spoken-english-junior'
  },
  {
    image: "https://cdn.10minuteschool.com/images/ielts_thumbnails_1736327419792.png",
    title: "IELTS Programme",
    description: "১,০০০+ প্র্যাকটিস ম্যাটেরিয়ালের এক্সেস",
    cta: "ফ্রি ক্লাস বুক করুন",
    ctaColorClass: 'bg-[#2D8659]',
    href: '/event/ielts-programme'
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/study-abroad-sqr-thumbnail-14.png?",
    title: "Study Abroad",
    description: "5 Countries, 6000+ Programmes",
    cta: "ফ্রী কন্সাল্টেসন বুক করুন",
    ctaColorClass: 'bg-[#2D8659]',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSdF2JJpFAoaT4R88lo2CFKQgbVueKN_UwellHEulTGJN8vvWw/viewform'
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/ssc-english-course-sqr-thumbnail-new-15.png?",
    title: "SSC English Crash Course",
    description: "এস এস সি শিক্ষার্থীদের জন্য",
    cta: "কোর্সে ভর্তি হন",
    ctaColorClass: 'bg-primary',
    href: '/product/ssc-english-course/'
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/images/hsc-english-crash-course-sqr-thumbnail-16.png?",
    title: "HSC English Crash Course",
    description: "এইচ এস সি শিক্ষার্থীদের জন্য",
    cta: "কোর্সে ভর্তি হন",
    ctaColorClass: 'bg-primary',
    href: '/product/hsc-english-crash-course/'
  }
];

const OfflineCenters = () => {
    return (
        <div className=" pt-10">
            <div className=" container mx-auto px-4">
                <div className="relative bg-[linear-gradient(180deg,rgba(123,21,21,0.40)_0%,rgba(59,6,6,0.40)_100%)] rounded-[34px] border border-[#592327] text-center px-2 md:px-6 pt-10 pb-8 text-white">
                    <h2 className="absolute text-destructive border border-destructive inline-block rounded-full px-[20px] py-[6px] bg-[#441818] left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-sm font-medium whitespace-nowrap">
                        অফলাইন সেন্টার
                    </h2>
                    {/* <h3 className="text-xl md:text-2xl w-full max-w-[470px] mb-4 mx-auto font-bold leading-tight">
                        অনলাইনে ৫ লক্ষাধিক শিক্ষার্থীকে ইংরেজি শিখিয়ে আমরা এখন অফলাইনে
                    </h3> */}

                    <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                        <ul className="flex items-center gap-2 mb-6 flex-nowrap md:justify-center">
                            {locations.map((location) => (
                                <li key={location.name}>
                                    <Link
                                        href={location.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-white/5 snap-center hover:bg-white/10 transition-colors"
                                    >
                                        <span className="inline-block p-2 rounded-full bg-white/5">
                                            <Captions className="h-4 w-4" />
                                        </span>
                                        <span className="whitespace-nowrap">{location.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* <div className="relative flex flex-nowrap gap-4 overflow-x-auto scroll-smooth  md:gap-6">
                        {courseData.map((course) => (

                             <Link
            key={course.title} href={course.href} 
            className="flex items-center flex-shrink-0 w-4/5 gap-3 px-4 py-3 transition-colors bg-card/60 hover:bg-card/90 rounded-lg sm:w-auto sm:min-w-[300px] md:min-w-[320px] "
          >
            <div className="h-[50px] w-[50px] flex-shrink-0">
              <Image
                 src={course.image}
                                        alt={course.title}
                width={50}
                height={50}
                className="rounded-lg"
              />
            </div>
            <div className="flex-1 ">
              <h4 className="text-sm text-left  font-semibold text-foreground">
                {course.title}
              </h4>
              <p className="text-xs text-left text-muted-foreground font-bengali">
                 {course.cta}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </Link>
                            
                        ))}
                    </div> */}

                    <div className="flex  pt-7 flex-row items-center justify-center gap-4">
                       <Link
              className="flex items-center justify-center gap-1 text-primary hover:underline font-bengali"
              href="/en/categories/free/?ref=FreeCourse_text"
            >
              ফ্রি ক্লাস বুক করুন{" "}
              <ArrowRight className="w-4 h-4" />
            </Link>
                       <Link
              className="flex items-center justify-center gap-1 text-primary hover:underline font-bengali"
              href="/en/categories/free/?ref=FreeCourse_text"
            >
              বিস্তারিত জানুন{" "}
              <ArrowRight className="w-4 h-4" />
            </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfflineCenters;