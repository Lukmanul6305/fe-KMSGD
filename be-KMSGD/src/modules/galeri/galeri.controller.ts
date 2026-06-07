import { Request, Response } from "express";
import { galeriService } from "./galeri.service";
import { createGaleriSchema, updateGaleriSchema } from "./galeri.validation";
import { response } from "../../utils/response";
import handleError from "../../exceptions/handleError";

export const galeriController = {
  async getAll(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 12;
      const data = await galeriService.getAll(page, limit);
      response.success(res, data, "Berhasil mengambil data galeri");
    } catch (error) {
      handleError(res, error);
    }
  },

  async getByTipe(req: Request, res: Response) {
    try {
      const tipe = req.params.tipe.toUpperCase() as "FOTO" | "VIDEO";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 12;
      const data = await galeriService.getByTipe(tipe, page, limit);
      response.success(res, data, `Berhasil mengambil galeri ${tipe}`);
    } catch (error) {
      handleError(res, error);
    }
  },

  async getByKegiatan(req: Request, res: Response) {
    try {
      const data = await galeriService.getByKegiatan(Number(req.params.kegiatanId));
      response.success(res, data, "Berhasil mengambil galeri kegiatan");
    } catch (error) {
      handleError(res, error);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const data = await galeriService.getById(Number(req.params.id));
      response.success(res, data, "Berhasil mengambil detail galeri");
    } catch (error) {
      handleError(res, error);
    }
  },

  async create(req: Request, res: Response) {
    try {
      const dto = createGaleriSchema.parse(req.body);
      const files = {
        image: (req.files as any)?.image?.[0]?.buffer,
        thumbnail: (req.files as any)?.thumbnail?.[0]?.buffer,
      };
      const data = await galeriService.create(dto, files);
      response.success(res, data, "Galeri berhasil dibuat", 201);
    } catch (error) {
      handleError(res, error);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const dto = updateGaleriSchema.parse(req.body);
      const files = {
        image: (req.files as any)?.image?.[0]?.buffer,
        thumbnail: (req.files as any)?.thumbnail?.[0]?.buffer,
      };
      const data = await galeriService.update(Number(req.params.id), dto, files);
      response.success(res, data, "Galeri berhasil diupdate");
    } catch (error) {
      handleError(res, error);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await galeriService.delete(Number(req.params.id));
      response.success(res, null, "Galeri berhasil dihapus");
    } catch (error) {
      handleError(res, error);
    }
  },
};
