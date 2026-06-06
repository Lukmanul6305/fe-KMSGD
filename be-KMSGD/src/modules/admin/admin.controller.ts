import { Request, Response } from "express";
import { response } from "../../utils/response";
import { adminService } from "./admin.service";
import { createAdminSchema, updateAdminSchema } from "./admin.validation";
import handleError from "../../exceptions/handleError";

export const adminController = {
  async getAll(req: Request, res: Response) {
    try {
      const data = await adminService.getAll();
      response.success(res, data, "Berhasil mengambil data admin");
    } catch (error) {
      handleError(res, error);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await adminService.getById(id);
      response.success(res, data, "Berhasil mengambil data admin");
    } catch (error) {
      handleError(res, error);
    }
  },

  async create(req: Request, res: Response) {
    try {
      const dto = createAdminSchema.parse(req.body);
      const data = await adminService.create(dto);
      response.success(res, data, "Admin berhasil dibuat", 201);
    } catch (error) {
      handleError(res, error);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const dto = updateAdminSchema.parse(req.body);
      const data = await adminService.update(id, dto);
      response.success(res, data, "Admin berhasil diupdate");
    } catch (error) {
      handleError(res, error);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await adminService.delete(id);
      response.success(res, null, "Admin berhasil dihapus");
    } catch (error) {
      handleError(res, error);
    }
  },
};
