// utils/courseToProduct.ts
export type ProductPayload = {
  id: string;
  name: string;
  nameEn: string;
  image: string; // emoji or URL
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  meta?: Record<string, any>;
};

export function courseToProduct(courseJson: any): ProductPayload {
  const c = courseJson?.data ?? courseJson;

  return {
    id: String(c?.id ?? 'course-1'),
    name: String(c?.title ?? 'কোর্স'),
    nameEn: String(c?.slug ?? 'Course'),
    image: String(c?.course_thumbnail ?? '📚'),
    originalPrice: Number(c?.price ?? c?.offer_price ?? 0),
    discountedPrice: Number(c?.offer_price ?? c?.price ?? 0),
    quantity: 1,
    meta: {
      intro_video_url: c?.intro_video_url ?? null,
      milestone_count: c?.milestone_count ?? 0,
      module_count: c?.module_count ?? 0,
      video_count: c?.video_count ?? 0,
    },
  };
}
