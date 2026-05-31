import Reveal from "./Reveal";
import { homeStats } from "../services/homeService";

export default function StatsSection() {
    return (
        <section className="bg-[#0e0e0e] py-12 border-y border-[#353535]">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#353535] text-center">
                {homeStats.map(({ value, label }, i) => (
                    <Reveal key={label} delay={i * 100} className="py-6 md:py-0">
                        <div className="text-5xl md:text-6xl font-bold font-['Montserrat'] text-[#ffd700] mb-2">{value}</div>
                        <div className="text-xs font-semibold tracking-widest text-[#d0c6ab] uppercase">{label}</div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}