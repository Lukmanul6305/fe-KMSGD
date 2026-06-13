import { useEffect, useState, useCallback } from "react";
import { getKegiatanAdmin, deleteKegiatan } from "../../service/kegiatanService";
import type { Kegiatan } from "../kegiatanTypes";
import AdminKategoriKegiatan from "./AdminKategoriKegiatan";

import KegiatanTable from "../components/adminKegiatan/KegiatanTable";
import Pagination from "../components/adminKegiatan/Pagination";
import ConfirmDeleteModal from "../components/adminKegiatan/ConfirmDeleteModal";

type TabType = "kegiatan" | "kategori";

const AdminKegiatan = () => {
    const [data, setData] = useState<Kegiatan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [activeTab, setActiveTab] = useState<TabType>("kegiatan");

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getKegiatanAdmin();
            setData(result);
        } catch {
            setError("Gagal memuat data kegiatan.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPage(1);
    }, [search, perPage]);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteKegiatan(deleteId);
            setData((prev) => prev.filter((k) => k.id !== deleteId));
        } catch {
            setError("Gagal menghapus kegiatan.");
        } finally {
            setConfirmDelete(false);
            setDeleteId(null);
        }
    };

    const filtered = data.filter(
        (k) =>
            k.title.toLowerCase().includes(search.toLowerCase()) ||
            k.kategori.nama.toLowerCase().includes(search.toLowerCase()) ||
            k.location.toLowerCase().includes(search.toLowerCase()) ||
            (k.departemen?.namaDepartemen ?? "").toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const tabs: { key: TabType; label: string }[] = [
        { key: "kegiatan", label: "KEGIATAN" },
        { key: "kategori", label: "KATEGORI" },
    ];

    return (
        <section className="font-sans text-[#f5e27a]">
            {/* Header */}
            <div className="mb-8 border-b border-[#b8982a] pb-4">
                <h1 className="text-[1.75rem] font-bold text-[#f5e27a] m-0">Manajemen Kegiatan</h1>
                <p className="text-[#a89040] mt-1 m-0 text-[0.9rem]">Kelola data kegiatan, kategori, dan speaker</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-[#2a2a2a] mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-6 py-3 font-bold text-sm tracking-wider transition-colors cursor-pointer ${activeTab === tab.key
                            ? "bg-[#1a1500] border-b-2 border-[#b8982a] text-[#f5e27a]"
                            : "bg-transparent border-b-2 border-transparent text-zinc-500 hover:text-[#b8982a]"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === "kategori" ? (
                <AdminKategoriKegiatan />
            ) : (
                <>
                    <div className="flex justify-between items-center mb-5 gap-4 flex-wrap">
                        <input
                            type="text"
                            placeholder="Cari judul, kategori, departemen, lokasi..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-[#1a1a1a] border border-[#b8982a] text-[#f5e27a] py-2 px-3.5 text-sm outline-none w-80 focus:ring-1 focus:ring-[#b8982a]"
                        />
                        <a
                            href="/admin/kegiatan/tambah"
                            className="bg-[#b8982a] text-[#0a0a0a] py-2 px-5 font-bold text-sm no-underline tracking-wider hover:bg-[#b8982a]/90 transition-colors"
                        >
                            + Tambah Kegiatan
                        </a>
                    </div>

                    {error && (
                        <div className="bg-[#2a0a0a] border border-[#7a1a1a] text-[#f09595] py-2.5 px-4 mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <KegiatanTable
                        data={paginated}
                        loading={loading}
                        page={page}
                        perPage={perPage}
                        onDeleteClick={(id) => { setDeleteId(id); setConfirmDelete(true); }}
                    />

                    {!loading && (
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            perPage={perPage}
                            totalItems={filtered.length}
                            onPageChange={setPage}
                            onPerPageChange={setPerPage}
                        />
                    )}

                    <ConfirmDeleteModal
                        open={confirmDelete}
                        onCancel={() => { setConfirmDelete(false); setDeleteId(null); }}
                        onConfirm={handleDelete}
                    />
                </>
            )
            }
        </section >
    );
};

export default AdminKegiatan;