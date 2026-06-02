import Header from "../../../../../components/Header";
import UserLayout from "../../../../../layouts/UserLayout";
import { CONTENT_HEADER } from "../../TentangData";
import StrukturOrganisasi from "../components/StrukturOrganisasi";

const StrukturPage = () => {
  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen">
      <UserLayout>
        <Header
          judul={CONTENT_HEADER.struktur.judul}
          judul2={CONTENT_HEADER.struktur.judul2}
          deskripsi={CONTENT_HEADER.struktur.deskripsi}
        />

        <StrukturOrganisasi />
      </UserLayout>
    </div>
  );
};

export default StrukturPage;
