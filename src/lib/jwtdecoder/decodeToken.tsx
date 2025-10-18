// src/lib/jwt.ts
import { jwtDecode } from "jwt-decode";

type JwtPayload<T = unknown> = { data?: T; [k: string]: any };

export function decodeToken<T = unknown>(token: string): T {
  const payload = jwtDecode<JwtPayload<T>>(token);
  if (!payload?.data) throw new Error("Invalid token payload: data missing");
  return payload.data as T;
}
