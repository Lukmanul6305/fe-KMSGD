"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sambutan_controller_1 = require("./sambutan.controller");
const upload_middleware_1 = __importDefault(require("../../middlewares/upload.middleware"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", sambutan_controller_1.sambutanController.get);
router.post("/", auth_middleware_1.verifyToken, upload_middleware_1.default.single("image"), sambutan_controller_1.sambutanController.create);
router.put("/:id", auth_middleware_1.verifyToken, upload_middleware_1.default.single("image"), sambutan_controller_1.sambutanController.update);
router.delete("/:id", auth_middleware_1.verifyToken, sambutan_controller_1.sambutanController.delete);
exports.default = router;
