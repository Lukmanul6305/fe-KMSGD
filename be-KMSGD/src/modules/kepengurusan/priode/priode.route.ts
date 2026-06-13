import { Router } from "express";
import { priodeController } from "./priode.controller";
import { verifyToken } from "../../../middlewares/auth.middleware";

const priode = Router();

priode.get("/periode", priodeController.getAllPeriode);
priode.get("/periode/aktif", priodeController.getPeriodeAktif);
priode.get("/periode/:id", priodeController.getPeriodeById);

priode.post("/periode", verifyToken, priodeController.createPeriode);
priode.put("/periode/:id", verifyToken, priodeController.updatePeriode);
priode.delete("/periode/:id", verifyToken, priodeController.deletePeriode);

export default priode;
