// src/hooks/useCourseData.ts
"use client";

import useSWR from "swr";
import { fetchCourseTokenBySlug } from "./CoursesFetcher";
import { decodeToken } from "@/lib/jwtdecoder/decodeToken";


type Course = Record<string, any>;

async function fetcher(slug: string): Promise<Course> {
  const token = await fetchCourseTokenBySlug(slug);
  return decodeToken<Course>(token);
}

export function useCourseData(slug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug ? ["course", slug] : null,
    ([, s]) => fetcher(s),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30_000, // 30s
      shouldRetryOnError: true,
      errorRetryInterval: 2000,
      errorRetryCount: 3,
    }
  );

  return {
    course: data ?? null,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refresh: mutate,
  };
}
