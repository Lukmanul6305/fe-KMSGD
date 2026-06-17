import { useState, useEffect } from "react";
import Reveal from "../ui/Reveal";
import { getSambutan, type SambutanDisplayData } from "../../../../../service/sambutanService";

export default function KetuaSection() {
    const [sambutan, setSambutan] = useState<SambutanDisplayData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSambutan = async () => {
            const data = await getSambutan();
            setSambutan(data);
            setLoading(false);
        };
        fetchSambutan();
    }, []);

    if (loading) {
        return (
            <section className="py-16 px-6 max-w-7xl mx-auto flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ffd700]"></div>
            </section>
        );
    }

    if (!sambutan) return null;

    return (
        <section className="py-16 px-6 max-w-7xl mx-auto ">
            <Reveal>
                <div className="bg-[#20201f] border-l-4 border-[#ffd700] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
                    <Reveal from="left" className="w-full max-w-xs md:w-72 flex shrink-0">
                        <div className="aspect-4/5 w-full border border-[#353535] relative group overflow-hidden">
                            <img
                                src={sambutan.image || "https://via.placeholder.com/400x500?text=Ketua+Umum"}
                                alt="Ketua Umum"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                loading="lazy"
                            />
                            <div className="absolute bottom-4 left-4 bg-[#131313] px-4 py-2 border border-[#ffd700]">
                                <div className="text-[#ffd700] font-bold font-['Montserrat'] text-base">{sambutan.nama}</div>
                                <div className="text-[#d0c6ab] text-xs font-semibold tracking-wide">{sambutan.jabatan}</div>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal from="right" delay={150} className="flex flex-col gap-4">
                        <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#e5e2e1]">Sambutan Ketua Umum</h2>
                        <div className="w-16 h-1 bg-[#ffd700]" />
                        <p className="text-[#d0c6ab] text-lg leading-relaxed italic whitespace-pre-wrap">
                            "{sambutan.isi}"
                        </p>
                    </Reveal>
                </div>
            </Reveal>
        </section>
    );
}
