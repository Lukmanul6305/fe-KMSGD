import type { Kegiatan } from "../types/kegiatan.types";
import KegiatanStatusBadge from "./KegiatanStatusBadge";

interface Props {
    data: Kegiatan;
}

const KegiatanSecondaryCard = ({ data }: Props) => (
    <article className="col-span-1 md:col-span-4 bg-[#131313] border border-[#353535] hover:border-[#ffd700] transition-colors rounded flex flex-col group">
        {/* Cover Image */}
        <div className="h-48 w-full bg-[#353535] relative overflow-hidden">
            <img
                src={data.cover_image}
                alt={data.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
        </div>

        {/* Content */}
        <div className="p-6 grow flex flex-col">
            {/* Badges & Date */}
            <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                <div className="flex gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-[#131313] border border-[#4d4732] text-[#ffd700] text-xs font-bold uppercase tracking-wider rounded-sm">
                        {data.category}
                    </span>
                    <KegiatanStatusBadge status={data.status} />
                </div>
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
                <span>👥 {data.jumlah_peserta} Peserta &nbsp;·&nbsp; 🎯 PJ: {data.penanggungjawab}</span>
            </div>

            {/* CTA */}
            <button className="w-full border border-[#ffd700] text-[#ffd700] font-bold text-sm px-4 py-2 rounded-sm hover:bg-[#ffd700] hover:text-[#131313] transition-colors">
                Lihat Detail
            </button>
        </div>
    </article>
);

export default KegiatanSecondaryCard;