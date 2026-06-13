import { Router } from "express";
import multer from "multer";
import { kegiatanController } from "./kegiatan.controller";
import { verifyToken } from "../../middlewares/auth.middleware";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

// Public
router.get("/", kegiatanController.getAll);
router.get("/categories", kegiatanController.getAllCategories);
router.get("/category/:category", kegiatanController.getByCategory);
router.get("/departemen/:departemenId", kegiatanController.getByDepartemen);
router.get("/:id", kegiatanController.getById);

// Protected (admin only)
router.get("/admin/all", verifyToken, kegiatanController.getAllAdmin);
router.post("/", verifyToken, upload.single("image"), kegiatanController.create);
router.put("/:id", verifyToken, upload.single("image"), kegiatanController.update);
router.delete("/:id", verifyToken, kegiatanController.delete);

export default router;
