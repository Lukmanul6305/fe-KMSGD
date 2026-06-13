import { Request, Response } from "express";
import handleError from "../../../exceptions/handleError";
import { response } from "../../../utils/response";
import { priodeService } from "./priode.service";
import { createPeriodeSchema, updatePeriodeSchema } from "./priode.validation";

export const priodeController = {
  async getAllPeriode(req: Request, res: Response) {
    try {
      const data = await priodeService.getAllPeriode();
      return response.success(res, data, "Berhasil mengambil data periode");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async getPeriodeAktif(req: Request, res: Response) {
    try {
      const data = await priodeService.getPeriodeAktif();
      return response.success(res, data, "Berhasil mengambil periode aktif");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async getPeriodeById(req: Request, res: Response) {
    try {
      const data = await priodeService.getPeriodeById(Number(req.params.id));
      return response.success(res, data, "Berhasil mengambil detail periode");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async createPeriode(req: Request, res: Response) {
    try {
      const dto = createPeriodeSchema.parse(req.body);
      const data = await priodeService.createPeriode(dto);
      return response.success(res, data, "Periode berhasil dibuat", 201);
    } catch (error) {
      return handleError(res, error);
    }
  },

  async updatePeriode(req: Request, res: Response) {
    try {
      const dto = updatePeriodeSchema.parse(req.body);
      const data = await priodeService.updatePeriode(Number(req.params.id), dto);
      return response.success(res, data, "Periode berhasil diupdate");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async deletePeriode(req: Request, res: Response) {
    try {
      await priodeService.deletePeriode(Number(req.params.id));
      return response.success(res, null, "Periode berhasil dihapus");
    } catch (error) {
      return handleError(res, error);
    }
  },
};
