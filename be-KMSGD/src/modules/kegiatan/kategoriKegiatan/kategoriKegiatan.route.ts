import { Router } from "express";
import { kategoriKegiatanController } from "./kategoriKegiatan.controller";
import { verifyToken } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/", kategoriKegiatanController.getAll);
router.get("/:id", kategoriKegiatanController.getById);

router.post("/", verifyToken, kategoriKegiatanController.create);
router.put("/:id", verifyToken, kategoriKegiatanController.update);
router.delete("/:id", verifyToken, kategoriKegiatanController.delete);

export default router;
