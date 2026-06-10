import { Router } from "express";
import { kegiatanController } from "./kegiatan.controller";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", kegiatanController.getAll);
router.get("/categories", kegiatanController.getAllCategories);
router.get("/category/:category", kegiatanController.getByCategory);
router.get("/:id", kegiatanController.getById);

router.post("/", verifyToken, kegiatanController.create);
router.put("/:id", verifyToken, kegiatanController.update);
router.delete("/:id", verifyToken, kegiatanController.delete);

export default router;
