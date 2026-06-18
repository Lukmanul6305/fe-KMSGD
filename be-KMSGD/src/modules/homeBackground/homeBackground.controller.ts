import { Request, Response } from "express";
import { homeBackgroundService } from "./homeBackground.service";
import {
  createHomeBackgroundSchema,
  homeBackgroundIdSchema,
  homeBackgroundQuerySchema,
  updateHomeBackgroundSchema,
} from "./homeBackground.validation";
import { response } from "../../utils/response";
import handleError from "../../exceptions/handleError";

export const homeBackgroundController = {
  async getAll(req: Request, res: Response) {
    try {
      const { page, limit } = homeBackgroundQuerySchema.parse(req.query);
      const data = await homeBackgroundService.getAll(page, limit);
      return response.success(res, data, "Berhasil mengambil data background");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async getActive(req: Request, res: Response) {
    try {
      const data = await homeBackgroundService.getActive();
      res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      return response.success(res, data, "Berhasil mengambil background aktif");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = homeBackgroundIdSchema.parse(req.params);
      const data = await homeBackgroundService.getById(id);
      return response.success(res, data, "Berhasil mengambil detail background");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async create(req: Request, res: Response) {
    try {
      let bodyData = { ...req.body };
      // Multer sometimes sends boolean fields as strings if using FormData
      if (typeof bodyData.isActive === 'boolean') {
        bodyData.isActive = bodyData.isActive ? "true" : "false";
      }
      
      const dto = createHomeBackgroundSchema.parse(bodyData);
      const fileBuffer = (req.files as any)?.image?.[0]?.buffer;

      const data = await homeBackgroundService.create(dto, fileBuffer);
      return response.success(res, data, "Background berhasil ditambahkan", 201);
    } catch (error) {
      return handleError(res, error);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = homeBackgroundIdSchema.parse(req.params);
      let bodyData = { ...req.body };
      if (typeof bodyData.isActive === 'boolean') {
        bodyData.isActive = bodyData.isActive ? "true" : "false";
      }

      const dto = updateHomeBackgroundSchema.parse(bodyData);
      const fileBuffer = (req.files as any)?.image?.[0]?.buffer;

      const data = await homeBackgroundService.update(id, dto, fileBuffer);
      return response.success(res, data, "Background berhasil diupdate");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = homeBackgroundIdSchema.parse(req.params);
      await homeBackgroundService.delete(id);
      return response.success(res, null, "Background berhasil dihapus");
    } catch (error) {
      return handleError(res, error);
    }
  },
};
