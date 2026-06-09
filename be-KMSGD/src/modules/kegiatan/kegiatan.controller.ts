import { Request, Response } from "express";
import { kegiatanService } from "./kegiatan.service";
import { createKegiatanSchema, updateKegiatanSchema } from "./kegiatan.validation";
import { response } from "../../utils/response";
import handleError from "../../exceptions/handleError";

export const kegiatanController = {
  async getAll(req: Request, res: Response) {
    try {
      const data = await kegiatanService.getAll();
      return response.success(res, data, "Berhasil mengambil data kegiatan");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async getAllCategories(req: Request, res: Response) {
    try {
      const data = await kegiatanService.getAllCategories();
      return response.success(res, data, "Berhasil mengambil kategori");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async getByCategory(req: Request, res: Response) {
    try {
      const data = await kegiatanService.getByCategory(req.params.category);
      return response.success(res, data, "Berhasil mengambil kegiatan by kategori");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const data = await kegiatanService.getById(Number(req.params.id));
      return response.success(res, data, "Berhasil mengambil detail kegiatan");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async create(req: Request, res: Response) {
    try {
      const dto = createKegiatanSchema.parse(req.body);
      const imageBuffer = req.file?.buffer;
      const data = await kegiatanService.create(dto, imageBuffer);
      return response.success(res, data, "Kegiatan berhasil dibuat", 201);
    } catch (error) {
      return handleError(res, error);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const dto = updateKegiatanSchema.parse(req.body);
      const imageBuffer = req.file?.buffer;
      const data = await kegiatanService.update(Number(req.params.id), dto, imageBuffer);
      return response.success(res, data, "Kegiatan berhasil diupdate");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await kegiatanService.delete(Number(req.params.id));
      return response.success(res, null, "Kegiatan berhasil dihapus");
    } catch (error) {
      return handleError(res, error);
    }
  },
};
