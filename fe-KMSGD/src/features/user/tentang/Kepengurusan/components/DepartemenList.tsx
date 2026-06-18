import { useEffect, useState } from "react";
import { getDepartemenAktif } from "../services/kepengurusan";
import type { Department } from "../../types/tentang.types";
import type { AnggotaDepartemen } from "../types/kepengurusanTypes";
import DepartemenCard from "./DepartemenCard";
import ShowMoreButton from "../../../../../components/ShowMoreButton";
import { useShowMore } from "@/hooks/useShowMore";

export default function DepartemenList() {
    const [departemenData, setDepartemenData] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getDepartemenAktif()
            .then((data) => {
                const mapped: Department[] = data.map((d) => {
                    const ketuaFallback: AnggotaDepartemen = { id: -1, departemenId: d.id, nama: "-", jabatan: "Ketua Departemen" };
                    const wakilFallback: AnggotaDepartemen = { id: -2, departemenId: d.id, nama: "-", jabatan: "Wakil Ketua Departemen" };
                    const ketua = d.anggota.find((a) => a.jabatan?.toLowerCase().includes("ketua") && !a.jabatan?.toLowerCase().includes("wakil")) || ketuaFallback;
                    const wakil = d.anggota.find((a) => a.jabatan?.toLowerCase().includes("wakil")) || wakilFallback;
                    const staff = d.anggota.filter((a) => a.id !== ketua.id && a.id !== wakil.id);
                    
                    return {
                        nama: d.namaDepartemen,
                        desc: d.deskripsi || "",
                        ketua: { nama: ketua.nama, jabatan: ketua.jabatan, image: ketua.image },
                        wakil: { nama: wakil.nama, jabatan: wakil.jabatan, image: wakil.image },
                        staff: staff.map(s => ({ nama: s.nama, jabatan: s.jabatan, image: s.image }))
                    };
                });
                setDepartemenData(mapped);
            })
            .catch(() => setError("Gagal memuat data departemen."))
            .finally(() => setLoading(false));
    }, []);

    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { visibleItems, showAll, hasMore, toggle } = useShowMore(departemenData, 3);

    const toggleDepartment = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            {loading && <p className="text-center text-[#ffd700]/50 py-10">Memuat departemen...</p>}
            {error && <p className="text-center text-red-400 py-10">{error}</p>}
            
            {!loading && !error && (
                <>
                    <section className="pt-20 pb-4 border-t border-[#2a2a2a] flex flex-col gap-4">
                        <div className="space-y-5">
                            {visibleItems.map((dept, index) => (
                                <DepartemenCard
                                    key={index}
                                    dept={dept}
                                    isOpen={openIndex === index}
                                    onToggle={() => toggleDepartment(index)}
                                />
                            ))}
                        </div>
                    </section>

                    {hasMore && (
                        <ShowMoreButton showAll={showAll} onToggle={toggle} />
                    )}
                </>
            )}
        </>
    );
}
