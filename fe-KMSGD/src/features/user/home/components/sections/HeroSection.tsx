export default function HeroSection() {
    return (
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

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="max-w-2xl flex flex-col gap-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#20201f] border border-[#ffd700] text-[#ffd700] text-xs font-semibold tracking-widest w-fit">
                        ✦ Komunitas Mahasiswa Berprestasi
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold font-['Montserrat'] text-[#e5e2e1] leading-tight">
                        Keluarga Mahasiswa Sunan Gunung Djati{" "}
                        <span className="text-[#ffd700]">Jabodetabek</span>
                    </h1>
                    <p className="text-[#d0c6ab] text-lg leading-relaxed max-w-xl">
                        Wadah silaturahmi, kolaborasi, dan pengembangan diri bagi mahasiswa Sunan Gunung Djati
                        di kawasan metropolitan Jabodetabek.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="mt-2 bg-[#ffd700] text-[#3a3000] font-bold px-8 py-4 uppercase tracking-wider hover:bg-[#e9c400] transition-colors text-sm cursor-pointer">
                            Gabung Sekarang
                        </button>
                        <button className="mt-2 border-2 border-[#FFD700] text-[#FFD700] font-bold px-8 py-4 uppercase tracking-wider hover:bg-[#FFD700] hover:text-[#1A1A1A] transition-colors text-sm cursor-pointer">
                            Tentang Kami
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <span className="text-[#FFD700] text-2xl">↓</span>
            </div>
        </section>
    );
}