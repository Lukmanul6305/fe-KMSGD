// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getActiveHomeBackgrounds } from "../../services/homeBackgroundService";

export default function HeroSection() {
    const [bgImages, setBgImages] = useState<string[]>(["/bg.jpeg"]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const fetchImages = async () => {
            try {
                const res = await getActiveHomeBackgrounds();
                if (isMounted && res && res.length > 0) {
                    const fetchedUrls = res.map(item => item.image).filter(Boolean);
                    if (fetchedUrls.length > 0) {
                        setBgImages(fetchedUrls);
                        setCurrentIndex(0);
                    }
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Gagal memuat background hero:", error);
                }
            }
        };

        fetchImages();

        return () => {
            isMounted = false;
        };
    }, []);

    // Jalankan interval pergantian gambar setiap 2 detik
    useEffect(() => {
        if (bgImages.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % bgImages.length);
        }, 2500); // 2.5 detik sesuai instruksi (2/3 detik)

        return () => clearInterval(interval);
    }, [bgImages]);

    return (
        <section className="relative min-h-dvh flex items-center px-6 md:px-12 pt-28 pb-16">

            {/* Background Slideshow */}
            <div className="absolute inset-0 z-0 bg-[#131313] overflow-hidden">
                {bgImages.map((src, index) => (
                    <img
                        key={`${src}-${index}`}
                        src={src}
                        alt=""
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-20" : "opacity-0"
                            }`}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                    />
                ))}
                <div className="absolute inset-0 bg-linear-to-r from-[#131313] via-[#131313]/90 to-transparent" />
            </div>

            {/* Konten Utama */}
            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="max-w-2xl flex flex-col gap-4 md:gap-6">

                    <h1 className="text-4xl md:text-6xl font-bold font-['Montserrat'] text-[#e5e2e1] leading-tight mt-1 md:mt-0">
                        Keluarga Mahasiswa Sunan Gunung Djati{" "}
                        <span className="text-[#ffd700]">Jabodetabek</span>
                    </h1>

                    <p className="text-[#d0c6ab] text-sm md:text-lg leading-relaxed max-w-[90%] md:max-w-xl">
                        Wadah silaturahmi, kolaborasi, dan pengembangan diri bagi mahasiswa Sunan Gunung Djati
                        di kawasan metropolitan Jabodetabek.
                    </p>

                    {/* <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-4">
                        <button className="w-full md:w-auto bg-[#ffd700] text-[#3a3000] font-bold px-4 py-3 md:px-8 md:py-4 uppercase tracking-wider hover:bg-[#e9c400] transition-colors text-xs md:text-sm cursor-pointer text-center">
                            Gabung Sekarang
                        </button>
                        <Link to="/profil" className="w-full md:w-auto border-2 border-[#FFD700] text-[#FFD700] font-bold px-4 py-3 md:px-8 md:py-4 uppercase tracking-wider hover:bg-[#FFD700] hover:text-[#1A1A1A] transition-colors text-xs md:text-sm cursor-pointer text-center">
                            Tentang Kami
                        </Link>
                    </div> */}

                </div>
            </div>

            {/* Panah bawah */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <span className="text-[#FFD700] text-xl md:text-2xl">↓</span>
            </div>
        </section>
    );
}
