import { useState, useEffect } from "react";
import { FaStar, FaUserPlus } from "react-icons/fa";
import {
    getPeriode,
    getPeriodeAktif,
    getPengurusIntiByPeriode,
    createPengurusInti,
    updatePengurusInti,
    deletePengurusInti
} from "../../service/kepengurusanService";
import type {
    PengurusInti,
    CreatePengurusIntiDto,
    PeriodeOrganisasi
} from "../kepengurusanTypes";
import Table, { type Column } from "@/components/TableAdmin";

const PengurusPage = () => {
    const [pengurusList, setPengurusList] = useState<PengurusInti[]>([]);
    const [periodes, setPeriodes] = useState<PeriodeOrganisasi[]>([]);
    const [viewPeriodeId, setViewPeriodeId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [formData, setFormData] = useState<CreatePengurusIntiDto & { file?: File | null }>({
        periodeId: 0,
        nama: "",
        jabatan: "",
        slogan: "",
        file: null
    });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (viewPeriodeId) {
            fetchPengurusData(viewPeriodeId);
        }
    }, [viewPeriodeId]);

    async function fetchInitialData() {
        try {
            const allPeriods = await getPeriode();
            setPeriodes(allPeriods);

            const aktif = await getPeriodeAktif();
            if (aktif) {
                setViewPeriodeId(aktif.id);
            } else if (allPeriods.length > 0) {
                setViewPeriodeId(allPeriods[0].id);
            }
        } catch (error) {
            console.error("Failed to fetch initial data:", error);
        }
    }

    async function fetchPengurusData(periodeId: number) {
        setIsLoading(true);
        try {
            const inti = await getPengurusIntiByPeriode(periodeId);
            setPengurusList(inti);
        } catch (error) {
            console.error("Failed to fetch pengurus inti:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const refetchCurrentView = () => {
        if (viewPeriodeId) fetchPengurusData(viewPeriodeId);
    };

    const handleOpenModal = (pengurus?: PengurusInti) => {
        if (periodes.length === 0) {
            alert("Belum ada data periode.");
            return;
        }

        if (pengurus) {
            setIsEditing(true);
            setEditId(pengurus.id);
            setFormData({
                periodeId: pengurus.periodeId,
                nama: pengurus.nama,
                jabatan: pengurus.jabatan,
                slogan: pengurus.slogan || "",
                file: null
            });
        } else {
            setIsEditing(false);
            setEditId(null);
            setFormData({
                periodeId: viewPeriodeId || periodes[0]?.id || 0,
                nama: "",
                jabatan: "",
                slogan: "",
                file: null
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);
        try {
            const formDataPayload = new FormData();
            formDataPayload.append("periodeId", String(formData.periodeId));
            formDataPayload.append("nama", formData.nama);
            formDataPayload.append("jabatan", formData.jabatan);
            if (formData.slogan) {
                formDataPayload.append("slogan", formData.slogan);
            }
            if (formData.file) {
                formDataPayload.append("image", formData.file);
            }

            if (isEditing && editId) {
                await updatePengurusInti(editId, formDataPayload);
            } else {
                await createPengurusInti(formDataPayload);
            }

            setIsModalOpen(false);
            refetchCurrentView();
        } catch (error) {
            console.error(error);
            alert("Gagal menyimpan pengurus inti");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Hapus pengurus ini?")) {
            try {
                await deletePengurusInti(id);
                refetchCurrentView();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const columns: Column<PengurusInti>[] = [
        {
            header: "Foto",
            render: (pengurus) => {
                const isKetua = pengurus.jabatan.toLowerCase().includes("ketua");
                return (
                    <div className={`w-12 h-12 overflow-hidden border-2 ${isKetua ? "border-[#ffd700]" : "border-[#2a2a2a]"}`}>
                        {pengurus.image ? (
                            <img src={pengurus.image} alt={pengurus.nama} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-[#ffd700] font-bold text-sm">
                                {pengurus.nama.substring(0, 2).toUpperCase()}
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            header: "Nama",
            cellClassName: "text-white font-semibold",
            render: (pengurus) => pengurus.nama,
        },
        {
            header: "Jabatan",
            render: (pengurus) => {
                const isKetua = pengurus.jabatan.toLowerCase().includes("ketua");
                return (
                    <span className={`text-sm font-medium ${isKetua ? "text-[#ffd700]" : "text-neutral-400"}`}>
                        {pengurus.jabatan}
                    </span>
                );
            },
        },
        {
            header: "Slogan",
            headerClassName: "hidden md:table-cell",
            cellClassName: "hidden md:table-cell",
            render: (pengurus) => pengurus.slogan ? (
                <span className="text-xs text-neutral-400 italic">"{pengurus.slogan}"</span>
            ) : (
                <span className="text-neutral-700">—</span>
            ),
        },
        {
            header: "Aksi",
            render: (pengurus) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleOpenModal(pengurus)}
                        className="bg-transparent border border-[#b8982a] text-[#b8982a] py-1 px-3 text-xs cursor-pointer tracking-[0.04em] hover:bg-[#b8982a]/10 transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(pengurus.id)}
                        className="bg-transparent border border-[#7a1a1a] text-[#f09595] py-1 px-3 text-xs cursor-pointer tracking-[0.04em] hover:bg-[#7a1a1a]/10 transition-colors"
                    >
                        Hapus
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex items-center gap-3 text-[#ffd700]">
                    <div className="border border-yellow-400 rounded-full p-1">
                        <FaStar className="text-sm" />
                    </div>
                    <h2 className="text-xl font-bold">Pengurus Inti (BPI)</h2>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <select
                        value={viewPeriodeId || ""}
                        onChange={(e) => setViewPeriodeId(Number(e.target.value))}
                        className="bg-neutral-800 border border-neutral-700 text-white px-3 py-2 focus:outline-none focus:border-yellow-400"
                    >
                        {periodes.map(p => (
                            <option key={p.id} value={p.id}>{p.periode} ({p.status})</option>
                        ))}
                    </select>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 border border-yellow-400 text-[#ffd700] px-4 py-2 font-semibold hover:bg-yellow-400 hover:text-black transition-colors"
                    >
                        <FaUserPlus />
                        Tambah BPI
                    </button>
                </div>
            </div>

            {/* Table */}
            <Table
                data={pengurusList}
                columns={columns}
                loading={isLoading}
                rowKey={(p) => p.id}
                emptyMessage="Belum ada pengurus BPI untuk periode yang dipilih."
            />

            {/* Modal — tidak diubah */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-neutral-900 border border-neutral-800 p-6 w-full max-w-md">
                        <h3 className="text-xl text-white font-bold mb-4">
                            {isEditing ? "Edit Pengurus BPI" : "Tambah Pengurus BPI"}
                        </h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Periode</label>
                                <select
                                    required
                                    value={formData.periodeId || ""}
                                    onChange={(e) => setFormData({ ...formData, periodeId: Number(e.target.value) })}
                                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                                >
                                    <option value="" disabled>Pilih Periode</option>
                                    {periodes.map(p => (
                                        <option key={p.id} value={p.id}>{p.periode} - {p.status}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.nama}
                                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Jabatan</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.jabatan}
                                    onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                                    placeholder="Contoh: Ketua Umum"
                                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Slogan / Quote (Opsional)</label>
                                <input
                                    type="text"
                                    value={formData.slogan || ""}
                                    onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Foto Pengurus</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 text-white file:mr-4 file:py-1 file:px-3 file:border-0 file:bg-neutral-700 file:text-neutral-300 hover:file:bg-neutral-600 cursor-pointer"
                                />
                                {isEditing && <p className="text-xs text-neutral-500 mt-1">Kosongkan jika tidak ingin mengubah foto</p>}
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} disabled={isUploading} className="px-4 py-2 border border-neutral-700 text-neutral-300">Batal</button>
                                <button type="submit" disabled={isUploading} className="px-4 py-2 bg-yellow-400 text-black font-semibold">
                                    {isUploading ? "Mengunggah..." : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PengurusPage;
