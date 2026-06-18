"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sambutanController = void 0;
const sambutan_service_1 = require("./sambutan.service");
const sambutan_validation_1 = require("./sambutan.validation");
const response_1 = require("../../utils/response");
const handleError_1 = __importDefault(require("../../exceptions/handleError"));
exports.sambutanController = {
    async get(req, res) {
        try {
            const data = await sambutan_service_1.sambutanService.get();
            return response_1.response.success(res, data, "Berhasil mengambil data sambutan");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async create(req, res) {
        try {
            const dto = sambutan_validation_1.createSambutanSchema.parse(req.body);
            const file = req.file?.buffer;
            const data = await sambutan_service_1.sambutanService.create(dto, file);
            return response_1.response.success(res, data, "Sambutan berhasil dibuat", 201);
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async update(req, res) {
        try {
            const dto = sambutan_validation_1.updateSambutanSchema.parse(req.body);
            const file = req.file?.buffer;
            const data = await sambutan_service_1.sambutanService.update(Number(req.params.id), dto, file);
            return response_1.response.success(res, data, "Sambutan berhasil diupdate");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async delete(req, res) {
        try {
            await sambutan_service_1.sambutanService.delete(Number(req.params.id));
            return response_1.response.success(res, null, "Sambutan berhasil dihapus");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
};
