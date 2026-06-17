import axiosPublic from "@/lib/axiosPublic";

import type { PengurusInti, AnggotaDepartemen, Sambutan } from "../types/kepengurusanTypes";

interface PeriodeAktif {
  id: number;
  nama: string;
}

async function getPeriodeAktifPublic(): Promise<PeriodeAktif> {
  const res = await axiosPublic.get<{ data: PeriodeAktif }>("/kepengurusan/periode/aktif");
  return res.data.data;
}

export async function getPengurusInti(): Promise<PengurusInti[]> {
  const periode = await getPeriodeAktifPublic();
  const res = await axiosPublic.get<{ data: PengurusInti[] }>("/kepengurusan/inti", {
    params: { periodeId: periode.id },
  });
  return res.data.data;
}

export async function getAnggotaDepartemen(departemenId?: number): Promise<AnggotaDepartemen[]> {
  const res = await axiosPublic.get<{ data: AnggotaDepartemen[] }>("/kepengurusan/anggota", {
    params: departemenId ? { departemenId } : undefined,
  });
  return res.data.data;
}

export async function getSambutan(): Promise<Sambutan[]> {
  const res = await axiosPublic.get<{ data: Sambutan[] }>("/sambutan");
  return res.data.data;
}

export async function getSemuaPeriode(): Promise<import("../types/kepengurusanTypes").PeriodeOrganisasi[]> {
  const res = await axiosPublic.get<{ data: import("../types/kepengurusanTypes").PeriodeOrganisasi[] }>("/kepengurusan/periode");
  return res.data.data;
}

export async function getDepartemenAktif(): Promise<import("../types/kepengurusanTypes").Departemen[]> {
  const res = await axiosPublic.get<{ data: import("../types/kepengurusanTypes").Departemen[] }>("/kepengurusan/departemen/aktif");
  return res.data.data;
}
