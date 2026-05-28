import type { KegiatanKategori } from "../types/kegiatan.types";

interface Props {
    filters: KegiatanKategori[];
    active: KegiatanKategori;
    onChange: (filter: KegiatanKategori) => void;
}

const KegiatanFilter = ({ filters, active, onChange }: Props) => (
    <div className="mb-12 flex flex-wrap gap-4 border-b border-[#2a2a2a] pb-4">
        {filters.map((f) => (
            <button
                key={f}
                onClick={() => onChange(f)}
                className={`px-6 py-2 rounded-full border text-sm font-semibold tracking-wide transition-colors duration-200 ${active === f
                    ? "border-[#ffd700] text-[#ffd700] bg-[#353535]"
                    : "border-[#353535] text-[#d0c6ab] hover:border-[#ffd700] hover:text-[#ffd700]"
                    }`}
            >
                {f}
            </button>
        ))}
    </div>
);

export default KegiatanFilter;