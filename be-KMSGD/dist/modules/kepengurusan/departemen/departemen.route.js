"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departemen_controller_1 = require("./departemen.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const departemenRouter = (0, express_1.Router)();
// GET /departemen?periodeId=x => filter by periode, tanpa query => semua
departemenRouter.get("/departemen", departemen_controller_1.kepengurusanController.getDepartemenByPeriode);
departemenRouter.get("/departemen/aktif", departemen_controller_1.kepengurusanController.getDepartemenAktif);
departemenRouter.post("/departemen", auth_middleware_1.verifyToken, departemen_controller_1.kepengurusanController.createDepartemen);
departemenRouter.put("/departemen/:id", auth_middleware_1.verifyToken, departemen_controller_1.kepengurusanController.updateDepartemen);
departemenRouter.delete("/departemen/:id", auth_middleware_1.verifyToken, departemen_controller_1.kepengurusanController.deleteDepartemen);
exports.default = departemenRouter;
