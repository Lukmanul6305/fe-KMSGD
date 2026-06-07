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
            <section>

            </section>
        </DetailLayout>
    );
};