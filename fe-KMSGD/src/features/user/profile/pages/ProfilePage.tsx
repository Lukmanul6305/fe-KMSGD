import { useState } from "react";
import { profileDemisioner, profileDivisions } from "../services/profileService";

const ProfilePage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen">
      <main className="pt-20 w-full">
        {/* HERO */}
        <section className="py-20 px-6 max-w-7xl mx-auto border-b border-[#2a2a2a]">
          <h1 className="text-5xl md:text-6xl font-bold font-['Montserrat'] text-[#ffd700] mb-4 leading-tight">
            Profil Organisasi
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
            Jejak Langkah
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
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-[#2a2a2a]">
          <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#ffd700] mb-12 text-center">
            Struktur Kepengurusan Aktif
          </h2>

          <div className="flex flex-col items-center">
            {/* Ketua */}
            <div className="bg-[#20201f] border border-[#ffd700] p-6 rounded-lg text-center w-64 mb-0 z-10 relative">
              <div className="w-16 h-16 bg-[#2a2a2a] rounded-full mx-auto mb-4 flex items-center justify-center border border-[#ffd700]">
                <span className="text-[#ffd700] text-2xl">👤</span>
              </div>
              <h4 className="text-sm font-bold tracking-widest text-[#ffd700] uppercase">
                Ketua Umum
              </h4>
              <p className="text-[#e5e2e1] mt-1 text-base">Ahmad Faisal</p>
            </div>

            {/* Connector */}
            <div className="w-px h-8 bg-[#ffd700]" />
            <div className="w-3/4 max-w-lg h-px bg-[#ffd700]" />

            {/* Divisi */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-0 relative">
              {/* Top connector lines */}
              <div className="absolute -top-4 left-[16.66%] w-px h-4 bg-[#ffd700] hidden md:block" />
              <div className="absolute -top-4 left-[50%] w-px h-4 bg-[#ffd700] hidden md:block" />
              <div className="absolute -top-4 left-[83.33%] w-px h-4 bg-[#ffd700] hidden md:block" />

              {profileDivisions.map(({ jabatan, nama }) => (
                <div
                  key={jabatan}
                  className="bg-[#20201f] border border-[#353535] p-6 rounded-lg text-center"
                >
                  <h4 className="text-sm font-bold tracking-widest text-[#ffd700] uppercase mb-2">
                    {jabatan}
                  </h4>
                  <p className="text-[#e5e2e1] text-base">{nama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEMISIONER */}
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-[#2a2a2a]">
          <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#ffd700] mb-8">
            Demisioner Pengurus
          </h2>
          <div className="max-w-3xl">
            {profileDemisioner.map(({ periode, anggota }, i) => (
              <div
                key={i}
                className="bg-[#20201f] border border-[#353535] mb-4 cursor-pointer hover:border-[#ffd700] transition-colors duration-300"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span className="text-xl font-bold font-['Montserrat'] text-[#ffd700]">
                    {periode}
                  </span>
                  <span
                    className={`text-[#ffd700] text-xl transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""
                      }`}
                  >
                    ▾
                  </span>
                </button>

                {openIndex === i && (
                  <div className="px-6 pb-6 border-t border-[#353535] pt-4">
                    <ul className="space-y-2 mt-2">
                      {anggota.map(({ jabatan, nama }) => (
                        <li key={jabatan} className="text-[#d0c6ab] text-sm">
                          <strong className="text-[#e5e2e1]">{jabatan}:</strong> {nama}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* HYMNE & MARS */}
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-[#2a2a2a]">
          <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#ffd700] mb-8">
            Hymne &amp; Mars KMSGD
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

