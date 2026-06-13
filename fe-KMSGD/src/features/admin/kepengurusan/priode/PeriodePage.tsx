import { useState, useEffect } from "react";
import { FaCalendarAlt, FaPlus, FaPen, FaTrash } from "react-icons/fa";
import {
    getPeriode,
    createPeriode,
    updatePeriode,
    deletePeriode
} from "../../service/kepengurusanService";
import type { PeriodeOrganisasi, CreatePeriodeDto, UpdatePeriodeDto } from "../../service/kepengurusanTypes";

const PeriodePage = () => {
    const [periodes, setPeriodes] = useState<PeriodeOrganisasi[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Form Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [formData, setFormData] = useState<CreatePeriodeDto>({
        periode: "",
        status: "AKTIF"
    });

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setIsLoading(true);
        try {
            const data = await getPeriode();
            setPeriodes(data);
        } catch (error) {
            console.error("Failed to fetch periode:", error);
            alert("Gagal memuat data periode");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (periode?: PeriodeOrganisasi) => {
        if (periode) {
            setIsEditing(true);
            setEditId(periode.id);
            setFormData({
                periode: periode.periode,
                status: periode.status,
            });
        } else {
            setIsEditing(false);
            setEditId(null);
            setFormData({
                periode: "",
                status: "AKTIF",
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && editId) {
                await updatePeriode(editId, formData as UpdatePeriodeDto);
            } else {
                await createPeriode(formData);
            }
            handleCloseModal();
            fetchData();
        } catch (error) {
            console.error("Failed to save periode:", error);
            alert("Gagal menyimpan periode");
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus periode ini?")) {
            try {
                await deletePeriode(id);
                fetchData();
            } catch (error) {
                console.error("Failed to delete periode:", error);
                alert("Gagal menghapus periode");
            }
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3 text-yellow-400">
                    <FaCalendarAlt className="text-xl" />
                    <h2 className="text-xl font-bold">Periode Organisasi</h2>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 font-semibold hover:bg-yellow-500 transition-colors"
                >
                    <FaPlus />
                    Tambah Periode
                </button>
            </div>

            <div className="border border-neutral-800 bg-neutral-900/50">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-neutral-800 text-sm font-medium text-neutral-400">
                    <div className="col-span-2">ID</div>
                    <div className="col-span-6">Nama Periode</div>
                    <div className="col-span-3">Status</div>
                    <div className="col-span-1 text-center">Aksi</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-neutral-800">
                    {isLoading ? (
                        <div className="p-4 text-center text-neutral-400">Loading...</div>
                    ) : periodes.length === 0 ? (
                        <div className="p-4 text-center text-neutral-400">Belum ada data periode.</div>
                    ) : (
                        periodes.map((item) => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-neutral-800/50 transition-colors">
                                <div className="col-span-2 text-neutral-400 text-sm">#{item.id}</div>
                                <div className="col-span-6 text-white font-medium">{item.periode}</div>
                                <div className="col-span-3">
                                    <span className={`inline-block px-3 py-1 text-xs font-bold border ${item.status === 'AKTIF'
                                        ? 'border-yellow-400/30 text-yellow-400 bg-yellow-400/10'
                                        : 'border-neutral-500/30 text-neutral-400 bg-neutral-500/10'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                                <div className="col-span-1 flex justify-center gap-3">
                                    <button
                                        onClick={() => handleOpenModal(item)}
                                        className="text-neutral-400 hover:text-white transition-colors"
                                    >
                                        <FaPen className="text-sm" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-neutral-400 hover:text-red-500 transition-colors"
                                    >
                                        <FaTrash className="text-sm" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-neutral-900 border border-neutral-800 p-6 w-full max-w-md">
                        <h3 className="text-xl text-white font-bold mb-4">
                            {isEditing ? "Edit Periode" : "Tambah Periode"}
                        </h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                            {/* BAGIAN INPUT PERIODE */}
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Periode</label>
                                <div className="flex items-center gap-2">
                                    {/* Dropdown Tahun Mulai */}
                                    <select
                                        required
                                        value={formData.periode ? String(formData.periode).split("-")[0] : ""}
                                        onChange={(e) => {
                                            const tahunMulaiBaru = e.target.value;
                                            // OTOMATIS: Set tahun selesai menjadi +1 tahun dari tahun mulai yang baru dipilih
                                            const tahunSelesaiOtomatis = String(Number(tahunMulaiBaru) + 1);

                                            setFormData({
                                                ...formData,
                                                periode: `${tahunMulaiBaru}-${tahunSelesaiOtomatis}`
                                            });
                                        }}
                                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                                    >
                                        <option value="" disabled>Mulai</option>
                                        {Array.from({ length: (new Date().getFullYear() - 2000) + 5 }, (_, i) => {
                                            const tahunBerdasarKalender = 2000 + i;
                                            return String(tahunBerdasarKalender);
                                        }).map((tahunStr) => (
                                            <option key={tahunStr} value={tahunStr}>{tahunStr}</option>
                                        ))}
                                    </select>

                                    <span className="text-neutral-400">s/d</span>

                                    {/* Dropdown Tahun Selesai */}
                                    <select
                                        required
                                        value={formData.periode ? String(formData.periode).split("-")[1] : ""}
                                        onChange={(e) => {
                                            const tahunMulai = formData.periode ? String(formData.periode).split("-")[0] : "";
                                            const tahunSelesaiBaru = e.target.value;

                                            // Jika user ganti manual tahun selesai, pastikan tidak lebih kecil dari tahun mulai
                                            if (Number(tahunSelesaiBaru) <= Number(tahunMulai)) {
                                                alert("Tahun selesai harus lebih besar dari tahun mulai!");
                                                return;
                                            }

                                            setFormData({
                                                ...formData,
                                                periode: `${tahunMulai}-${tahunSelesaiBaru}`
                                            });
                                        }}
                                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                                    >
                                        <option value="" disabled>Selesai</option>
                                        {Array.from({ length: (new Date().getFullYear() - 2000) + 5 }, (_, i) => {
                                            const tahunBerdasarKalender = 2001 + i;
                                            return String(tahunBerdasarKalender);
                                        }).map((tahunStr) => (
                                            <option key={tahunStr} value={tahunStr}>{tahunStr}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* BAGIAN STATUS */}
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "AKTIF" | "DEMISIONER" })}
                                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                                >
                                    <option value="AKTIF">AKTIF</option>
                                    <option value="DEMISIONER">DEMISIONER</option>
                                </select>
                            </div>

                            {/* TOMBOL AKSI */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 border border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-yellow-400 text-black font-semibold hover:bg-yellow-500"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PeriodePage;
