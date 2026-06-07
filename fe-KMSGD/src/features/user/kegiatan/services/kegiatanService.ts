import type { Kegiatan } from "../types/kegiatan.types";

export const CONTENT_HEADER = {
  type: "kegiatan",
  judul: "Kegiatan",
  judul2: "Kami",
  deskripsi: "Jelajahi berbagai agenda, seminar, kompetisi, dan kegiatan sosial yang diselenggarakan oleh Keluarga Mahasiswa Sunan Gunung Djati Jabodetabek.",
  bgImage: "gambar",
};

export const kegiatanFilters: string[] = ["Semua", "Spesial", "Sosial"];

export const kegiatanList: Kegiatan[] = [
  {
    id: 1,
    date: "23 May 2024",
    startTime: "08.00",
    endTime: "17.00",
    tag: "SPESIAL",
    title: "Simposium Nasional Mahasiswa Jabodetabek 2024",
    desc: "Kami melibatkan mengumpulkan panel mahasiswa se-Jabodetabek dalam pembicaraan diskusi dan selebrasi, meningkatkan lebih-lebih ekulasi akademis.",
    location: "Gedung Graha GPA Jak",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    type: "dark",
    action: "DETAIL",
    actionStyle: "gold",
  },
  {
    id: 2,
    date: "23 May 2024",
    startTime: "09.00",
    endTime: "15.00",
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
    startTime: "07.30",
    endTime: "12.00",
    tag: "SOSIAL",
    title: "Bakti Sosial KMSGD Peduli",
    desc: "Kegiatan pengabdian, dana dan penyaluran bantuan untuk panti asuhan di area pinggiran Jakarta.",
    location: "Perkotaan Eltedak",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
    type: "green",
    action: "DETAIL",
    actionStyle: "gold",
  },
  {
    id: 4,
    date: "23 May 2024",
    startTime: "07.30",
    endTime: "12.00",
    tag: "SOSIAL",
    title: "Bakti Sosial KMSGD Peduli",
    desc: "Kegiatan pengabdian, dana dan penyaluran bantuan untuk panti asuhan di area pinggiran Jakarta.",
    location: "Perkotaan Eltedak",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
    type: "green",
    action: "DETAIL",
    actionStyle: "gold",
  },
  {
    id: 5,
    date: "23 May 2024",
    startTime: "07.30",
    endTime: "12.00",
    tag: "SOSIAL",
    title: "Bakti Sosial KMSGD Peduli",
    desc: "Kegiatan pengabdian, dana dan penyaluran bantuan untuk panti asuhan di area pinggiran Jakarta.",
    location: "Perkotaan Eltedak",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
    type: "green",
    action: "DETAIL",
    actionStyle: "gold",
  },
  {
    id: 6,
    date: "23 May 2024",
    startTime: "07.30",
    endTime: "12.00",
    tag: "SOSIAL",
    title: "Bakti Sosial KMSGD Peduli",
    desc: "Kegiatan pengabdian, dana dan penyaluran bantuan untuk panti asuhan di area pinggiran Jakarta.",
    location: "Perkotaan Eltedak",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
    type: "green",
    action: "DETAIL",
    actionStyle: "gold",
  },
  {
    id: 7,
    date: "23 May 2024",
    startTime: "07.30",
    endTime: "12.00",
    tag: "SOSIAL",
    title: "Bakti Sosial KMSGD Peduli",
    desc: "Kegiatan pengabdian, dana dan penyaluran bantuan untuk panti asuhan di area pinggiran Jakarta.",
    location: "Perkotaan Eltedak",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
    type: "green",
    action: "DETAIL",
    actionStyle: "gold",
  },
  {
    id: 8,
    date: "23 May 2024",
    startTime: "07.30",
    endTime: "12.00",
    tag: "SOSIAL",
    title: "Bakti Sosial KMSGD Peduli",
    desc: "Kegiatan pengabdian, dana dan penyaluran bantuan untuk panti asuhan di area pinggiran Jakarta.",
    location: "Perkotaan Eltedak",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
    type: "green",
    action: "DETAIL",
    actionStyle: "gold",
  },
];

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
