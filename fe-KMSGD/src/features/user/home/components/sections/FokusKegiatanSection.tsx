import { useQuery } from "@tanstack/react-query";
import KegiatanCard from "../cards/KegiatanCard";
import { getLatestKegiatan } from "../../../kegiatan/services/kegiatanService";
import { Link } from "react-router-dom";

export default function FokusKegiatanSection() {
    const { data: latest = [] } = useQuery({
        queryKey: ["kegiatan-latest", 3],
        queryFn: ({ signal }) => getLatestKegiatan(3, signal),
        staleTime: 5 * 60_000,
        gcTime: 10 * 60_000,
    });

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">

            <div className="flex justify-between items-end mb-12 border-b border-[#353535] pb-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#ffd700] mb-2">
                        <span className="text-white">Fokus</span> Kegiatan
                    </h2>
                    <p className="text-[#d0c6ab] text-base">
                        Pilar utama pergerakan organisasi kami.
                    </p>
                </div>

                <Link
                    to="/kegiatan"
                    className="text-[#ffd700] text-sm font-semibold hidden md:flex items-center gap-1 hover:underline cursor-pointer"
                >
                    Lihat Semua ↗
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {latest.map((item, i) => (
                    <KegiatanCard
                        key={item.id ?? i}
                        id={item.id}
                        img={item.image}
                        title={item.title}
                        desc={item.desc}
                        date={item.date}
                        category={item.category}
                        location={item.location}
                    />
                ))}
            </div>

        </section>
    );
}