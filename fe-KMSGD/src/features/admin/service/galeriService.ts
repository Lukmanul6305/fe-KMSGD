import axiosAdmin from "./axiosAdmin";
import type { Galeri, CreateGaleriPayload } from "../galeri/galeriType";

const BASE = "/galeri";

export async function getGaleri(): Promise<Galeri[]> {
  const res = await axiosAdmin.get<{ data: Galeri[] }>(BASE);
  return res.data.data;
}

export async function getGaleriAdmin(): Promise<Galeri[]> {
  const res = await axiosAdmin.get(BASE);

  return res.data.data.data;
}

export async function getGaleriById(id: number): Promise<Galeri> {
  const res = await axiosAdmin.get<{ data: Galeri }>(`${BASE}/${id}`);
  return res.data.data;
}

function buildFormData(payload: CreateGaleriPayload): FormData {
  const { file, ...rest } = payload;
  const fd = new FormData();

  Object.entries(rest).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") {
      fd.append(key, String(val));
    }
  });

  if (file) fd.append("image", file);

  return fd;
}

export async function createGaleri(payload: CreateGaleriPayload): Promise<Galeri> {
  const fd = buildFormData(payload);
  const res = await axiosAdmin.post<{ data: Galeri }>(BASE, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
}

export async function updateGaleri(id: number, payload: Partial<CreateGaleriPayload>): Promise<Galeri> {
  const fd = buildFormData(payload as CreateGaleriPayload);
  const res = await axiosAdmin.put<{ data: Galeri }>(`${BASE}/${id}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
}

export async function deleteGaleri(id: number): Promise<void> {
  await axiosAdmin.delete(`${BASE}/${id}`);
}
