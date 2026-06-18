"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const kegiatan_controller_1 = require("./kegiatan.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const router = (0, express_1.Router)();
// Public
router.get("/", kegiatan_controller_1.kegiatanController.getAll);
router.get("/categories", kegiatan_controller_1.kegiatanController.getAllCategories);
router.get("/category/:category", kegiatan_controller_1.kegiatanController.getByCategory);
router.get("/departemen/:departemenId", kegiatan_controller_1.kegiatanController.getByDepartemen);
router.get("/:id", kegiatan_controller_1.kegiatanController.getById);
// Protected (admin only)
router.get("/admin/all", auth_middleware_1.verifyToken, kegiatan_controller_1.kegiatanController.getAllAdmin);
router.post("/", auth_middleware_1.verifyToken, upload.single("image"), kegiatan_controller_1.kegiatanController.create);
router.put("/:id", auth_middleware_1.verifyToken, upload.single("image"), kegiatan_controller_1.kegiatanController.update);
router.delete("/:id", auth_middleware_1.verifyToken, kegiatan_controller_1.kegiatanController.delete);
exports.default = router;
