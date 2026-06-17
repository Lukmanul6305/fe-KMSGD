import type { Galeri } from "../galeriType";

interface Props {
    data: Galeri[];
    onEditClick: (galeri: Galeri) => void;
    onDeleteClick: (id: number) => void;
}

const GaleriTable = ({ data, onEditClick, onDeleteClick }: Props) => {
    return (
        <div className="border border-[#2a2a2a] overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-[#2a2a2a] bg-[#0f0f0f]">
                        <th className="text-left text-[#a89040] font-bold tracking-widest uppercase text-xs py-3 px-4 w-20">
                            Foto
                        </th>
                        <th className="text-left text-[#a89040] font-bold tracking-widest uppercase text-xs py-3 px-4">
                            Judul
                        </th>
                        <th className="text-left text-[#a89040] font-bold tracking-widest uppercase text-xs py-3 px-4">
                            Kegiatan
                        </th>
                        <th className="text-left text-[#a89040] font-bold tracking-widest uppercase text-xs py-3 px-4 w-28">
                            Status
                        </th>
                        <th className="text-right text-[#a89040] font-bold tracking-widest uppercase text-xs py-3 px-4 w-44">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((g) => (
                        <tr key={g.id} className="border-b border-[#2a2a2a] last:border-b-0 hover:bg-[#161616] transition-colors">
                            <td className="py-2 px-4">
                                <div className="w-14 h-14 bg-[#1a1a1a] overflow-hidden border border-[#2a2a2a]">
                                    <img
                                        src={g.tipe === "VIDEO" ? (g.thumbnail ?? "") : g.url}
                                        alt={g.judul ?? "Galeri"}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                                    />
                                </div>
                            </td>
                            <td className="py-2 px-4 text-[#ffd700] font-semibold max-w-60 truncate">
                                {g.judul || "Tanpa judul"}
                            </td>
                            <td className="py-2 px-4 text-[#777] max-w-50 truncate">
                                {g.kegiatan ? g.kegiatan.title : "—"}
                            </td>
                            <td className="py-2 px-4">
                                <span
                                    className={`inline-block border py-0.5 px-2 text-[0.65rem] whitespace-nowrap ${g.isPublished
                                        ? "bg-[#0a1a0a] border-[#3b6d11] text-[#97c459]"
                                        : "bg-[#1a0a0a] border-[#7a1a1a] text-[#f09595]"
                                        }`}
                                >
                                    {g.isPublished ? "Publik" : "Draft"}
                                </span>
                            </td>
                            <td className="py-2 px-4">
                                <div className="flex gap-2 justify-end">
                                    <button
                                        onClick={() => onEditClick(g)}
                                        className="border border-[#b8982a] text-[#b8982a] py-1 px-3 text-xs cursor-pointer tracking-[0.04em] hover:bg-[#b8982a]/10 transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDeleteClick(g.id)}
                                        className="border border-[#7a1a1a] text-[#f09595] py-1 px-3 text-xs cursor-pointer tracking-[0.04em] hover:bg-[#7a1a1a]/10 transition-colors"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GaleriTable;