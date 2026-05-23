import { useState } from "react";
import { pengumumanFilters, pengumumanList } from "../services/pengumumanService";

const PengumumanPage = () => {
    const [search, setSearch] = useState("");

    return (
        <div className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen flex flex-col">
            <main className="w-full max-w-7xl mx-auto px-6 pt-30 pb-20">

                {/* HEADER */}
                <header className="mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-4">
                        Pengumuman
                    </h1>
                    <p className="text-[#d0c6ab] text-lg leading-relaxed max-w-2xl">
                        Informasi terbaru, edaran resmi, dan kabar penting seputar kegiatan
                        dan keorganisasian KMSGD Jabodetabek.
                    </p>
                </header>

                {/* PINNED SECTION */}
                <section className="mb-20">
                    {/* SEARCH & FILTER BAR (Bagian Atas Sesuai Foto) */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8 pb-6 border-b border-[#2a2a2a]">
                        {/* Search Input */}
                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                placeholder="Cari berita atau pengumuman..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-[#131313] border border-[#999077] text-[#e5e2e1] text-sm px-4 py-2.5 pl-10 rounded-lg focus:border-[#ffd700] focus:outline-none transition-all w-full"
                            />
                            <span className="absolute left-3 top-3 text-[#d0c6ab] text-sm">🔍</span>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap gap-2 w-full md:w-auto">
                            {pengumumanFilters.map((filter, index) => (
                                <button
                                    key={filter}
                                    className={index === 0
                                        ? "bg-[#ffd700] text-[#131313] font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
                                        : "bg-[#20201f] border border-[#4d4732] text-[#d0c6ab] hover:border-[#ffd700] hover:text-[#ffd700] font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
                                    }
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* GRID CARD LAYOUT (3 Kolom Berjejer) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pengumumanList.map(({ day, month, kategori, title, desc, author, image, isPenting }) => (
                            <article
                                key={title}
                                className="bg-[#20201f] border border-[#2a2a2a] hover:border-[#ffd700] transition-all duration-300 rounded-xl overflow-hidden group cursor-pointer flex flex-col h-full shadow-lg"
                            >
                                {/* Image Header with Optional 'Penting' Badge */}
                                <div className="relative w-full aspect-16/10 bg-[#131313] overflow-hidden">
                                    <img
                                        src={image || "https://via.placeholder.com/600x400"}
                                        alt={title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Jika item bersifat Penting, tampilkan badge orange di kiri atas gambar */}
                                    {isPenting && (
                                        <span className="absolute top-3 left-3 bg-[#e67e22] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow">
                                            Penting
                                        </span>
                                    )}
                                </div>

                                {/* Card Body Content */}
                                <div className="p-5 flex flex-col grow justify-between">
                                    <div>
                                        {/* Kategori & Tanggal */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="bg-[#131313] border border-[#4d4732] text-[#ffd700] text-xs font-semibold px-2.5 py-0.5 rounded">
                                                {kategori}
                                            </span>
                                            <span className="text-[#999077] text-xs">
                                                📅 {day} {month} 2025
                                            </span>
                                        </div>

                                        {/* Judul Berita */}
                                        <h3 className="text-base font-bold font-['Montserrat'] text-[#e5e2e1] mb-2 line-clamp-2 group-hover:text-[#ffd700] transition-colors leading-snug">
                                            {title}
                                        </h3>

                                        {/* Deskripsi Singkat */}
                                        <p className="text-[#d0c6ab] text-sm leading-relaxed line-clamp-3 mb-4">
                                            {desc}
                                        </p>
                                    </div>

                                    {/* Metadata Penulis & Link Aksi */}
                                    <div className="mt-4 pt-3 border-t border-[#2a2a2a]">
                                        <div className="text-xs text-[#999077] mb-3">
                                            Oleh <span className="font-medium text-[#e5e2e1]">{author || "Admin KMSGD"}</span>
                                        </div>
                                        <a href="#" className="text-[#ffd700] text-xs font-bold uppercase tracking-wider hover:underline inline-flex items-center gap-1 group/link">
                                            Baca selengkapnya <span className="transition-transform group-hover/link:translate-x-1">→</span>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* PAGINATION BUTTONS (Tetap Berada di Bawah Grid) */}
                    <div className="flex justify-center mt-12 gap-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded border border-[#999077] text-[#d0c6ab] hover:border-[#ffd700] hover:text-[#ffd700] transition-colors">
                            ‹
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded bg-[#ffd700] text-[#131313] font-bold">
                            1
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded border border-[#999077] text-[#d0c6ab] hover:border-[#ffd700] hover:text-[#ffd700] transition-colors">
                            2
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded border border-[#999077] text-[#d0c6ab] hover:border-[#ffd700] hover:text-[#ffd700] transition-colors">
                            3
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded border border-[#999077] text-[#d0c6ab] hover:border-[#ffd700] hover:text-[#ffd700] transition-colors">
                            ›
                        </button>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default PengumumanPage;

