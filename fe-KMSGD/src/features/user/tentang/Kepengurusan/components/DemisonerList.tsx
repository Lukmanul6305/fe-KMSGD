import { useState } from "react";
import { profileDemisioner } from "../../services/tentangService";
import DemisionerCard from "./DemisionerCard";

export default function DemisionerList() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 px-15 border-t border-[#2a2a2a]">
            <div className="space-y-5">
                {profileDemisioner.map(({ periode, anggota }, i) => (
                    <DemisionerCard
                        key={i}
                        periode={periode}
                        anggota={anggota}
                        isOpen={openIndex === i}
                        onToggle={() => toggle(i)}
                    />
                ))}
            </div>
        </section>
    );
}