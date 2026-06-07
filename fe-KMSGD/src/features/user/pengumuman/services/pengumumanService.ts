import type { Pengumuman } from "../types/pengumuman.types";

export const pengumumanFilters: string[] = ["Semua", "Pengumuman", "Kegiatan", "Prestasi"];

export const pengumumanList: Pengumuman[] = [
  {
    id: 1,
    day: 10,
    month: "Oktober",
    category: "Pengumuman",
    title: "Pengumuman Penerimaan Anggota Baru 2025",
    desc: "KMSGD membuka pendaftaran anggota baru untuk tahun akademik 2025/2026. Pendaftaran dibuka mulai 10 Oktober hingga 31 Oktober 2025.",
    author: "Admin KMSGD",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    isPenting: true,
  },
  {
    id: 2,
    day: 20,
    month: "September",
    category: "Kegiatan",
    title: "Seminar Nasional: Kepemimpinan Santri di Era Digital",
    desc: "Seminar yang menghadirkan narasumber dari berbagai universitas terkemuka, membahas peran santri dalam transformasi digital bangsa.",
    author: "Divisi Pendidikan",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
    isPenting: false,
  },
  {
    id: 3,
    day: 15,
    month: "September",
    category: "Prestasi",
    title: "Juara 1 Lomba Debat Antar Asrama Se-Jawa Barat",
    desc: "Tim debat KMSGD berhasil meraih juara pertama dalam kompetisi debat antar asrama se-Jawa Barat yang diikuti 24 tim.",
    author: "Tim Redaksi",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
    isPenting: false,
  },
  {
    id: 4,
    day: 5,
    month: "Agustus",
    category: "Pengumuman",
    title: "Perubahan Jadwal Rapat Koordinasi Bulanan",
    desc: "Rapat koordinasi bulanan yang semula dijadwalkan pada tanggal 7 Agustus diundur menjadi 12 Agustus 2025 pukul 19.00 WIB.",
    author: "Sekretaris Umum",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80",
    isPenting: true,
  },
  {
    id: 5,
    day: 1,
    month: "Agustus",
    category: "Kegiatan",
    title: "Bakti Sosial KMSGD Peduli Banjir Bekasi",
    desc: "KMSGD menerjunkan relawan dan menyalurkan bantuan logistik kepada korban banjir di wilayah Bekasi Utara.",
    author: "Divisi Sosial",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
    isPenting: false,
  },
  {
    id: 6,
    day: 20,
    month: "Juli",
    category: "Prestasi",
    title: "Mahasiswa KMSGD Raih Beasiswa LPDP 2025",
    desc: "Sebanyak 5 anggota KMSGD Jabodetabek berhasil lolos seleksi beasiswa LPDP untuk melanjutkan studi S2 di dalam dan luar negeri.",
    author: "Tim Redaksi",
    image: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=600&q=80",
    isPenting: false,
  },
  {
    id: 7,
    day: 20,
    month: "Juli",
    category: "Prestasi",
    title: "Mahasiswa KMSGD Raih Beasiswa LPDP 2025",
    desc: "Sebanyak 5 anggota KMSGD Jabodetabek berhasil lolos seleksi beasiswa LPDP untuk melanjutkan studi S2 di dalam dan luar negeri.",
    author: "Tim Redaksi",
    image: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=600&q=80",
    isPenting: false,
  },
  {
    id: 8,
    day: 20,
    month: "Juli",
    category: "Prestasi",
    title: "Mahasiswa KMSGD Raih Beasiswa LPDP 2025",
    desc: "Sebanyak 5 anggota KMSGD Jabodetabek berhasil lolos seleksi beasiswa LPDP untuk melanjutkan studi S2 di dalam dan luar negeri.",
    author: "Tim Redaksi",
    image: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=600&q=80",
    isPenting: false,
  },
];

export const filterPengumuman = (activeFilter: string): Pengumuman[] => {
  if (activeFilter === "Semua") return pengumumanList;
  return pengumumanList.filter((p) => p.category === activeFilter);
};

export const CONTENT_HEADER = {
  judul: "Pengumuman",
  deskripsi: "Informasi terbaru, edaran resmi, dan kabar penting seputar kegiatan dan keorganisasian KMSGD Jabodetabek.",
  bgImage: "Gambar",
};
