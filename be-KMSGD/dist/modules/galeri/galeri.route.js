"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const galeri_controller_1 = require("./galeri.controller");
const upload_middleware_1 = __importDefault(require("../../middlewares/upload.middleware"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", galeri_controller_1.galeriController.getAll);
router.get("/tipe/:tipe", galeri_controller_1.galeriController.getByTipe);
router.get("/kegiatan/:kegiatanId", galeri_controller_1.galeriController.getByKegiatan);
router.get("/:id", galeri_controller_1.galeriController.getById);
router.post("/", auth_middleware_1.verifyToken, upload_middleware_1.default.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
]), galeri_controller_1.galeriController.create);
router.put("/:id", auth_middleware_1.verifyToken, upload_middleware_1.default.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
]), galeri_controller_1.galeriController.update);
router.delete("/:id", auth_middleware_1.verifyToken, galeri_controller_1.galeriController.delete);
exports.default = router;
