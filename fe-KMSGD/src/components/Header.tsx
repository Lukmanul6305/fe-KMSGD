
interface KegiatanProps {
    judul: string;
    judul2?: string;
    deskripsi: string;
}

export default function Header({ judul, judul2, deskripsi }: KegiatanProps) {
    return (
        <section className="mb-20">
            <h1 className="text-5xl md:text-6xl font-bold font-['Montserrat'] text-[#ffd700] mb-4 leading-tight">
                <span className="text-[#e5e2e1]">{judul}</span>{" "}
                <span className="text-[#ffd700]">{judul2}</span>
            </h1>
            <p className="text-[#d0c6ab] text-lg leading-relaxed max-w-2xl">
                {deskripsi}
            </p>
        </section>
    )
}