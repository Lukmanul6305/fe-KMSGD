import Reveal from "./Reveal";

export default function KetuaSection() {
    return (
        <section className="py-16 px-6 max-w-7xl mx-auto">
            <Reveal>
                <div className="bg-[#20201f] border-l-4 border-[#ffd700] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
                    <Reveal from="left" className="w-full max-w-xs md:w-72 flex shrink-0">
                        <div className="aspect-4/5 w-full border border-[#353535] relative group overflow-hidden">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPZ-QRObMKNDnnorQKAWdsImi-RDCWuQ8TpJxDKH6SOcomenSRjnJ2KJFxR43EwpX5iWsC7FXYOQZNNnQfYoCHTdBKkOr9pDnRpk5EI5E7MLowA9OP4-XUnGgB6J6HVtVAoBJ_CNiUXKAsVSiEj66kLwFxscw2BUZyxqrFO_F0KXqBjI5pUc0cnG5B_-SHo0UByeGXznth9xRTeikpjsxdadxEbvuFjXMiZl_23vUR-_zxabbnRwWbB8eYvBZlFqZRAP97QhGhEDbw"
                                alt="Ketua Umum"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                loading="lazy"
                            />
                            <div className="absolute bottom-4 left-4 bg-[#131313] px-4 py-2 border border-[#ffd700]">
                                <div className="text-[#ffd700] font-bold font-['Montserrat'] text-base">Ahmad Fauzi</div>
                                <div className="text-[#d0c6ab] text-xs font-semibold tracking-wide">Ketua Umum 2024-2025</div>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal from="right" delay={150} className="flex flex-col gap-4">
                        <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#e5e2e1]">Sambutan Ketua Umum</h2>
                        <div className="w-16 h-1 bg-[#ffd700]" />
                        <p className="text-[#d0c6ab] text-lg leading-relaxed italic">
                            "Selamat datang di rumah kita bersama. KMSGD Jabodetabek bukan sekadar organisasi, melainkan keluarga
                            tempat kita tumbuh, belajar, dan memberikan kontribusi nyata bagi masyarakat."
                        </p>
                        <button className="text-[#ffd700] text-sm font-semibold hover:underline flex items-center gap-2 w-fit cursor-pointer">
                            Baca Selengkapnya →
                        </button>
                    </Reveal>
                </div>
            </Reveal>
        </section>
    );
}
