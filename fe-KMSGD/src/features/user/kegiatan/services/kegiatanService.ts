import type { Kegiatan, KegiatanKategori } from "../types/kegiatan.types";

export const kegiatanFilters: KegiatanKategori[] = ["Semua", "Sosial", "Pendidikan", "Olahraga", "Seni", "Keagamaan", "Lainnya"];

export const kegiatanList: Kegiatan[] = [
  {
    id: "1",
    title: "Halal Bihalal KMSGD 2025",
    description: "Acara silaturahmi tahunan seluruh anggota KMSGD Jabodetabek dalam rangka Hari Raya Idul Fitri 1446 H. Dihadiri oleh alumni, pengurus, dan anggota aktif.",
    event_date: "20 Apr 2025",
    event_date_raw: "2025-04-20",
    location: "Gedung Serbaguna Asrama",
    cover_image: "https://placehold.co/800x500/1a1a1a/ffd700?text=Halal+Bihalal",
    imageAlt: "Foto Halal Bihalal KMSGD 2025",
    category: "Keagamaan",
    status: "selesai",
    jumlah_peserta: 120,
    penanggungjawab: "Ahmad Fauzi",
  },
  {
    id: "2",
    title: "Lomba Karya Tulis Ilmiah Antar Asrama",
    description: "Kompetisi LKTI tingkat asrama se-Jabodetabek. Peserta mempresentasikan karya di hadapan dewan juri dari akademisi dan praktisi.",
    event_date: "15 Jun 2025",
    event_date_raw: "2025-06-15",
    location: "Aula Universitas Islam Negeri Jakarta",
    cover_image: "https://placehold.co/400x300/1a1a1a/ffd700?text=LKTI+2025",
    imageAlt: "Foto LKTI 2025",
    category: "Pendidikan",
    status: "akan_datang",
    jumlah_peserta: 60,
    penanggungjawab: "Siti Rahayu",
  },
  {
    id: "3",
    title: "Bakti Sosial Ramadhan",
    description: "Kegiatan berbagi sembako dan santunan anak yatim di sekitar lingkungan asrama selama bulan Ramadhan.",
    event_date: "10 Mar 2025",
    event_date_raw: "2025-03-10",
    location: "Kelurahan Cipayung, Jakarta Timur",
    cover_image: "https://placehold.co/400x300/1a1a1a/ffd700?text=Baksos",
    imageAlt: "Foto Bakti Sosial",
    category: "Sosial",
    status: "selesai",
    jumlah_peserta: 45,
    penanggungjawab: "Rizky Maulana",
  },
  {
    id: "4",
    title: "Turnamen Futsal Internal KMSGD",
    description: "Turnamen futsal antar divisi untuk mempererat kebersamaan anggota dan menjaga kebugaran fisik.",
    event_date: "28 Jun 2025",
    event_date_raw: "2025-06-28",
    location: "Lapangan Futsal Asrama",
    cover_image: "https://placehold.co/400x300/1a1a1a/ffd700?text=Futsal",
    imageAlt: "Foto Turnamen Futsal",
    category: "Olahraga",
    status: "akan_datang",
    jumlah_peserta: 80,
    penanggungjawab: "Deden Suryana",
  },
  {
    id: "5",
    title: "Malam Kesenian & Budaya Sunda",
    description: "Penampilan seni budaya Sunda oleh anggota KMSGD: tari jaipongan, calung, dan musikalisasi puisi Sunda.",
    event_date: "05 Mei 2025",
    event_date_raw: "2025-05-05",
    location: "Taman Budaya Asrama",
    cover_image: "https://placehold.co/400x300/1a1a1a/ffd700?text=Kesenian",
    imageAlt: "Foto Malam Kesenian",
    category: "Seni",
    status: "berlangsung",
    jumlah_peserta: 95,
    penanggungjawab: "Neng Fitriani",
  },
];

const statusPriority: Record<string, number> = {
  berlangsung: 0,
  akan_datang: 1,
  selesai: 2,
};

const sortedKegiatanList = [...kegiatanList].sort((a, b) => {
  if (a.status !== b.status) {
    return statusPriority[a.status] - statusPriority[b.status];
  }

  const dateA = new Date(a.event_date_raw).getTime();
  const dateB = new Date(b.event_date_raw).getTime();

  if (a.status === "akan_datang") {
    return dateA - dateB;
  }

  if (a.status === "selesai") {
    return dateB - dateA;
  }

  return 0;
});

export const featuredKegiatan = sortedKegiatanList[0];
export const secondaryKegiatan = sortedKegiatanList[1];
export const smallKegiatanList = sortedKegiatanList.slice(2);
