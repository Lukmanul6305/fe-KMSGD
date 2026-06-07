import { Router } from "express";
import { pengumumanController } from "./pengumuman.controller";
import upload from "../../middlewares/upload.middleware";

const router = Router();

router.get("/", pengumumanController.getAll);
router.get("/penting", pengumumanController.getPenting);
router.get("/:id", pengumumanController.getById);
router.post("/", upload.single("image"), pengumumanController.create);
router.put("/:id", upload.single("image"), pengumumanController.update);
router.delete("/:id", pengumumanController.delete);

export default router;
