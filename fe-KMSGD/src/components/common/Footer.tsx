import { footerLinks } from "./services/footerService";

const Footer = () => {
    return (
        <footer className="bg-[#1A1A1A] pt-20 pb-8 border-t border-[#353535]">
            <div className="max-w-300 mx-auto px-6">
                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
                    {/* About */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-[#FFD700] flex items-center justify-center font-bold font-['Montserrat'] text-[#1A1A1A] text-sm">
                                KMS
                            </div>
                            <div>
                                <div className="text-[#FFD700] font-bold font-['Montserrat'] text-sm leading-tight">
                                    KMSGD
                                </div>
                                <div className="text-[#d0c6ab] text-[10px] tracking-widest uppercase">
                                    Jabodetabek
                                </div>
                            </div>
                        </div>
                        <p className="text-[#d0c6ab] text-sm leading-relaxed mb-4">
                            Keluarga Mahasiswa Sunan Gunung Djati Jabodetabek. Wadah
                            silaturahmi dan pengembangan diri mahasiswa.
                        </p>
                        <p className="text-[#d0c6ab] text-xs">
                            📍 Jakarta · Bogor · Depok · Tangerang · Bekasi
                        </p>
                    </div>

                    {/* Navigasi */}
                    <div>
                        <h4 className="text-[#e5e2e1] font-bold font-['Montserrat'] text-sm mb-4 uppercase tracking-wider">
                            Navigasi
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.navigasi.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-[#d0c6ab] text-sm hover:text-[#FFD700] transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Organisasi */}
                    <div>
                        <h4 className="text-[#e5e2e1] font-bold font-['Montserrat'] text-sm mb-4 uppercase tracking-wider">
                            Organisasi
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.organisasi.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-[#d0c6ab] text-sm hover:text-[#FFD700] transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sosial Media & Kontak */}
                    <div>
                        <h4 className="text-[#e5e2e1] font-bold font-['Montserrat'] text-sm mb-4 uppercase tracking-wider">
                            Terhubung
                        </h4>
                        <div className="flex gap-3 mb-6">
                            {footerLinks.sosial.map((sosmed) => (
                                <a
                                    key={sosmed.label}
                                    href={sosmed.href}
                                    className="w-10 h-10 bg-[#20201f] flex items-center justify-center hover:bg-[#FFD700] transition-colors group"
                                    aria-label={sosmed.label}
                                >
                                    <span className="text-lg group-hover:text-[#1A1A1A]">
                                        {sosmed.icon}
                                    </span>
                                </a>
                            ))}
                        </div>
                        <p className="text-[#d0c6ab] text-sm">
                            ✉️ kmsgd.jabodetabek@gmail.com
                        </p>
                        <a
                            href="https://wa.me/6281234567890"
                            className="text-[#d0c6ab] text-sm hover:text-[#FFD700] transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            💬 +62 812-3456-7890 (WhatsApp)
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-[#353535] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#d0c6ab] text-xs">
                        © 2024 KMSGD Jabodetabek. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-[#d0c6ab] text-xs hover:text-[#FFD700] transition-colors">
                            Kebijakan Privasi
                        </a>
                        <a href="#" className="text-[#d0c6ab] text-xs hover:text-[#FFD700] transition-colors">
                            Syarat & Ketentuan
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
