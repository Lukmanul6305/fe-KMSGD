import { DetailPostTemplate } from "../../../../components/common/DetailPostTemplate";
import { CONTENT_HEADER } from "../services/pengumumanService";


const DetailPengumuman = () => {
    return <DetailPostTemplate judul="Detail" judul2="Pengumuman" deskripsi={CONTENT_HEADER.deskripsi} bgImage={CONTENT_HEADER.bgImage} />
}

export default DetailPengumuman;