"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../utils/response");
const zod_1 = require("zod");
function handleError(res, error) {
    if (error instanceof zod_1.ZodError) {
        const err = error.issues.map((e) => ({ field: e.path.join("."), message: e.message }));
        return response_1.response.failed(res, "Validasi gagal", err, 400);
    }
    if (error instanceof Error) {
        return response_1.response.failed(res, error.message, error, 400);
    }
    return response_1.response.failed(res, "Internal server error", error, 500);
}
exports.default = handleError;
