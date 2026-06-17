import { Router } from "express";
import { sambutanController } from "./sambutan.controller";
import upload from "../../middlewares/upload.middleware";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", sambutanController.get);
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  sambutanController.create,
);
router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  sambutanController.update,
);
router.delete("/:id", verifyToken, sambutanController.delete);

export default router;
