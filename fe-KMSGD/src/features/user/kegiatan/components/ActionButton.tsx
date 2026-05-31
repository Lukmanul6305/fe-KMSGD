import type { ActionStyle } from "../types/kegiatan.types";

interface Props {
    style: ActionStyle;
    label: string;
}

export default function ActionButton({ style, label }: Props) {
    if (style === "gold") {
        return (
            <button className="bg-[#ffd700] text-black px-5 py-2.5 font-bold text-[10px] uppercase tracking-[2px] border border-[#ffd700] cursor-pointer whitespace-nowrap hover:bg-transparent hover:text-[#ffd700] transition-all duration-300">
                {label}
            </button>
        );
    }
    return (
        <button className="bg-transparent text-[#ffd700] border border-[#ffd700]/40 px-5 py-2.5 font-bold text-[10px] uppercase tracking-[2px] cursor-pointer whitespace-nowrap hover:bg-[#ffd700] hover:text-black hover:border-[#ffd700] transition-all duration-300">
            {label}
        </button>
    );
}
