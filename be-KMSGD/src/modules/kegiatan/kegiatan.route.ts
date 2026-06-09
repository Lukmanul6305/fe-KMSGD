import { Router } from "express";
import { kegiatanController } from "./kegiatan.controller";
import upload from "../../middlewares/upload.middleware";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", kegiatanController.getAll);
router.get("/categories", kegiatanController.getAllCategories);
router.get("/category/:category", kegiatanController.getByCategory);
router.get("/:id", kegiatanController.getById);

router.post("/", verifyToken, kegiatanController.create);
router.put("/:id", verifyToken, kegiatanController.update);
router.delete("/:id", verifyToken, kegiatanController.delete);

router.post("/", verifyToken, upload.single("image"), kegiatanController.create);
router.put("/:id", verifyToken, upload.single("image"), kegiatanController.update);

export default router;
