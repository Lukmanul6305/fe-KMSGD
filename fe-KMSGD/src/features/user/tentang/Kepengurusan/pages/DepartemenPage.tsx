import Header from "../../../../../components/Header";
import UserLayout from "../../../../../layouts/UserLayout";
import { CONTENT_HEADER } from "../../TentangData";
import DepartemenList from "../components/DepartemenList";


const DepartemenPage = () => {
  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-['Inter'] min-h-screen">
      <UserLayout>
        <Header
          judul={CONTENT_HEADER.departemen.judul}
          judul2={CONTENT_HEADER.departemen.judul2}
          deskripsi={CONTENT_HEADER.departemen.deskripsi}
        />

        <div className="py-10">
          <DepartemenList />
        </div>
      </UserLayout>
    </div>
  );
};

export default DepartemenPage;
