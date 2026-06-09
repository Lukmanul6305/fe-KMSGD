import { Router } from "express";
import adminRouter from "../modules/admin/admin.route";
import galeriRouter from "../modules/galeri/galeri.route";
import kegiatanRouter from "../modules/kegiatan/kegiatan.route";
import kepengurusanRouter from "../modules/kepengurusan/kepengurusan.route";
import pengumumanRouter from "../modules/pengumuman/pengumuman.route";
import authRouter from "../modules/authentication/auth.route";

const globalRouter = Router();

globalRouter.use("/auth", authRouter);

globalRouter.use("/admin", adminRouter);
globalRouter.use("/galeri", galeriRouter);
globalRouter.use("/kegiatan", kegiatanRouter);
globalRouter.use("/kepengurusan", kepengurusanRouter);
globalRouter.use("/pengumuman", pengumumanRouter);

export default globalRouter;
