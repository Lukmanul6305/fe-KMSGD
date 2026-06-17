import { useEffect, useState, useCallback } from "react";
import { getKategoriPengumuman, createKategoriPengumuman, updateKategoriPengumuman, deleteKategoriPengumuman } from "../../service/pengumumanService";
import type { KategoriPengumuman } from "../pengumumanTypes";

const AdminKategoriPengumuman = () => {
    const [data, setData] = useState<KategoriPengumuman[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [formNama, setFormNama] = useState("");

    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getKategoriPengumuman();
            setData(result);
        } catch {
            setError("Gagal memuat data kategori.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchData();
    }, [fetchData]);

    const handleOpenForm = (kategori?: KategoriPengumuman) => {
        if (kategori) {
            setEditId(kategori.id);
            setFormNama(kategori.nama);
        } else {
            setEditId(null);
            setFormNama("");
        }
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditId(null);
        setFormNama("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editId) {
                const updated = await updateKategoriPengumuman(editId, { nama: formNama });
                setData((prev) => prev.map((k) => k.id === editId ? updated : k));
            } else {
                const created = await createKategoriPengumuman({ nama: formNama });
                setData((prev) => [...prev, created]);
            }
            handleCloseForm();
        } catch {
            setError("Gagal menyimpan kategori.");
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteKategoriPengumuman(deleteId);
            setData((prev) => prev.filter((k) => k.id !== deleteId));
        } catch {
            setError("Gagal menghapus kategori. Pastikan tidak ada pengumuman yang menggunakan kategori ini.");
        } finally {
            setConfirmDelete(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-[#ffd700] m-0 text-xl font-bold">Daftar Kategori</h2>
                <button
                    onClick={() => handleOpenForm()}
                    className="bg-[#ffd700] text-[#0a0a0a] py-2 px-5 font-bold text-sm tracking-wider hover:bg-[#b8982a]/90 transition-colors cursor-pointer"
                >
                    + Tambah Kategori
                </button>
            </div>

            {error && (
                <div className="bg-[#2a0a0a] border border-[#7a1a1a] text-[#f09595] py-2.5 px-4 mb-4 text-sm">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="border-b-2 border-[#b8982a]">
                            <th className="text-left py-5 px-3 text-[#ffd700] font-bold text-xs tracking-[0.08em] uppercase whitespace-nowrap w-16">#</th>
                            <th className="text-left py-5 px-3 text-[#ffd700] font-bold text-xs tracking-[0.08em] uppercase whitespace-nowrap">Nama Kategori</th>
                            <th className="text-left py-5 px-3 text-[#ffd700] font-bold text-xs tracking-[0.08em] uppercase whitespace-nowrap w-40">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={3} className="p-12 text-center text-[#ffd700]">Memuat data...</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={3} className="p-12 text-center text-zinc-500">Tidak ada kategori ditemukan.</td></tr>
                        ) : (
                            data.map((k, i) => (
                                <tr key={k.id} className="border-b border-[#2a2a2a] bg-transparent hover:bg-[#111] transition-colors duration-150">
                                    <td className="py-4 px-3 text-zinc-500 tabular-nums">{i + 1}</td>
                                    <td className="py-4 px-3 text-[#ffd700]">{k.nama}</td>
                                    <td className="py-4 px-3">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleOpenForm(k)} className="bg-transparent border border-[#ffd700] text-[#ffd700] py-1 px-3 text-xs cursor-pointer tracking-[0.04em] hover:bg-[#b8982a]/10 transition-colors">Edit</button>
                                            <button onClick={() => { setDeleteId(k.id); setConfirmDelete(true); }} className="bg-transparent border border-[#ffd700] text-[#ffd700] py-1 px-3 text-xs cursor-pointer tracking-[0.04em] hover:bg-[#7a1a1a]/10 transition-colors">Hapus</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
                    <div className="bg-[#0f0f0f] border border-[#b8982a] p-8 w-90">
                        <h3 className="text-[#ffd700] m-0 mb-4 text-base font-bold">{editId ? "Edit Kategori" : "Tambah Kategori"}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-[#ffd700] text-xs font-bold uppercase mb-2">Nama Kategori *</label>
                                <input
                                    type="text"
                                    value={formNama}
                                    onChange={(e) => setFormNama(e.target.value)}
                                    required
                                    placeholder="Contoh: Beasiswa"
                                    className="w-full bg-[#1a1a1a] border border-[#ffd700] text-[#ffd700] px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#ffd700]"
                                />
                            </div>
                            <div className="flex gap-3 justify-end">
                                <button type="button" onClick={handleCloseForm} className="bg-transparent border border-zinc-700 text-zinc-400 py-2 px-5 cursor-pointer text-sm hover:bg-zinc-900 transition-colors">Batal</button>
                                <button type="submit" className="bg-[#b8982a] border border-[#b8982a] text-[#0a0a0a] py-2 px-5 cursor-pointer text-sm font-bold hover:bg-[#b8982a]/90 transition-colors">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {confirmDelete && (
                <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
                    <div className="bg-[#0f0f0f] border border-[#b8982a] p-8 w-90">
                        <h3 className="text-[#ffd700] m-0 mb-3 text-base font-bold">Hapus Kategori</h3>
                        <p className="text-[#a89040] text-sm m-0 mb-6">Yakin ingin menghapus kategori ini? Pastikan kategori ini tidak sedang digunakan oleh pengumuman.</p>
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => { setConfirmDelete(false); setDeleteId(null); }} className="bg-transparent border border-zinc-700 text-zinc-400 py-2 px-5 cursor-pointer text-sm hover:bg-zinc-900 transition-colors">Batal</button>
                            <button onClick={handleDelete} className="bg-[#7a1a1a] border border-[#7a1a1a] text-[#f09595] py-2 px-5 cursor-pointer text-sm font-bold hover:bg-[#962121] transition-colors">Hapus</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminKategoriPengumuman;