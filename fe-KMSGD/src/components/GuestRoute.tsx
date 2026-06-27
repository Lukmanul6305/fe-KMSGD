import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

/**
 * GuestRoute — kebalikan dari ProtectedRoute.
 * Hanya bisa diakses oleh user yang BELUM login.
 * Jika sudah login, redirect ke halaman asal (callback) atau dashboard.
 */
const GuestRoute = () => {
    const { status, checkAuth } = useAuthStore();
    const location = useLocation();

    useEffect(() => {
        if (status === "idle") {
            checkAuth();
        }
    }, [status, checkAuth]);

    // Tunggu verifikasi token selesai sebelum render apapun
    if (status === "idle" || status === "loading") {
        return <div className="p-8 text-center text-[#ffd700]">Memuat...</div>;
    }

    // Sudah login → redirect ke halaman asal (callback) atau dashboard
    if (status === "authenticated") {
        const params = new URLSearchParams(location.search);
        const redirectTo = params.get("redirect") || "/admin/dashboard";
        return <Navigate to={redirectTo} replace />;
    }

    // Belum login → tampilkan halaman login
    return <Outlet />;
};

export default GuestRoute;
