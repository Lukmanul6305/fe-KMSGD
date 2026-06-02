import Header from "../../../../../components/Header";
import UserLayout from "../../../../../layouts/UserLayout";
import { CONTENT_HEADER } from "../../TentangData";
import DemisonerList from "../components/DemisonerList";

const DemisonerPage = () => {
  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen">
      <UserLayout>
        <Header
          judul={CONTENT_HEADER.demisioner.judul}
          judul2={CONTENT_HEADER.demisioner.judul2}
          deskripsi={CONTENT_HEADER.demisioner.deskripsi}
        />

        <DemisonerList />
      </UserLayout>
    </div>
  );
};

export default DemisonerPage;
