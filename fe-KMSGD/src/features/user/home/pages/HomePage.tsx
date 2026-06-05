import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import KetuaSection from "../components/sections/KetuaSection";
import FokusKegiatanSection from "../components/sections/FokusKegiatanSection";
import DewanPendiriSection from "../components/sections/DewanPendiriSection";
import GallerySection from "../components/sections/GallerySection";
import PengumumanSection from "../components/sections/PengumumanSection";
import CTASection from "../components/sections/CTASection";
import WhatsAppFloat from "../components/ui/WhatsAppFloat";
import UserLayout from "../../../../layouts/UserLayout";

export default function HomePage() {
    return (
        <>
            <style>{`
        @keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>

            <UserLayout isHome>
                <HeroSection />
                <StatsSection />
                <KetuaSection />
                <DewanPendiriSection />
                <FokusKegiatanSection />
                <GallerySection />
                <PengumumanSection />
                <CTASection />
                <WhatsAppFloat />
            </UserLayout>
        </>
    );
}