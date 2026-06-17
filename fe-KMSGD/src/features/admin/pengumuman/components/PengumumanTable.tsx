import type { Pengumuman } from "../pengumumanTypes";
import PengumumanTableRow from "./PengumumanTableRow";

const COLUMNS = ["#", "Gambar", "Tanggal", "Judul", "Kategori", "Penting", "Status", "Aksi"];

interface Props {
    data: Pengumuman[];
    loading: boolean;
    page: number;
    perPage: number;
    onDeleteClick: (id: number) => void;
}

const PengumumanTable = ({ data, loading, page, perPage, onDeleteClick }: Props) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b-2 border-[#b8982a]">
                        {COLUMNS.map((h) => (
                            <th key={h} className="text-left py-5 px-3 text-[#b8982a] font-bold text-xs tracking-[0.08em] uppercase whitespace-nowrap">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={COLUMNS.length} className="p-24 text-center text-[#a89040]">
                                Memuat data...
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={COLUMNS.length} className="p-24 text-center text-zinc-500">
                                Tidak ada pengumuman ditemukan.
                            </td>
                        </tr>
                    ) : (
                        data.map((p, i) => (
                            <PengumumanTableRow
                                key={p.id}
                                pengumuman={p}
                                index={(page - 1) * perPage + i + 1}
                                onDeleteClick={onDeleteClick}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PengumumanTable;