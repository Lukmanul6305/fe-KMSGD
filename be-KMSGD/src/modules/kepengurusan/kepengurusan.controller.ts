import { Request, Response } from "express";
import { kepengurusanService } from "./kepengurusan.service";
import { createPeriodeSchema, updatePeriodeSchema, createPengurusIntiSchema, updatePengurusIntiSchema, createDepartemenSchema, updateDepartemenSchema, createAnggotaSchema, updateAnggotaSchema } from "./kepengurusan.validation";
import { response } from "../../utils/response";
import handleError from "../../exceptions/handleError";

export const kepengurusanController = {
  // Periode
  async getAllPeriode(req: Request, res: Response) {
    try {
      const data = await kepengurusanService.getAllPeriode();
      return response.success(res, data, "Berhasil mengambil data periode");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async getPeriodeAktif(req: Request, res: Response) {
    try {
      const data = await kepengurusanService.getPeriodeAktif();
      return response.success(res, data, "Berhasil mengambil periode aktif");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async getPeriodeById(req: Request, res: Response) {
    try {
      const data = await kepengurusanService.getPeriodeById(Number(req.params.id));
      return response.success(res, data, "Berhasil mengambil detail periode");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async createPeriode(req: Request, res: Response) {
    try {
      const dto = createPeriodeSchema.parse(req.body);
      const data = await kepengurusanService.createPeriode(dto);
      return response.success(res, data, "Periode berhasil dibuat", 201);
    } catch (error) {
      return handleError(res, error);
    }
  },

  async updatePeriode(req: Request, res: Response) {
    try {
      const dto = updatePeriodeSchema.parse(req.body);
      const data = await kepengurusanService.updatePeriode(Number(req.params.id), dto);
      return response.success(res, data, "Periode berhasil diupdate");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async deletePeriode(req: Request, res: Response) {
    try {
      await kepengurusanService.deletePeriode(Number(req.params.id));
      return response.success(res, null, "Periode berhasil dihapus");
    } catch (error) {
      return handleError(res, error);
    }
  },

  // Pengurus Inti
  async createPengurusInti(req: Request, res: Response) {
    try {
      const dto = createPengurusIntiSchema.parse(req.body);
      const data = await kepengurusanService.createPengurusInti(dto, req.file?.buffer);
      return response.success(res, data, "Pengurus inti berhasil dibuat", 201);
    } catch (error) {
      return handleError(res, error);
    }
  },

  async updatePengurusInti(req: Request, res: Response) {
    try {
      const dto = updatePengurusIntiSchema.parse(req.body);
      const data = await kepengurusanService.updatePengurusInti(Number(req.params.id), dto, req.file?.buffer);
      return response.success(res, data, "Pengurus inti berhasil diupdate");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async deletePengurusInti(req: Request, res: Response) {
    try {
      await kepengurusanService.deletePengurusInti(Number(req.params.id));
      return response.success(res, null, "Pengurus inti berhasil dihapus");
    } catch (error) {
      return handleError(res, error);
    }
  },

  // Departemen
  async createDepartemen(req: Request, res: Response) {
    try {
      const dto = createDepartemenSchema.parse(req.body);
      const data = await kepengurusanService.createDepartemen(dto);
      return response.success(res, data, "Departemen berhasil dibuat", 201);
    } catch (error) {
      return handleError(res, error);
    }
  },

  async updateDepartemen(req: Request, res: Response) {
    try {
      const dto = updateDepartemenSchema.parse(req.body);
      const data = await kepengurusanService.updateDepartemen(Number(req.params.id), dto);
      return response.success(res, data, "Departemen berhasil diupdate");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async deleteDepartemen(req: Request, res: Response) {
    try {
      await kepengurusanService.deleteDepartemen(Number(req.params.id));
      return response.success(res, null, "Departemen berhasil dihapus");
    } catch (error) {
      return handleError(res, error);
    }
  },

  // Anggota
  async createAnggota(req: Request, res: Response) {
    try {
      const dto = createAnggotaSchema.parse(req.body);
      const data = await kepengurusanService.createAnggota(dto, req.file?.buffer);
      return response.success(res, data, "Anggota berhasil dibuat", 201);
    } catch (error) {
      return handleError(res, error);
    }
  },

  async updateAnggota(req: Request, res: Response) {
    try {
      const dto = updateAnggotaSchema.parse(req.body);
      const data = await kepengurusanService.updateAnggota(Number(req.params.id), dto, req.file?.buffer);
      return response.success(res, data, "Anggota berhasil diupdate");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async deleteAnggota(req: Request, res: Response) {
    try {
      await kepengurusanService.deleteAnggota(Number(req.params.id));
      return response.success(res, null, "Anggota berhasil dihapus");
    } catch (error) {
      return handleError(res, error);
    }
  },
};
