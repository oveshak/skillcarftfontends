"use client";

import { useEffect, useMemo, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

/** API raw type */
export type ApiCourse = {
  id: number;
  title: string;
  slug: string;
  created_at?: string;
  price: number | null;
  offer_price: number | null;
  course_thumbnail?: string;
  course_fee?: { type_name?: string | null } | null;
};

/** Grid কার্ড ভার্সন (FreelancingSection) */
export type Course = {
  title: string;
  image: string;
  href: string;
  isFree?: boolean;
  price?: number;
  badge?: string;
};

/** Horizontal স্ক্রল কার্ড ভার্সন (SscHscCourses) */
export type UiCourse = {
  title: string;
  imageUrl: string;
  link: string;
  isFree?: boolean;
  price?: number;
  badge?: string;
};

type RenderProps = (args: {
  loading: boolean;
  err: string | null;
  /** flat list (SscHscCourses) */
  courses: UiCourse[];
  /** split lists (FreelancingSection) */
  paidCourses: Course[];
  freeCourses: Course[];
}) => ReactNode;

function decodeTokenData<T = unknown>(token?: string | null): T | null {
  if (!token) return null;
  try {
    const raw = token.startsWith("Bearer ") ? token.slice(7) : token;
    const payload = jwtDecode<{ data?: T }>(raw);
    return (payload?.data as T) ?? null;
  } catch {
    return null;
  }
}

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=225&fit=crop&crop=center";

export default function CoursesFetcher({ children }: { children: RenderProps }) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [rawCourses, setRawCourses] = useState<ApiCourse[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setErr(null);
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";
        const res = await fetch(`${base}/courses?depth=3`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const token: string | undefined = json?.data?.results?.token;

        const decoded = decodeTokenData<ApiCourse[]>(token);
        setRawCourses(Array.isArray(decoded) ? decoded : []); // always array
      } catch (e: any) {
        setErr(e?.message || "Failed to load courses");
        setRawCourses([]); // safe fallback
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  /** common mapped model (single pass) */
  const mappedCommon = useMemo(() => {
    return (rawCourses ?? []).map((c) => {
      const typeName = (c.course_fee?.type_name ?? "").toString().toLowerCase();
      const isFree = typeName === "free" || ((c.price ?? 0) === 0 && (c.offer_price ?? 0) === 0);
      const price = isFree ? undefined : (c.offer_price ?? undefined) || (c.price ?? undefined);

      let badge: string | undefined;
      const created = c.created_at ? new Date(c.created_at) : null;
      const days = created ? (Date.now() - created.getTime()) / 86400000 : Infinity;
      if (!isFree && (c.offer_price ?? 0) > 0 && (c.offer_price ?? 0) < (c.price ?? 0)) {
        badge = "HOT";
      } else if (days <= 30) {
        badge = "NEW";
      }

      const image = c.course_thumbnail || FALLBACK_IMG;
      const href = `/courses/${c.slug}`;
      const link = href; // same path, দুই কম্পোনেন্টেই interal route

      return {
        title: c.title,
        image,
        href,
        link,
        isFree,
        price,
        badge,
      };
    });
  }, [rawCourses]);

  /** split for FreelancingSection */
  const paidCourses: Course[] = useMemo(
    () =>
      mappedCommon
        .filter((x) => !x.isFree)
        .map(({ title, image, href, isFree, price, badge }) => ({
          title,
          image,
          href,
          isFree,
          price,
          badge,
        })),
    [mappedCommon]
  );

  const freeCourses: Course[] = useMemo(
    () =>
      mappedCommon
        .filter((x) => x.isFree)
        .map(({ title, image, href, isFree, price, badge }) => ({
          title,
          image,
          href,
          isFree,
          price,
          badge,
        })),
    [mappedCommon]
  );

  /** flat list for SscHscCourses */
  const courses: UiCourse[] = useMemo(
    () =>
      mappedCommon.map(({ title, image, link, isFree, price, badge }) => ({
        title,
        imageUrl: image,
        link,
        isFree,
        price,
        badge,
      })),
    [mappedCommon]
  );

  return <>{children({ loading, err, courses, paidCourses, freeCourses })}</>;
}


// src/lib/courseApi.ts
// src/lib/courseApi.ts
export async function fetchCourseTokenBySlug(slug: string) {
  const url = `http://127.0.0.1:8000/courses/${encodeURIComponent(slug)}?depth=3`;

  const res = await fetch(url, {
    // dev-এ স্টেল ডাটা আটকাতে
    cache: "no-store",
    // CORS থাকলে cred দরকার হলে:
    // credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Fetch failed ${res.status}: ${await res.text()}`);
  }

  const json = await res.json();

  const token =
    json?.data?.results?.token ??
    json?.data?.token ??
    json?.results?.token ??
    json?.token;

  if (!token) throw new Error("Token not found in API response");
  return token as string;
}

