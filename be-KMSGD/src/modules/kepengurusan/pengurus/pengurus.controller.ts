import { Request, Response } from "express";
import { kepengurusanService } from "./pengurus.service";
import { createPengurusIntiSchema, updatePengurusIntiSchema, createAnggotaSchema, updateAnggotaSchema } from "./pengurus.validation";
import { response } from "../../../utils/response";
import handleError from "../../../exceptions/handleError";

export const pengurusController = {
  //pengurus inti
  async getPengurusIntiByPeriode(req: Request, res: Response) {
    try {
      const periodeId = Number(req.query.periodeId);
      if (!periodeId) {
        return response.failed(res, "periodeId is required", 400);
      }
      const data = await kepengurusanService.getPengurusIntiByPeriode(periodeId);
      return response.success(res, data, "Berhasil mengambil data pengurus inti");
    } catch (error) {
      return handleError(res, error);
    }
  },

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
  async getAnggotaByDepartemen(req: Request, res: Response) {
    try {
      const departemenId = req.query.departemenId ? Number(req.query.departemenId) : undefined;
      const data = await kepengurusanService.getAnggotaByDepartemen(departemenId);
      return response.success(res, data, "Berhasil mengambil data anggota");
    } catch (error) {
      return handleError(res, error);
    }
  }
};
