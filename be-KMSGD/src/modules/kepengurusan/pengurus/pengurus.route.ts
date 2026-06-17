import { Router } from "express";
import { pengurusController } from "./pengurus.controller";
import upload from "../../../middlewares/upload.middleware";
import { verifyToken } from "../../../middlewares/auth.middleware";

const pengurusRouter = Router();

// Pengurus Inti
pengurusRouter.get("/inti", pengurusController.getPengurusIntiByPeriode);
pengurusRouter.post("/inti", verifyToken, upload.single("image"), pengurusController.createPengurusInti);
pengurusRouter.put("/inti/:id", verifyToken, upload.single("image"), pengurusController.updatePengurusInti);
pengurusRouter.delete("/inti/:id", verifyToken, pengurusController.deletePengurusInti);

// Anggota
pengurusRouter.post("/anggota", verifyToken, upload.single("image"), pengurusController.createAnggota);
pengurusRouter.put("/anggota/:id", verifyToken, upload.single("image"), pengurusController.updateAnggota);
pengurusRouter.delete("/anggota/:id", verifyToken, pengurusController.deleteAnggota);
pengurusRouter.get("/anggota", pengurusController.getAnggotaByDepartemen);

export default pengurusRouter;
