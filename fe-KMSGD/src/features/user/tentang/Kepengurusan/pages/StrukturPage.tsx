import StrukturOrganisasi from "../components/StrukturOrganisasi";

const StrukturPage = () => {
  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen">
      <main className="pt-20 w-full">
        <section className="py-20 px-6 max-w-7xl mx-auto border-b border-[#2a2a2a]">
          <h1 className="text-5xl md:text-6xl font-bold font-['Montserrat'] text-[#ffd700] mb-4 leading-tight">
            <span className="text-white">Struktur</span> Organisasi
          </h1>
          <p className="text-[#d0c6ab] text-lg leading-relaxed max-w-3xl">
            Susunan kepengurusan aktif Keluarga Mahasiswa Sunan Gunung Djati Jabodetabek periode saat ini.
          </p>
        </section>

        <StrukturOrganisasi />
      </main>
    </div>
  );
};

export default StrukturPage;
