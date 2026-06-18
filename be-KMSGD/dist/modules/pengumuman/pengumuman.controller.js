"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pengumumanController = void 0;
const pengumuman_service_1 = require("./pengumuman.service");
const pengumuman_validation_1 = require("./pengumuman.validation");
const response_1 = require("../../utils/response");
const handleError_1 = __importDefault(require("../../exceptions/handleError"));
exports.pengumumanController = {
    async getAll(req, res) {
        try {
            const data = await pengumuman_service_1.pengumumanService.getAll();
            return response_1.response.success(res, data, "Berhasil mengambil data pengumuman");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getPenting(req, res) {
        try {
            const data = await pengumuman_service_1.pengumumanService.getPenting();
            return response_1.response.success(res, data, "Berhasil mengambil pengumuman penting");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getById(req, res) {
        try {
            const data = await pengumuman_service_1.pengumumanService.getById(Number(req.params.id));
            return response_1.response.success(res, data, "Berhasil mengambil detail pengumuman");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async create(req, res) {
        try {
            const dto = pengumuman_validation_1.createPengumumanSchema.parse(req.body);
            const data = await pengumuman_service_1.pengumumanService.create(dto, req.file?.buffer);
            return response_1.response.success(res, data, "Pengumuman berhasil dibuat", 201);
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async update(req, res) {
        try {
            const dto = pengumuman_validation_1.updatePengumumanSchema.parse(req.body);
            const data = await pengumuman_service_1.pengumumanService.update(Number(req.params.id), dto, req.file?.buffer);
            return response_1.response.success(res, data, "Pengumuman berhasil diupdate");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async delete(req, res) {
        try {
            await pengumuman_service_1.pengumumanService.delete(Number(req.params.id));
            return response_1.response.success(res, null, "Pengumuman berhasil dihapus");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
};
