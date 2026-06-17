import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = () => {
    const { status, checkAuth } = useAuthStore();

    useEffect(() => {
        if (status === "idle") {
            checkAuth();
        }
    }, [status, checkAuth]);

    if (status === "idle" || status === "loading") {
        return <div className="p-8 text-center text-[#ffd700]">Memuat...</div>;
    }

    if (status === "unauthenticated") {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;