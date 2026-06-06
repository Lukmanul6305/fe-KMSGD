import { Router } from "express";
import { adminController } from "./admin.controller";
// import { authMiddleware } from "../../middlewares/auth.middleware"; // uncomment jika pakai auth

const router = Router();

// GET /admin
router.get("/", adminController.getAll);

// GET /admin/:id
router.get("/:id", adminController.getById);

// POST /admin
router.post("/", adminController.create);

// PUT /admin/:id
router.put("/:id", adminController.update);

// DELETE /admin/:id
router.delete("/:id", adminController.delete);

export default router;
