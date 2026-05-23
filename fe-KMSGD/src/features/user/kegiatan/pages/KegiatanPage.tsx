import { useState } from "react";
import { featuredKegiatan, kegiatanCards, kegiatanFilters, secondaryKegiatan } from "../services/kegiatanService";

const KegiatanPage = () => {
    const [activeFilter, setActiveFilter] = useState("Semua");

    return (
        <div className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen flex flex-col">
            <main className="w-full max-w-7xl mx-auto px-6 pt-30 pb-20">

                {/* HEADER */}
                <header className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-4 leading-tight">
                        Kegiatan <span className="text-[#ffd700]">KMSGD</span>
                    </h1>
                    <p className="text-[#d0c6ab] text-lg leading-relaxed max-w-2xl">
                        Jelajahi berbagai agenda, seminar, kompetisi, dan kegiatan sosial yang
                        diselenggarakan oleh Keluarga Mahasiswa Sunan Gunung Djati Jabodetabek.
                    </p>
                </header>

                {/* FILTER */}
                <div className="mb-12 flex flex-wrap gap-4 border-b border-[#2a2a2a] pb-4">
                    {kegiatanFilters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-6 py-2 rounded-full border text-sm font-semibold tracking-wide transition-colors duration-200 ${activeFilter === f
                                ? "border-[#ffd700] text-[#ffd700] bg-[#353535]"
                                : "border-[#353535] text-[#d0c6ab] hover:border-[#ffd700] hover:text-[#ffd700]"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* FEATURED CARD */}
                    <article className="col-span-1 md:col-span-8 bg-[#131313] border-t-[3px] border-[#ffd700] rounded flex flex-col relative overflow-hidden group">
                        <div className="h-64 md:h-80 w-full bg-[#353535] relative overflow-hidden">
                            <img
                                src={featuredKegiatan.image}
                                alt={featuredKegiatan.imageAlt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4 bg-[#131313] border border-[#ffd700] text-[#ffd700] px-3 py-1 rounded-sm text-xs font-semibold flex items-center gap-2">
                                📅 {featuredKegiatan.date}
                            </div>
                        </div>
                        <div className="p-6 grow flex flex-col">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2 py-1 bg-[#131313] border border-[#4d4732] text-[#ffd700] text-xs font-bold uppercase tracking-wider rounded-sm">
                                    {featuredKegiatan.category}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-3 leading-snug">
                                {featuredKegiatan.title}
                            </h2>
                            <p className="text-[#d0c6ab] text-base leading-relaxed mb-6 line-clamp-2">
                                {featuredKegiatan.description}
                            </p>
                            <div className="mt-auto flex justify-between items-center">
                                <div className="flex items-center gap-2 text-[#d0c6ab] text-sm font-semibold">
                                    📍 {featuredKegiatan.location}
                                </div>
                                <button className="bg-[#ffd700] text-[#131313] font-bold text-sm px-6 py-2 rounded-sm hover:opacity-90 transition-opacity">
                                    Daftar
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* SECONDARY CARD */}
                    <article className="col-span-1 md:col-span-4 bg-[#131313] border border-[#353535] hover:border-[#ffd700] transition-colors rounded flex flex-col group">
                        <div className="h-48 w-full bg-[#353535] relative overflow-hidden">
                            <img
                                src={secondaryKegiatan.image}
                                alt={secondaryKegiatan.imageAlt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6 grow flex flex-col">
                            <div className="flex justify-between items-start mb-3">
                                <span className="px-2 py-1 bg-[#131313] border border-[#4d4732] text-[#ffd700] text-xs font-bold uppercase tracking-wider rounded-sm">
                                    {secondaryKegiatan.category}
                                </span>
                                <span className="text-[#d0c6ab] text-sm font-semibold">{secondaryKegiatan.date}</span>
                            </div>
                            <h3 className="text-xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-3">
                                {secondaryKegiatan.title}
                            </h3>
                            <p className="text-[#d0c6ab] text-sm leading-relaxed mb-6 grow">
                                {secondaryKegiatan.description}
                            </p>
                            <button className="w-full border border-[#ffd700] text-[#ffd700] font-bold text-sm px-4 py-2 rounded-sm hover:bg-[#ffd700] hover:text-[#131313] transition-colors">
                                Detail Lomba
                            </button>
                        </div>
                    </article>

                    {/* SMALL CARDS */}
                    {kegiatanCards.map(({ icon, date, kategori, title, desc, status }) => (
                        <article
                            key={title}
                            className="col-span-1 md:col-span-4 bg-[#131313] border border-[#353535] hover:border-[#ffd700] transition-colors rounded p-6 flex flex-col group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-[#353535] rounded border border-[#ffd700] flex items-center justify-center text-xl">
                                    {icon}
                                </div>
                                <span className="text-[#d0c6ab] text-sm font-semibold">{date}</span>
                            </div>
                            <div className="mb-2">
                                <span className="px-2 py-1 bg-[#131313] border border-[#4d4732] text-[#ffd700] text-xs font-bold uppercase tracking-wider rounded-sm">
                                    {kategori}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-3">
                                {title}
                            </h3>
                            <p className="text-[#d0c6ab] text-sm leading-relaxed mb-6 grow">
                                {desc}
                            </p>
                            <div className="mt-auto flex justify-between items-center border-t border-[#353535] pt-4">
                                <span className="text-[#ffd700] text-sm font-semibold">{status}</span>
                                <span className="text-[#ffd700] group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </article>
                    ))}

                </div>
            </main>
        </div>
    );
};

export default KegiatanPage;

