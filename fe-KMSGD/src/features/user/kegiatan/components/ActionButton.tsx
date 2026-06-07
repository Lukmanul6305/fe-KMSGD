import { Link } from "react-router-dom";

interface Props {
    label: string;
}

export default function ActionButton({ label }: Props) {
    return (
        <Link to="/kegiatan/detail" className="bg-transparent text-[#ffd700] border border-[#ffd700]/40 px-5 py-2.5 font-bold text-[10px] uppercase tracking-[2px] cursor-pointer whitespace-nowrap hover:bg-[#ffd700] hover:text-black hover:border-[#ffd700] transition-all duration-300">
            {label}
        </Link>
    );
}
