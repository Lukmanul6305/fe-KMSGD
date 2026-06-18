"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeBackground_controller_1 = require("./homeBackground.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const upload_middleware_1 = __importDefault(require("../../middlewares/upload.middleware"));
const router = (0, express_1.Router)();
// Public routes
router.get("/active", homeBackground_controller_1.homeBackgroundController.getActive);
router.get("/", homeBackground_controller_1.homeBackgroundController.getAll); // Or could be admin only if we don't want public paginated access
router.get("/:id", homeBackground_controller_1.homeBackgroundController.getById);
// Admin routes
router.post("/", auth_middleware_1.verifyToken, upload_middleware_1.default.fields([{ name: "image", maxCount: 1 }]), homeBackground_controller_1.homeBackgroundController.create);
router.put("/:id", auth_middleware_1.verifyToken, upload_middleware_1.default.fields([{ name: "image", maxCount: 1 }]), homeBackground_controller_1.homeBackgroundController.update);
router.delete("/:id", auth_middleware_1.verifyToken, homeBackground_controller_1.homeBackgroundController.delete);
exports.default = router;
