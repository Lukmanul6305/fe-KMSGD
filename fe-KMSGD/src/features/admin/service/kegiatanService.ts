import axiosAdmin from "./axiosAdmin";
import type { Kegiatan, KategoriKegiatan, Departemen, CreateKegiatanPayload } from "../kegiatan/kegiatanTypes";

const BASE = "/kegiatan";

// ─── KEGIATAN ────────────────────────────────────────────────────────────────

/** Public — hanya yang isPublished */
export async function getKegiatan(): Promise<Kegiatan[]> {
  const res = await axiosAdmin.get<{ data: Kegiatan[] }>(BASE);
  return res.data.data;
}

/** Admin — semua kegiatan termasuk draft */
export async function getKegiatanAdmin(): Promise<Kegiatan[]> {
  const res = await axiosAdmin.get<{ data: Kegiatan[] }>(`${BASE}/admin/all`);
  return res.data.data;
}

export async function getKegiatanById(id: number): Promise<Kegiatan> {
  const res = await axiosAdmin.get<{ data: Kegiatan }>(`${BASE}/admin/${id}`);
  return res.data.data;
}

/** Kegiatan berdasarkan departemen (public) */
export async function getKegiatanByDepartemen(departemenId: number): Promise<Kegiatan[]> {
  const res = await axiosAdmin.get<{ data: Kegiatan[] }>(`${BASE}/departemen/${departemenId}`);
  return res.data.data;
}

// ─── KATEGORI KEGIATAN ────────────────────────────────────────────────────────

export async function getKategori(): Promise<KategoriKegiatan[]> {
  const res = await axiosAdmin.get<{ data: KategoriKegiatan[] }>("/kategori-kegiatan");
  return res.data.data;
}

export async function createKategori(payload: { nama: string }): Promise<KategoriKegiatan> {
  const res = await axiosAdmin.post<{ data: KategoriKegiatan }>("/kategori-kegiatan", payload);
  return res.data.data;
}

export async function updateKategori(id: number, payload: { nama: string }): Promise<KategoriKegiatan> {
  const res = await axiosAdmin.put<{ data: KategoriKegiatan }>(`/kategori-kegiatan/${id}`, payload);
  return res.data.data;
}

export async function deleteKategori(id: number): Promise<void> {
  await axiosAdmin.delete(`/kategori-kegiatan/${id}`);
}

// ─── DEPARTEMEN ───────────────────────────────────────────────────────────────

/** Semua departemen (admin) */
export async function getDepartemen(): Promise<Departemen[]> {
  const res = await axiosAdmin.get<{ data: Departemen[] }>("/kepengurusan/departemen");
  return res.data.data;
}

/** Departemen dari periode aktif saja */
export async function getDepartemenAktif(): Promise<Departemen[]> {
  const res = await axiosAdmin.get<{ data: Departemen[] }>("/kepengurusan/departemen/aktif");
  return res.data.data;
}

// ─── FORM DATA BUILDER ────────────────────────────────────────────────────────

function buildFormData(payload: Omit<CreateKegiatanPayload, "file"> & { file?: File | null }): FormData {
  const { file, speakers, ...rest } = payload;
  const fd = new FormData();

  Object.entries(rest).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") {
      fd.append(key, String(val));
    }
  });

  // speakers dikirim sebagai JSON string
  fd.append("speakers", JSON.stringify(speakers ?? []));

  if (file) fd.append("image", file);

  return fd;
}

export async function createKegiatan(payload: CreateKegiatanPayload): Promise<Kegiatan> {
  const fd = buildFormData(payload);
  const res = await axiosAdmin.post<{ data: Kegiatan }>(BASE, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
}

export async function updateKegiatan(id: number, payload: Partial<CreateKegiatanPayload>): Promise<Kegiatan> {
  const fd = buildFormData(payload as CreateKegiatanPayload);
  const res = await axiosAdmin.put<{ data: Kegiatan }>(`${BASE}/${id}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
}

export async function deleteKegiatan(id: number): Promise<void> {
  await axiosAdmin.delete(`${BASE}/${id}`);
}
