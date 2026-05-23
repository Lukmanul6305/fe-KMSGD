import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDarkMode, MdLightMode } from "react-icons/md";

interface NavItem {
    label: string;
    path: string;
}

export const Navbar: React.FC = () => {
    const location = useLocation();
    const [lightMode, setLightMode] = useState<boolean>(false);

    function handleButton() {
        setLightMode(prev => !prev);
    }

    const menuItems: NavItem[] = [
        { label: 'Beranda', path: '/' },
        { label: 'Profil', path: '/profil' },
        { label: 'Kegiatan', path: '/kegiatan' },
        { label: 'Pengumuman', path: '/pengumuman' },
        { label: 'Galeri', path: '/galeri' },
        { label: 'Kontak', path: '/kontak' },
    ];
    return (
        <nav className="w-full bg-[#141414] fixed z-999 border-b-[3px] border-[#FACC15] px-6 py-4 md:px-12 flex items-center justify-between select-none">

            <Link to="/" className="flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 border-2 border-[#FACC15] rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 rounded-md bg-transparent" />
                </div>
                <span className="text-[#FACC15] font-bold text-lg md:text-xl tracking-wider uppercase">
                    KMSGD JABODETABEK
                </span>
            </Link>

            {/* NAV LINKS */}
            <div className="hidden md:flex items-center gap-8">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`text-sm font-medium tracking-wide transition-all duration-200 pb-1 ${isActive
                                ? 'text-[#FACC15] border-b-2 border-[#FACC15]'
                                : 'text-gray-300 hover:text-[#FACC15]'
                                }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </div>

            <div>
                <button
                    className="p-2 rounded-full transition-colors duration-200"
                    onClick={handleButton}
                >
                    {lightMode ? <MdDarkMode className="text-[#FACC15] text-2xl" /> : <MdLightMode className="text-[#FACC15] text-2xl" />}
                </button>
            </div>

        </nav>
    );
};

export default Navbar;