import type { Kegiatan } from "../../kegiatanTypes";

interface Props {
    kegiatan: Kegiatan;
    index: number;
    onDeleteClick: (id: number) => void;
}

const formatTanggal = (date: string) =>
    new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

const KegiatanTableRow = ({ kegiatan: k, index, onDeleteClick }: Props) => {
    return (
        <tr className="border-b border-[#2a2a2a] bg-transparent hover:bg-[#111] transition-colors duration-150">
            <td className="py-6 px-3 text-zinc-500 tabular-nums">{index}</td>

            <td className="py-6 px-3">
                {k.image ? (
                    <img
                        src={k.image}
                        alt={k.title}
                        className="w-15 h-10 object-cover border border-[#2a2a2a] block"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                ) : (
                    <div className="w-15 h-10 bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[0.65rem] text-[#444]">
                        No img
                    </div>
                )}
            </td>

            <td className="py-6 px-3 text-[#ccc] whitespace-nowrap">
                {formatTanggal(k.startTime)}
            </td>

            <td className="py-6 px-3 max-w-48">
                <div className="font-semibold text-[#f5e27a] mb-0.5 overflow-hidden text-ellipsis whitespace-nowrap">
                    {k.title}
                </div>
                {k.organizerCustom && (
                    <div className="text-xs text-[#777]">{k.organizerCustom}</div>
                )}
            </td>

            <td className="py-6 px-3">
                <span className="bg-[#1a1500] border border-[#b8982a] text-[#f5e27a] py-0.5 px-2.5 text-xs tracking-wider whitespace-nowrap">
                    {k.kategori.nama}
                </span>
            </td>

            <td className="py-6 px-3">
                {k.departemen ? (
                    <span className="bg-[#0d1a0d] border border-[#3b6d11] text-[#97c459] py-0.5 px-2.5 text-xs tracking-wider whitespace-nowrap">
                        {k.departemen.namaDepartemen}
                    </span>
                ) : (
                    <span className="text-zinc-600 text-xs">—</span>
                )}
            </td>

            <td className="py-6 px-3 text-[#ccc] max-w-36 overflow-hidden text-ellipsis whitespace-nowrap">
                {k.location}
            </td>

            <td className="py-6 px-3">
                <span
                    className={`border py-0.5 px-2.5 text-xs whitespace-nowrap ${k.isPublished
                        ? "bg-[#0a1a0a] border-[#3b6d11] text-[#97c459]"
                        : "bg-[#1a0a0a] border-[#7a1a1a] text-[#f09595]"
                        }`}
                >
                    {k.isPublished ? "Publik" : "Draft"}
                </span>
            </td>

            <td className="py-6 px-3">
                <div className="flex gap-2">
                    <a
                        href={`/admin/kegiatan/edit/${k.id}`}
                        className="bg-transparent border border-[#b8982a] text-[#b8982a] py-1 px-3 text-xs cursor-pointer no-underline tracking-[0.04em] hover:bg-[#b8982a]/10 transition-colors"
                    >
                        Edit
                    </a>
                    <button
                        onClick={() => onDeleteClick(k.id)}
                        className="bg-transparent border border-[#7a1a1a] text-[#f09595] py-1 px-3 text-xs cursor-pointer tracking-[0.04em] hover:bg-[#7a1a1a]/10 transition-colors"
                    >
                        Hapus
                    </button>
                </div>
            </td>
        </tr >
    );
};

export default KegiatanTableRow;