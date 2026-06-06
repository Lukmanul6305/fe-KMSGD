import type { Pengumuman } from "../features/user/pengumuman/types/pengumuman.types";

interface Props {
    item: Pengumuman;
}

export default function PengumumanCard({ item }: Props) {
    return (
        <article className="bg-[#20201f] border border-[#2a2a2a] hover:border-[#ffd700] transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col h-full shadow-lg">
            <div className="relative w-full aspect-video bg-[#131313] overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.isPenting && (
                    <span className="absolute top-3 left-3 bg-[#e67e22] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 shadow">
                        Penting
                    </span>
                )}
            </div>

            <div className="p-5 flex flex-col grow justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-[#131313] border border-[#4d4732] text-[#ffd700] text-xs font-semibold px-2.5 py-0.5">
                            {item.category}
                        </span>
                        <span className="text-[#999077] text-xs">
                            📅 {item.day} {item.month} 2025
                        </span>
                    </div>

                    <h3 className="text-base font-bold font-['Montserrat'] text-[#e5e2e1] mb-2 line-clamp-2 group-hover:text-[#ffd700] transition-colors leading-snug">
                        {item.title}
                    </h3>

                    <p className="text-[#d0c6ab] text-sm leading-relaxed line-clamp-3 mb-4">
                        {item.desc}
                    </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2a2a2a]">
                    <div className="text-xs text-[#999077] mb-3">
                        Oleh <span className="font-medium text-[#e5e2e1]">{item.author}</span>
                    </div>
                    <a
                        href="#"
                        className="text-[#ffd700] text-xs font-bold uppercase tracking-wider hover:underline inline-flex items-center gap-1 group/link"
                    >
                        Baca selengkapnya{" "}
                        <span className="transition-transform group-hover/link:translate-x-1">→</span>
                    </a>
                </div>
            </div>
        </article >
    );
}