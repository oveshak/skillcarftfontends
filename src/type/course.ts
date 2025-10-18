// src/types/course.ts
export type IdTS = string; // ISO string

export interface CourseContent {
  id: number;
  status: boolean;
  created_at: IdTS;
  is_deleted: boolean;
  title: string;
  thumbnail?: string | null;
  content_type: "video" | "pdf" | "text" | string;
  subtitle?: string | null;
  description?: string | null;
  preview?: boolean;
  source?: string | null;
  installment_status?: number[];
}

export interface CourseModule {
  id: number;
  contents: CourseContent[];
  status: boolean;
  created_at: IdTS;
  is_deleted: boolean;
  title: string;
}

export interface CourseMilestone {
  id: number;
  modules: CourseModule[];
  status: boolean;
  created_at: IdTS;
  is_deleted: boolean;
  title: string;
}

export interface CertificateSubtitle {
  id: number;
  status: boolean;
  created_at: IdTS;
  is_deleted: boolean;
  title: string;
}

export interface CourseCertificate {
  id: number;
  status: boolean;
  created_at: IdTS;
  is_deleted: boolean;
  title: string;
  image: string;
  subtitle: CertificateSubtitle[];
}

export interface ExclusiveFeature {
  id: number;
  status: boolean;
  created_at: IdTS;
  is_deleted: boolean;
  title: string;
  image: string;
  subtitle: CertificateSubtitle[];
}

export interface FreeGuideline {
  id: number;
  status: boolean;
  created_at: IdTS;
  is_deleted: boolean;
  title: string;
  subtitle: string;
  coursegidline_image?: string;
  gidline_pdf?: string;
}

export interface KVSimple {
  id: number;
  status: boolean;
  created_at: IdTS;
  is_deleted: boolean;
}

export interface CourseFee extends KVSimple {
  type_name: "paid" | "free" | string;
}

export interface CourseType extends KVSimple {
  type_name: string; // Online, Offline
}

export interface CourseLevel extends KVSimple {
  level_name: string; // Beginner, etc.
}

export interface CourseReview {
  id: number;
  name: string;
  desc: string;
  star: number; // 1..5
  created_at: IdTS;
}

export interface QnA extends KVSimple {
  questions: string;
  answear: string; // html
}

export interface StructureCard extends KVSimple {
  title: string;
  subtitle: string;
  image?: string;
}

export interface Instructor extends KVSimple {
  name: string;
  designation?: string;
  profile_image?: string;
  bio?: string;
}

export interface Topic extends KVSimple {
  title: string;
}

export interface Audience extends KVSimple {
  title: string;
}

export interface Prerequisite extends KVSimple {
  title: string;
  icon?: string;
}

export interface Course {
  id: number;
  title: string;
  description?: string; // html
  course_thumbnail?: string;
  slug: string;

  status: boolean;
  created_at: IdTS;
  is_deleted: boolean;

  intro_title?: string;
  intro_video_url?: string;

  price?: number | null;
  offer_price?: number | null;

  student_amount?: number | null;
  total_students?: number | null;
  remaining_students?: number | null;

  milestone_count: number;
  module_count: number;
  video_count: number;
  quiz_count: number;

  milestones: CourseMilestone[];

  course_certificate?: CourseCertificate | null;
  course_exclusive_feature?: ExclusiveFeature | null;
  course_free_gidline?: FreeGuideline | null;

  course_fee?: CourseFee | null;
  course_type?: CourseType | null;
  course_level?: CourseLevel | null;

  course_review?: CourseReview[];
  course_details_faqs?: QnA[];

  course_structure?: StructureCard[];

  course_instructor?: Instructor[];

  course_topics?: Topic[];

  course_faqs?: QnA[];

  course_audiences?: Audience[];

  prerequisites?: Prerequisite[];
}


export interface HeroBannerProps { course: Course | null; }
export interface CourseInfoSidebarProps { course: Course | null; }
export interface InstructorSectionProps { instructors: Instructor[]; }
export interface CourseStructureProps { cards: StructureCard[]; }
export interface LearningOutcomesProps { topics: Topic[]; audiences: Audience[]; }
export interface CourseDetailsProps { htmlDescription?: string; introTitle?: string; introVideoUrl?: string; }
export interface ContentPreviewProps { milestones: CourseMilestone[]; }
export interface ExclusiveFeaturesProps { feature: ExclusiveFeature | null | undefined; }
export interface CertificateSectionProps { certificate: CourseCertificate | null | undefined; }
export interface TestimonialsProps { reviews: CourseReview[]; }
export interface RequirementsSectionProps { prerequisites: Prerequisite[]; }
export interface FaqSectionProps { faqs: QnA[]; }
export interface RelatedCoursesProps { currentSlug?: string; level?: string; typeName?: string; }