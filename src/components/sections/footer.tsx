import Image from "next/image";
import Link from "next/link";

const companyLinks = [
  { href: "https://app.10minuteschool.com/careers", text: "ক্যারিয়ার / নিয়োগ বিজ্ঞপ্তি" },
  { href: "https://docs.google.com/forms/d/e/1FAIpQLScWh9jjyWnUKdDKET1-LHvdTxuU6-ssd0GLTI-0JlQ2MH6RzA/viewform", text: "শিক্ষক হিসাবে যোগ দিন" },
  { href: "https://affiliation.10minuteschool.com/", text: "অ্যাফিলিয়েট হিসাবে যোগ দিন" },
  { href: "https://app.10minuteschool.com/privacy-policy", text: "প্রাইভেসি পলিসি" },
  { href: "https://app.10minuteschool.com/refund-policy", text: "রিফান্ড পলিসি" },
  { href: "https://app.10minuteschool.com/terms-and-conditions", text: "ব্যবহারকারীর শর্তাবলি" },
];

const otherLinks = [
  { href: "https://blog.10minuteschool.com/", text: "ব্লগ" },
  { href: "/store/all", text: "বুক স্টোর" },
  { href: "/content", text: "ফ্রি নোটস ও গাইড" },
  { href: "/jobs-prep", text: "চাকরি প্রস্তুতি কোর্সসমূহ" },
  { href: "/certificate", text: "সার্টিফিকেট ভেরিফাই করুন" },
  { href: "/resource", text: "ফ্রি ডাউনলোড" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/10minuteschool/",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/icons/facebook_1695730910971-8.png?",
    alt: "facebook",
  },
  {
    href: "https://www.instagram.com/10ms_insta/",
    src: "https://cdn.10minuteschool.com/images/instagram_1695731442397.png",
    alt: "instagram",
  },
  {
    href: "https://www.linkedin.com/company/10ms/",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/icons/linkedin_1695731507042-10.png?",
    alt: "linkedin",
  },
  {
    href: "https://www.youtube.com/channel/UCL89KKkLs0tZKld-iIS3NGw",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/icons/youtube_1695731538726-11.png?",
    alt: "youtube",
  },
  {
    href: "https://www.tiktok.com/@10minuteschool?lang=en",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/icons/Tiktok_1695731564895-12.png?",
    alt: "Tiktok",
  },
];

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-text-primary pt-14 pb-8 md:pt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          <div className="flex flex-col">
            <Link href="/" className="mb-6">
              <Image
                src="https://10minuteschool.com/images/logo.svg"
                alt="10 Minute School Logo"
                width={150}
                height={40}
                className="w-[150px] h-auto"
              />
            </Link>
            <h3 className="text-base font-semibold mb-4 text-white">ডাউনলোড করুন আমাদের মোবাইল অ্যাপ</h3>
            <div className="flex items-center gap-3">
              <a href="https://play.google.com/store/apps/details?id=com.a10minuteschool.tenminuteschool" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/icons/google-play-icon_1695731678094-6.png?"
                  alt="Download on Google Play"
                  width={135}
                  height={40}
                />
              </a>
              <a href="https://apps.apple.com/us/app/10-minute-school/id1577061772" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3e9ee02a-24d5-4d62-8b67-adb8542c368e-10minuteschool-com/assets/icons/ios-store-icon_1695731704002-7.png?"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">কোম্পানি</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.text}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">অন্যান্য</h3>
            <ul className="space-y-3">
              {otherLinks.map((link) => (
                <li key={link.text}>
                  {link.href.startsWith("http") ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                      {link.text}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                      {link.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">আমাদের যোগাযোগ মাধ্যম</h3>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>কল করুন: <a href="tel:16910" className="hover:text-text-primary transition-colors">16910</a> (24x7)</p>
              <p>হোয়াটসঅ্যাপ: <a href="https://api.whatsapp.com/send?phone=+8801896016252&text=I%20need%20your%20assistance" className="hover:text-text-primary transition-colors" target="_blank" rel="noopener noreferrer">+8801896016252</a> (24x7)</p>
              <p>দেশের বাহির থেকে: <a href="tel:+8809610916910" className="hover:text-text-primary transition-colors">+880 9610916910</a></p>
              <p>ইমেইল: <a href="mailto:support@10minuteschool.com" className="hover:text-text-primary transition-colors">support@10minuteschool.com</a></p>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a key={social.alt} href={social.href} target="_blank" rel="noopener noreferrer" className="bg-card p-2 rounded-md hover:opacity-80 transition-opacity">
                  <Image
                    src={social.src}
                    alt={social.alt}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-14 pt-8 border-t border-border-subtle">
           <p className="text-center text-sm text-text-muted">
             স্বত্ব © ২০১৫ - ২০২৫ টেন মিনিট স্কুল কর্তৃক সর্বস্বত্ব সংরক্ষিত
           </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;