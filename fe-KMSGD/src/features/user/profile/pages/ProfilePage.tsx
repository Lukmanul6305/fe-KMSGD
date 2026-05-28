import ProfilePengurusAktif from "../components/ProfilePengurusAktif";
import ProfileDepartemen from "../components/ProfileDepartemen";
import ProfileDemisioner from "../components/ProfileDemisoner";

const ProfilePage = () => {

  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen">
      <main className="pt-20 w-full">
        {/* HERO */}
        <section className="py-20 px-6 max-w-7xl mx-auto border-b border-[#2a2a2a]">
          <h1 className="text-5xl md:text-6xl font-bold font-['Montserrat'] text-[#ffd700] mb-4 leading-tight">
            <span className="text-white" >Profil</span> Organisasi
          </h1>
          <p className="text-[#d0c6ab] text-lg leading-relaxed max-w-3xl">
            Mengenal lebih dekat identitas, sejarah, dan arah gerak Keluarga
            Mahasiswa Sunan Gunung Djati di wilayah Jabodetabek.
          </p>
        </section>

        {/* VISI & MISI */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Visi */}
            <div className="bg-[#20201f] border-t-[3px] border-[#ffd700] p-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[#ffd700] text-4xl">👁</span>
                <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#ffd700]">
                  Visi
                </h2>
              </div>
              <p className="text-[#e5e2e1] text-lg leading-relaxed">
                Mewujudkan wadah kekeluargaan yang solid, progresif, dan
                berintegritas bagi mahasiswa Sunan Gunung Djati di Jabodetabek,
                serta menjadi inisiator perubahan positif bagi masyarakat.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-[#20201f] border-t-[3px] border-[#ffd700] p-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[#ffd700] text-4xl">🚩</span>
                <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#ffd700]">
                  Misi
                </h2>
              </div>
              <ul className="text-[#e5e2e1] text-base leading-relaxed space-y-4 list-disc list-inside">
                <li>Mempererat tali silaturahmi antar anggota melalui kegiatan rutin dan insidental.</li>
                <li>Mengembangkan potensi akademik dan non-akademik anggota secara berkelanjutan.</li>
                <li>Berperan aktif dalam pengabdian masyarakat di lingkungan Jabodetabek.</li>
                <li>Menjalin sinergi dengan instansi dan organisasi lain yang sejalan.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* JEJAK LANGKAH / TIMELINE */}
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-[#2a2a2a]">
          {/* Judul Seksi */}
          <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#ffd700] mb-10 text-center">
            <span className="text-white">Jejak</span> Langkah
          </h2>

          {/* Blok Deskripsi Narasi */}
          <div className="max-w-3xl mx-auto text-center space-y-6 text-[#d0c6ab] text-base md:text-lg leading-relaxed">
            <p>
              KMSGD lahir dari sebuah visi besar untuk menciptakan wadah kolaborasi, inovasi,
              dan pengabdian yang nyata. Sejak awal berdiri, organisasi ini terus berkomitmen
              menjadi jembatan bagi pengembangan potensi, kreativitas, serta karakter kepemimpinan
              yang adaptif terhadap pesatnya perkembangan zaman.
            </p>
            <p>
              Melalui berbagai program kerja strategis, aksi sosial, dan kolaborasi lintas generasi,
              setiap jejak langkah yang telah diukir bukan sekadar cerita masa lalu. Ini adalah fondasi
              berkelanjutan untuk terus memberikan dampak positif bagi masyarakat, menjaga nilai-nilai
              kekeluargaan yang erat, dan menginspirasi lahirnya masa depan yang lebih gemilang.
            </p>
          </div>
        </section>

        {/* STRUKTUR KEPENGURUSAN */}
        <ProfilePengurusAktif />

        {/* DEPARTEMENTS */}
        <ProfileDepartemen />

        {/* DEMISIONER */}
        <ProfileDemisioner />

        {/* HYMNE & MARS */}
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-[#2a2a2a]">
          <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#ffd700] mb-8">
            <span className="text-white">Hymne</span> &amp; Mars KMSGD
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Hymne */}
            <div className="bg-[#20201f] border border-[#ffd700] p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold font-['Montserrat'] text-[#e5e2e1]">
                  Hymne KMSGD Jabodetabek
                </h3>
                <span className="text-[#ffd700] text-3xl cursor-pointer hover:opacity-80 transition-opacity">
                  ▶
                </span>
              </div>
              <div className="w-full h-2 bg-[#353535] rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-[#ffd700]" />
              </div>
              <div className="flex justify-between text-[#d0c6ab] text-xs font-semibold">
                <span>01:15</span>
                <span>03:45</span>
              </div>
            </div>

            {/* Mars */}
            <div className="bg-[#20201f] border border-[#ffd700] p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold font-['Montserrat'] text-[#e5e2e1]">
                  Mars KMSGD Jabodetabek
                </h3>
                <span className="text-[#ffd700] text-3xl cursor-pointer hover:opacity-80 transition-opacity">
                  ▶
                </span>
              </div>
              <div className="w-full h-2 bg-[#353535] rounded-full overflow-hidden">
                <div className="w-0 h-full bg-[#ffd700]" />
              </div>
              <div className="flex justify-between text-[#d0c6ab] text-xs font-semibold">
                <span>00:00</span>
                <span>02:30</span>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default ProfilePage;

