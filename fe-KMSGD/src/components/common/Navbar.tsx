import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    MdDarkMode,
    MdLightMode,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp
} from "react-icons/md";



interface NavItem {
    label: string;
    path?: string;
    subItems?: { label: string; path: string }[];
}

export const Navbar: React.FC = () => {
    const location = useLocation();
    const [lightMode, setLightMode] = useState<boolean>(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    
    function handleButton() {
        setLightMode(prev => !prev);
    }

    const menuItems: NavItem[] = [
        { label: 'Beranda', path: '/' },
        {
            label: 'Tentang',
            subItems: [
                { label: 'Profil', path: '/profil' },
                { label: 'Struktur Organisasi', path: '/kepengurusan/struktur' },
                { label: 'Departemen', path: '/kepengurusan/departemen' },
                { label: 'Demisoner', path: '/kepengurusan/demisoner' }
            ]
        },
        { label: 'Kegiatan', path: '/kegiatan' },
        { label: 'Pengumuman', path: '/pengumuman' },
        { label: 'Galeri', path: '/galeri' },
        { label: 'Kontak', path: '/kontak' },
    ];

    return (
        <nav className="w-full bg-[#141414] fixed z-999 border-b-[3px] border-[#FACC15] px-6 py-4 md:px-12 flex items-center justify-between select-none">

            <Link to="/" className="flex items-center gap-3 cursor-pointer">
                {
                    <img
                        src = '/public/logo.jpeg'
                        alt = 'Logo KMSGD Jabodetabek'
                        className = 'w-10 h-10 md:w-12 md:h-12 object-contain'
                    />
                }
                <span className="text-[#FACC15] font-bold text-lg md:text-xl tracking-wider uppercase">
                    <span className="text-white">KMSGD</span> JABODETABEK
                </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
                {menuItems.map((item) => {
                    const isActive = item.path
                        ? location.pathname === item.path
                        : item.subItems?.some(sub => location.pathname === sub.path);

                    return (
                        <div key={item.label} className="relative py-2">
                            {item.path ? (
                                <Link
                                    to={item.path}
                                    onClick={() => setIsDropdownOpen(false)}
                                    className={`inline-flex items-center text-sm font-medium tracking-wide transition-all duration-200 pb-1 ${isActive
                                        ? 'text-[#FACC15] border-b-2 border-[#FACC15]'
                                        : 'text-gray-300 border-b-2 border-transparent hover:text-[#FACC15]'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    // Ditambahkan: "inline-flex" (menggantikan flex), dan "border-transparent"
                                    className={`cursor-pointer inline-flex items-center gap-1 text-sm font-medium tracking-wide transition-all duration-200 pb-1 ${isActive
                                        ? 'text-[#FACC15] border-b-2 border-[#FACC15]'
                                        : 'text-gray-300 border-b-2 border-transparent hover:text-[#FACC15]'
                                        }`}
                                >
                                    {item.label}
                                    {/* Logika ternary sederhana untuk panah */}
                                    {isDropdownOpen ? (
                                        <MdKeyboardArrowUp className="text-lg" />
                                    ) : (
                                        <MdKeyboardArrowDown className="text-lg" />
                                    )}
                                </span>
                            )}

                            {/* DROPDOWN MENU */}
                            {item.subItems && (
                                <div className={`absolute top-full left-0 mt-0 w-40 bg-[#141414] border border-[#FACC15] shadow-lg transition-all duration-300 flex flex-col overflow-hidden z-50 ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                                    }`}>
                                    {item.subItems.map((sub) => (
                                        <Link
                                            key={sub.label}
                                            to={sub.path}
                                            onClick={() => setIsDropdownOpen(false)}
                                            className={`px-4 py-3 text-sm transition-colors duration-200 ${location.pathname === sub.path
                                                ? 'bg-[#FACC15] text-[#141414] font-bold'
                                                : 'text-gray-300 hover:bg-[#FACC15] hover:text-[#141414]'
                                                }`}
                                        >
                                            {sub.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div>
                <button
                    className="p-2 transition-colors duration-200"
                    onClick={handleButton}
                >
                    {lightMode ? <MdDarkMode className="text-[#FACC15] text-2xl" /> : <MdLightMode className="text-[#FACC15] text-2xl" />}
                </button>
            </div>

        </nav>
    );
};

export default Navbar;