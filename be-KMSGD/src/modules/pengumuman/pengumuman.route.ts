import { Router } from "express";
import { pengumumanController } from "./pengumuman.controller";
import upload from "../../middlewares/upload.middleware";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", pengumumanController.getAll);
router.get("/penting", pengumumanController.getPenting);
router.get("/:id", pengumumanController.getById);

router.post("/", verifyToken, upload.single("image"), pengumumanController.create);
router.put("/:id", verifyToken, upload.single("image"), pengumumanController.update);
router.delete("/:id", verifyToken, pengumumanController.delete);

export default router;
