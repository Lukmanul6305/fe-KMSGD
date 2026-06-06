export type CategoryType = "Pengumuman" | "Kegiatan" | "Prestasi";

export interface Pengumuman {
  id: number;
  day: number;
  month: string;
  category: CategoryType;
  title: string;
  desc: string;
  author: string;
  image: string;
  isPenting: boolean;
}
