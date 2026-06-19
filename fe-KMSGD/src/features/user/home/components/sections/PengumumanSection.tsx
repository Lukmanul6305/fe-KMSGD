import { useEffect, useState } from "react";
import Reveal from "../ui/Reveal";
import PengumumanCard from "../../../../../components/PengumumanCard";
import { getLatestPengumuman } from "../../../pengumuman/services/pengumumanService";
import { Link } from "react-router-dom";
import type { Pengumuman } from "../../../pengumuman/types/pengumuman.types";

export default function PengumumanSection() {
    const [latest, setLatest] = useState<Pengumuman[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        getLatestPengumuman(3, controller.signal)
            .then(setLatest)
            .catch((err) => {
                if (!controller.signal.aborted) {
                    console.error("Gagal memuat pengumuman terbaru", err);
                }
            });

        return () => controller.abort();
    }, []);

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <Reveal className="flex justify-between items-end mb-12 border-b border-[#353535] pb-4 px-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#ffd700] mb-2">
                        <span className="text-white">Pengumuman</span>
                    </h2>
                    <p className="text-[#d0c6ab] text-base">Momen kebersamaan dan aksi nyata KMSGD.</p>
                </div>
                <Link to="/pengumuman" className="text-[#ffd700] text-sm font-semibold hidden md:flex items-center gap-1 hover:underline cursor-pointer">
                    Lihat Semua Foto ↗
                </Link>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                {latest.map((item, i) => (
                    <Reveal key={item.id} delay={i * 120}>
                        <PengumumanCard item={item} />
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
