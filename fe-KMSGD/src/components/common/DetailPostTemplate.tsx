import DetailLayout from "../../layouts/DetailLayout";

interface DetailTemplateProps {
    // type: 'kegiatan' | 'pengumuman';
    judul: string;
    judul2?: string;
    deskripsi: string;
    bgImage?: string;
}

export const DetailPostTemplate = ({ judul, judul2, deskripsi, bgImage }: DetailTemplateProps) => {
    return (
        <DetailLayout
            judul={judul}
            judul2={judul2}
            deskripsi={deskripsi}
            bgImage={bgImage}
        >
            <main className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">

                <div className="col-span-1 md:col-span-3 border-t-4 border-t-amber-500 border-x border-b border-[#1f1f1f] p-4">
                    isi kegiatan/pengumuman
                </div>

                <aside className="col-span-1 flex flex-col gap-4">
                    <article className="p-4 border-l-4 border-l-amber-500 border border-[#1f1f1f]">
                        <h2>kanan Atas</h2>
                        <p>Konten artikel atas...</p>
                    </article>

                    <article className="p-4 border-l-4 border-l-amber-500 border border-[#1f1f1f]">
                        <h2>kanan Bawah</h2>
                        <p>Konten artikel bawah...</p>
                    </article>
                </aside>
            </main>
        </DetailLayout>
    );
};