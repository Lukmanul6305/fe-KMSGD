import Reveal from "../ui/Reveal";
import { homeFounders } from "../../services/homeService";

export default function DewanPendiriSection() {
    return (
        <section className="py-24 px-6 bg-[#0e0e0e] border-y border-[#353535]">
            <div className="max-w-7xl mx-auto">
                <Reveal className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#20201f] border border-[#353535] text-[#d0c6ab] text-xs font-semibold tracking-widest mb-6">
                        ✦ Legacy & Honor
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#FFD700] mb-4">
                        <span className="text-white">Dewan</span> Pendiri KMSGD
                    </h2>
                    <p className="text-[#d0c6ab] text-base max-w-2xl mx-auto">
                        Mengenang jasa para pendiri yang telah meletakkan dasar perjuangan dan nilai-nilai luhur organisasi ini.
                    </p>
                </Reveal>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {homeFounders.map((person, i) => (
                        <Reveal key={person.nama} delay={i * 100} className="group text-center">
                            <div className="relative overflow-hidden border-2 border-transparent hover:border-[#FFD700] transition-all duration-300 mb-4">
                                <img
                                    src={person.img}
                                    alt={person.nama}
                                    className="w-full aspect-3/4 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-[#FFD700]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <h4 className="text-[#FFD700] font-bold font-['Montserrat'] text-base mb-1">{person.nama}</h4>
                            <p className="text-[#d0c6ab] text-xs tracking-wider uppercase">{person.peran}</p>
                            <p className="text-[#d0c6ab]/60 text-xs mt-1">{person.tahun}</p>
                        </Reveal>
                    ))}
                </div>

                <Reveal className="text-center mt-10">
                    <p className="text-[#d0c6ab]/50 text-xs italic">
                        "Al-Fatihah untuk para pendiri yang telah berpulang. Jasa mu abadi dalam sanubari kami."
                    </p>
                </Reveal>
            </div>
        </section>
    );
}