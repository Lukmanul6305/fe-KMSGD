import { useEffect, useState, useCallback } from "react";
import { getKegiatan, deleteKegiatan } from "../../service/kegiatanService";
import type { Kegiatan } from "../kegiatanTypes";

const AdminKegiatan = () => {
    const [data, setData] = useState<Kegiatan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getKegiatan();
            setData(result);
        } catch {
            setError("Gagal memuat data kegiatan.");
        } finally {
            setLoading(false);
        }
    }, []);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { fetchData(); }, [fetchData]);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setPage(1); }, [search, perPage]);

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
            k.category.toLowerCase().includes(search.toLowerCase()) ||
            k.location.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    const btnStyle = (active: boolean, disabled: boolean) => ({
        background: active ? "#b8982a" : "transparent",
        border: `1px solid ${disabled ? "#2a2a2a" : active ? "#b8982a" : "#444"}`,
        color: disabled ? "#333" : active ? "#0a0a0a" : "#888",
        padding: "4px 10px",
        fontSize: "0.75rem",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: active ? 700 : 400,
        minWidth: "32px",
    });

    return (
        <section style={{ padding: "2rem", fontFamily: "sans-serif", color: "#f5e27a" }}>
            {/* Header */}
            <div style={{ marginBottom: "2rem", borderBottom: "1px solid #b8982a", paddingBottom: "1rem" }}>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#f5e27a", margin: 0 }}>
                    Kegiatan
                </h1>
                <p style={{ color: "#a89040", margin: "4px 0 0", fontSize: "0.9rem" }}>
                    Kelola semua data kegiatan
                </p>
            </div>

            {/* Toolbar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", gap: "1rem", flexWrap: "wrap" }}>
                <input
                    type="text"
                    placeholder="Cari judul, kategori, lokasi..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        background: "#1a1a1a",
                        border: "1px solid #b8982a",
                        color: "#f5e27a",
                        padding: "8px 14px",
                        fontSize: "0.875rem",
                        outline: "none",
                        width: "280px",
                    }}
                />
                <a
                    href="/admin/kegiatan/tambah"
                    style={{
                        background: "#b8982a",
                        color: "#0a0a0a",
                        padding: "8px 20px",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        letterSpacing: "0.05em",
                    }}
                >
                    + Tambah Kegiatan
                </a>
            </div>

            {/* Error */}
            {error && (
                <div style={{ background: "#2a0a0a", border: "1px solid #7a1a1a", color: "#f09595", padding: "10px 16px", marginBottom: "1rem", fontSize: "0.875rem" }}>
                    {error}
                </div>
            )}

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid #b8982a" }}>
                            {["#", "Gambar", "Tanggal", "Judul", "Kategori", "Lokasi", "Waktu", "Status", "Aksi"].map((h) => (
                                <th
                                    key={h}
                                    style={{
                                        textAlign: "left",
                                        padding: "10px 12px",
                                        color: "#b8982a",
                                        fontWeight: 700,
                                        fontSize: "0.75rem",
                                        letterSpacing: "0.08em",
                                        textTransform: "uppercase",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={9} style={{ padding: "3rem", textAlign: "center", color: "#a89040" }}>
                                    Memuat data...
                                </td>
                            </tr>
                        ) : paginated.length === 0 ? (
                            <tr>
                                <td colSpan={9} style={{ padding: "3rem", textAlign: "center", color: "#555" }}>
                                    Tidak ada kegiatan ditemukan.
                                </td>
                            </tr>
                        ) : (
                            paginated.map((k, i) => (
                                <tr
                                    key={k.id}
                                    style={{ borderBottom: "1px solid #2a2a2a", transition: "background 0.15s" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = "#111")}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                >
                                    <td style={{ padding: "12px", color: "#555", fontVariantNumeric: "tabular-nums" }}>
                                        {(page - 1) * perPage + i + 1}
                                    </td>
                                    <td style={{ padding: "12px" }}>
                                        {k.image ? (
                                            <img
                                                src={k.image}
                                                alt={k.title}
                                                style={{ width: "60px", height: "40px", objectFit: "cover", border: "1px solid #2a2a2a", display: "block" }}
                                                onError={(e) => { e.currentTarget.style.display = "none"; }}
                                            />
                                        ) : (
                                            <div style={{ width: "60px", height: "40px", background: "#1a1a1a", border: "1px solid #2a2a2a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", color: "#444" }}>
                                                No img
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ padding: "12px", whiteSpace: "nowrap", color: "#ccc" }}>{formatDate(k.date)}</td>
                                    <td style={{ padding: "12px", maxWidth: "220px" }}>
                                        <div style={{ fontWeight: 600, color: "#f5e27a", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            {k.title}
                                        </div>
                                        {k.organizer && <div style={{ fontSize: "0.75rem", color: "#777" }}>{k.organizer}</div>}
                                    </td>
                                    <td style={{ padding: "12px" }}>
                                        <span style={{ background: "#1a1500", border: "1px solid #b8982a", color: "#f5e27a", padding: "2px 10px", fontSize: "0.75rem", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                                            {k.category}
                                        </span>
                                    </td>
                                    <td style={{ padding: "12px", color: "#ccc", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {k.location}
                                    </td>
                                    <td style={{ padding: "12px", color: "#ccc", whiteSpace: "nowrap" }}>
                                        {k.startTime}{k.endTime ? ` – ${k.endTime}` : ""}
                                    </td>
                                    <td style={{ padding: "12px" }}>
                                        <span style={{ background: k.isPublished ? "#0a1a0a" : "#1a0a0a", border: `1px solid ${k.isPublished ? "#3b6d11" : "#7a1a1a"}`, color: k.isPublished ? "#97c459" : "#f09595", padding: "2px 10px", fontSize: "0.75rem" }}>
                                            {k.isPublished ? "Publik" : "Draft"}
                                        </span>
                                    </td>
                                    <td style={{ padding: "12px" }}>
                                        <div style={{ display: "flex", gap: "8px" }}>
                                            <a
                                                href={`/admin/kegiatan/edit/${k.id}`}
                                                style={{ background: "transparent", border: "1px solid #b8982a", color: "#b8982a", padding: "4px 12px", fontSize: "0.75rem", cursor: "pointer", textDecoration: "none", letterSpacing: "0.04em" }}
                                            >
                                                Edit
                                            </a>
                                            <button
                                                onClick={() => { setDeleteId(k.id); setConfirmDelete(true); }}
                                                style={{ background: "transparent", border: "1px solid #7a1a1a", color: "#f09595", padding: "4px 12px", fontSize: "0.75rem", cursor: "pointer", letterSpacing: "0.04em" }}
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer: info + per page + pagination */}
            {!loading && (
                <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                    {/* Kiri: info */}
                    <div style={{ color: "#555", fontSize: "0.8rem" }}>
                        Menampilkan {filtered.length === 0 ? 0 : (page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} dari {filtered.length} kegiatan
                    </div>

                    {/* Kanan: per page + pagination */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        {/* Per page */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#555" }}>
                            <span>Tampilkan</span>
                            {[5, 10, 15].map((n) => (
                                <button
                                    key={n}
                                    onClick={() => setPerPage(n)}
                                    style={btnStyle(perPage === n, false)}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <button
                                onClick={() => setPage(1)}
                                disabled={page === 1}
                                style={btnStyle(false, page === 1)}
                            >
                                «
                            </button>
                            <button
                                onClick={() => setPage((p) => p - 1)}
                                disabled={page === 1}
                                style={btnStyle(false, page === 1)}
                            >
                                ‹
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                                    if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
                                    acc.push(p);
                                    return acc;
                                }, [])
                                .map((p, idx) =>
                                    p === "..." ? (
                                        <span key={`ellipsis-${idx}`} style={{ color: "#444", padding: "4px 6px", fontSize: "0.75rem" }}>…</span>
                                    ) : (
                                        <button
                                            key={p}
                                            onClick={() => setPage(p as number)}
                                            style={btnStyle(page === p, false)}
                                        >
                                            {p}
                                        </button>
                                    )
                                )}

                            <button
                                onClick={() => setPage((p) => p + 1)}
                                disabled={page === totalPages || totalPages === 0}
                                style={btnStyle(false, page === totalPages || totalPages === 0)}
                            >
                                ›
                            </button>
                            <button
                                onClick={() => setPage(totalPages)}
                                disabled={page === totalPages || totalPages === 0}
                                style={btnStyle(false, page === totalPages || totalPages === 0)}
                            >
                                »
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Delete Modal */}
            {confirmDelete && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
                    <div style={{ background: "#0f0f0f", border: "1px solid #b8982a", padding: "2rem", width: "360px" }}>
                        <h3 style={{ color: "#f5e27a", margin: "0 0 0.75rem", fontSize: "1rem", fontWeight: 700 }}>
                            Hapus Kegiatan
                        </h3>
                        <p style={{ color: "#a89040", fontSize: "0.875rem", margin: "0 0 1.5rem" }}>
                            Yakin ingin menghapus kegiatan ini? Tindakan ini tidak bisa dibatalkan.
                        </p>
                        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                            <button
                                onClick={() => { setConfirmDelete(false); setDeleteId(null); }}
                                style={{ background: "transparent", border: "1px solid #444", color: "#888", padding: "8px 20px", cursor: "pointer", fontSize: "0.875rem" }}
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                style={{ background: "#7a1a1a", border: "1px solid #7a1a1a", color: "#f09595", padding: "8px 20px", cursor: "pointer", fontSize: "0.875rem", fontWeight: 700 }}
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AdminKegiatan;