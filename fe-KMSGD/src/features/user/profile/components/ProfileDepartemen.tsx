import { useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    GraduationCap,
} from "lucide-react";
import { departments } from "../services/profileService";
import MemberCard from "./MemberCard";

export default function ProfileDepartemen() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);
    const visibleDivisions = showAll
        ? departments
        : departments.slice(0, 3);

    const toggleDepartment = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <section className="space-y-5 px-15">
                <div className="flex items-center gap-4 my-10">
                    <div className="flex-1 h-px bg-gray-700"></div>
                    <span className="text-[#ffd700] uppercase tracking-[3px] text-sm font-semibold">
                        Departemen
                    </span>
                    <div className="flex-1 h-px bg-gray-700"></div>
                </div>
                {visibleDivisions.map((dept, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            key={index}
                            className="bg-[#111] border border-[#1f1f1f] overflow-hidden"
                        >
                            {/* HEADER */}
                            <button
                                onClick={() => toggleDepartment(index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#151515] transition"
                            >
                                <div className="flex items-center gap-5">

                                    {/* Icon */}
                                    <div className="w-14 h-14 bg-[#1b1b1b] border border-[#ffd700]/20 flex items-center justify-center">
                                        <GraduationCap
                                            className="text-[#ffd700]"
                                            size={22}
                                        />
                                    </div>

                                    {/* Text */}
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">
                                            {dept.nama}
                                        </h3>

                                        <p className="text-gray-500 text-sm">
                                            {dept.desc}
                                        </p>
                                        <p className="text-[#777] text-xs mt-1 uppercase tracking-[1px]">
                                            {dept.staff.length + 2} Anggota
                                        </p>
                                    </div>
                                </div>

                                {isOpen ? (
                                    <ChevronUp className="text-gray-500" />
                                ) : (
                                    <ChevronDown className="text-gray-500" />
                                )}
                            </button>

                            {/* CONTENT */}
                            <div
                                className={`transition-all duration-500 overflow-hidden ${isOpen
                                    ? "max-h-250 opacity-100 p-6 pt-0"
                                    : "max-h-0 opacity-0"
                                    }`}
                            >

                                {/* Ketua & Wakil */}
                                <div className="mb-8 mt-8 flex flex-col md:flex-row gap-4">
                                    <MemberCard member={dept.ketua} variant="ketua" />
                                    <MemberCard member={dept.wakil} variant="ketua" />
                                </div>

                                {/* Staff */}
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                                    {dept.staff.map((staff, idx) => (
                                        <MemberCard key={idx} member={staff} variant="anggota" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
            {
                departments.length > 4 && (
                    <div className="flex justify-center mt-10 mb-10">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="flex items-center gap-2 px-6 py-3 border border-[#ffd700]/40 text-[#ffd700] hover:bg-[#ffd700] hover:text-black transition duration-300"
                        >
                            {showAll ? (
                                <>
                                    Lihat Lebih Sedikit
                                    <ChevronUp size={18} />
                                </>
                            ) : (
                                <>
                                    Lihat Selengkapnya
                                    <ChevronDown size={18} />
                                </>
                            )}
                        </button>
                    </div>
                )
            }
        </>
    );
}