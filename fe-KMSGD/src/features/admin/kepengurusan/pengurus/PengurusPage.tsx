import { useState, useEffect } from "react";
import { FaStar, FaUserPlus, FaPen, FaTrash } from "react-icons/fa";
import { 
  getPeriodeAktif, 
  getPengurusIntiByPeriode, 
  createPengurusInti, 
  updatePengurusInti, 
  deletePengurusInti
} from "../../service/kepengurusanService";
import type { 
  PengurusInti, 
  CreatePengurusIntiDto
} from "../../service/kepengurusanTypes";

const PengurusPage = () => {
    const [pengurusList, setPengurusList] = useState<PengurusInti[]>([]);
    const [periodeAktif, setPeriodeAktif] = useState<{ id: number, nama: string } | null>(null);
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
        fetchData();
    }, []);

    async function fetchData() {
        setIsLoading(true);
        try {
            const aktif = await getPeriodeAktif();
            if (aktif) {
                setPeriodeAktif({ id: aktif.id, nama: aktif.periode });
                const inti = await getPengurusIntiByPeriode(aktif.id);
                setPengurusList(inti);
            }
        } catch (error) {
            console.error("Failed to fetch pengurus inti:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (pengurus?: PengurusInti) => {
        if (!periodeAktif) {
            alert("Tidak ada periode aktif.");
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
                periodeId: periodeAktif.id,
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
            fetchData();
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
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-3 text-yellow-400 mb-1">
                        <div className="border border-yellow-400 rounded-full p-1">
                            <FaStar className="text-sm" />
                        </div>
                        <h2 className="text-xl font-bold">Pengurus Inti (BPI)</h2>
                    </div>
                    <p className="text-neutral-400 text-sm">
                        Periode Aktif: {periodeAktif ? periodeAktif.nama : "Tidak ada"}
                    </p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 border border-yellow-400 text-yellow-400 px-4 py-2 font-semibold hover:bg-yellow-400 hover:text-black transition-colors"
                >
                    <FaUserPlus />
                    Tambah BPI
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    <div className="col-span-full text-neutral-400 text-center py-8">Loading...</div>
                ) : pengurusList.length === 0 ? (
                    <div className="col-span-full text-neutral-400 text-center py-8 border border-neutral-800 bg-neutral-900/30">
                        Belum ada pengurus BPI untuk periode ini.
                    </div>
                ) : (
                    pengurusList.map((pengurus) => {
                        const isKetua = pengurus.jabatan.toLowerCase().includes("ketua");
                        return (
                            <div key={pengurus.id} className="relative bg-neutral-800 border border-neutral-700 p-6 flex flex-col items-center text-center hover:bg-neutral-800/80 transition-colors group">
                                {/* Tombol Aksi (Muncul saat hover) */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                    <button onClick={() => handleOpenModal(pengurus)} className="p-2 text-neutral-400 hover:text-white bg-neutral-900/80 rounded-full">
                                        <FaPen className="text-xs" />
                                    </button>
                                    <button onClick={() => handleDelete(pengurus.id)} className="p-2 text-neutral-400 hover:text-red-500 bg-neutral-900/80 rounded-full">
                                        <FaTrash className="text-xs" />
                                    </button>
                                </div>

                                <div className={`w-24 h-24 rounded-full overflow-hidden mb-4 border-2 ${isKetua ? 'border-yellow-400' : 'border-neutral-600'}`}>
                                    {pengurus.image ? (
                                        <img src={pengurus.image} alt={pengurus.nama} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-neutral-700 flex items-center justify-center text-yellow-400 font-bold text-xl">
                                            {pengurus.nama.substring(0, 2).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-white font-bold text-lg mb-1">{pengurus.nama}</h3>
                                <p className={`text-sm font-medium mb-4 ${isKetua ? 'text-yellow-400' : 'text-neutral-400'}`}>
                                    {pengurus.jabatan}
                                </p>
                                {pengurus.slogan && (
                                    <div className="bg-neutral-900 border border-neutral-700 px-4 py-1 text-xs text-neutral-300 w-full italic">
                                        "{pengurus.slogan}"
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-neutral-900 border border-neutral-800 p-6 w-full max-w-md">
                        <h3 className="text-xl text-white font-bold mb-4">
                            {isEditing ? "Edit Pengurus BPI" : "Tambah Pengurus BPI"}
                        </h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Nama Lengkap</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.nama}
                                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Jabatan</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.jabatan}
                                    onChange={(e) => setFormData({...formData, jabatan: e.target.value})}
                                    placeholder="Contoh: Ketua Umum"
                                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Slogan / Quote (Opsional)</label>
                                <input 
                                    type="text" 
                                    value={formData.slogan || ""}
                                    onChange={(e) => setFormData({...formData, slogan: e.target.value})}
                                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Foto Pengurus</label>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
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
