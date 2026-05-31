import Reveal from "./Reveal";
import { homeTestimonials } from "../services/homeService";

export default function TestimoniSection() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <Reveal className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#20201f] border border-[#353535] text-[#d0c6ab] text-xs font-semibold tracking-widest mb-6">
                    ✦ Testimoni
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#FFD700] mb-4">
                    <span className="text-white">Apa</span> Kata Mereka?
                </h2>
                <p className="text-[#d0c6ab] text-base">Cerita dari anggota yang telah merasakan manfaat bergabung bersama kami.</p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {homeTestimonials.map((testi, i) => (
                    <Reveal key={testi.nama} delay={i * 120}>
                        <div className="bg-[#20201f] p-8 border-t-2 border-[#FFD700] hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-[#FFD700] text-4xl font-serif mb-4">"</div>
                            <p className="text-[#d0c6ab] text-sm leading-relaxed mb-6 italic">{testi.quote}</p>
                            <div className="flex items-center gap-4 border-t border-[#353535] pt-4">
                                <img src={testi.img} alt={testi.nama} className="w-12 h-12 rounded-full border-2 border-[#FFD700]" loading="lazy" />
                                <div>
                                    <div className="text-[#e5e2e1] font-bold text-sm">{testi.nama}</div>
                                    <div className="text-[#d0c6ab] text-xs">{testi.angkatan} · {testi.jurusan}</div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}