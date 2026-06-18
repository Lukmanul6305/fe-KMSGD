"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
// import { authMiddleware } from "../../middlewares/auth.middleware"; // uncomment jika pakai auth
const router = (0, express_1.Router)();
// GET /admin
router.get("/", admin_controller_1.adminController.getAll);
// GET /admin/:id
router.get("/:id", admin_controller_1.adminController.getById);
// POST /admin
router.post("/", admin_controller_1.adminController.create);
// PUT /admin/:id
router.put("/:id", admin_controller_1.adminController.update);
// DELETE /admin/:id
router.delete("/:id", admin_controller_1.adminController.delete);
exports.default = router;
