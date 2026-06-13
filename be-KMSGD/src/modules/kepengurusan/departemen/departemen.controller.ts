import { Request, Response } from "express";
import { kepengurusanService } from "./departemen.service";
import { createDepartemenSchema, updateDepartemenSchema } from "./departemen.validation";
import { response } from "../../../utils/response";
import handleError from "../../../exceptions/handleError";

export const kepengurusanController = {
  async getAllDepartemen(req: Request, res: Response) {
    try {
      const data = await kepengurusanService.getAllDepartemen();
      return response.success(res, data, "Berhasil mengambil semua data departemen");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async getDepartemenByPeriode(req: Request, res: Response) {
    try {
      const periodeId = req.query.periodeId ? Number(req.query.periodeId) : undefined;
      if (periodeId !== undefined && isNaN(periodeId)) {
        return response.failed(res, "periodeId harus berupa angka", 400);
      }
      const data = periodeId
        ? await kepengurusanService.getDepartemenByPeriode(periodeId)
        : await kepengurusanService.getAllDepartemen();
      return response.success(res, data, "Berhasil mengambil data departemen");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async getDepartemenAktif(req: Request, res: Response) {
    try {
      const data = await kepengurusanService.getDepartemenAktif();
      return response.success(res, data, "Berhasil mengambil departemen periode aktif");
    } catch (error) {
      return handleError(res, error);
    }
  },

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
};
