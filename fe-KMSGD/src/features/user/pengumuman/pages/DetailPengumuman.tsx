import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
    MdAnnouncement,
    MdCalendarMonth,
    MdChecklist,
    MdContactPhone,
    MdDescription,
    MdPerson,
} from "react-icons/md";
import { DetailPostTemplate } from "../../../../components/common/DetailPostTemplate";
import DetailAsideCard from "../../../../components/common/DetailAsideCard";
import { getLatestKegiatan } from "../../kegiatan/services/kegiatanService";
import {
    CONTENT_HEADER,
    getLatestPengumuman,
    getPengumumanById,
} from "../services/pengumumanService";

const toNumericId = (value?: string) => {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
};

const formatTimelineDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);
};

const DetailPengumuman = () => {
    const { id: idParam } = useParams();
    const pengumumanId = toNumericId(idParam);

    const detailQuery = useQuery({
        queryKey: ["pengumuman-detail", pengumumanId],
        queryFn: () => getPengumumanById(pengumumanId as number),
        enabled: pengumumanId !== null,
        staleTime: 5 * 60 * 1000,
    });

    const asideQuery = useQuery({
        queryKey: ["detail-aside-latest"],
        queryFn: async () => {
            const [kegiatan, pengumuman] = await Promise.all([
                getLatestKegiatan(3),
                getLatestPengumuman(3),
            ]);

            return { kegiatan, pengumuman };
        },
        staleTime: 5 * 60 * 1000,
    });

    const pengumuman = detailQuery.data;
    const heroDescription = pengumuman
        ? `${pengumuman.fullDate} | ${pengumuman.category} | Oleh ${pengumuman.author}`
        : CONTENT_HEADER.deskripsi;

    const aside = (
        <>
            <DetailAsideCard
                title="Kegiatan Terbaru"
                emptyText="Belum ada kegiatan terbaru."
                items={(asideQuery.data?.kegiatan ?? []).slice(0, 3).map((item) => ({
                    id: item.id,
                    title: item.title,
                    meta: item.date,
                    to: `/kegiatan/detail/${item.id}`,
                }))}
            />
            <DetailAsideCard
                title="Pengumuman Terbaru"
                emptyText="Belum ada pengumuman terbaru."
                items={(asideQuery.data?.pengumuman ?? [])
                    .filter((item) => item.id !== pengumumanId)
                    .slice(0, 3)
                    .map((item) => ({
                        id: item.id,
                        title: item.title,
                        meta: item.fullDate,
                        to: `/pengumuman/detail/${item.id}`,
                    }))}
            />
        </>
    );

    return (
        <DetailPostTemplate
            judul="Detail"
            judul2="Pengumuman"
            deskripsi={heroDescription}
            bgImage={pengumuman?.image || "/bg.jpeg"}
            aside={aside}
        >
            {!pengumumanId ? (
                <EmptyState title="Pengumuman tidak ditemukan" message="Pilih pengumuman dari halaman daftar pengumuman." to="/pengumuman" />
            ) : detailQuery.isLoading ? (
                <LoadingState />
            ) : detailQuery.isError || !pengumuman ? (
                <EmptyState title="Gagal memuat pengumuman" message="Data pengumuman tidak tersedia atau sudah tidak dipublikasikan." to="/pengumuman" />
            ) : (
                <article className="flex flex-col gap-8">
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="border border-[#4d4732] bg-[#171717] px-3 py-1 text-xs font-bold uppercase tracking-[2px] text-[#ffd700]">
                                {pengumuman.category}
                            </span>
                            {pengumuman.isPenting && (
                                <span className="bg-[#e67e22] px-3 py-1 text-xs font-bold uppercase tracking-[2px] text-white">
                                    Penting
                                </span>
                            )}
                            <span className="text-xs uppercase tracking-[2px] text-[#777]">
                                {pengumuman.fullDate}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-white leading-tight mb-4">
                            {pengumuman.title}
                        </h2>
                        <p className="text-[#d0c6ab] leading-7 whitespace-pre-line">
                            {pengumuman.desc}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <InfoItem icon={<MdCalendarMonth />} label="Tanggal" value={pengumuman.fullDate} />
                        <InfoItem icon={<MdAnnouncement />} label="Kategori" value={pengumuman.category} />
                        <InfoItem icon={<MdPerson />} label="Penulis" value={pengumuman.author} />
                        <InfoItem icon={<MdContactPhone />} label="Kontak" value={pengumuman.contactPerson || "-"} />
                    </div>

                    {pengumuman.timeline.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-[2px] text-[#ffd700] mb-4">
                                Timeline
                            </h3>
                            <div className="flex flex-col gap-3">
                                {pengumuman.timeline.map((item) => (
                                    <div key={`${item.agenda}-${item.tanggal}`} className="border border-[#1f1f1f] bg-[#171717] p-4">
                                        <p className="text-xs uppercase tracking-[2px] text-[#777] mb-1">
                                            {formatTimelineDate(item.tanggal)}
                                        </p>
                                        <p className="text-sm font-semibold text-[#e5e2e1]">{item.agenda}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ListSection title="Persyaratan" icon={<MdChecklist />} items={pengumuman.persyaratan} emptyText="Tidak ada persyaratan khusus." />
                        <ListSection title="Berkas" icon={<MdDescription />} items={pengumuman.berkas} emptyText="Tidak ada berkas yang perlu disiapkan." />
                    </div>

                    <div className="border-t border-[#1f1f1f] pt-6">
                        {pengumuman.linkPendaftaran ? (
                            <a
                                href={pengumuman.linkPendaftaran}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex bg-[#ffd700] px-6 py-3 text-sm font-bold uppercase tracking-[2px] text-black hover:bg-[#e9c400] transition-colors"
                            >
                                Buka Pendaftaran
                            </a>
                        ) : (
                            <p className="text-sm text-[#777]">
                                Link pendaftaran belum tersedia.
                            </p>
                        )}
                    </div>
                </article>
            )}
        </DetailPostTemplate>
    );
};

const InfoItem = ({ icon, label, value }: { icon: ReactNode; label: string; value: string }) => (
    <div className="border border-[#1f1f1f] bg-[#171717] p-4">
        <div className="flex items-center gap-2 text-[#ffd700] mb-2">
            <span className="text-xl">{icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#777]">{label}</span>
        </div>
        <p className="text-sm font-medium text-[#e5e2e1]">{value}</p>
    </div>
);

const ListSection = ({ title, icon, items, emptyText }: { title: string; icon: ReactNode; items: string[]; emptyText: string }) => (
    <section className="border border-[#1f1f1f] bg-[#171717] p-4">
        <div className="flex items-center gap-2 text-[#ffd700] mb-3">
            <span className="text-xl">{icon}</span>
            <h3 className="text-sm font-bold uppercase tracking-[2px]">{title}</h3>
        </div>
        {items.length > 0 ? (
            <ul className="space-y-2 text-sm text-[#d0c6ab]">
                {items.map((item) => (
                    <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#ffd700]" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-sm text-[#777]">{emptyText}</p>
        )}
    </section>
);

const LoadingState = () => (
    <div className="space-y-4">
        <div className="h-8 w-2/3 bg-[#1f1f1f]" />
        <div className="h-4 w-full bg-[#1f1f1f]" />
        <div className="h-4 w-5/6 bg-[#1f1f1f]" />
        <div className="h-32 w-full bg-[#1f1f1f]" />
    </div>
);

const EmptyState = ({ title, message, to }: { title: string; message: string; to: string }) => (
    <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
        <p className="text-[#999077] mb-6">{message}</p>
        <Link to={to} className="inline-flex border border-[#ffd700] px-5 py-2 text-sm font-bold uppercase tracking-[2px] text-[#ffd700] hover:bg-[#ffd700] hover:text-black transition-colors">
            Kembali
        </Link>
    </div>
);

export default DetailPengumuman;
