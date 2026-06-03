import { ChevronDown, User } from "lucide-react";
import MemberCard from "../../components/MemberCard";
import { useShowMore } from "../../../../../hooks/useShowMore";

interface Member {
    jabatan: string;
    nama: string;
}

interface Props {
    periode: string;
    anggota: Member[];
    isOpen: boolean;
    onToggle: () => void;
}

export default function DemisionerCard({ periode, anggota, isOpen, onToggle }: Props) {
    const { visibleItems, showAll, hasMore, toggle: toggleMembers } = useShowMore(anggota, 10);

    return (
        <div
            className={`bg-[#111] border transition-all duration-300 ${isOpen ? "border-[#2c2c2c]" : "border-[#1f1f1f] hover:border-[#2a2a2a]"
                }`}
        >
            {/* HEADER */}
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center p-6 text-left"
            >
                <div className="flex items-center gap-5">
                    <div
                        className={`w-14 h-14 flex items-center justify-center border transition-all ${isOpen ? "bg-[#ffd700] border-[#ffd700]" : "bg-[#151515] border-[#2a2a2a]"
                            }`}
                    >
                        <User size={22} className={isOpen ? "text-black" : "text-[#ffd700]"} />
                    </div>
                    <div>
                        <h3
                            className={`text-xl font-bold font-['Montserrat'] ${isOpen ? "text-white" : "text-[#f5f5f5]"
                                }`}
                        >
                            {periode}
                        </h3>
                        <p className="text-[#777] text-sm mt-1">
                            Kabinet Harmoni Sinergi • {anggota.length} Anggota
                        </p>
                    </div>
                </div>

                <span
                    className={`text-[#777] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                >
                    <ChevronDown size={20} />
                </span>
            </button>

            {/* CONTENT */}
            <div
                className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-500 opacity-100 px-6 pb-6" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {visibleItems.map(({ jabatan, nama }, idx) => (
                        <MemberCard
                            key={idx}
                            member={{ nama, jabatan }}
                            variant="demisioner"
                        />
                    ))}
                </div>

                {hasMore && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={toggleMembers}
                            className="text-xs text-[#b0b0b0] hover:text-[#ffd700] transition flex items-center gap-2"
                        >
                            {showAll ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
                            <span
                                className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""
                                    }`}
                            >
                                <ChevronDown size={14} />
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}