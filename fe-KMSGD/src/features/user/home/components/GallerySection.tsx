import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import { homeGalleryPreview } from "../services/homeService";

export default function GallerySection() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const doubled = [...homeGalleryPreview, ...homeGalleryPreview];

    useEffect(() => {
        const wrap = wrapRef.current;
        const inner = innerRef.current;
        if (!wrap || !inner) return;

        const onMouseDown = (e: MouseEvent) => {
            isDragging.current = true;
            wrap.style.cursor = "grabbing";
            startX.current = e.pageX - wrap.offsetLeft;
            scrollLeft.current = wrap.scrollLeft;
            inner.style.animationPlayState = "paused";
        };
        const onMouseLeave = () => {
            isDragging.current = false;
            wrap.style.cursor = "grab";
            inner.style.animationPlayState = "running";
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
            wrap.scrollLeft = scrollLeft.current - walk;
        };

        wrap.addEventListener("mousedown", onMouseDown);
        wrap.addEventListener("mouseleave", onMouseLeave);
        wrap.addEventListener("mouseup", onMouseUp);
        wrap.addEventListener("mousemove", onMouseMove);

        return () => {
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

                <div
                    ref={wrapRef}
                    className="overflow-x-auto cursor-grab select-none scrollbar-none"
                    style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
                >
                    <div
                        ref={innerRef}
                        className="flex gap-4 px-6"
                        style={{
                            width: "max-content",
                            animation: "marquee 28s linear infinite",
                            willChange: "transform",
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