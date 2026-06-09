import { Router } from "express";
import { login, getMe, logout, refresh } from "./auth.controller";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", verifyToken, getMe);

export default router;
