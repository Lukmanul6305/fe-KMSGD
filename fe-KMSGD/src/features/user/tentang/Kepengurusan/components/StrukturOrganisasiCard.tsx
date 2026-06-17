import { User } from "lucide-react";

interface Props {
    jabatan: string;
    nama: string;
    image?: string | null;
    isKetua?: boolean;
    quote?: string | null;
}

export default function StrukturOrganisasiCard({ jabatan, nama, image, isKetua = false, quote }: Props) {
    if (isKetua) {
        return (
            <div className="w-fit bg-[#111] border border-[#ffd700] p-8 text-center shadow-[0_0_25px_rgba(255,215,0,0.15)] hover:scale-105 transition duration-300">
                <div className="w-64 h-64 mx-auto bg-linear-to-b from-[#3a3200] to-[#1a1a1a] flex items-center justify-center border border-[#ffd700]/40 mb-5 overflow-hidden">
                    {image
                        ? <img src={image} alt={nama} className="w-full h-full object-cover" loading="lazy" />
                        : <User className="text-[#ffd700]" size={34} />
                    }
                </div>
                <p className="text-[10px] tracking-[3px] uppercase text-[#ffd700] mb-2">{jabatan}</p>
                <h3 className="text-white font-semibold text-lg">{nama}</h3>
                {quote && <p className="text-gray-500 italic text-xs mt-3">"{quote}"</p>}
            </div>
        );
    }

    return (
        <div className="bg-[#111] p-8 text-center border border-[#1f1f1f] hover:border-[#ffd700]/40 hover:-translate-y-2 transition duration-300">
            <div className="w-64 h-64 mx-auto bg-linear-to-b from-[#3a3200] to-[#1a1a1a] flex items-center justify-center mb-5 overflow-hidden">
                {image
                    ? <img src={image} alt={nama} className="w-full h-full object-cover" loading="lazy" />
                    : <User className="text-[#d4af37]" size={28} />
                }
            </div>
            <p className="text-[10px] tracking-[3px] uppercase text-[#ffd700] mb-2">{jabatan}</p>
            <h3 className="text-white font-semibold">{nama}</h3>
        </div>
    );
}