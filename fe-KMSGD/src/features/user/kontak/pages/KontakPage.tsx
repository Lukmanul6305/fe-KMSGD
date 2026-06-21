import UserLayout from "@/layouts/UserLayout";
import FormUser from "../components/FormUser";
import PetaInteraktif from "../components/PetaInteraktif";
import RevealItem from "@/components/RevealItem";

const KontakPage = () => {

  return (
    <section className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen flex flex-col">
      <UserLayout>

        {/* HEADER */}
        <RevealItem animation="animate-fade-in-up" className="mb-20 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold font-['Montserrat'] text-[#ffd700] mb-4">
            Hubungi Kami
          </h1>
          <p className="text-[#d0c6ab] text-lg leading-relaxed">
            Kami selalu terbuka untuk berdiskusi, berkolaborasi, dan menjawab
            pertanyaan Anda seputar Keluarga Mahasiswa Sunan Gunung Djati wilayah
            Jabodetabek.
          </p>
        </RevealItem>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* KIRI: INFO + MAP */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* INFO CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Sekretariat */}
              <RevealItem animation="animate-fade-in-up" delay={80}>
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
              </RevealItem>

              {/* Komunikasi */}
              <RevealItem animation="animate-fade-in-up" delay={140}>
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
              </RevealItem>

              {/* Media Sosial */}
              <RevealItem animation="animate-fade-in-up" delay={200} className="sm:col-span-2">
                <div className="bg-[#20201f] border-t-[3px] border-[#ffd700] p-6 flex flex-col gap-4">
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
              </RevealItem>
            </div>

            <PetaInteraktif />
          </div>

          {/* KANAN: FORM */}
          <aside>
            <FormUser />
          </aside>

        </div>
      </UserLayout>
    </section>
  );
};

export default KontakPage;