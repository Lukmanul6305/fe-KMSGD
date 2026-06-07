import { Router } from "express";
import { galeriController } from "./galeri.controller";
import upload from "../../middlewares/upload.middleware";

const router = Router();

router.get("/", galeriController.getAll);
router.get("/tipe/:tipe", galeriController.getByTipe);
router.get("/kegiatan/:kegiatanId", galeriController.getByKegiatan);
router.get("/:id", galeriController.getById);
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  galeriController.create,
);
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  galeriController.update,
);
router.delete("/:id", galeriController.delete);

export default router;
