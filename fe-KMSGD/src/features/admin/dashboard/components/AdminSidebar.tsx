import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard, MdGroups, MdEvent, MdCampaign, MdPhotoLibrary, MdLogout } from "react-icons/md";
import { logoutAdmin } from "../../service/authService";

const NAV_ITEMS = [
    { label: "Dashboard", path: "/admin/dashboard", icon: MdDashboard },
    { label: "Kepengurusan", path: "/admin/kepengurusan", icon: MdGroups },
    { label: "Kegiatan", path: "/admin/kegiatan", icon: MdEvent },
    { label: "Pengumuman", path: "/admin/pengumuman", icon: MdCampaign },
    { label: "Galeri", path: "/admin/galeri", icon: MdPhotoLibrary },
];

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutAdmin();
        navigate("/admin/login", { replace: true });
    };

    return (
        <aside className="w-60 min-h-screen bg-neutral-900 border-r-4 border-[#FACC15] flex flex-col shrink-0">
            {/* Brand */}
            <div className="px-5 py-5 border-b border-neutral-800">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-[#FACC15] mb-3">
                    <span className="text-black font-bold text-base">K</span>
                </div>
                <h2 className="text-white font-bold text-sm tracking-wide leading-tight">
                    KMSGD
                </h2>
                <p className="text-neutral-500 text-[10px] tracking-widest uppercase mt-0.5">
                    Admin Panel
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        end={item.path === "/admin/dashboard"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 text-sm font-medium tracking-wide transition-colors ${isActive
                                ? "bg-[#FACC15] text-black"
                                : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                            }`
                        }
                    >
                        <item.icon className="text-lg" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="px-3 py-4 border-t border-neutral-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 w-full text-sm font-medium tracking-wide text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors"
                >
                    <MdLogout className="text-lg" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
