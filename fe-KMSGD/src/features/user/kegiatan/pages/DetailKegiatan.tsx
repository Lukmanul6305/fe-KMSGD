import { DetailPostTemplate } from "../../../../components/common/DetailPostTemplate";
import { CONTENT_HEADER } from "../services/kegiatanService";


const DetailKegiatan = () => {
    return <DetailPostTemplate judul="Detail" judul2="Kegiatan" deskripsi={CONTENT_HEADER.deskripsi} bgImage={CONTENT_HEADER.bgImage} />
}

export default DetailKegiatan;