import { useState, useEffect, useRef } from "react";
import Reveal from "../ui/Reveal";
import { Link } from "react-router-dom";
import { getGaleri } from "../../../galeri/services/galeriService";

export default function GallerySection() {
    const [photos, setPhotos] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const wrapRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const speed = 1.5; // Sedikit dipercepat agar lebih terasa animasinya

    useEffect(() => {
        const fetchGaleri = async () => {
            try {
                const res = await getGaleri("FOTO", 1, 10);
                if (res && res.data) {
                    setPhotos(res.data.map((item) => item.url));
                }
            } catch (error) {
                console.error("Gagal memuat galeri home:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGaleri();
    }, []);

    // Gandakan data agar proses looping berjalan tanpa celah kosong
    // Jika data sedikit, kita copy beberapa kali agar pasti overflow layar
    let displayPhotos = [...photos];
    if (displayPhotos.length > 0) {
        while (displayPhotos.length < 10) {
            displayPhotos = [...displayPhotos, ...photos];
        }
    }
    const doubled = [...displayPhotos, ...displayPhotos];

    useEffect(() => {
        if (loading || photos.length === 0) return;

        const wrap = wrapRef.current;
        if (!wrap) return;

        const autoScroll = () => {
            wrap.scrollLeft += speed;

            if (wrap.scrollLeft >= wrap.scrollWidth / 2) {
                wrap.scrollLeft = 0;
            }
            animationRef.current = requestAnimationFrame(autoScroll);
        };

        animationRef.current = requestAnimationFrame(autoScroll);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [loading, photos.length]);

    if (!loading && photos.length === 0) return null;

    return (
        <section className="py-24 bg-[#0e0e0e] border-y border-[#353535] overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <Reveal className="flex justify-between items-end mb-12 border-b border-[#353535] pb-4 px-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#ffd700] mb-2">
                            <span className="text-white">Galeri</span> Kegiatan
                        </h2>
                        <p className="text-[#d0c6ab] text-base">Momen kebersamaan dan aksi nyata KMSGD.</p>
                    </div>
                    <Link to="/galeri" className="text-[#ffd700] text-sm font-semibold hidden md:flex items-center gap-1 hover:underline cursor-pointer">
                        Lihat Semua Foto ↗
                    </Link>
                </Reveal>

                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ffd700]"></div>
                    </div>
                ) : (
                    <Reveal from="right" delay={200}>
                        <div
                            ref={wrapRef}
                            className="overflow-x-hidden select-none px-6 pointer-events-none"
                            style={{ scrollbarWidth: "none" }}
                        >
                            <div
                                className="flex gap-4 pr-4"
                                style={{ width: "max-content" }}
                            >
                                {doubled.map((src, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative overflow-hidden shrink-0 w-55 md:w-70 aspect-square"
                                    >
                                        <img
                                            src={src}
                                            alt={`Kegiatan ${idx + 1}`}
                                            className="w-full h-full object-cover pointer-events-none"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-[#FFD700]/0 transition-all duration-300"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    );
}