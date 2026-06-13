import { NavLink } from "react-router-dom";

const navItems = [
    { label: "Periode", path: "/admin/kepengurusan/periode" },
    { label: "Departemen", path: "/admin/kepengurusan/departemen" },
    { label: "BPI & Anggota", path: "/admin/kepengurusan/pengurus" },
];

const NavbarKepengurusan = () => {
    return (
        <nav className="border-b border-neutral-800">
            <div className="flex gap-6">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `py-3 px-1 text-sm font-medium border-b-2 transition-colors ${isActive
                                ? "border-yellow-400 text-yellow-400"
                                : "border-transparent text-zinc-400 hover:text-zinc-200"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default NavbarKepengurusan;