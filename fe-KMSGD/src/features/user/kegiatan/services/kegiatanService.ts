import type { Kegiatan, FooterLink } from "../types/kegiatan.types";

export const kegiatanFilters: string[] = ["Semua", "Spesial", "Sosial"];

export const kegiatanList: Kegiatan[] = [
  {
    id: 1,
    date: "23 May 2024",
    tag: "SPESIAL",
    title: "Simposium Nasional Mahasiswa Jabodetabek 2024",
    desc: "Kami melibatkan mengumpulkan panel mahasiswa se-Jabodetabek dalam pembicaraan diskusi dan selebrasi, meningkatkan lebih-lebih ekulasi akademis.",
    location: "Gedung Graha GPA Jak",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    type: "dark",
    action: "DAFTAR",
    actionStyle: "gold",
  },
  {
    id: 2,
    date: "23 May 2024",
    tag: "SPESIAL",
    title: "Kompetisi Debat Mahasiswa Nasional",
    desc: "Ajang adu gagasan antar mahasiswa se-Jabodetabek dengan tema-tema perbincangan berstandar jelas.",
    location: "Aula Ilmu Perpustakaan Nasional",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
    type: "dark",
    action: "DETAIL",
    actionStyle: "outline",
  },
  {
    id: 3,
    date: "23 May 2024",
    tag: "SOSIAL",
    title: "Bakti Sosial KMSGD Peduli",
    desc: "Kegiatan pengabdian, dana dan penyaluran bantuan untuk panti asuhan di area pinggiran Jakarta.",
    location: "Perkotaan Eltedak",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
    type: "green",
    action: "DAFTAR",
    actionStyle: "gold",
  },
];

export const footerLinks: FooterLink = {
  "Tautan Cepat": ["Tentang Kami", "Struktur Organisasi", "Program Kerja"],
  "Media Sosial": ["Instagram", "Twitter", "YouTube"],
};

export const filterKegiatan = (activeTab: string): Kegiatan[] => {
  if (activeTab === "Semua") return kegiatanList;
  return kegiatanList.filter((e) => e.tag === activeTab.toUpperCase());
};

const getDateTime = (date: string): number => {
  const time = new Date(date).getTime();
  return Number.isNaN(time) ? 0 : time;
};

export const getLatestKegiatan = (limit = 3): Kegiatan[] =>
  [...kegiatanList]
    .sort((a, b) => {
      const dateDiff = getDateTime(b.date) - getDateTime(a.date);
      return dateDiff || b.id - a.id;
    })
    .slice(0, limit);
