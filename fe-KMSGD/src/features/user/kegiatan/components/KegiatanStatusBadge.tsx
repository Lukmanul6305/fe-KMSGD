import type { KegiatanStatus } from "../types/kegiatan.types";

const statusConfig: Record<KegiatanStatus, { label: string; color: string }> = {
    akan_datang: { label: "Akan Datang", color: "text-blue-400 border-blue-400" },
    berlangsung: { label: "Berlangsung", color: "text-green-400 border-green-400" },
    selesai: { label: "Selesai", color: "text-[#d0c6ab] border-[#4d4d4d]" },
};

const KegiatanStatusBadge = ({ status }: { status: KegiatanStatus }) => {
    const { label, color } = statusConfig[status];
    return (
        <span className={`px-2 py-1 border text-xs font-bold uppercase tracking-wider rounded-sm ${color}`}>
            {label}
        </span>
    );
};

export default KegiatanStatusBadge;