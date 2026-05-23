import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import {
    homeFounders,
    homeGalleryPreview,
    homeKegiatanList,
    homeStats,
    homeTestimonials,
} from "../services/homeService";

type RevealDirection = "bottom" | "left" | "right" | "fade";

interface RevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    from?: RevealDirection;
}

function useScrollReveal(): [RefObject<HTMLDivElement | null>, boolean] {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.12,
            }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return [ref, isVisible];
}

function Reveal({
    children,
    delay = 0,
    className = "",
    from = "bottom",
}: RevealProps) {
    const [ref, visible] = useScrollReveal();

    const hiddenClasses: Record<RevealDirection, string> = {
        bottom: "opacity-0 translate-y-10",
        left: "opacity-0 -translate-x-10",
        right: "opacity-0 translate-x-10",
        fade: "opacity-0 scale-[0.97]",
    };

    const delayClasses: Record<number, string> = {
        0: "",
        100: "delay-100",
        120: "delay-[120ms]",
        150: "delay-150",
        200: "delay-200",
        240: "delay-[240ms]",
        300: "delay-300",
    };

    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-700 ease-out will-change-transform ${delayClasses[delay] ?? ""} ${visible
                ? "opacity-100 translate-x-0 translate-y-0 scale-100"
                : hiddenClasses[from]
                }`}
        >
            {children}
        </div>
    );
}

const HomePage = () => {
    const doubleGalleries = [...homeGalleryPreview, ...homeGalleryPreview];

    return (
        <>
            {/* CSS global untuk marquee + scrollbar hide */}
            <style>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 28s linear infinite;
                    will-change: transform;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
                .scrollbar-none::-webkit-scrollbar { display: none; }
                .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <div
                className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen"
                style={{
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
            >
{/* ======================================================== */}
                {/* HERO — animasi masuk setelah intro selesai                */}
                {/* ======================================================== */}
                <section className="relative min-h-screen flex items-center px-6 pt-20">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-wSYHpemhYV00YT3vAMMorQcJ0YGAEiJk9NQa7VxuDhyzHoJKTEFF3MCOOlICel_o1Rthol7k5u9g-oexyp0qUgXhtnlWp_mvydr2q9w1uDTguI8eDBcAf8TzECjvJPxuoESeqRxK3xS6acU4EQ3Y8Ef1axA9h91eCCEm1Pb9LH612a1rsLLVWyyZtAisxqJLSn4fkoAyZZg8RW_5Cw8zvoBiF6iVBNjcu69SCCIJRyj_FSUU8Uao7A3-KZdzVivNCD-JPBof6KXY"
                            alt="hero"
                            className="w-full h-full object-cover opacity-20"
                            fetchPriority="high"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-[#131313] via-[#131313]/90 to-transparent" />
                    </div>

                    <div className="max-w-300 mx-auto w-full relative z-10">
                        <div className="max-w-2xl flex flex-col gap-6">
                            {/* Badge */}
                            <div
                                style={{
                                    transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
                                }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-[#20201f] border border-[#ffd700] text-[#ffd700] text-xs font-semibold tracking-widest w-fit"
                            >
                                ✦ Komunitas Mahasiswa Berprestasi
                            </div>

                            {/* Heading */}
                            <h1
                                style={{
                                    transition: "opacity 0.7s ease 0.25s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s",
                                }}
                                className="text-5xl md:text-6xl font-bold font-['Montserrat'] text-[#e5e2e1] leading-tight"
                            >
                                Keluarga Mahasiswa Sunan Gunung Djati{" "}
                                <span className="text-[#ffd700]">Jabodetabek</span>
                            </h1>

                            {/* Desc */}
                            <p
                                style={{
                                    transition: "opacity 0.7s ease 0.4s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s",
                                }}
                                className="text-[#d0c6ab] text-lg leading-relaxed max-w-xl"
                            >
                                Wadah silaturahmi, kolaborasi, dan pengembangan diri bagi mahasiswa
                                Sunan Gunung Djati di kawasan metropolitan Jabodetabek. Membangun
                                sinergi untuk masa depan yang lebih baik.
                            </p>

                            {/* CTA */}
                            <div
                                style={{
                                    transition: "opacity 0.7s ease 0.55s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s",
                                }}
                                className="flex flex-wrap gap-4"
                            >
                                <button className="mt-2 bg-[#ffd700] text-[#3a3000] font-bold px-8 py-4 uppercase tracking-wider hover:bg-[#e9c400] transition-colors border-2 border-transparent hover:border-white w-fit text-sm cursor-pointer">
                                    Gabung Sekarang
                                </button>
                                <button className="mt-2 border-2 border-[#FFD700] text-[#FFD700] font-bold px-8 py-4 uppercase tracking-wider hover:bg-[#FFD700] hover:text-[#1A1A1A] transition-colors w-fit text-sm cursor-pointer">
                                    Tentang Kami
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                        <span className="text-[#FFD700] text-2xl">↓</span>
                    </div>
                </section>

                {/* ======================================================== */}
                {/* STATS                                                     */}
                {/* ======================================================== */}
                <section className="bg-[#0e0e0e] py-12 border-y border-[#353535]">
                    <div className="max-w-300 mx-auto px-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#353535] text-center">
                        {homeStats.map(({ value, label }, i) => (
                            <Reveal key={label} delay={i * 100} className="py-6 md:py-0">
                                <div className="text-5xl md:text-6xl font-bold font-['Montserrat'] text-[#ffd700] mb-2">
                                    {value}
                                </div>
                                <div className="text-xs font-semibold tracking-widest text-[#d0c6ab] uppercase">
                                    {label}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ======================================================== */}
                {/* SAMBUTAN KETUA                                            */}
                {/* ======================================================== */}
                <section className="py-24 px-6 max-w-300 mx-auto">
                    <Reveal>
                        <div className="bg-[#20201f] border-l-4 border-[#ffd700] p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
                            <Reveal from="left" className="w-full md:w-1/3 flex shrink-0">
                                <div className="aspect-3/4 w-full border border-[#353535] relative group overflow-hidden">
                                    <img
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPZ-QRObMKNDnnorQKAWdsImi-RDCWuQ8TpJxDKH6SOcomenSRjnJ2KJFxR43EwpX5iWsC7FXYOQZNNnQfYoCHTdBKkOr9pDnRpk5EI5E7MLowA9OP4-XUnGgB6J6HVtVAoBJ_CNiUXKAsVSiEj66kLwFxscw2BUZyxqrFO_F0KXqBjI5pUc0cnG5B_-SHo0UByeGXznth9xRTeikpjsxdadxEbvuFjXMiZl_23vUR-_zxabbnRwWbB8eYvBZlFqZRAP97QhGhEDbw"
                                        alt="Ketua Umum"
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute bottom-4 left-4 bg-[#131313] px-4 py-2 border border-[#ffd700]">
                                        <div className="text-[#ffd700] font-bold font-['Montserrat'] text-base">Ahmad Fauzi</div>
                                        <div className="text-[#d0c6ab] text-xs font-semibold tracking-wide">Ketua Umum 2024-2025</div>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal from="right" delay={150} className="flex flex-col gap-5">
                                <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#e5e2e1]">
                                    Sambutan Ketua Umum
                                </h2>
                                <div className="w-16 h-1 bg-[#ffd700]" />
                                <p className="text-[#d0c6ab] text-lg leading-relaxed italic">
                                    "Selamat datang di rumah kita bersama. KMSGD Jabodetabek bukan
                                    sekadar organisasi, melainkan keluarga tempat kita tumbuh, belajar,
                                    dan memberikan kontribusi nyata bagi masyarakat. Di tengah dinamika
                                    ibukota, mari kita terus menjaga nilai-nilai luhur dan integritas akademik."
                                </p>
                                <button className="text-[#ffd700] text-sm font-semibold hover:underline flex items-center gap-2 w-fit cursor-pointer">
                                    Baca Selengkapnya →
                                </button>
                            </Reveal>
                        </div>
                    </Reveal>
                </section>

                {/* ======================================================== */}
                {/* FOKUS KEGIATAN                                            */}
                {/* ======================================================== */}
                <section className="py-24 px-6 max-w-300 mx-auto">
                    <Reveal className="flex justify-between items-end mb-12 border-b border-[#353535] pb-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-2">
                                Fokus Kegiatan
                            </h2>
                            <p className="text-[#d0c6ab] text-base">Pilar utama pergerakan organisasi kami.</p>
                        </div>
                        <button className="text-[#ffd700] text-sm font-semibold hidden md:flex items-center gap-1 hover:underline cursor-pointer">
                            Lihat Semua ↗
                        </button>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {homeKegiatanList.map(({ img, title, desc }, i) => (
                            <Reveal key={title} delay={i * 120}>
                                <div className="bg-[#20201f] border-t-2 border-[#ffd700] group hover:-translate-y-1 transition-transform duration-300">
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={img} alt={title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy" />
                                        <div className="absolute inset-0 bg-linear-to-t from-[#131313] via-transparent to-transparent" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-3">{title}</h3>
                                        <p className="text-[#d0c6ab] text-sm leading-relaxed mb-6">{desc}</p>
                                        <a href="#" className="text-[#ffd700] text-sm font-semibold hover:underline">Pelajari →</a>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ======================================================== */}
                {/* DEWAN PENDIRI                                             */}
                {/* ======================================================== */}
                <section className="py-24 px-6 bg-[#0e0e0e] border-y border-[#353535]">
                    <div className="max-w-300 mx-auto">
                        <Reveal className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#20201f] border border-[#353535] text-[#d0c6ab] text-xs font-semibold tracking-widest mb-6">
                                ✦ Legacy & Honor
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-4">
                                Dewan Pendiri KMSGD
                            </h2>
                            <p className="text-[#d0c6ab] text-base max-w-2xl mx-auto">
                                Mengenang jasa para pendiri yang telah meletakkan dasar perjuangan
                                dan nilai-nilai luhur organisasi ini. Semangat mereka terus hidup
                                dalam setiap langkah kita.
                            </p>
                        </Reveal>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {homeFounders.map((person, i) => (
                                <Reveal key={person.nama} delay={i * 100} className="group text-center">
                                    <div className="relative overflow-hidden border-2 border-transparent hover:border-[#FFD700] transition-all duration-300 mb-4">
                                        <img src={person.img} alt={person.nama}
                                            className="w-full aspect-3/4 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                            loading="lazy" />
                                        <div className="absolute inset-0 bg-[#FFD700]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <h4 className="text-[#FFD700] font-bold font-['Montserrat'] text-base mb-1">{person.nama}</h4>
                                    <p className="text-[#d0c6ab] text-xs tracking-wider uppercase">{person.peran}</p>
                                    <p className="text-[#d0c6ab]/60 text-xs mt-1">{person.tahun}</p>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal className="text-center mt-10">
                            <p className="text-[#d0c6ab]/50 text-xs italic">
                                "Al-Fatihah untuk para pendiri yang telah berpulang. Jasa mu abadi dalam sanubari kami."
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* ======================================================== */}
                {/* TESTIMONI                                                 */}
                {/* ======================================================== */}
                <section className="py-24 px-6 max-w-300 mx-auto">
                    <Reveal className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#20201f] border border-[#353535] text-[#d0c6ab] text-xs font-semibold tracking-widest mb-6">
                            ✦ Testimoni
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-4">
                            Apa Kata Mereka?
                        </h2>
                        <p className="text-[#d0c6ab] text-base">
                            Cerita dari anggota yang telah merasakan manfaat bergabung bersama kami.
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {homeTestimonials.map((testi, i) => (
                            <Reveal key={testi.nama} delay={i * 120}>
                                <div className="bg-[#20201f] p-8 border-t-2 border-[#FFD700] hover:-translate-y-1 transition-transform duration-300">
                                    <div className="text-[#FFD700] text-4xl font-serif mb-4">"</div>
                                    <p className="text-[#d0c6ab] text-sm leading-relaxed mb-6 italic">{testi.quote}</p>
                                    <div className="flex items-center gap-4 border-t border-[#353535] pt-4">
                                        <img src={testi.img} alt={testi.nama}
                                            className="w-12 h-12 rounded-full border-2 border-[#FFD700]" loading="lazy" />
                                        <div>
                                            <div className="text-[#e5e2e1] font-bold text-sm">{testi.nama}</div>
                                            <div className="text-[#d0c6ab] text-xs">{testi.angkatan} · {testi.jurusan}</div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ======================================================== */}
                {/* GALERI                                                    */}
                {/* ======================================================== */}
                <section className="py-24 px-6 bg-[#0e0e0e] border-y border-[#353535] overflow-hidden">
                    <div className="max-w-350 mx-auto">
                        <Reveal className="flex justify-between items-end mb-12 border-b border-[#353535] pb-4">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-2">
                                    Galeri Kegiatan
                                </h2>
                                <p className="text-[#d0c6ab] text-base">Momen kebersamaan dan aksi nyata KMSGD.</p>
                            </div>
                            <button className="text-[#ffd700] text-sm font-semibold hidden md:flex items-center gap-1 hover:underline cursor-pointer">
                                Lihat Semua Foto ↗
                            </button>
                        </Reveal>

                        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none pointer-events-auto active:cursor-grabbing">
                            <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
                                {doubleGalleries.map((src, idx) => (
                                    <div key={idx}
                                        className="group relative overflow-hidden flex shrink-0 w-65 md:w-[320px] aspect-square snap-center">
                                        <img src={src} alt={`Kegiatan ${idx + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none"
                                            loading="lazy" />
                                        <div className="absolute inset-0 bg-[#FFD700]/0 group-hover:bg-[#FFD700]/20 transition-all duration-300 flex items-center justify-center">
                                            <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">🔍</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ======================================================== */}
                {/* PENGUMUMAN                                                */}
                {/* ======================================================== */}
                <section className="py-24 px-6 max-w-300 mx-auto">
                    <Reveal className="flex items-center gap-4 mb-8">
                        <span className="text-[#ffd700] text-3xl">📣</span>
                        <h2 className="text-2xl font-bold font-['Montserrat'] text-[#e5e2e1]">
                            Pengumuman Terbaru
                        </h2>
                    </Reveal>

                    <Reveal delay={100}>
                        <div className="bg-[#20201f] border border-[#353535] p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:border-[#ffd700] transition-colors duration-300 cursor-pointer">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-2 py-1 bg-[#131313] border border-[#ffd700] text-[#ffd700] text-xs font-bold uppercase tracking-wider">
                                        Pendaftaran
                                    </span>
                                    <span className="text-[#d0c6ab] text-sm">15 Oktober 2024</span>
                                </div>
                                <h3 className="text-xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-1">
                                    Open Recruitment Anggota Baru Angkatan 2024
                                </h3>
                                <p className="text-[#d0c6ab] text-sm">
                                    Pendaftaran telah dibuka untuk mahasiswa baru kawasan Jabodetabek.
                                </p>
                            </div>
                            <span className="text-[#ffd700] text-2xl hidden md:block">→</span>
                        </div>
                    </Reveal>
                </section>

                {/* ======================================================== */}
                {/* CTA BERGABUNG                                             */}
                {/* ======================================================== */}
                <section className="py-24 px-6 bg-[#FFD700] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-10 left-10 w-40 h-40 border-4 border-[#1A1A1A] rotate-12" />
                        <div className="absolute bottom-10 right-10 w-60 h-60 border-4 border-[#1A1A1A] -rotate-12" />
                    </div>

                    <div className="max-w-300 mx-auto text-center relative z-10">
                        <Reveal>
                            <h2 className="text-3xl md:text-5xl font-bold font-['Montserrat'] text-[#1A1A1A] mb-4">
                                Siap Berkontribusi & Tumbuh Bersama?
                            </h2>
                            <p className="text-[#3a3000] text-lg mb-8 max-w-2xl mx-auto">
                                Jadilah bagian dari keluarga besar KMSGD Jabodetabek. Bersama kita belajar, berkarya, dan mengabdi untuk masyarakat.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <button className="bg-[#1A1A1A] text-[#FFD700] font-bold px-10 py-4 uppercase tracking-wider hover:bg-[#2D2D2D] transition-colors text-sm cursor-pointer">
                                    Daftar Sekarang
                                </button>
                                <button className="border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold px-10 py-4 uppercase tracking-wider hover:bg-[#1A1A1A] hover:text-[#FFD700] transition-colors text-sm cursor-pointer">
                                    Hubungi Kami
                                </button>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* WhatsApp Float */}
                <a
                    href="https://wa.me/6281234567890?text=Halo%20KMSGD%2C%20saya%20ingin%20bertanya..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 z-50 bg-green-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group"
                    aria-label="Chat via WhatsApp"
                >
                    <span className="text-2xl">💬</span>
                    <span className="absolute right-16 bg-[#1A1A1A] text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Chat Kami!
                    </span>
                </a>
            </div>
        </>
    );
};

export default HomePage;


