import { createBrowserRouter } from "react-router-dom";
import HomePage from "../features/user/home/pages/HomePage";
import RootLayout from "../layouts/RootLayout";
import ProfilePage from "../features/user/profile/pages/ProfilePage";
import KegiatanPage from "../features/user/kegiatan/pages/KegiatanPage";
import PengumumanPage from "../features/user/pengumuman/pages/PengumumanPage";
import GaleriPage from "../features/user/galeri/pages/GaleriPage";
import KontakPage from "../features/user/kontak/pages/KontakPage";
import NotFoundPage from "../pages/NotFoundPage";


export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/profil', element: <ProfilePage /> },
            { path: '/kegiatan', element: <KegiatanPage /> },
            { path: '/pengumuman', element: <PengumumanPage /> },
            { path: '/galeri', element: <GaleriPage /> },
            { path: '/kontak', element: <KontakPage /> },
            { path: '*', element: <NotFoundPage /> }
        ]
    }
])
