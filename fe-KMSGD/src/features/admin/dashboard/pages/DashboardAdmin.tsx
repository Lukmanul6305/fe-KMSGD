import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
    MdArticle,
    MdCampaign,
    MdEvent,
    MdGroups,
    MdPhotoLibrary,
    MdTrendingUp,
} from "react-icons/md";
import { getKegiatanAdmin } from "../../service/kegiatanService";
import { getPengumuman } from "../../service/pengumumanService";
import { getGaleriAdmin } from "../../service/galeriService";
import {
    getDepartemenByPeriode,
    getPengurusIntiByPeriode,
    getPeriode,
} from "../../service/kepengurusanService";

type RecentItem = {
    id: number;
    title: string;
    module: "Kegiatan" | "Pengumuman" | "Galeri";
    createdAt: string;
};

type MemberTrend = {
    periode: string;
    total: number;
};

const numberFormatter = new Intl.NumberFormat("id-ID");

const formatNumber = (value: number) => numberFormatter.format(value);

const formatDate = (value: string) =>
    new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(value));

const DashboardAdmin = () => {
    const dashboardQuery = useQuery({
        queryKey: ["admin-dashboard-summary"],
        queryFn: async () => {
            const [kegiatan, pengumuman, galeri, periodes] = await Promise.all([
                getKegiatanAdmin(),
                getPengumuman(),
                getGaleriAdmin(),
                getPeriode(),
            ]);

            const periodsForTrend = [...periodes]
                .sort((a, b) => a.periode.localeCompare(b.periode))
                .slice(-5);

            const memberTrend: MemberTrend[] = await Promise.all(
                periodsForTrend.map(async (periode) => {
                    const [pengurusInti, departemen] = await Promise.all([
                        getPengurusIntiByPeriode(periode.id),
                        getDepartemenByPeriode(periode.id),
                    ]);

                    const anggotaDepartemen = departemen.reduce(
                        (total, item) => total + (item.anggota?.length ?? 0),
                        0,
                    );

                    return {
                        periode: periode.periode,
                        total: pengurusInti.length + anggotaDepartemen,
                    };
                }),
            );

            return {
                kegiatan,
                pengumuman,
                galeri,
                periodes,
                memberTrend,
                loadedAt: Date.now(),
            };
        },
        staleTime: 60_000,
    });

    const summary = useMemo(() => {
        const kegiatan = dashboardQuery.data?.kegiatan ?? [];
        const pengumuman = dashboardQuery.data?.pengumuman ?? [];
        const galeri = dashboardQuery.data?.galeri ?? [];
        const memberTrend = dashboardQuery.data?.memberTrend ?? [];
        const loadedAt = dashboardQuery.data?.loadedAt ?? 0;
        const currentMembers = memberTrend.at(-1)?.total ?? 0;
        const previousMembers = memberTrend.at(-2)?.total ?? 0;
        const memberDelta = currentMembers - previousMembers;

        const publishedKegiatan = kegiatan.filter((item) => item.isPublished).length;
        const publishedPengumuman = pengumuman.filter((item) => item.isPublished).length;
        const publishedGaleri = galeri.filter((item) => item.isPublished).length;

        const recentItems: RecentItem[] = [
            ...kegiatan.map((item) => ({
                id: item.id,
                title: item.title,
                module: "Kegiatan" as const,
                createdAt: item.createdAt,
            })),
            ...pengumuman.map((item) => ({
                id: item.id,
                title: item.title,
                module: "Pengumuman" as const,
                createdAt: item.createdAt,
            })),
            ...galeri.map((item) => ({
                id: item.id,
                title: item.judul || item.kegiatan?.title || "Galeri tanpa judul",
                module: "Galeri" as const,
                createdAt: item.createdAt,
            })),
        ]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5);

        const upcomingEvents = kegiatan
            .filter((item) => new Date(item.startTime).getTime() >= loadedAt)
            .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
            .slice(0, 3);

        return {
            stats: [
                {
                    label: "Total Kegiatan",
                    value: kegiatan.length,
                    note: `${publishedKegiatan} publik, ${kegiatan.length - publishedKegiatan} draft`,
                    icon: MdEvent,
                    path: "/admin/kegiatan",
                },
                {
                    label: "Total Pengumuman",
                    value: pengumuman.length,
                    note: `${publishedPengumuman} publik, ${pengumuman.length - publishedPengumuman} draft`,
                    icon: MdCampaign,
                    path: "/admin/pengumuman",
                },
                {
                    label: "Total Galeri",
                    value: galeri.length,
                    note: `${publishedGaleri} publik, ${galeri.length - publishedGaleri} draft`,
                    icon: MdPhotoLibrary,
                    path: "/admin/galeri",
                },
                {
                    label: "Anggota Periode Aktif",
                    value: currentMembers,
                    note: memberDelta === 0 ? "Belum ada perubahan" : `${memberDelta > 0 ? "+" : ""}${formatNumber(memberDelta)} dari periode sebelumnya`,
                    icon: MdGroups,
                    path: "/admin/kepengurusan/pengurus",
                },
            ],
            recentItems,
            upcomingEvents,
            memberTrend,
            maxTrendValue: Math.max(...memberTrend.map((item) => item.total), 1),
        };
    }, [dashboardQuery.data]);

    const isLoading = dashboardQuery.isLoading;

    return (
        <div className="w-full">
            <div className="mb-8 flex flex-col gap-2">
                <h1 className="text-white text-2xl font-bold tracking-wide">
                    Dashboard Admin
                </h1>
                <p className="text-neutral-400 text-sm">
                    Ringkasan data konten dan perkembangan kepengurusan KMSGD.
                </p>
            </div>

            {dashboardQuery.isError && (
                <div className="mb-6 border border-[#7a1a1a] bg-[#2a0a0a] px-4 py-3 text-sm text-[#f09595]">
                    Gagal memuat ringkasan dashboard. Periksa koneksi API atau sesi admin.
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                {summary.stats.map((item) => (
                    <Link
                        key={item.label}
                        to={item.path}
                        className="border border-neutral-800 bg-neutral-900 p-5 hover:border-[#FACC15] transition-colors"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">
                                    {item.label}
                                </p>
                                <p className="mt-3 text-3xl font-bold text-white tabular-nums">
                                    {isLoading ? "..." : formatNumber(item.value)}
                                </p>
                            </div>
                            <div className="inline-flex h-10 w-10 items-center justify-center bg-neutral-800 text-[#FACC15]">
                                <item.icon className="text-2xl" />
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-neutral-500">
                            {isLoading ? "Memuat data..." : item.note}
                        </p>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-6">
                <section className="border border-neutral-800 bg-neutral-900 p-5">
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-white text-sm font-bold uppercase tracking-widest">
                                Tren Anggota Per Periode
                            </h2>
                            <p className="text-neutral-500 text-xs mt-1">
                                Berdasarkan BPI dan anggota departemen yang tercatat.
                            </p>
                        </div>
                        <MdTrendingUp className="text-[#FACC15] text-2xl" />
                    </div>

                    <div className="flex min-h-64 items-end gap-4 overflow-x-auto pb-2">
                        {isLoading ? (
                            <p className="self-center text-sm text-neutral-500">Memuat tren anggota...</p>
                        ) : summary.memberTrend.length > 0 ? (
                            summary.memberTrend.map((item) => (
                                <div key={item.periode} className="flex min-w-24 flex-1 flex-col items-center gap-3">
                                    <div className="flex h-44 w-full items-end border-b border-neutral-800">
                                        <div
                                            className="w-full bg-[#FACC15] transition-all"
                                            style={{
                                                height: `${Math.max((item.total / summary.maxTrendValue) * 100, 8)}%`,
                                            }}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-white text-sm font-bold tabular-nums">
                                            {formatNumber(item.total)}
                                        </p>
                                        <p className="text-neutral-500 text-xs">
                                            {item.periode}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="self-center text-sm text-neutral-500">Belum ada data anggota.</p>
                        )}
                    </div>
                </section>

                <section className="border border-neutral-800 bg-neutral-900 p-5">
                    <div className="flex items-center gap-3 mb-5">
                        <MdArticle className="text-[#FACC15] text-2xl" />
                        <h2 className="text-white text-sm font-bold uppercase tracking-widest">
                            Aktivitas Terbaru
                        </h2>
                    </div>

                    <div className="flex flex-col divide-y divide-neutral-800">
                        {isLoading ? (
                            <p className="py-8 text-sm text-neutral-500">Memuat aktivitas...</p>
                        ) : summary.recentItems.length > 0 ? (
                            summary.recentItems.map((item) => (
                                <div key={`${item.module}-${item.id}`} className="py-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-white text-sm font-medium line-clamp-1">
                                            {item.title}
                                        </p>
                                        <span className="shrink-0 border border-neutral-700 px-2 py-1 text-[10px] uppercase tracking-widest text-neutral-400">
                                            {item.module}
                                        </span>
                                    </div>
                                    <p className="text-neutral-500 text-xs mt-1">
                                        {formatDate(item.createdAt)}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="py-8 text-sm text-neutral-500">Belum ada aktivitas konten.</p>
                        )}
                    </div>
                </section>
            </div>

            <section className="mt-6 border border-neutral-800 bg-neutral-900 p-5">
                <div className="flex items-center justify-between gap-4 mb-5">
                    <div>
                        <h2 className="text-white text-sm font-bold uppercase tracking-widest">
                            Kegiatan Terdekat
                        </h2>
                        <p className="text-neutral-500 text-xs mt-1">
                            Jadwal kegiatan mendatang yang sudah masuk sistem.
                        </p>
                    </div>
                    <Link to="/admin/kegiatan" className="text-xs font-bold uppercase tracking-widest text-[#FACC15]">
                        Kelola
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {isLoading ? (
                        <p className="text-sm text-neutral-500">Memuat kegiatan...</p>
                    ) : summary.upcomingEvents.length > 0 ? (
                        summary.upcomingEvents.map((item) => (
                            <div key={item.id} className="border border-neutral-800 bg-[#0f0f0f] p-4">
                                <p className="text-xs font-bold uppercase tracking-widest text-[#FACC15]">
                                    {formatDate(item.startTime)}
                                </p>
                                <h3 className="mt-3 text-sm font-semibold text-white line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-xs text-neutral-500 line-clamp-1">
                                    {item.location}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-neutral-500">Belum ada kegiatan mendatang.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default DashboardAdmin;
