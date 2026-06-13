import { Router } from "express";
import { kepengurusanController } from "./departemen.controller";
import { verifyToken } from "../../../middlewares/auth.middleware";

const departemenRouter = Router();

// GET /departemen?periodeId=x => filter by periode, tanpa query => semua
departemenRouter.get("/departemen", kepengurusanController.getDepartemenByPeriode);
departemenRouter.get("/departemen/aktif", kepengurusanController.getDepartemenAktif);
departemenRouter.post("/departemen", verifyToken, kepengurusanController.createDepartemen);
departemenRouter.put("/departemen/:id", verifyToken, kepengurusanController.updateDepartemen);
departemenRouter.delete("/departemen/:id", verifyToken, kepengurusanController.deleteDepartemen);
export default departemenRouter;

