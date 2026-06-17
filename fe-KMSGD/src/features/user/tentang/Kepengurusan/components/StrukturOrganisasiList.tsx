import { useEffect, useState, useMemo } from "react";
import { useShowMore } from "@/hooks/useShowMore";
import { getPengurusInti, getAnggotaDepartemen } from "../services/kepengurusan";
import type { PengurusInti, AnggotaDepartemen } from "../types/kepengurusanTypes";
import ShowMoreButton from "@/components/ShowMoreButton";
import StrukturOrganisasiCard from "./StrukturOrganisasiCard";

export default function StrukturOrganisasiList() {
    const [pengurusInti, setPengurusInti] = useState<PengurusInti[]>([]);
    const [anggotaDepartemen, setAnggotaDepartemen] = useState<AnggotaDepartemen[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([getPengurusInti(), getAnggotaDepartemen()])
            .then(([inti, anggota]) => {
                setPengurusInti(inti);
                setAnggotaDepartemen(anggota);
            })
            .catch(() => setError("Gagal memuat data kepengurusan."))
            .finally(() => setLoading(false));
    }, []);

    const { ketua, semuaAnggotaLain } = useMemo(() => {
        const k = pengurusInti.find((p) => p.jabatan?.toLowerCase() === "ketua umum");
        const lain = pengurusInti.filter((p) => p.jabatan?.toLowerCase() !== "ketua umum");
        return {
            ketua: k,
            semuaAnggotaLain: [...lain, ...anggotaDepartemen]
        };
    }, [pengurusInti, anggotaDepartemen]);

    const { visibleItems, showAll, hasMore, toggle } = useShowMore(semuaAnggotaLain, 6);

    return (
        <section className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen py-20 px-15 border-t border-[#2a2a2a]">
            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#ffd700] mb-12 text-center">
                <span className="text-white">Struktur</span> Kepengurusan Aktif
            </h2>

            {loading && <p className="text-center text-[#ffd700]/50 py-20">Memuat...</p>}
            {error && <p className="text-center text-red-400 py-20">{error}</p>}

            {!loading && !error && (
                <div className="max-w-6xl mx-auto">
                    {/* Ketua */}
                    {ketua && (
                        <div className="flex justify-center mb-14">
                            <StrukturOrganisasiCard
                                isKetua
                                jabatan={ketua.jabatan}
                                nama={ketua.nama}
                                image={ketua.image}
                                quote={ketua.slogan}
                            />
                        </div>
                    )}

                    {/* Semua Anggota (BPI & Departemen) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {visibleItems.map((item) => (
                            <StrukturOrganisasiCard
                                key={item.id}
                                jabatan={item.jabatan}
                                nama={item.nama}
                                image={item.image}
                            />
                        ))}
                    </div>
                    {hasMore && (
                        <div className="flex justify-center mt-12">
                            <ShowMoreButton showAll={showAll} onToggle={toggle} />
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}