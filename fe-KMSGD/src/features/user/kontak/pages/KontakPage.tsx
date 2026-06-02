import { useState } from "react";
import UserLayout from "../../../../layouts/UserLayout";

const KontakPage = () => {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    subjek: "",
    pesan: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen flex flex-col">
      <UserLayout>

        {/* HEADER */}
        <section className="mb-20 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold font-['Montserrat'] text-[#ffd700] mb-4">
            Hubungi Kami
          </h1>
          <p className="text-[#d0c6ab] text-lg leading-relaxed">
            Kami selalu terbuka untuk berdiskusi, berkolaborasi, dan menjawab
            pertanyaan Anda seputar Keluarga Mahasiswa Sunan Gunung Djati wilayah
            Jabodetabek.
          </p>
        </section>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* KIRI: INFO + MAP */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* INFO CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Sekretariat */}
              <div className="bg-[#20201f] border-t-[3px] border-[#ffd700] p-6 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center border border-[#4d4732]">
                  <span className="text-[#ffd700] text-xl">📍</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-2">
                    Sekretariat
                  </h3>
                  <p className="text-[#d0c6ab] text-sm leading-relaxed">
                    Jl. Margonda Raya No. 100, Depok, Jawa Barat, Indonesia 16424
                  </p>
                </div>
              </div>

              {/* Komunikasi */}
              <div className="bg-[#20201f] border-t-[3px] border-[#ffd700] p-6 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center border border-[#4d4732]">
                  <span className="text-[#ffd700] text-xl">✉️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-2">
                    Komunikasi
                  </h3>
                  <p className="text-[#d0c6ab] text-sm">info@kmsgdjabodetabek.org</p>
                  <p className="text-[#d0c6ab] text-sm mt-1">+62 812 3456 7890</p>
                </div>
              </div>

              {/* Media Sosial */}
              <div className="bg-[#20201f] border-t-[3px] border-[#ffd700] p-6 flex flex-col gap-4 sm:col-span-2">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-[#ffd700] text-xl">↗</span>
                  <h3 className="text-xl font-bold font-['Montserrat'] text-[#e5e2e1]">
                    Media Sosial
                  </h3>
                </div>
                <div className="flex flex-wrap gap-4">
                  {["Instagram", "Twitter", "LinkedIn", "whatapp"].map((sosial) => (
                    <a
                      key={sosial}
                      href="#"
                      className="px-4 py-2 bg-[#131313] border border-[#999077] text-[#ffd700] text-sm font-semibold rounded hover:border-[#ffd700] transition-colors"
                    >
                      {sosial}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* MAP */}
            <div className="w-full h-72 md:h-96 bg-[#353535] relative overflow-hidden border border-[#4d4732]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIdtauCQ_j0rIsOgalTxCdZOBv50qodZDm1AEtzjUx6VlTTIGOnS44jaxrkciljhrAfgeajj156hshCq7qcZKp9FTXM_LrQWfT_QgKdlHss_gKO-93b9EONmrmAHhXPWBKg7tSpcBIXq5BpvW1oFkxsDPOLZC01Wm8V621UmQonITvDjNJxzhePznLcWOFL7BVkjSXmffY7rw3M9FMg-iiKJHhdQEuceDw9OxR7KuABmHAvgLT0OD86NDoVajBcWSYuv-I2jbcRLbx"
                alt="Map"
                className="w-full h-full object-cover opacity-50 grayscale"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-[#20201f] border border-[#ffd700] px-6 py-3 shadow-lg flex items-center gap-2">
                  <span className="text-[#ffd700]">🗺</span>
                  <span className="text-[#e5e2e1] text-sm font-semibold">
                    Peta Interaktif Jabodetabek
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* KANAN: FORM */}
          <div className="lg:col-span-5 bg-[#20201f] border border-[#ffd700] p-8 sticky top-24">
            <h2 className="text-xl font-bold font-['Montserrat'] text-[#e5e2e1] mb-6">
              Kirim Pesan
            </h2>
            <div className="flex flex-col gap-4">

              <div className="flex flex-col gap-2">
                <label className="text-[#d0c6ab] text-xs font-semibold tracking-wide">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama Anda"
                  value={form.nama}
                  onChange={handleChange}
                  className="bg-[#131313] border border-[#e5e2e1] text-[#e5e2e1] text-sm p-3 focus:border-[#ffd700] transition-colors outline-none placeholder:text-[#4d4732]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#d0c6ab] text-xs font-semibold tracking-wide">
                  Alamat Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="contoh@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="bg-[#131313] border border-[#e5e2e1] text-[#e5e2e1] text-sm p-3 focus:border-[#ffd700] transition-colors outline-none placeholder:text-[#4d4732]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#d0c6ab] text-xs font-semibold tracking-wide">
                  Subjek
                </label>
                <input
                  type="text"
                  name="subjek"
                  placeholder="Tujuan pesan"
                  value={form.subjek}
                  onChange={handleChange}
                  className="bg-[#131313] border border-[#e5e2e1] text-[#e5e2e1] text-sm p-3 focus:border-[#ffd700] transition-colors outline-none placeholder:text-[#4d4732]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#d0c6ab] text-xs font-semibold tracking-wide">
                  Pesan
                </label>
                <textarea
                  name="pesan"
                  placeholder="Tuliskan pesan Anda di sini..."
                  value={form.pesan}
                  onChange={handleChange}
                  rows={5}
                  className="bg-[#131313] border border-[#e5e2e1] text-[#e5e2e1] text-sm p-3 focus:border-[#ffd700] transition-colors outline-none resize-none placeholder:text-[#4d4732]"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="mt-4 bg-[#ffd700] text-[#131313] font-bold text-lg py-4 px-6 flex items-center justify-center gap-2 hover:bg-[#e9c400] transition-colors active:scale-[0.98]"
              >
                Kirim Pesan ➤
              </button>
            </div>
          </div>

        </div>
      </UserLayout>
    </div>
  );
};

export default KontakPage;