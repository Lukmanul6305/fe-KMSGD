import type { Kegiatan } from "../types/kegiatan.types";
import KegiatanStatusBadge from "./KegiatanStatusBadge";

interface Props {
    data: Kegiatan;
}

const KegiatanSmallCard = ({ data }: Props) => (
    <article className="col-span-1 md:col-span-4 bg-[#131313] border border-[#353535] hover:border-[#ffd700] transition-colors rounded overflow-hidden flex flex-col group">
        {/* Cover Image */}
        <div className="relative w-full h-40 overflow-hidden bg-[#1e1e1e]">
            <img
                src={data.cover_image}
                alt={data.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                }}
            />
            {/* Fallback jika gambar gagal */}
            <div
                className="absolute inset-0 items-center justify-center bg-[#1e1e1e] border-b border-[#353535]"
                style={{ display: "none" }}
            >
                <span className="text-[#ffd700] text-4xl opacity-40">📷</span>
            </div>

            {/* Badge status overlay */}
            <div className="absolute top-3 right-3">
                <KegiatanStatusBadge status={data.status} />
            </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
            {/* Category badge + date */}
            <div className="flex justify-between items-center mb-3">
                <span className="px-2 py-1 bg-[#131313] border border-[#4d4732] text-[#ffd700] text-xs font-bold uppercase tracking-wider rounded-sm">
                    {data.category}
                </span>
                <span className="text-[#d0c6ab] text-sm font-semibold">{data.event_date}</span>
            </div>

            {/* Title & Desc */}
            <h3 className="text-xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-2">
                {data.title}
            </h3>
            <p className="text-[#d0c6ab] text-sm leading-relaxed mb-4 grow line-clamp-3">
                {data.description}
            </p>

            {/* Meta */}
            <div className="text-xs text-[#d0c6ab] mb-4 flex flex-col gap-1">
                <span>📍 {data.location}</span>
                <span>👥 {data.jumlah_peserta} Peserta &nbsp;·&nbsp; 🎯 {data.penanggungjawab}</span>
            </div>

            {/* Footer */}
            <div className="mt-auto flex justify-between items-center border-t border-[#353535] pt-4">
                <span className="text-[#ffd700] text-sm font-semibold">Lihat Detail</span>
                <span className="text-[#ffd700] group-hover:translate-x-1 transition-transform">→</span>
            </div>
        </div>
    </article>
);

export default KegiatanSmallCard;