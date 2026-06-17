import { useState, useEffect } from "react";
import { getGaleri, type GaleriItem } from "../services/galeriService";

const GaleriPage = () => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [photos, setPhotos] = useState<GaleriItem[]>([]);
  const [videos, setVideos] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGaleri = async () => {
      setLoading(true);
      try {
        const [photosData, videosData] = await Promise.all([
          getGaleri("FOTO", 1, 100),
          getGaleri("VIDEO", 1, 100),
        ]);
        setPhotos(photosData.data);
        setVideos(videosData.data);
      } catch (error) {
        console.error("Gagal mengambil data galeri:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGaleri();
  }, []);

  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen flex flex-col pt-20">

      {/* HERO */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-['Montserrat'] text-[#ffd700] mb-4">
          Momen Kami
        </h1>
        <p className="text-[#d0c6ab] text-lg leading-relaxed max-w-2xl mx-auto">
          Koleksi visual perjalanan, kegiatan, dan kebersamaan KMSGD Jabodetabek.
          Menangkap setiap langkah dalam membangun komunitas yang kuat dan inspiratif.
        </p>
      </section>

      {/* GALERI FOTO */}
      <section className="pb-20 px-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-bold font-['Montserrat'] text-[#ffd700] flex items-center gap-2">
            🖼 Galeri Foto
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ffd700]"></div>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="break-inside-avoid mb-3 relative group cursor-pointer"
                onClick={() => setLightboxSrc(photo.url)}
              >
                <img
                  src={photo.url}
                  alt={photo.judul || "Galeri Foto"}
                  className="w-full h-auto block rounded border border-[#353535] group-hover:border-[#ffd700] transition-colors duration-300"
                />
                <div className="absolute inset-0 bg-[#131313]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded flex items-center justify-center border-2 border-[#ffd700]">
                  <span className="text-[#ffd700] text-3xl">🔍</span>
                </div>
              </div>
            ))}
            {photos.length === 0 && (
              <p className="text-gray-400 italic">Belum ada foto yang diunggah.</p>
            )}
          </div>
        )}
      </section>

      {/* DOKUMENTASI VIDEO */}
      <section className="bg-[#20201f] py-20 border-y border-[#353535]">
        <div className="px-6 max-w-7xl mx-auto">
          <h2 className="text-xl font-bold font-['Montserrat'] text-[#ffd700] flex items-center gap-2 mb-8">
            ▶ Dokumentasi Video
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ffd700]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-[#131313] rounded overflow-hidden border border-[#353535] hover:border-[#ffd700] transition-colors duration-300 group"
                  onClick={() => window.open(video.url, "_blank")}
                >
                  <div className="relative aspect-video bg-[#131313] cursor-pointer flex items-center justify-center">
                    <img
                      src={video.thumbnail || "https://via.placeholder.com/640x360?text=Video"}
                      alt={video.judul || "Video Thumbnail"}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                    />
                    <div className="relative z-10 w-16 h-16 bg-[#ffd700] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.3)] group-hover:scale-110 transition-transform duration-300">
                      <span className="text-[#131313] text-2xl ml-1">▶</span>
                    </div>
                  </div>
                  <div className="p-4 cursor-pointer">
                    <h3 className="text-lg font-bold font-['Montserrat'] text-[#e5e2e1] mb-2 group-hover:text-[#ffd700] transition-colors">
                      {video.judul || "Dokumentasi Video"}
                    </h3>
                  </div>
                </div>
              ))}
              {videos.length === 0 && (
                <p className="text-gray-400 italic">Belum ada video yang diunggah.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 bg-[#131313]/95 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-6 right-6 text-[#ffd700] hover:text-[#e5e2e1] transition-colors p-2 bg-[#131313] rounded-full border border-[#ffd700] z-50"
            onClick={() => setLightboxSrc(null)}
          >
            ✕
          </button>
          <img
            src={lightboxSrc}
            alt="Fullscreen"
            className="max-w-full max-h-full object-contain rounded border-2 border-[#ffd700]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default GaleriPage;