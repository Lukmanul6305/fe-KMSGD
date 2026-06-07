import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <section className="relative min-h-dvh flex items-center px-6 md:px-12 pt-28 pb-16">

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/bg.jpeg" // Path lebih rapi, pastikan di folder public/bg.jpeg
                    alt="hero"
                    className="w-full h-full object-cover opacity-20"
                    fetchPriority="high"
                />
                <div className="absolute inset-0 bg-linear-to-r from-[#131313] via-[#131313]/90 to-transparent" />
            </div>

            {/* Konten Utama */}
            <div className="max-w-7xl mx-auto w-full relative z-10">
                {/* gap-4 untuk mobile agar jarak antar teks tidak terlalu jauh */}
                <div className="max-w-2xl flex flex-col gap-4 md:gap-6">

                    {/* Badge / Tagline */}
                    <div className="inline-flex items-center gap-2 px-2 py-1 md:px-3 md:py-1.5 bg-[#20201f] border border-[#ffd700] text-[#ffd700] text-[10px] md:text-xs font-semibold tracking-widest w-fit">
                        ✦ Komunitas Mahasiswa Berprestasi
                    </div>

                    {/* Judul: Ukuran diperkecil di mobile (text-4xl) agar tidak makan banyak baris */}
                    <h1 className="text-4xl md:text-6xl font-bold font-['Montserrat'] text-[#e5e2e1] leading-tight mt-1 md:mt-0">
                        Keluarga Mahasiswa Sunan Gunung Djati{" "}
                        <span className="text-[#ffd700]">Jabodetabek</span>
                    </h1>

                    {/* Deskripsi */}
                    <p className="text-[#d0c6ab] text-sm md:text-lg leading-relaxed max-w-[90%] md:max-w-xl">
                        Wadah silaturahmi, kolaborasi, dan pengembangan diri bagi mahasiswa Sunan Gunung Djati
                        di kawasan metropolitan Jabodetabek.
                    </p>

                    {/* Tombol: flex-row membuat kedua tombol berdampingan di mobile */}
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-4">
                        <button className="w-full md:w-auto bg-[#ffd700] text-[#3a3000] font-bold px-4 py-3 md:px-8 md:py-4 uppercase tracking-wider hover:bg-[#e9c400] transition-colors text-xs md:text-sm cursor-pointer text-center">
                            Gabung Sekarang
                        </button>
                        <Link to="/profil" className="w-full md:w-auto border-2 border-[#FFD700] text-[#FFD700] font-bold px-4 py-3 md:px-8 md:py-4 uppercase tracking-wider hover:bg-[#FFD700] hover:text-[#1A1A1A] transition-colors text-xs md:text-sm cursor-pointer text-center">
                            Tentang Kami
                        </Link>
                    </div>

                </div>
            </div>

            {/* Panah bawah */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <span className="text-[#FFD700] text-xl md:text-2xl">↓</span>
            </div>
        </section>
    );
}