import { Link } from "react-router-dom";

interface Props {
    img: string;
    title: string;
    desc: string;
}

export default function KegiatanCard({ img, title, desc }: Props) {
    return (
        <div className="bg-[#20201f] border-t-2 border-[#ffd700] group hover:-translate-y-1 transition-transform duration-300">
            <div className="h-32 md:h-48 overflow-hidden relative">
                <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#131313] via-transparent to-transparent" />
            </div>
            <div className="p-3 md:p-6">
                <h3 className="text-sm md:text-xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-1.5 md:mb-3 line-clamp-2">{title}</h3>
                <p className="text-[#d0c6ab] text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-3 md:mb-6">{desc}</p>
                <Link to="/pengumuman/detail" className="text-[#ffd700] text-xs md:text-sm font-semibold hover:underline">Detail →</Link>
            </div>
        </div>
    );
}