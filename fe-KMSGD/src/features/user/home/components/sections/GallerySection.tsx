import { useEffect, useRef } from "react";
import Reveal from "../ui/Reveal";
import { homeGalleryPreview } from "../../services/homeService";

export default function GallerySection() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const animationRef = useRef<number | null>(null);
    const speed = 1; // Mengatur kecepatan jalan otomatis (pixel per frame)

    // Gandakan data agar proses looping berjalan tanpa celah kosong
    const doubled = [...homeGalleryPreview, ...homeGalleryPreview];

    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;

        // Fungsi animasi otomatis (Auto-scroll) menggunakan requestAnimationFrame (Sangat ringan!)
        const autoScroll = () => {
            if (!isDragging.current) {
                wrap.scrollLeft += speed;

                // Jika scroll sudah mencapai setengah dari total lebar (akhir array pertama), reset ke 0
                // Efeknya akan terlihat menyambung tanpa jeda (seamless)
                if (wrap.scrollLeft >= wrap.scrollWidth / 2) {
                    wrap.scrollLeft = 0;
                }
            }
            animationRef.current = requestAnimationFrame(autoScroll);
        };

        // Memulai auto-scroll otomatis saat komponen dimuat
        animationRef.current = requestAnimationFrame(autoScroll);

        const onMouseDown = (e: MouseEvent) => {
            isDragging.current = true;
            wrap.style.cursor = "grabbing";
            startX.current = e.pageX - wrap.offsetLeft;
            scrollLeft.current = wrap.scrollLeft;
        };

        const onMouseLeave = () => {
            isDragging.current = false;
            wrap.style.cursor = "grab";
        };

        const onMouseUp = () => {
            isDragging.current = false;
            wrap.style.cursor = "grab";
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            e.preventDefault();
            const x = e.pageX - wrap.offsetLeft;
            const walk = (x - startX.current) * 1.5;
            let newScrollLeft = scrollLeft.current - walk;

            // Logika Infinite Loop sewaktu user melakukan drag manual
            const halfWidth = wrap.scrollWidth / 2;
            if (newScrollLeft >= halfWidth) {
                newScrollLeft -= halfWidth;
                startX.current = x - (newScrollLeft - scrollLeft.current); // Kalibrasi ulang posisi start agar tidak patah
            } else if (newScrollLeft < 0) {
                newScrollLeft += halfWidth;
                startX.current = x - (newScrollLeft - scrollLeft.current);
            }

            wrap.scrollLeft = newScrollLeft;
        };

        wrap.addEventListener("mousedown", onMouseDown);
        wrap.addEventListener("mouseleave", onMouseLeave);
        wrap.addEventListener("mouseup", onMouseUp);
        wrap.addEventListener("mousemove", onMouseMove);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            wrap.removeEventListener("mousedown", onMouseDown);
            wrap.removeEventListener("mouseleave", onMouseLeave);
            wrap.removeEventListener("mouseup", onMouseUp);
            wrap.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

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
                    <button className="text-[#ffd700] text-sm font-semibold hidden md:flex items-center gap-1 hover:underline cursor-pointer">
                        Lihat Semua Foto ↗
                    </button>
                </Reveal>

                {/* Container utama scrollbar */}
                <div
                    ref={wrapRef}
                    className="overflow-x-hidden cursor-grab select-none px-6"
                    style={{ scrollbarWidth: "none" }}
                >
                    {/* Inner wrapper tanpa animasi CSS Marquee berat */}
                    <div
                        className="flex gap-4 pr-4"
                        style={{
                            width: "max-content",
                        }}
                    >
                        {doubled.map((src, idx) => (
                            <div
                                key={idx}
                                className="group relative overflow-hidden shrink-0 w-55 md:w-70 aspect-square"
                            >
                                <img
                                    src={src}
                                    alt={`Kegiatan ${idx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-[#FFD700]/0 group-hover:bg-[#FFD700]/20 transition-all duration-300 flex items-center justify-center">
                                    <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">🔍</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}