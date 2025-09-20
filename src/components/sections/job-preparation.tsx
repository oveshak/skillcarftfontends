import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, ArrowRight } from 'lucide-react';

type Course = {
  id: number;
  title: string;
  instructor: string;
  image: string;
  link: string;
};

const jobCourses: Course[] = [
  {
    id: 1,
    title: 'বিসিএস প্রিলি রেকর্ডেড কোর্স',
    instructor: 'Sakib Bin Rashid +20',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/BCS_Preli_Recorded_Course_Thumbnail.jpg',
    link: 'https://10minuteschool.com/programs/152/bcs-preli/',
  },
  {
    id: 2,
    title: 'ব্যাংক জবস কোর্স',
    instructor: 'Akif Masumi +8',
    image: 'https://cdn.10minuteschool.com/images/skills/Updated_Thumbnail_v3/BankJ.jpg',
    link: 'https://10minuteschool.com/programs/170/bank-job/',
  },
  {
    id: 3,
    title: 'সরকারি চাকরি প্রস্তুতি বেসিক কোর্স',
    instructor: 'Akif Masumi +10',
    image: 'https://cdn.10minuteschool.com/images/skills/Updated_Thumbnail_v3/shorkari_chakri_prostuti_rac.jpg',
    link: 'https://10minuteschool.com/programs/252/govt-job-basic-prep/',
  },
  {
    id: 4,
    title: 'English for Govt. Jobs',
    instructor: 'Shahnawaz Hossain Jay',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/english-for-govt-jobs-16x9-updated.jpg',
    link: 'https://10minuteschool.com/programs/10173/english-course-for-govt-jobs-preparation/',
  },
  {
    id: 5,
    title: 'GK for Govt. Jobs',
    instructor: 'আব্দুর রহমান শ্রাবণ',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/gk-course-for-govt-jobs-thumbnail.jpg',
    link: 'https://10minuteschool.com/programs/10182/gk-for-govt-jobs/',
  },
  {
    id: 6,
    title: 'প্রাথমিক সহকারী শিক্ষক নিয়োগ পরীক্ষা কোর্স - ২০২৩',
    instructor: 'Nafis Islam +3',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/PATR23/PATR_updated_thumbnail_May_2023.jpg',
    link: 'https://10minuteschool.com/programs/10203/primary-assistant-teachers-recruitment-course/',
  },
  {
    id: 7,
    title: 'বিসিএস প্রশ্ন সমাধান',
    instructor: 'Akif Masumi +3',
    image: 'https://cdn.10minuteschool.com/images/skills/Updated_Thumbnail_v3/bcs_qs_thumbnail.jpg',
    link: 'https://10minuteschool.com/programs/179/bcs-ques-solve/',
  },
  {
    id: 8,
    title: 'ব্যাংক জবস প্রশ্ন সমাধান + মডেল টেস্ট কোর্স',
    instructor: 'Akif Masumi +2',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/bank_jobs_question_solve_course_model_test.jpg',
    link: 'https://10minuteschool.com/programs/10037/bank-jobs-question-solution-and-model-test/',
  },
  {
    id: 9,
    title: 'মিনিস্ট্রি জবস প্রশ্ন সমাধান + মডেল টেস্ট কোর্স',
    instructor: 'Akif Masumi +4',
    image: 'https://cdn.10minuteschool.com/images/thumbnails/ministry-jobs-question-solve-model-test-thumbnail.jpg',
    link: 'https://10minuteschool.com/programs/10178/ministry-jobs-exam-question-solve-and-model-test-course/',
  },
  {
    id: 10,
    title: 'বিসিএস প্রিলি মডেল টেস্ট',
    instructor: 'সামিউর রহমান +5',
    image: 'https://cdn.10minuteschool.com/images/skills/Updated_Thumbnail_v3/BCS_preli.jpg',
    link: 'https://10minuteschool.com/programs/10032/bcs-preli-mt/',
  },
];

const CourseCard = ({ course }: { course: Course }) => (
  <Link href={course.link} className="block group h-full">
    <div className="bg-card rounded-lg overflow-hidden border border-border h-full flex flex-col transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 70vw, (max-width: 1024px) 30vw, 20vw"
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-card-foreground mb-2 flex-grow text-base leading-snug">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{course.instructor}</p>
        <div className="flex items-center text-primary font-semibold text-sm mt-auto">
          বিস্তারিত <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  </Link>
);

const JobPreparationSection = () => {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 ring-1 ring-inset ring-secondary/20">
          <Briefcase className="w-4 h-4 text-secondary" />
          <p className="mb-0 text-sm font-medium text-secondary">চাকরি প্রস্তুতি</p>
        </div>
        <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
          সরকারি চাকরির সর্বোচ্চ প্রস্তুতি
        </h2>
        <p className="mb-10 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
          বিসিএস কিংবা ব্যাংকে চাকরি - টার্গেট যেটাই হোক, সলিউশন এখানেই!
        </p>

        <div className="lg:hidden">
          <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
            {jobCourses.map((course) => (
              <div className="flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-[30vw] snap-start" key={course.id}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="hidden lg:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {jobCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/jobs-prep/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            সকল কোর্স
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobPreparationSection;