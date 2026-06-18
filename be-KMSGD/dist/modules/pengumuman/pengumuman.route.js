"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pengumuman_controller_1 = require("./pengumuman.controller");
const upload_middleware_1 = __importDefault(require("../../middlewares/upload.middleware"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", pengumuman_controller_1.pengumumanController.getAll);
router.get("/penting", pengumuman_controller_1.pengumumanController.getPenting);
router.get("/:id", pengumuman_controller_1.pengumumanController.getById);
router.post("/", auth_middleware_1.verifyToken, upload_middleware_1.default.single("image"), pengumuman_controller_1.pengumumanController.create);
router.put("/:id", auth_middleware_1.verifyToken, upload_middleware_1.default.single("image"), pengumuman_controller_1.pengumumanController.update);
router.delete("/:id", auth_middleware_1.verifyToken, pengumuman_controller_1.pengumumanController.delete);
exports.default = router;
