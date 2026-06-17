import { Request, Response } from "express";
import { kategoriPengumumanService } from "./kategoriPengumuman.service";
import { createKategoriSchema, updateKategoriSchema } from "./kategoriPengumuman.validation";
import { response } from "../../../utils/response";
import handleError from "../../../exceptions/handleError";

export const kategoriPengumumanController = {
  async getAll(req: Request, res: Response) {
    try {
      const data = await kategoriPengumumanService.getAll();
      return response.success(res, data, "Berhasil mengambil semua data kategori pengumuman");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const data = await kategoriPengumumanService.getById(Number(req.params.id));
      return response.success(res, data, "Berhasil mengambil detail kategori pengumuman");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async create(req: Request, res: Response) {
    try {
      const dto = createKategoriSchema.parse(req.body);
      const data = await kategoriPengumumanService.create(dto);
      return response.success(res, data, "Kategori pengumuman berhasil dibuat", 201);
    } catch (error) {
      return handleError(res, error);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const dto = updateKategoriSchema.parse(req.body);
      const data = await kategoriPengumumanService.update(Number(req.params.id), dto);
      return response.success(res, data, "Kategori pengumuman berhasil diupdate");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await kategoriPengumumanService.delete(Number(req.params.id));
      return response.success(res, null, "Kategori pengumuman berhasil dihapus");
    } catch (error) {
      return handleError(res, error);
    }
  },
};
