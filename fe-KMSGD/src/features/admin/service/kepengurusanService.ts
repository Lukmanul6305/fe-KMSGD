import axiosAdmin from "./axiosAdmin";
import type { PeriodeOrganisasi, CreatePeriodeDto, UpdatePeriodeDto, Departemen, CreateDepartemenDto, UpdateDepartemenDto, PengurusInti, AnggotaDepartemen } from "../kepengurusan/kepengurusanTypes";

const BASE_URL = "/kepengurusan";

// --- PERIODE ---
export async function getPeriode(): Promise<PeriodeOrganisasi[]> {
  const res = await axiosAdmin.get<{ data: PeriodeOrganisasi[] }>(`${BASE_URL}/periode`);
  return res.data.data || [];
}

export async function getPeriodeAktif(): Promise<PeriodeOrganisasi> {
  const res = await axiosAdmin.get<{ data: PeriodeOrganisasi }>(`${BASE_URL}/periode/aktif`);
  return res.data.data;
}

export async function createPeriode(payload: CreatePeriodeDto): Promise<PeriodeOrganisasi> {
  const res = await axiosAdmin.post<{ data: PeriodeOrganisasi }>(`${BASE_URL}/periode`, payload);
  return res.data.data;
}

export async function updatePeriode(id: number, payload: UpdatePeriodeDto): Promise<PeriodeOrganisasi> {
  const res = await axiosAdmin.put<{ data: PeriodeOrganisasi }>(`${BASE_URL}/periode/${id}`, payload);
  return res.data.data;
}

export async function deletePeriode(id: number): Promise<void> {
  await axiosAdmin.delete(`${BASE_URL}/periode/${id}`);
}

// --- DEPARTEMEN ---
// Asumsi: GET departemen by periodeId
export async function getDepartemenByPeriode(periodeId: number): Promise<Departemen[]> {
  const res = await axiosAdmin.get<{ data: Departemen[] }>(`${BASE_URL}/departemen?periodeId=${periodeId}`);
  return res.data.data || [];
}

export async function createDepartemen(payload: CreateDepartemenDto): Promise<Departemen> {
  const res = await axiosAdmin.post<{ data: Departemen }>(`${BASE_URL}/departemen`, payload);
  return res.data.data;
}

export async function updateDepartemen(id: number, payload: UpdateDepartemenDto): Promise<Departemen> {
  const res = await axiosAdmin.put<{ data: Departemen }>(`${BASE_URL}/departemen/${id}`, payload);
  return res.data.data;
}

export async function deleteDepartemen(id: number): Promise<void> {
  await axiosAdmin.delete(`${BASE_URL}/departemen/${id}`);
}

// --- PENGURUS INTI (BPI) ---
// Asumsi: GET pengurus inti by periodeId
export async function getPengurusIntiByPeriode(periodeId: number): Promise<PengurusInti[]> {
  const res = await axiosAdmin.get<{ data: PengurusInti[] }>(`${BASE_URL}/inti?periodeId=${periodeId}`);
  return res.data.data || [];
}

export async function createPengurusInti(payload: FormData): Promise<PengurusInti> {
  const res = await axiosAdmin.post<{ data: PengurusInti }>(`${BASE_URL}/inti`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
}

export async function updatePengurusInti(id: number, payload: FormData): Promise<PengurusInti> {
  const res = await axiosAdmin.put<{ data: PengurusInti }>(`${BASE_URL}/inti/${id}`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
}

export async function deletePengurusInti(id: number): Promise<void> {
  await axiosAdmin.delete(`${BASE_URL}/inti/${id}`);
}

// --- ANGGOTA DEPARTEMEN ---
export async function createAnggota(payload: FormData): Promise<AnggotaDepartemen> {
  const res = await axiosAdmin.post<{ data: AnggotaDepartemen }>(`${BASE_URL}/anggota`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
}

export async function updateAnggota(id: number, payload: FormData): Promise<AnggotaDepartemen> {
  const res = await axiosAdmin.put<{ data: AnggotaDepartemen }>(`${BASE_URL}/anggota/${id}`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
}

export async function deleteAnggota(id: number): Promise<void> {
  await axiosAdmin.delete(`${BASE_URL}/anggota/${id}`);
}
