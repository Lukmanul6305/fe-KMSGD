import { useState, useEffect } from "react";
import { getActiveHomeBackgrounds } from "../../services/homeBackgroundService";
import RevealItem from "@/components/RevealItem";

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

    useEffect(() => {
        if (bgImages.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % bgImages.length);
        }, 5000);

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

                    <RevealItem animation="animate-fade-in-up">
                        <h1 className="flex flex-col text-4xl md:text-6xl font-bold font-['Montserrat'] text-[#e5e2e1] leading-tight mt-1 md:mt-0">
                            Keluarga Mahasiswa Sunan Gunung Djati{" "}
                            <span className="text-[#ffd700]">Jabodetabek</span>
                        </h1>
                    </RevealItem>

                    <RevealItem animation="animate-fade-in-up" delay={150}>
                        <p className="text-[#d0c6ab] text-sm md:text-lg leading-relaxed max-w-[90%] md:max-w-xl">
                            Wadah silaturahmi, kolaborasi, dan pengembangan diri bagi mahasiswa Sunan Gunung Djati
                            di kawasan metropolitan Jabodetabek.
                        </p>
                    </RevealItem>

                </div>
            </div>

            {/* Panah bawah */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <span className="text-[#FFD700] text-xl md:text-2xl">↓</span>
            </div>
        </section>
    );
}