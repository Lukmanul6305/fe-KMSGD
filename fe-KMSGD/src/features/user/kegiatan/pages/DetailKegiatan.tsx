import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
    MdAccessTime,
    MdCategory,
    MdGroups,
    MdLocationOn,
    MdPaid,
    MdPerson,
} from "react-icons/md";
import { DetailPostTemplate } from "../../../../components/common/DetailPostTemplate";
import DetailAsideCard from "../../../../components/common/DetailAsideCard";
import {
    CONTENT_HEADER,
    getKegiatanById,
    getLatestKegiatan,
} from "../services/kegiatanService";
import { getLatestPengumuman } from "../../pengumuman/services/pengumumanService";

const toNumericId = (value?: string) => {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
};

const DetailKegiatan = () => {
    const { id: idParam } = useParams();
    const kegiatanId = toNumericId(idParam);

    const detailQuery = useQuery({
        queryKey: ["kegiatan-detail", kegiatanId],
        queryFn: () => getKegiatanById(kegiatanId as number),
        enabled: kegiatanId !== null,
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

    const kegiatan = detailQuery.data;
    const heroDescription = kegiatan
        ? `${kegiatan.date} | ${kegiatan.startTime} - ${kegiatan.endTime} WIB | ${kegiatan.location}`
        : CONTENT_HEADER.deskripsi;

    const aside = (
        <>
            <DetailAsideCard
                title="Kegiatan Terbaru"
                emptyText="Belum ada kegiatan terbaru."
                items={(asideQuery.data?.kegiatan ?? [])
                    .filter((item) => item.id !== kegiatanId)
                    .slice(0, 3)
                    .map((item) => ({
                        id: item.id,
                        title: item.title,
                        meta: item.date,
                        to: `/kegiatan/detail/${item.id}`,
                    }))}
            />
            <DetailAsideCard
                title="Pengumuman Terbaru"
                emptyText="Belum ada pengumuman terbaru."
                items={(asideQuery.data?.pengumuman ?? []).slice(0, 3).map((item) => ({
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
            judul2="Kegiatan"
            deskripsi={heroDescription}
            bgImage={kegiatan?.image || "/bg.jpeg"}
            aside={aside}
        >
            {!kegiatanId ? (
                <EmptyState title="Kegiatan tidak ditemukan" message="Pilih kegiatan dari halaman daftar kegiatan." to="/kegiatan" />
            ) : detailQuery.isLoading ? (
                <LoadingState />
            ) : detailQuery.isError || !kegiatan ? (
                <EmptyState title="Gagal memuat kegiatan" message="Data kegiatan tidak tersedia atau sudah tidak dipublikasikan." to="/kegiatan" />
            ) : (
                <article className="flex flex-col gap-8">
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="border border-[#4d4732] bg-[#171717] px-3 py-1 text-xs font-bold uppercase tracking-[2px] text-[#ffd700]">
                                {kegiatan.category}
                            </span>
                            <span className="text-xs uppercase tracking-[2px] text-[#777]">
                                {kegiatan.date}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-white leading-tight mb-4">
                            {kegiatan.title}
                        </h2>
                        <p className="text-[#d0c6ab] leading-7 whitespace-pre-line">
                            {kegiatan.desc}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <InfoItem icon={<MdAccessTime />} label="Waktu" value={`${kegiatan.startTime} - ${kegiatan.endTime} WIB`} />
                        <InfoItem icon={<MdLocationOn />} label="Lokasi" value={kegiatan.location} />
                        <InfoItem icon={<MdCategory />} label="Kategori" value={kegiatan.category} />
                        <InfoItem icon={<MdPaid />} label="Biaya" value={kegiatan.priceLabel} />
                        <InfoItem icon={<MdGroups />} label="Penyelenggara" value={kegiatan.organizer || "KMSGD Jabodetabek"} />
                        <InfoItem icon={<MdPerson />} label="Kontak" value={kegiatan.contactPerson || "-"} />
                    </div>

                    {kegiatan.speakers.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-[2px] text-[#ffd700] mb-3">
                                Pembicara
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {kegiatan.speakers.map((speaker) => (
                                    <span key={speaker} className="border border-[#2a2a2a] bg-[#171717] px-3 py-2 text-sm text-[#d0c6ab]">
                                        {speaker}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="border-t border-[#1f1f1f] pt-6">
                        {kegiatan.registrationLink ? (
                            <a
                                href={kegiatan.registrationLink}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex bg-[#ffd700] px-6 py-3 text-sm font-bold uppercase tracking-[2px] text-black hover:bg-[#e9c400] transition-colors"
                            >
                                Daftar Kegiatan
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

export default DetailKegiatan;
