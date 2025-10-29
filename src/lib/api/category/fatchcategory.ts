
"server-only"
import { cache } from "react";
import { url } from "../baseurl";



/** lightweight JWT decode (middle part only) */
function decodeJwt<T = unknown>(token: string): T {
  const [, payload] = token.split(".");
  const json = Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
  return JSON.parse(json) as T;
}

export type Category = {
  id: number;
  title: string;
  description: string;
  status: boolean;
  created_at: string;
  slug: string | null;
};
export type CategoryWithSafeSlug = Category & { safeSlug: string };

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)+/g,"");
}

type ApiResponse = {
  data: { results: { token: string } };
};

type TokenPayload = { data: Category[] };

/** মূল ফেচ (tagged, revalidate) */
const _fetchAll = cache(async () => {
  const res = await fetch(`${url}/category/`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300, tags: ["categories"] }, // 5 min ISR + ট্যাগ
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = (await res.json()) as ApiResponse;

  const payload = decodeJwt<TokenPayload>(json.data.results.token);
  const list = (payload?.data ?? []).map<CategoryWithSafeSlug>((c) => ({
    ...c,
    safeSlug: c.slug && c.slug.trim() ? c.slug : `${slugify(c.title)}-${c.id}`,
  }));
  return list;
});

/** ✅ All categories (cached) */
export const getAllCategories = async () => _fetchAll();

/** ✅ Single by slug (একই ক্যাশড ডেটা থেকে খুঁজে দিচ্ছে) */
export const getCategoryBySlug = async (slug: string) => {
  const all = await _fetchAll();
  let found = all.find((c) => c.safeSlug === slug);
  if (found) return found;
  const maybeId = Number(slug.split("-").pop());
  if (!Number.isNaN(maybeId)) found = all.find((c) => c.id === maybeId);
  return found ?? null;
};
