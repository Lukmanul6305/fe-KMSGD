import { MdEvent, MdCampaign, MdPhotoLibrary } from "react-icons/md";

const SUMMARY_CARDS = [
    {
        label: "Kegiatan",
        description: "Kelola data kegiatan, tambah, edit, dan hapus kegiatan KMSGD.",
        icon: MdEvent,
        path: "/admin/kegiatan",
        accent: "border-l-[#FACC15]",
    },
    {
        label: "Pengumuman",
        description: "Buat dan atur pengumuman untuk ditampilkan ke pengguna.",
        icon: MdCampaign,
        path: "/admin/pengumuman",
        accent: "border-l-[#FACC15]",
    },
    {
        label: "Galeri",
        description: "Unggah dan kelola foto galeri kegiatan organisasi.",
        icon: MdPhotoLibrary,
        path: "/admin/galeri",
        accent: "border-l-[#FACC15]",
    },
];

const DashboardAdmin = () => {
    return (
        <div>
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-white text-2xl font-bold tracking-wide">
                    Selamat Datang, Admin
                </h1>
                <p className="text-neutral-400 text-sm mt-1">
                    Pantau dan kelola seluruh konten KMSGD dari satu tempat.
                </p>
            </div>

            {/* Summary Cards */}
            <div>
                <h2 className="text-neutral-300 text-xs font-bold tracking-widest uppercase mb-4">
                    Ringkasan Fitur
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {SUMMARY_CARDS.map((card) => (
                        <div
                            key={card.label}
                            className={`bg-neutral-900 border border-neutral-800 border-l-4 ${card.accent} p-5 flex flex-col gap-3 hover:border-[#FACC15] transition-colors`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="inline-flex items-center justify-center w-9 h-9 bg-neutral-800">
                                    <card.icon className="text-[#FACC15] text-xl" />
                                </div>
                                <h3 className="text-white font-semibold text-sm tracking-wide">
                                    {card.label}
                                </h3>
                            </div>
                            <p className="text-neutral-500 text-xs leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
