import axiosAdmin from "./axiosAdmin";
import type { LoginPayload, LoginResponse } from "../auth/authTypes";

export async function loginAdmin(payload: LoginPayload): Promise<LoginResponse> {
  const res = await axiosAdmin.post<LoginResponse>("/auth/login", payload);
  return res.data;
}

export async function logoutAdmin(): Promise<void> {
  await axiosAdmin.post("/auth/logout");
}

export async function checkAuth(): Promise<boolean> {
  try {
    await axiosAdmin.get("/auth/me");
    return true;
  } catch {
    return false;
  }
}
