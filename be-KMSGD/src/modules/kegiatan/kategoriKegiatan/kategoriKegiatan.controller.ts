import { Request, Response } from "express";
import { kategoriKegiatanService } from "./kategoriKegiatan.service";
import { createKategoriSchema, updateKategoriSchema } from "./kategoriKegiatan.validation";
import { response } from "../../../utils/response";
import handleError from "../../../exceptions/handleError";

export const kategoriKegiatanController = {
  async getAll(req: Request, res: Response) {
    try {
      const data = await kategoriKegiatanService.getAll();
      return response.success(res, data, "Berhasil mengambil semua data kategori kegiatan");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const data = await kategoriKegiatanService.getById(Number(req.params.id));
      return response.success(res, data, "Berhasil mengambil detail kategori kegiatan");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async create(req: Request, res: Response) {
    try {
      const dto = createKategoriSchema.parse(req.body);
      const data = await kategoriKegiatanService.create(dto);
      return response.success(res, data, "Kategori kegiatan berhasil dibuat", 201);
    } catch (error) {
      return handleError(res, error);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const dto = updateKategoriSchema.parse(req.body);
      const data = await kategoriKegiatanService.update(Number(req.params.id), dto);
      return response.success(res, data, "Kategori kegiatan berhasil diupdate");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await kategoriKegiatanService.delete(Number(req.params.id));
      return response.success(res, null, "Kategori kegiatan berhasil dihapus");
    } catch (error) {
      return handleError(res, error);
    }
  },
};
