import { createBrowserRouter } from "react-router-dom";
import HomePage from "../features/user/home/pages/HomePage";
import RootLayout from "../layouts/RootLayout";
import ProfilePage from "../features/user/tentang/profile/pages/ProfilePage";
import StrukturPage from "../features/user/tentang/Kepengurusan/pages/StrukturPage";
import DepartemenPage from "../features/user/tentang/Kepengurusan/pages/DepartemenPage";
import DemisonerPage from "../features/user/tentang/Kepengurusan/pages/DemisonerPage";
import KegiatanPage from "../features/user/kegiatan/pages/KegiatanPage";
import PengumumanPage from "../features/user/pengumuman/pages/PengumumanPage";
import GaleriPage from "../features/user/galeri/pages/GaleriPage";
import KontakPage from "../features/user/kontak/pages/KontakPage";
import NotFoundPage from "../pages/NotFoundPage";
import DetailKegiatan from "../features/user/kegiatan/pages/DetailKegiatan";
import Detailpengumuman from "../features/user/pengumuman/pages/DetailPengumuman";


export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/profil', element: <ProfilePage /> },
            { path: '/kepengurusan/struktur', element: <StrukturPage /> },
            { path: '/kepengurusan/departemen', element: <DepartemenPage /> },
            { path: '/kepengurusan/demisoner', element: <DemisonerPage /> },
            { path: '/kegiatan', element: <KegiatanPage /> },
            { path: '/kegiatan/detail', element: <DetailKegiatan /> },
            { path: '/pengumuman', element: <PengumumanPage /> },
            { path: '/pengumuman/detail', element: <Detailpengumuman /> },
            { path: '/galeri', element: <GaleriPage /> },
            { path: '/kontak', element: <KontakPage /> },
            { path: '*', element: <NotFoundPage /> }
        ]
    }
])
