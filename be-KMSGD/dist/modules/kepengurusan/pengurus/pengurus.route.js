"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pengurus_controller_1 = require("./pengurus.controller");
const upload_middleware_1 = __importDefault(require("../../../middlewares/upload.middleware"));
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const pengurusRouter = (0, express_1.Router)();
// Pengurus Inti
pengurusRouter.get("/inti", pengurus_controller_1.pengurusController.getPengurusIntiByPeriode);
pengurusRouter.post("/inti", auth_middleware_1.verifyToken, upload_middleware_1.default.single("image"), pengurus_controller_1.pengurusController.createPengurusInti);
pengurusRouter.put("/inti/:id", auth_middleware_1.verifyToken, upload_middleware_1.default.single("image"), pengurus_controller_1.pengurusController.updatePengurusInti);
pengurusRouter.delete("/inti/:id", auth_middleware_1.verifyToken, pengurus_controller_1.pengurusController.deletePengurusInti);
// Anggota
pengurusRouter.post("/anggota", auth_middleware_1.verifyToken, upload_middleware_1.default.single("image"), pengurus_controller_1.pengurusController.createAnggota);
pengurusRouter.put("/anggota/:id", auth_middleware_1.verifyToken, upload_middleware_1.default.single("image"), pengurus_controller_1.pengurusController.updateAnggota);
pengurusRouter.delete("/anggota/:id", auth_middleware_1.verifyToken, pengurus_controller_1.pengurusController.deleteAnggota);
pengurusRouter.get("/anggota", pengurus_controller_1.pengurusController.getAnggotaByDepartemen);
exports.default = pengurusRouter;
