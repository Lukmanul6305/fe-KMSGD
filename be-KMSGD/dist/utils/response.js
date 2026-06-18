"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
exports.response = {
    success(res, data, message = "Berhasil", statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    },
    failed(res, message = "Terjadi kesalahan", errors, statusCode = 400) {
        return res.status(statusCode).json({
            success: false,
            message,
            ...(errors ? { errors } : {}),
        });
    },
};
