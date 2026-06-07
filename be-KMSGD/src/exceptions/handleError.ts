import { Response } from "express";
import { response } from "../utils/response";
import { ZodError } from "zod";

function handleError(res: Response, error: unknown) {
  if (error instanceof ZodError) {
    const err = error.issues.map((e) => ({ field: e.path.join("."), message: e.message }));
    response.failed(res, "Validasi gagal", err, 400);
  }
  if (error instanceof Error) {
    response.failed(res, error.message, error, 400);
  }
  response.failed(res, "Internal server error", error, 500);
}

export default handleError;