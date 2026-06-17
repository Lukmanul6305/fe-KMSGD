import { Router } from "express";
import { kategoriPengumumanController } from "./kategoriPengumuman.controller";
import { verifyToken } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/", kategoriPengumumanController.getAll);
router.get("/:id", kategoriPengumumanController.getById);

router.post("/", verifyToken, kategoriPengumumanController.create);
router.put("/:id", verifyToken, kategoriPengumumanController.update);
router.delete("/:id", verifyToken, kategoriPengumumanController.delete);

export default router;
