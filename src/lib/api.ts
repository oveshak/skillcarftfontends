import axios from "axios";
import { url } from "./api/baseurl";

// 🔹 Backend base URL (env থাকলে সেটি, না থাকলে local)
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || `${url}`;

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
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// 🔹 Token type
type LoginResponse = { access: string; refresh: string; user?: any };

// ---------------------- TOKEN HANDLERS ----------------------

// export function saveTokens(tokens: LoginResponse) {
//   if (typeof window === "undefined") return;
//   localStorage.setItem("access_token", tokens.access);
//   localStorage.setItem("refresh_token", tokens.refresh);
//   if (tokens.user) localStorage.setItem("user", JSON.stringify(tokens.user));
// }
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

// export function clearTokens() {
//   if (typeof window === "undefined") return;
//   localStorage.removeItem("access_token");
//   localStorage.removeItem("refresh_token");
//   localStorage.removeItem("user");
// }

// 🔹 Check login state

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

// ---------------------- API CALLS ----------------------

// 🔹 Login API
export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/login/", { email, password });
  saveTokens(res.data);
  return res.data;
}

// 🔹 Register API
export async function registerUser(payload: Record<string, any>) {
  const res = await api.post("/users/", payload);
  return res.data;
}

// 🔹 Logout API (local clear)
export function logoutUser() {
  clearTokens();
  if (typeof window !== "undefined") {
    // optional redirect
    window.location.href = "/login";
  }
}
export function getCurrentUserId(): number {
  try {
    // 1) try from saved user object
    const raw = localStorage.getItem('user');
    if (raw) {
      const u = JSON.parse(raw);
      const idFromUser = Number(u?.id ?? u?.user?.id);
      if (Number.isFinite(idFromUser) && idFromUser > 0) return idFromUser;
    }

    // 2) fallback: decode access token (JWT)
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (token && token.split('.').length === 3) {
      const payloadBase64 = token.split('.')[1]
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      const payloadJson = JSON.parse(decodeURIComponent(escape(atob(payloadBase64))));
      // সাধারণত JWT payload-এ এগুলোর এক/একাধিক থাকে: user_id, id, sub
      const idFromJwt = Number(payloadJson?.user_id ?? payloadJson?.id ?? payloadJson?.sub);
      if (Number.isFinite(idFromJwt) && idFromJwt > 0) return idFromJwt;
    }
  } catch {
    // ignore
  }
  return 0; // না পেলে 0
}