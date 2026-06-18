import { Router } from "express";
import { homeBackgroundController } from "./homeBackground.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import upload from "../../middlewares/upload.middleware";

const router = Router();

// Public routes
router.get("/active", homeBackgroundController.getActive);
router.get("/", homeBackgroundController.getAll); // Or could be admin only if we don't want public paginated access
router.get("/:id", homeBackgroundController.getById);

// Admin routes
router.post(
  "/",
  verifyToken,
  upload.fields([{ name: "image", maxCount: 1 }]),
  homeBackgroundController.create
);

router.put(
  "/:id",
  verifyToken,
  upload.fields([{ name: "image", maxCount: 1 }]),
  homeBackgroundController.update
);

router.delete("/:id", verifyToken, homeBackgroundController.delete);

export default router;
