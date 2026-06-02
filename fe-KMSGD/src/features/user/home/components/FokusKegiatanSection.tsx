import Reveal from "./Reveal";
import KegiatanCard from "./KegiatanCard";
import { getLatestKegiatan } from "../../kegiatan/services/kegiatanService";

export default function FokusKegiatanSection() {
    const latest = getLatestKegiatan(3);

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <Reveal className="flex justify-between items-end mb-12 border-b border-[#353535] pb-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#ffd700] mb-2">
                        <span className="text-white">Fokus</span> Kegiatan
                    </h2>
                    <p className="text-[#d0c6ab] text-base">Pilar utama pergerakan organisasi kami.</p>
                </div>
                <button className="text-[#ffd700] text-sm font-semibold hidden md:flex items-center gap-1 hover:underline cursor-pointer">
                    Lihat Semua ↗
                </button>
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
