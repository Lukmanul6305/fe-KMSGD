import { useQuery } from "@tanstack/react-query";
import { homeStats } from "../../services/homeService";
import { getHomeStatsFromBackend } from "../../services/homeStatsService";
import RevealItem from "@/components/RevealItem";

export default function StatsSection() {
    const statsQuery = useQuery({
        queryKey: ["home-stats"],
        queryFn: getHomeStatsFromBackend,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    const stats = statsQuery.data ?? homeStats;

    return (
        <RevealItem animation="animate-fade-in-up">
            <section className="bg-[#0e0e0e] py-12 border-y border-[#353535] font-['Montserrat']">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#353535] text-center">
                    {stats.map(({ value, label }, i) => (
                        <RevealItem key={label} animation="animate-scale-in" delay={i * 60}>
                            <div className="py-6 md:py-0">
                                <div className="text-5xl md:text-6xl font-bold font-['Montserrat'] text-[#ffd700] mb-2">{value}</div>
                                <div className="text-xs font-semibold tracking-widest text-[#d0c6ab] uppercase">{label}</div>
                            </div>
                        </RevealItem>
                    ))}
                </div>
            </section>
        </RevealItem>
    );
}
