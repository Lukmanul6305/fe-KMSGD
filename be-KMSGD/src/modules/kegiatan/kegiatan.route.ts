import { Router } from "express";
import { kegiatanController } from "./kegiatan.controller";
import upload from "../../middlewares/upload.middleware";

const router = Router();

router.get("/", kegiatanController.getAll);
router.get("/categories", kegiatanController.getAllCategories);
router.get("/category/:category", kegiatanController.getByCategory);
router.get("/:id", kegiatanController.getById);
router.post("/", kegiatanController.create);
router.put("/:id", kegiatanController.update);
router.delete("/:id", kegiatanController.delete);

router.post("/", upload.single("image"), kegiatanController.create);
router.put("/:id", upload.single("image"), kegiatanController.update);

export default router;
