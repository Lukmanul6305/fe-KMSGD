import { Router } from "express";
import { kepengurusanController } from "./kepengurusan.controller";
import upload from "../../middlewares/upload.middleware";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = Router();

// Periode
router.get("/periode", kepengurusanController.getAllPeriode);
router.get("/periode/aktif", kepengurusanController.getPeriodeAktif);
router.get("/periode/:id", kepengurusanController.getPeriodeById);

router.post("/periode", verifyToken, kepengurusanController.createPeriode);
router.put("/periode/:id", verifyToken, kepengurusanController.updatePeriode);
router.delete("/periode/:id", verifyToken, kepengurusanController.deletePeriode);

// Pengurus Inti
router.post("/inti", verifyToken, upload.single("image"), kepengurusanController.createPengurusInti);
router.put("/inti/:id", verifyToken, upload.single("image"), kepengurusanController.updatePengurusInti);
router.delete("/inti/:id", verifyToken, kepengurusanController.deletePengurusInti);

// Departemen
router.post("/departemen", verifyToken, kepengurusanController.createDepartemen);
router.put("/departemen/:id", verifyToken, kepengurusanController.updateDepartemen);
router.delete("/departemen/:id", verifyToken, kepengurusanController.deleteDepartemen);

// Anggota
router.post("/anggota", verifyToken, upload.single("image"), kepengurusanController.createAnggota);
router.put("/anggota/:id", verifyToken, upload.single("image"), kepengurusanController.updateAnggota);
router.delete("/anggota/:id", verifyToken, kepengurusanController.deleteAnggota);

export default router;
