import { Request, Response } from "express";
import { sambutanService } from "./sambutan.service";
import { createSambutanSchema, updateSambutanSchema } from "./sambutan.validation";
import { response } from "../../utils/response";
import handleError from "../../exceptions/handleError";

export const sambutanController = {
  async get(req: Request, res: Response) {
    try {
      const data = await sambutanService.get();
      return response.success(res, data, "Berhasil mengambil data sambutan");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async create(req: Request, res: Response) {
    try {
      const dto = createSambutanSchema.parse(req.body);
      const file = req.file?.buffer;

      const data = await sambutanService.create(dto, file);
      return response.success(res, data, "Sambutan berhasil dibuat", 201);
    } catch (error) {
      return handleError(res, error);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const dto = updateSambutanSchema.parse(req.body);
      const file = req.file?.buffer;
      const data = await sambutanService.update(Number(req.params.id), dto, file);
      return response.success(res, data, "Sambutan berhasil diupdate");
    } catch (error) {
      return handleError(res, error);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await sambutanService.delete(Number(req.params.id));
      return response.success(res, null, "Sambutan berhasil dihapus");
    } catch (error) {
      return handleError(res, error);
    }
  },
};
