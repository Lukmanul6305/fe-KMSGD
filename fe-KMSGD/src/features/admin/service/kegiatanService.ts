import axiosAdmin from "./axiosAdmin";
import type { Kegiatan, CreateKegiatanPayload } from "../kegiatan/kegiatanTypes";

const BASE = "/kegiatan";

export async function getKegiatan(): Promise<Kegiatan[]> {
  const res = await axiosAdmin.get<{ data: Kegiatan[] }>(BASE);
  return res.data.data;
}

export async function getKegiatanById(id: number): Promise<Kegiatan> {
  const res = await axiosAdmin.get<{ data: Kegiatan }>(`${BASE}/${id}`);
  return res.data.data;
}

export async function createKegiatan(payload: CreateKegiatanPayload): Promise<Kegiatan> {
  const res = await axiosAdmin.post<{ data: Kegiatan }>(BASE, payload);
  return res.data.data;
}

export async function updateKegiatan(id: number, payload: Partial<CreateKegiatanPayload>): Promise<Kegiatan> {
  const res = await axiosAdmin.put<{ data: Kegiatan }>(`${BASE}/${id}`, payload);
  return res.data.data;
}

export async function deleteKegiatan(id: number): Promise<void> {
  await axiosAdmin.delete(`${BASE}/${id}`);
}
