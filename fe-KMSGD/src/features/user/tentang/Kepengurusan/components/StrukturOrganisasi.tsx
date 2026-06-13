import { useShowMore } from "../../../../../hooks/useShowMore";
import { profileDivisions, ketua } from "../../services/tentangService";
import ShowMoreButton from "../../../../../components/ShowMoreButton";
import StrukturOrganisasiCard from "./StrukturOrganisasiCard";

export default function StrukturOrganisasi() {
    const { visibleItems, showAll, hasMore, toggle } = useShowMore(profileDivisions, 6);

    return (
        <section className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen py-20 px-15 border-t border-[#2a2a2a]">
            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#ffd700] mb-12 text-center">
                <span className="text-white">Struktur</span> Kepengurusan Aktif
            </h2>

            <div className="flex justify-center mb-14">
                <StrukturOrganisasiCard
                    isKetua
                    jabatan={ketua.jabatan}
                    nama={ketua.nama}
                    quote="Visi tanpa eksekusi adalah halusinasi."
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {visibleItems.map((item, index) => (
                    <StrukturOrganisasiCard
                        key={index}
                        jabatan={item.jabatan}
                        nama={item.nama}
                    />
                ))}
            </div>

            {hasMore && <ShowMoreButton showAll={showAll} onToggle={toggle} />}
        </section>
    );
}