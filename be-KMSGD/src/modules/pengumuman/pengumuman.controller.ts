import { Request, Response } from "express";
import { pengumumanService } from "./pengumuman.service";
import { createPengumumanSchema, updatePengumumanSchema } from "./pengumuman.validation";
import { response } from "../../utils/response";
import handleError from "../../exceptions/handleError";

export const pengumumanController = {
  async getAll(req: Request, res: Response) {
    try {
      const data = await pengumumanService.getAll();
      response.success(res, data, "Berhasil mengambil data pengumuman");
    } catch (error) {
      handleError(res, error);
    }
  },

  async getPenting(req: Request, res: Response) {
    try {
      const data = await pengumumanService.getPenting();
      response.success(res, data, "Berhasil mengambil pengumuman penting");
    } catch (error) {
      handleError(res, error);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const data = await pengumumanService.getById(Number(req.params.id));
      response.success(res, data, "Berhasil mengambil detail pengumuman");
    } catch (error) {
      handleError(res, error);
    }
  },

  async create(req: Request, res: Response) {
    try {
      const dto = createPengumumanSchema.parse(req.body);
      const data = await pengumumanService.create(dto, req.file?.buffer);
      response.success(res, data, "Pengumuman berhasil dibuat", 201);
    } catch (error) {
      handleError(res, error);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const dto = updatePengumumanSchema.parse(req.body);
      const data = await pengumumanService.update(Number(req.params.id), dto, req.file?.buffer);
      response.success(res, data, "Pengumuman berhasil diupdate");
    } catch (error) {
      handleError(res, error);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await pengumumanService.delete(Number(req.params.id));
      response.success(res, null, "Pengumuman berhasil dihapus");
    } catch (error) {
      handleError(res, error);
    }
  },
};
