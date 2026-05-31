import DemisonerList from "../components/DemisonerList";

const DemisonerPage = () => {
  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen">
      <main className="pt-20 w-full">
        <section className="py-20 px-6 max-w-7xl mx-auto border-b border-[#2a2a2a]">
          <h1 className="text-5xl md:text-6xl font-bold font-['Montserrat'] text-[#ffd700] mb-4 leading-tight">
            <span className="text-white">Demisoner</span> Pengurus
          </h1>
          <p className="text-[#d0c6ab] text-lg leading-relaxed max-w-3xl">
            Apresiasi bagi para pengurus yang telah menyelesaikan masa baktinya di KMSGD Jabodetabek.
          </p>
        </section>

        <DemisonerList />
      </main>
    </div>
  );
};

export default DemisonerPage;
