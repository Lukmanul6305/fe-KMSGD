import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../features/admin/dashboard/components/AdminSidebar";
import { checkAuth } from "../features/admin/service/authService";

const AdminLayout = () => {
    const [authStatus, setAuthStatus] = useState<"loading" | "ok" | "fail">("loading");

    useEffect(() => {
        checkAuth()
            .then((ok) => setAuthStatus(ok ? "ok" : "fail"));
    }, []);

    if (authStatus === "loading") return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
            <span className="text-neutral-400 text-sm">Memuat...</span>
        </div>
    );

    if (authStatus === "fail") return <Navigate to="/admin/login" replace />;

    return (
        <div className="flex min-h-screen bg-neutral-950">
            <AdminSidebar />
            <main className="flex-1 p-3 md:p-10 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;