import type { Kegiatan } from "../types/kegiatan.types";
import KegiatanStatusBadge from "./KegiatanStatusBadge";

interface Props {
    data: Kegiatan;
}

const KegiatanFeaturedCard = ({ data }: Props) => (
    <article className="col-span-1 md:col-span-8 bg-[#131313] border-t-[3px] border-[#ffd700] rounded flex flex-col relative overflow-hidden group">
        {/* Cover Image */}
        <div className="h-64 md:h-80 w-full bg-[#353535] relative overflow-hidden">
            <img
                src={data.cover_image}
                alt={data.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-[#131313] border border-[#ffd700] text-[#ffd700] px-3 py-1 rounded-sm text-xs font-semibold">
                📅 {data.event_date}
            </div>
        </div>

        {/* Content */}
        <div className="p-6 grow flex flex-col">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="px-2 py-1 bg-[#131313] border border-[#4d4732] text-[#ffd700] text-xs font-bold uppercase tracking-wider rounded-sm">
                    {data.category}
                </span>
                <KegiatanStatusBadge status={data.status} />
            </div>

            {/* Title & Desc */}
            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-3 leading-snug">
                {data.title}
            </h2>
            <p className="text-[#d0c6ab] text-base leading-relaxed mb-4 line-clamp-2">
                {data.description}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 text-sm text-[#d0c6ab] mb-6">
                <span>📍 {data.location}</span>
                <span>👥 {data.jumlah_peserta} Peserta</span>
                <span>🎯 PJ: {data.penanggungjawab}</span>
            </div>

            {/* Footer */}
            <div className="mt-auto flex justify-end">
                <button className="bg-[#ffd700] text-[#131313] font-bold text-sm px-6 py-2 rounded-sm hover:opacity-90 transition-opacity">
                    Lihat Detail
                </button>
            </div>
        </div>
    </article>
);

export default KegiatanFeaturedCard;