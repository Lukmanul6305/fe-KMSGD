export type KegiatanStatus = "akan_datang" | "berlangsung" | "selesai";

export type KegiatanKategori = "Semua" | "Sosial" | "Pendidikan" | "Olahraga" | "Seni" | "Keagamaan" | "Lainnya";

export interface Kegiatan {
  id: string;
  title: string;
  description: string;
  event_date: string; // "DD MMM YYYY" 28 Jun 2025
  event_date_raw: string; // sorting: "2025-06-28"
  location: string;
  cover_image: string;
  imageAlt: string;
  category: KegiatanKategori;
  status: KegiatanStatus;
  jumlah_peserta: number;
  penanggungjawab: string;
  photos?: string[];
}
