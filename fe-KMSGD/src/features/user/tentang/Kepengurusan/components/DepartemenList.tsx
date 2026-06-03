import { useState } from "react";
import { departments } from "../../services/tentangService";
import DepartemenCard from "./DepartemenCard";
import ShowMoreButton from "../../../../../components/ShowMoreButton";
import { useShowMore } from "../../../../../hooks/useShowMore";

export default function DepartemenList() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { visibleItems, showAll, hasMore, toggle } = useShowMore(departments, 3);

    const toggleDepartment = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <section className="py-20 px-15 border-t border-[#2a2a2a] flex flex-col gap-4">
                {visibleItems.map((dept, index) => (
                    <DepartemenCard
                        key={index}
                        dept={dept}
                        isOpen={openIndex === index}
                        onToggle={() => toggleDepartment(index)}
                    />
                ))}
            </section>

            {hasMore && (
                <div className="mb-10">
                    <ShowMoreButton showAll={showAll} onToggle={toggle} />
                </div>
            )}
        </>
    );
}