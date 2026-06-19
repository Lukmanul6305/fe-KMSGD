import { useCallback, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getHomeBackgrounds, createHomeBackground, updateHomeBackground, deleteHomeBackground } from "../service/homeBackgroundService";
import type { HomeBackground } from "./homeBackgroundTypes";
import Table, { type Column } from "@/components/TableAdmin";
import { FaPlus, FaImage } from "react-icons/fa";

const HOME_BACKGROUND_QUERY_KEY = ["home-backgrounds"];

const AdminHomeBackground = () => {
    const queryClient = useQueryClient();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [editId, setEditId] = useState<number | null>(null);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");

    const { data = [], isLoading } = useQuery({
        queryKey: HOME_BACKGROUND_QUERY_KEY,
        queryFn: async () => {
            const res = await getHomeBackgrounds(1, 50);
            return res.data || [];
        },
    });

    const refreshBackgrounds = useCallback(() => {
        return queryClient.invalidateQueries({ queryKey: HOME_BACKGROUND_QUERY_KEY });
    }, [queryClient]);

    const handleOpenForm = useCallback((bg?: HomeBackground) => {
        if (bg) {
            setEditId(bg.id);
            setIsActive(bg.isActive);
            setFile(null);
            setPreview(bg.image);
        } else {
            setEditId(null);
            setIsActive(true);
            setFile(null);
            setPreview("");
        }
        setIsFormOpen(true);
    }, []);

    const handleCloseForm = useCallback(() => {
        setIsFormOpen(false);
        setEditId(null);
        setIsActive(true);
        setFile(null);
        setPreview("");
    }, []);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            if (editId) {
                await updateHomeBackground(editId, file || undefined, isActive);
            } else {
                if (!file) return alert("Foto wajib diisi untuk data baru.");
                await createHomeBackground(file, isActive);
            }
            handleCloseForm();
            await refreshBackgrounds();
        } catch (error) {
            console.error("Gagal menyimpan data:", error);
            alert("Gagal menyimpan data");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = useCallback(async (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus background ini?")) return;
        try {
            await deleteHomeBackground(id);
            await refreshBackgrounds();
        } catch (error) {
            console.error("Gagal menghapus:", error);
            alert("Gagal menghapus data");
        }
    }, [refreshBackgrounds]);

    const columns = useMemo<Column<HomeBackground>[]>(() => [
        {
            header: "Foto",
            cellClassName: "w-32",
            render: (item) => (
                <div className="w-54 border border-[#2a2a2a] overflow-hidden bg-[#1a1a1a]">
                    <img src={item.image} alt="Background" className="w-full h-full object-cover" />
                </div>
            )
        },
        {
            header: "Status",
            render: (item) => (
                <span className={`inline-block px-3 py-1 text-xs font-bold border ${item.isActive
                    ? 'border-[#b8982a] text-[#ffd700] bg-[#1a1500]'
                    : 'border-[#444] text-zinc-400 bg-[#1a1a1a]'
                    }`}>
                    {item.isActive ? "Aktif" : "Tidak Aktif"}
                </span>
            )
        },
        {
            header: "Tanggal Dibuat",
            cellClassName: "text-zinc-400",
            render: (item) => new Date(item.createdAt).toLocaleDateString("id-ID", {
                day: "2-digit", month: "short", year: "numeric"
            })
        },
        {
            header: "Aksi",
            cellClassName: "w-40",
            render: (item) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleOpenForm(item)}
                        className="bg-transparent border border-[#b8982a] text-[#b8982a] py-1 px-3 text-xs cursor-pointer tracking-[0.04em] hover:bg-[#b8982a]/10 transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-transparent border border-[#7a1a1a] text-[#f09595] py-1 px-3 text-xs cursor-pointer tracking-[0.04em] hover:bg-[#7a1a1a]/10 transition-colors"
                    >
                        Hapus
                    </button>
                </div>
            )
        }
    ], [handleDelete, handleOpenForm]);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#ffd700] tracking-wider uppercase mb-1">
                        Home Background
                    </h1>
                    <p className="text-zinc-500 text-sm">
                        Kelola foto latar belakang (slideshow) untuk halaman utama.
                    </p>
                </div>
                <button
                    onClick={() => handleOpenForm()}
                    className="flex items-center gap-2 bg-[#ffd700] text-[#0a0a0a] py-2 px-5 font-bold text-sm tracking-wider hover:bg-[#b8982a]/90 transition-colors cursor-pointer    "
                >
                    <FaPlus /> TAMBAH FOTO
                </button>
            </div>

            <Table
                data={data}
                columns={columns}
                loading={isLoading}
                rowKey={(bg) => bg.id}
                emptyMessage="Belum ada home background yang ditambahkan."
            />

            {/* Modal Form */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] border border-[#333] w-full max-w-lg shadow-2xl relative">
                        <div className="border-b border-[#222] p-5">
                            <h3 className="text-xl font-bold text-[#ffd700] uppercase tracking-wider">
                                {editId ? "Edit Background" : "Tambah Background Baru"}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-5">
                                {/* Upload Box */}
                                <div>
                                    <label className="block text-zinc-400 text-sm mb-2 uppercase tracking-widest font-bold">
                                        FOTO BACKGROUND
                                    </label>
                                    <div className="border-2 border-dashed border-[#333] bg-[#0a0a0a] hover:border-[#b8982a]/50 transition-colors relative h-48 flex flex-col items-center justify-center cursor-pointer group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            {...(!editId && !file ? { required: true } : {})}
                                        />
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                        ) : (
                                            <div className="text-center">
                                                <FaImage className="text-4xl text-[#333] mb-3 mx-auto group-hover:text-[#b8982a] transition-colors" />
                                                <p className="text-zinc-500 text-sm">Klik atau seret gambar ke sini</p>
                                                <p className="text-[#333] text-xs mt-1">(Maks 2MB, Rasio 16:9 disarankan)</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Status Active */}
                                <div className="flex items-center justify-between border border-[#222] p-4 bg-[#0a0a0a]">
                                    <div>
                                        <label className="block text-zinc-300 font-medium">Aktif di Beranda?</label>
                                        <p className="text-xs text-zinc-600 mt-1">Jika dimatikan, gambar tidak akan ditampilkan di slideshow</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={isActive}
                                            onChange={(e) => setIsActive(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-[#222] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b8982a]"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-8 pt-5 border-t border-[#222]">
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="px-5 py-2.5 border border-[#333] text-zinc-400 font-medium hover:bg-[#222] hover:text-white transition-colors uppercase tracking-wider text-sm cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2.5 bg-[#b8982a] text-[#1a1500] font-bold hover:bg-[#ffd700] transition-colors uppercase tracking-wider text-sm disabled:opacity-50 cursor-pointer"
                                >
                                    {isSubmitting ? "Menyimpan..." : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminHomeBackground;
