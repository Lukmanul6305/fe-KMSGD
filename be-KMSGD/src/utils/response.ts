import { Response } from "express";

export const response = {
  success(res: Response, data: unknown, message = "Berhasil", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  failed(res: Response, message = "Terjadi kesalahan", errors?: unknown, statusCode = 400) {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(errors ? { errors } : {}),
    });
  },
};
