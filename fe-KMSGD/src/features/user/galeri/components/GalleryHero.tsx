import { useState, useEffect } from "react";

export const GalleryHero = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto text-center">
            <h1
                className={`text-4xl md:text-6xl font-bold font-['Montserrat'] text-[#ffd700] mb-4 transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
            >
                <span className="text-white">Momen</span> Kami
            </h1>
            <p
                className={`text-[#d0c6ab] text-lg leading-relaxed max-w-2xl mx-auto transition-all duration-700 ease-out delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
            >
                Koleksi visual perjalanan, kegiatan, dan kebersamaan KMSGD Jabodetabek.
                Menangkap setiap langkah dalam membangun komunitas yang kuat dan inspiratif.
            </p>
        </section>
    );
};