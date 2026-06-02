import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import KetuaSection from "../components/KetuaSection";
import FokusKegiatanSection from "../components/FokusKegiatanSection";
import DewanPendiriSection from "../components/DewanPendiriSection";
import GallerySection from "../components/GallerySection";
import PengumumanSection from "../components/PengumumanSection";
import CTASection from "../components/CTASection";
import WhatsAppFloat from "../components/WhatsAppFloat";

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

            <div className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen">
                <HeroSection />
                <StatsSection />
                <KetuaSection />
                <FokusKegiatanSection />
                <DewanPendiriSection />
                <GallerySection />
                <PengumumanSection />
                <CTASection />
                <WhatsAppFloat />
            </div>
        </>
    );
}