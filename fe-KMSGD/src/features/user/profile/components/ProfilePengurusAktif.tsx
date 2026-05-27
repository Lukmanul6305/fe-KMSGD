import { useState } from "react";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import { profileDivisions, ketua } from "../services/profileService";

export default function StrukturSection() {
    const [showAll, setShowAll] = useState(false);

    // tampil awal cuma 4
    const visibleDivisions = showAll
        ? profileDivisions
        : profileDivisions.slice(0, 6);

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-[#2a2a2a]">
            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#ffd700] mb-12 text-center">
                <span className="text-white">Struktur</span> Kepengurusan Aktif
            </h2>

            {/* Ketua */}
            <div className="flex justify-center mb-14">
                <div className="w-70 bg-[#111] border border-[#ffd700] rounded-2xl p-8 text-center shadow-[0_0_25px_rgba(255,215,0,0.15)] hover:scale-105 transition duration-300">

                    <div className="w-20 h-20 mx-auto rounded-full bg-linear-to-b from-[#3a3200] to-[#1a1a1a] flex items-center justify-center border border-[#ffd700]/40 mb-5">
                        <User className="text-[#ffd700]" size={34} />
                    </div>

                    <p className="text-[10px] tracking-[3px] uppercase text-[#ffd700] mb-2">
                        {ketua.jabatan}
                    </p>

                    <h3 className="text-white font-semibold text-lg">
                        {ketua.nama}
                    </h3>

                    <p className="text-gray-500 italic text-xs mt-3">
                        “Visi tanpa eksekusi adalah halusinasi.”
                    </p>
                </div>
            </div>

            {/* Card Divisi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {visibleDivisions.map((item, index) => (
                    <div
                        key={index}
                        className="bg-[#111] rounded-2xl p-8 text-center border border-[#1f1f1f] hover:border-[#ffd700]/40 hover:-translate-y-2 transition duration-300"
                    >
                        <div className="w-16 h-16 mx-auto rounded-full bg-linear-to-b from-[#3a3200] to-[#1a1a1a] flex items-center justify-center mb-5">
                            <User className="text-[#d4af37]" size={28} />
                        </div>

                        <p className="text-[10px] tracking-[3px] uppercase text-[#ffd700] mb-2">
                            {item.jabatan}
                        </p>

                        <h3 className="text-white font-semibold">
                            {item.nama}
                        </h3>
                    </div>
                ))}
            </div>

            {/* Tombol */}
            {profileDivisions.length > 4 && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#ffd700]/40 text-[#ffd700] hover:bg-[#ffd700] hover:text-black transition duration-300"
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
            )}
        </section>
    );
}