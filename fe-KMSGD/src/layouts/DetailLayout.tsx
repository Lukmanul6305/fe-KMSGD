import React from "react";

interface DetailLayoutProps {
    children: React.ReactNode;
    judul: string;
    judul2?: string;
    deskripsi: string;
    bgImage?: string;
}

export default function DetailLayout({ children, judul, judul2, deskripsi, bgImage = '/bg-default.jpg' }: DetailLayoutProps) {
    return (
        <div className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen">

            {/* Hero Full Width */}
            <div className="relative w-full min-h-87.5 overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${bgImage}')` }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60" />
                {/* Blur fade bawah */}
                <div className="absolute bottom-0 left-0 right-0 h-24 backdrop-blur-sm bg-linear-to-b from-transparent to-[#131313]" />

                {/* Judul & Deskripsi — sama persis dengan Header.tsx */}
                <section className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-40 mb-15">
                    <h1 className="text-5xl md:text-6xl font-bold font-['Montserrat'] leading-tight mb-4">
                        <span className="text-[#e5e2e1]">{judul}</span>{' '}
                        <span className="text-[#ffd700]">{judul2}</span>
                    </h1>
                    <p className="text-[#d0c6ab] text-lg leading-relaxed max-w-2xl">
                        {deskripsi}
                    </p>
                </section>
            </div>

            {/* Konten Bawah */}
            <main className="w-full max-w-7xl mx-auto px-6 pb-20">
                {children}
            </main>

        </div>
    );
}