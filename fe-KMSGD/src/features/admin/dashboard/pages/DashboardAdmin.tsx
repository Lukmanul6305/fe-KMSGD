import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    MdArticle,
    MdCampaign,
    MdEvent,
    MdGroups,
    MdPhotoLibrary,
} from "react-icons/md";
import { getKegiatanAdmin } from "../../service/kegiatanService";
import { getPengumuman } from "../../service/pengumumanService";
import { getGaleriAdmin } from "../../service/galeriService";
import {
    getDepartemenByPeriode,
    getPengurusIntiByPeriode,
    getPeriode,
} from "../../service/kepengurusanService";
import Statistik from "../components/Statistik";
import TrenAnggota from "../components/TrenAnggota";
import KegiatanTerdekat from "../components/KegiatanTerdekat";

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
                    label: "Kegiatan",
                    value: kegiatan.length,
                    note: `${publishedKegiatan} rilis, ${kegiatan.length - publishedKegiatan} draft`,
                    icon: MdEvent,
                    path: "/admin/kegiatan",
                },
                {
                    label: "Pengumuman",
                    value: pengumuman.length,
                    note: `${publishedPengumuman} rilis, ${pengumuman.length - publishedPengumuman} draft`,
                    icon: MdCampaign,
                    path: "/admin/pengumuman",
                },
                {
                    label: "Galeri",
                    value: galeri.length,
                    note: `${publishedGaleri} rilis, ${galeri.length - publishedGaleri} draft`,
                    icon: MdPhotoLibrary,
                    path: "/admin/galeri",
                },
                {
                    label: "Anggota",
                    value: currentMembers,
                    note: memberDelta === 0 ? "Tetap" : `${memberDelta > 0 ? "+" : ""}${formatNumber(memberDelta)} dari sblmnya`,
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
            <div className="mb-6 sm:mb-8 flex flex-col gap-1 sm:gap-2">
                <h1 className="text-[#FACC15] text-xl sm:text-2xl font-bold tracking-wide">
                    Dashboard Admin
                </h1>
                <p className="text-neutral-400 text-xs sm:text-sm">
                    Ringkasan data konten dan perkembangan kepengurusan KMSGD.
                </p>
            </div>

            {dashboardQuery.isError && (
                <div className="mb-4 sm:mb-6 border border-[#7a1a1a] bg-[#2a0a0a] px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-[#f09595]">
                    Gagal memuat ringkasan dashboard. Periksa koneksi API atau sesi admin.
                </div>
            )}

            <Statistik stats={summary.stats} isLoading={isLoading} />

            <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-4 sm:gap-6">
                <TrenAnggota
                    isLoading={isLoading}
                    memberTrend={summary.memberTrend}
                    maxTrendValue={summary.maxTrendValue}
                />

                {/* Aktivitas Terbaru — tidak diminta untuk dimodularkan, jadi dibiarkan inline */}
                <section className="border border-neutral-800 bg-neutral-900 p-3 sm:p-5">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
                        <MdArticle className="text-[#FACC15] text-xl sm:text-2xl" />
                        <h2 className="text-white text-xs sm:text-sm font-bold uppercase tracking-widest">
                            Aktivitas
                        </h2>
                    </div>

                    <div className="flex flex-col divide-y divide-neutral-800">
                        {isLoading ? (
                            <p className="py-6 sm:py-8 text-xs sm:text-sm text-neutral-500 text-center">Memuat aktivitas...</p>
                        ) : summary.recentItems.length > 0 ? (
                            summary.recentItems.map((item) => (
                                <div key={`${item.module}-${item.id}`} className="py-2 sm:py-3">
                                    <div className="flex items-center justify-between gap-2 sm:gap-3">
                                        <p className="text-white text-xs sm:text-sm font-medium line-clamp-1">
                                            {item.title}
                                        </p>
                                        <span className="shrink-0 border border-neutral-700 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[8px] sm:text-[10px] uppercase tracking-widest text-neutral-400">
                                            {item.module}
                                        </span>
                                    </div>
                                    <p className="text-neutral-500 text-[10px] sm:text-xs mt-1">
                                        {formatDate(item.createdAt)}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="py-6 sm:py-8 text-xs sm:text-sm text-neutral-500 text-center">Belum ada aktivitas konten.</p>
                        )}
                    </div>
                </section>
            </div>

            <KegiatanTerdekat isLoading={isLoading} events={summary.upcomingEvents} />
        </div>
    );
};

export default DashboardAdmin;