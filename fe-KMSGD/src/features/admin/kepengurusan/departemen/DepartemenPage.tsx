import { useState, useEffect } from "react";
import { FaSitemap, FaPlus, FaPen, FaChevronDown, FaChevronUp, FaTimes, FaTrash } from "react-icons/fa";
import {
    getPeriodeAktif,
    getDepartemenByPeriode,
    createDepartemen,
    updateDepartemen,
    deleteDepartemen,
    createAnggota,
    deleteAnggota
} from "../../service/kepengurusanService";
import type {
    Departemen,
    CreateDepartemenDto,
    UpdateDepartemenDto,
    CreateAnggotaDto
} from "../../service/kepengurusanTypes";

const DepartemenPage = () => {
    const [departemenList, setDepartemenList] = useState<Departemen[]>([]);
    const [periodeAktifId, setPeriodeAktifId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedDept, setExpandedDept] = useState<number | null>(null);

    // Modal Dept
    const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
    const [isEditDept, setIsEditDept] = useState(false);
    const [editDeptId, setEditDeptId] = useState<number | null>(null);
    const [deptForm, setDeptForm] = useState<CreateDepartemenDto>({
        periodeId: 0,
        namaDepartemen: "",
        deskripsi: ""
    });

    // Modal Anggota
    const [isAnggotaModalOpen, setIsAnggotaModalOpen] = useState(false);
    const [anggotaForm, setAnggotaForm] = useState<CreateAnggotaDto & { file?: File | null }>({
        departemenId: 0,
        nama: "",
        jabatan: "Anggota",
        file: null
    });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setIsLoading(true);
        try {
            const periodeAktif = await getPeriodeAktif();
            if (periodeAktif) {
                setPeriodeAktifId(periodeAktif.id);
                const depts = await getDepartemenByPeriode(periodeAktif.id);
                setDepartemenList(depts);
            }
        } catch (error) {
            console.error("Failed to fetch departemen data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleDept = (id: number) => {
        setExpandedDept(expandedDept === id ? null : id);
    };

    // --- DEPARTEMEN HANDLERS ---
    const handleOpenDeptModal = (dept?: Departemen) => {
        if (!periodeAktifId) {
            alert("Tidak ada periode aktif.");
            return;
        }
        if (dept) {
            setIsEditDept(true);
            setEditDeptId(dept.id);
            setDeptForm({
                periodeId: dept.periodeId,
                namaDepartemen: dept.namaDepartemen,
                deskripsi: dept.deskripsi || ""
            });
        } else {
            setIsEditDept(false);
            setEditDeptId(null);
            setDeptForm({
                periodeId: periodeAktifId,
                namaDepartemen: "",
                deskripsi: ""
            });
        }
        setIsDeptModalOpen(true);
    };

    const submitDept = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditDept && editDeptId) {
                await updateDepartemen(editDeptId, deptForm as UpdateDepartemenDto);
            } else {
                await createDepartemen(deptForm);
            }
            setIsDeptModalOpen(false);
            fetchData();
        } catch (error) {
            console.error(error);
            alert("Gagal menyimpan departemen");
        }
    };

    const handleDeleteDept = async (id: number) => {
        if (confirm("Hapus departemen ini beserta seluruh anggotanya?")) {
            try {
                await deleteDepartemen(id);
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    };

    // --- ANGGOTA HANDLERS ---
    const handleOpenAnggotaModal = (deptId: number) => {
        setAnggotaForm({
            departemenId: deptId,
            nama: "",
            jabatan: "Anggota",
            file: null
        });
        setIsAnggotaModalOpen(true);
    };

    const submitAnggota = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);
        try {
            const formDataPayload = new FormData();
            formDataPayload.append("departemenId", String(anggotaForm.departemenId));
            formDataPayload.append("nama", anggotaForm.nama);
            formDataPayload.append("jabatan", anggotaForm.jabatan);
            if (anggotaForm.file) {
                formDataPayload.append("image", anggotaForm.file);
            }

            await createAnggota(formDataPayload);
            setIsAnggotaModalOpen(false);
            fetchData();
        } catch (error) {
            console.error(error);
            alert("Gagal menambahkan anggota");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteAnggota = async (id: number) => {
        if (confirm("Hapus anggota ini?")) {
            try {
                await deleteAnggota(id);
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3 text-yellow-400">
                    <FaSitemap className="text-xl" />
                    <h2 className="text-xl font-bold">Departemen</h2>
                </div>
                <button
                    onClick={() => handleOpenDeptModal()}
                    className="flex items-center gap-2 border border-yellow-400 text-yellow-400 px-4 py-2 font-semibold hover:bg-yellow-400 hover:text-black transition-colors"
                >
                    <FaPlus />
                    Tambah Dept
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {isLoading ? (
                    <div className="text-neutral-400 text-center py-8">Loading...</div>
                ) : departemenList.length === 0 ? (
                    <div className="text-neutral-400 text-center py-8 border border-neutral-800">
                        Belum ada departemen untuk periode aktif ini.
                    </div>
                ) : (
                    departemenList.map((dept) => (
                        <div key={dept.id} className="border border-neutral-800 bg-neutral-900/30">
                            {/* Header Departemen */}
                            <div className="flex justify-between items-center p-4 border-l-4 border-l-yellow-400 hover:bg-neutral-800/50 transition-colors">
                                <div
                                    className="flex items-center gap-4 cursor-pointer flex-1"
                                    onClick={() => toggleDept(dept.id)}
                                >
                                    <div className="w-10 h-10 bg-yellow-400/10 text-yellow-400 flex items-center justify-center shrink-0">
                                        <FaSitemap />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-base">{dept.namaDepartemen}</h3>
                                        <p className="text-neutral-400 text-sm">{dept.deskripsi}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="border border-neutral-700 bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
                                        {dept.anggota?.length || 0} Anggota
                                    </span>
                                    <button onClick={() => handleOpenDeptModal(dept)} className="text-neutral-400 hover:text-white p-2">
                                        <FaPen className="text-sm" />
                                    </button>
                                    <button onClick={() => handleDeleteDept(dept.id)} className="text-neutral-400 hover:text-red-500 p-2">
                                        <FaTrash className="text-sm" />
                                    </button>
                                    <button onClick={() => toggleDept(dept.id)} className="text-neutral-400 p-2">
                                        {expandedDept === dept.id ? <FaChevronUp className="text-sm" /> : <FaChevronDown className="text-sm" />}
                                    </button>
                                </div>
                            </div>

                            {/* Konten Expand: Daftar Anggota */}
                            {expandedDept === dept.id && (
                                <div className="p-4 border-t border-neutral-800 bg-neutral-900/50">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-neutral-400 text-sm font-medium">Daftar Anggota Departemen</h4>
                                        <button
                                            onClick={() => handleOpenAnggotaModal(dept.id)}
                                            className="flex items-center gap-1 text-yellow-400 text-sm font-semibold hover:text-yellow-300"
                                        >
                                            <FaPlus className="text-xs" />
                                            Tambah Anggota
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {dept.anggota && dept.anggota.length > 0 ? (
                                            dept.anggota.map((anggota) => (
                                                <div key={anggota.id} className="flex justify-between items-center bg-neutral-800 p-3">
                                                    <div className="flex items-center gap-3">
                                                        {anggota.image ? (
                                                            <img src={anggota.image} alt={anggota.nama} className="w-10 h-10 object-cover" />
                                                        ) : (
                                                            <div className="w-10 h-10 bg-neutral-700 text-yellow-400 font-bold flex items-center justify-center text-sm">
                                                                {anggota.nama.substring(0, 2).toUpperCase()}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="text-white font-medium text-sm">
                                                                {anggota.nama}
                                                                {anggota.jabatan.toLowerCase() !== 'anggota' && (
                                                                    <span className="text-yellow-400 text-xs ml-1">({anggota.jabatan})</span>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => handleDeleteAnggota(anggota.id)} className="text-neutral-500 hover:text-red-400 transition-colors p-2">
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-neutral-500">Belum ada anggota.</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Modal Departemen */}
            {isDeptModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-neutral-900 border border-neutral-800 p-6 w-full max-w-md">
                        <h3 className="text-xl text-white font-bold mb-4">
                            {isEditDept ? "Edit Departemen" : "Tambah Departemen"}
                        </h3>
                        <form onSubmit={submitDept} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Nama Departemen</label>
                                <input
                                    type="text"
                                    required
                                    value={deptForm.namaDepartemen}
                                    onChange={(e) => setDeptForm({ ...deptForm, namaDepartemen: e.target.value })}
                                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Deskripsi</label>
                                <textarea
                                    value={deptForm.deskripsi}
                                    onChange={(e) => setDeptForm({ ...deptForm, deskripsi: e.target.value })}
                                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                                    rows={3}
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" onClick={() => setIsDeptModalOpen(false)} className="px-4 py-2 border border-neutral-700 text-neutral-300">Batal</button>
                                <button type="submit" className="px-4 py-2 bg-yellow-400 text-black font-semibold">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Anggota */}
            {isAnggotaModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-neutral-900 border border-neutral-800 p-6 w-full max-w-md">
                        <h3 className="text-xl text-white font-bold mb-4">Tambah Anggota</h3>
                        <form onSubmit={submitAnggota} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    required
                                    value={anggotaForm.nama}
                                    onChange={(e) => setAnggotaForm({ ...anggotaForm, nama: e.target.value })}
                                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Jabatan</label>
                                <input
                                    type="text"
                                    required
                                    value={anggotaForm.jabatan}
                                    onChange={(e) => setAnggotaForm({ ...anggotaForm, jabatan: e.target.value })}
                                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Foto (Opsional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setAnggotaForm({ ...anggotaForm, file: e.target.files?.[0] || null })}
                                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 text-white file:mr-4 file:py-1 file:px-3 file:border-0 file:bg-neutral-700 file:text-neutral-300 hover:file:bg-neutral-600 cursor-pointer"
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" onClick={() => setIsAnggotaModalOpen(false)} disabled={isUploading} className="px-4 py-2 border border-neutral-700 text-neutral-300">Batal</button>
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

export default DepartemenPage;
