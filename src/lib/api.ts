// lib/api.ts
import axios from "axios";
import {jwtDecode} from "jwt-decode";

// 🔹 Backend base URL (env থাকলে সেটি, না থাকলে local)
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";

// 🔹 Axios instance তৈরি
export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Access token attach করে request পাঠানো
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = config.headers || {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ---------- Types ----------
export type LoginResponse = { access: string; refresh: string; user?: any };

// ---------- TOKEN HANDLERS ----------
export function saveTokens(tokens: LoginResponse) {
  if (typeof window === "undefined") return;
  localStorage.setItem("access_token", tokens.access);
  localStorage.setItem("refresh_token", tokens.refresh);
  if (tokens.user) localStorage.setItem("user", JSON.stringify(tokens.user));
  // 🔔 notify same-tab listeners instantly
  window.dispatchEvent(new Event("auth:changed"));
}

export function getTokens() {
  if (typeof window === "undefined") return { access: null, refresh: null };
  return {
    access: localStorage.getItem("access_token"),
    refresh: localStorage.getItem("refresh_token"),
  };
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  // 🔔 notify same-tab listeners instantly
  window.dispatchEvent(new Event("auth:changed"));
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  const access = localStorage.getItem("access_token");
  return !!access;
}

// ---------- Auth APIs ----------
export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/login/", { email, password });
  saveTokens(res.data);
  return res.data;
}

export async function registerUser(payload: Record<string, any>) {
  const res = await api.post("/users/", payload);
  return res.data;
}

export function logoutUser() {
  clearTokens();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

// ---------- Safer user id via jwt-decode ----------
type JwtBasicPayload = {
  user_id?: number | string;
  id?: number | string;
  sub?: number | string;
  [k: string]: unknown;
};

export function getCurrentUserId(): number {
  try {
    // (1) Try saved user object first
    const raw = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (raw) {
      const u = JSON.parse(raw);
      const idFromUser = Number(u?.id ?? u?.user?.id);
      if (Number.isFinite(idFromUser) && idFromUser > 0) return idFromUser;
    }

    // (2) Fallback: decode access token (JWT) using jwt-decode
    const token =
      (typeof window !== "undefined" && localStorage.getItem("access_token")) ||
      (typeof window !== "undefined" && sessionStorage.getItem("access_token"));

    if (token) {
      const payload = jwtDecode<JwtBasicPayload>(token);
      const idFromJwt = Number(payload?.user_id ?? payload?.id ?? payload?.sub);
      if (Number.isFinite(idFromJwt) && idFromJwt > 0) return idFromJwt;
    }
  } catch {
    // ignore
  }
  return 0;
}
