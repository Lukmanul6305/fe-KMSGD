import { Router } from "express";
import adminRouter from "../modules/admin/admin.route";
import galeriRouter from "../modules/galeri/galeri.route";
import kegiatanRouter from "../modules/kegiatan/kegiatan.route";
import kategoriKegiatanRouter from "../modules/kegiatan/kategoriKegiatan/kategoriKegiatan.route";
import priodeRouter from "../modules/kepengurusan/priode/priode.route";
import pengurusRouter from "../modules/kepengurusan/pengurus/pengurus.route";
import departemenRouter from "../modules/kepengurusan/departemen/departemen.route";
import pengumumanRouter from "../modules/pengumuman/pengumuman.route";
import authRouter from "../modules/authentication/auth.route";

const globalRouter = Router();

globalRouter.use("/auth", authRouter);

globalRouter.use("/admin", adminRouter);
globalRouter.use("/galeri", galeriRouter);
globalRouter.use("/kegiatan", kegiatanRouter);
globalRouter.use("/kategori-kegiatan", kategoriKegiatanRouter);
globalRouter.use("/kepengurusan", priodeRouter);
globalRouter.use("/kepengurusan", pengurusRouter);
globalRouter.use("/kepengurusan", departemenRouter);
globalRouter.use("/pengumuman", pengumumanRouter);

export default globalRouter;
