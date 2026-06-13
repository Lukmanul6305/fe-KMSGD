import type { Kegiatan } from "../../kegiatanTypes";
import KegiatanTableRow from "./KegiatanTableRow";

const COLUMNS = ["#", "Gambar", "Tanggal", "Judul", "Kategori", "Departemen", "Lokasi", "Status", "Aksi"];

interface Props {
    data: Kegiatan[];
    loading: boolean;
    page: number;
    perPage: number;
    onDeleteClick: (id: number) => void;
}

const KegiatanTable = ({ data, loading, page, perPage, onDeleteClick }: Props) => {
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
                                Tidak ada kegiatan ditemukan.
                            </td>
                        </tr>
                    ) : (
                        data.map((k, i) => (
                            <KegiatanTableRow
                                key={k.id}
                                kegiatan={k}
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

export default KegiatanTable;