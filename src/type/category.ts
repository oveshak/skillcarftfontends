// src/types/category.ts
export type Category = {
  id: number;
  title: string;
  description: string;
  status: boolean;
  created_at: string;
  slug: string | null;
};

export type CategoryWithSafeSlug = Category & { safeSlug: string };

export type ApiResponse = {
  success: boolean;
  status: number;
  message: string;
  error: any;
  data: {
    results: {
      token: string;
    };
  };
};

export type TokenPayload = {
  data: Category[];
};
