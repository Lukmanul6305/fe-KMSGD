import { useEffect, useState } from "react";
import Reveal from "../ui/Reveal";
import KegiatanCard from "../cards/KegiatanCard";
import { getLatestKegiatan } from "../../../kegiatan/services/kegiatanService";
import { Link } from "react-router-dom";
import type { Kegiatan } from "../../../kegiatan/types/kegiatan.types";

export default function FokusKegiatanSection() {
    const [latest, setLatest] = useState<Kegiatan[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        getLatestKegiatan(3, controller.signal)
            .then(setLatest)
            .catch((err) => {
                if (!controller.signal.aborted) {
                    console.error("Gagal memuat fokus kegiatan", err);
                }
            });

        return () => controller.abort();
    }, []);

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <Reveal className="flex justify-between items-end mb-12 border-b border-[#353535] pb-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#ffd700] mb-2">
                        <span className="text-white">Fokus</span> Kegiatan
                    </h2>
                    <p className="text-[#d0c6ab] text-base">Pilar utama pergerakan organisasi kami.</p>
                </div>
                <Link to="/kegiatan" className="text-[#ffd700] text-sm font-semibold hidden md:flex items-center gap-1 hover:underline cursor-pointer">
                    Lihat Semua ↗
                </Link>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {latest.map(({ id, image, title, desc }, i) => (
                    <Reveal key={id} delay={i * 120}>
                        <KegiatanCard img={image} title={title} desc={desc} />
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
