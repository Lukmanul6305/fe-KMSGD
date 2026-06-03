import Reveal from "../ui/Reveal";
import PengumumanCard from "../../../../../components/PengumumanCard";
import { pengumumanList } from "../../../pengumuman/services/pengumumanService";

export default function PengumumanSection() {
    const latest = pengumumanList.slice(0, 3);

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <Reveal className="flex items-center gap-4 mb-8">
                <span className="text-[#ffd700] text-3xl">📣</span>
                <h2 className="text-2xl font-bold font-['Montserrat'] text-[#e5e2e1]">Pengumuman Terbaru</h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {latest.map((item, i) => (
                    <Reveal key={item.id} delay={i * 120}>
                        <PengumumanCard item={item} />
                    </Reveal>
                ))}
            </div>
        </section>
    );
}