import Image from 'next/image';
import Link from 'next/link';
import { FileText } from 'lucide-react';

const FreeResources = () => {
  return (
    <section className="bg-background py-14 px-5 text-foreground">
      <div className="container mx-auto flex flex-col items-center justify-center gap-10 md:flex-row md:gap-20 2xl:gap-40">
        <div className="text-center md:text-left">
          <h2 className="mb-6 text-3xl font-bold md:text-[32px] md:leading-[48px]">
            সেরা শিক্ষকের তৈরি ক্লাস নোট এবং লেকচার শিট প্রয়োজন?
          </h2>
          <Link
            href="https://10minuteschool.com/resource/"
            className="mx-auto flex w-fit items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:mx-0"
          >
            <FileText className="h-5 w-5" />
            <span>ফ্রি ডাউনলোড করুন</span>
          </Link>
        </div>
        <div className="relative h-full w-full max-w-[218px]">
          <Image
            src="https://s3.ap-southeast-1.amazonaws.com/cdn.10minuteschool.com/images/image_pdf_1685354763931.png"
            alt="Downloadable PDF resources"
            width={218}
            height={218}
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default FreeResources;