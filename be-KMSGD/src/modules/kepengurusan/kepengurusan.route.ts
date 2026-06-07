import { Router } from "express";
import { kepengurusanController } from "./kepengurusan.controller";
import upload from "../../middlewares/upload.middleware";

const router = Router();

// Periode
router.get("/periode", kepengurusanController.getAllPeriode);
router.get("/periode/aktif", kepengurusanController.getPeriodeAktif);
router.get("/periode/:id", kepengurusanController.getPeriodeById);
router.post("/periode", kepengurusanController.createPeriode);
router.put("/periode/:id", kepengurusanController.updatePeriode);
router.delete("/periode/:id", kepengurusanController.deletePeriode);

// Pengurus Inti
router.post("/inti", upload.single("image"), kepengurusanController.createPengurusInti);
router.put("/inti/:id", upload.single("image"), kepengurusanController.updatePengurusInti);
router.delete("/inti/:id", kepengurusanController.deletePengurusInti);

// Departemen
router.post("/departemen", kepengurusanController.createDepartemen);
router.put("/departemen/:id", kepengurusanController.updateDepartemen);
router.delete("/departemen/:id", kepengurusanController.deleteDepartemen);

// Anggota
router.post("/anggota", upload.single("image"), kepengurusanController.createAnggota);
router.put("/anggota/:id", upload.single("image"), kepengurusanController.updateAnggota);
router.delete("/anggota/:id", kepengurusanController.deleteAnggota);

export default router;