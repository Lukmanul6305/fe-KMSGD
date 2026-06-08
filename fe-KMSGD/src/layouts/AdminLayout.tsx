import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../features/admin/dashboard/components/AdminSidebar";

const AdminLayout = () => {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/admin/login" replace />;
    return (
        <div className="flex min-h-screen bg-neutral-950">
            <AdminSidebar />
            <main className="flex-1 p-6 md:p-8 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
