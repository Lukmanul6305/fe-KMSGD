import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

/**
 * GuestRoute — kebalikan dari ProtectedRoute.
 * Hanya bisa diakses oleh user yang BELUM login.
 * Jika admin sudah login, langsung redirect ke dashboard.
 *
 * CATATAN: Tidak memanggil checkAuth() / API /auth/me di sini.
 * - Jika status "idle" (fresh load), tampilkan login page langsung
 *   tanpa API call → tidak ada error 401 di console.
 * - Jika status "authenticated" (admin sudah login sebelumnya),
 *   redirect ke dashboard.
 * - Keamanan halaman admin tetap dijaga oleh ProtectedRoute,
 *   yang melakukan checkAuth() saat mengakses route /admin/*.
 */
const GuestRoute = () => {
    const status = useAuthStore((s) => s.status);

    // Admin sudah terautentikasi → redirect ke dashboard
    if (status === "authenticated") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    // Status idle, loading, atau unauthenticated → tampilkan halaman login
    return <Outlet />;
};

export default GuestRoute;
