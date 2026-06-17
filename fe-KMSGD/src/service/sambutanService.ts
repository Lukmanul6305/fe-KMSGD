import axiosPublic from "../lib/axiosPublic";

export interface PengurusIntiData {
  id: number;
  periodeId: number;
  nama: string;
  jabatan: string;
  slogan: string | null;
  image: string | null;
}

export interface PeriodeData {
  id: number;
  periode: string;
  status: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface SambutanDisplayData {
  nama: string;
  jabatan: string;
  isi: string;
  image: string | null;
}

export async function getSambutan(): Promise<SambutanDisplayData | null> {
  try {
    // 1. Dapatkan periode aktif
    const resPeriode = await axiosPublic.get<ApiResponse<PeriodeData>>("/kepengurusan/periode/aktif");
    const periodeAktif = resPeriode.data.data;
    if (!periodeAktif) return null;

    // 2. Dapatkan pengurus inti pada periode aktif tersebut
    const resPengurus = await axiosPublic.get<ApiResponse<PengurusIntiData[]>>(`/kepengurusan/inti`, {
      params: { periodeId: periodeAktif.id }
    });
    
    // 3. Cari yang jabatannya adalah Ketua Umum
    const ketuaUmum = resPengurus.data.data.find(
      (p) => p.jabatan.toLowerCase() === "ketua umum"
    );

    if (!ketuaUmum) return null;

    return {
      nama: ketuaUmum.nama,
      jabatan: ketuaUmum.jabatan,
      isi: ketuaUmum.slogan || "Tidak ada sambutan",
      image: ketuaUmum.image
    };

  } catch (error) {
    console.error("Failed to fetch sambutan dari pengurus inti:", error);
    return null;
  }
}

