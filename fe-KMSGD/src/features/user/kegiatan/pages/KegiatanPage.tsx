import { useState, useMemo } from "react";
import KegiatanHeader from "../components/KegiatanHeader";
import KegiatanFilter from "../components/KegiatanFilter";
import KegiatanFeaturedCard from "../components/KegiatanFeaturedCard";
import KegiatanSecondaryCard from "../components/KegiatanSecondaryCard";
import KegiatanSmallCard from "../components/KegiatanSmallCard";
import { kegiatanFilters, kegiatanList } from "../services/kegiatanService";
import type { KegiatanKategori } from "../types/kegiatan.types";

const KegiatanPage = () => {
    const [activeFilter, setActiveFilter] = useState<KegiatanKategori>("Semua");

    const filtered = useMemo(() => {
        if (activeFilter === "Semua") return kegiatanList;
        return kegiatanList.filter((k) => k.category === activeFilter);
    }, [activeFilter]);

    const featured = filtered[0];
    const secondary = filtered[1];
    const smallCards = filtered.slice(2);

    return (
        <div className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen flex flex-col">
            <main className="w-full max-w-7xl mx-auto px-6 pt-30 pb-20">
                <KegiatanHeader />

                <KegiatanFilter
                    filters={kegiatanFilters}
                    active={activeFilter}
                    onChange={setActiveFilter}
                />

                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-[#d0c6ab]">
                        <p className="text-4xl mb-4">📭</p>
                        <p className="text-lg">Belum ada kegiatan untuk kategori ini.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {featured && <KegiatanFeaturedCard data={featured} />}
                        {secondary && <KegiatanSecondaryCard data={secondary} />}
                        {smallCards.map((k) => (
                            <KegiatanSmallCard key={k.id} data={k} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default KegiatanPage;