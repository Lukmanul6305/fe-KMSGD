"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kegiatanController = void 0;
const kegiatan_service_1 = require("./kegiatan.service");
const kegiatan_validation_1 = require("./kegiatan.validation");
const response_1 = require("../../utils/response");
const handleError_1 = __importDefault(require("../../exceptions/handleError"));
exports.kegiatanController = {
    async getAll(req, res) {
        try {
            const data = await kegiatan_service_1.kegiatanService.getAll();
            return response_1.response.success(res, data, "Berhasil mengambil data kegiatan");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    // Untuk admin — tampilkan semua termasuk draft
    async getAllAdmin(req, res) {
        try {
            const data = await kegiatan_service_1.kegiatanService.getAllAdmin();
            return response_1.response.success(res, data, "Berhasil mengambil data kegiatan (admin)");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getAllCategories(req, res) {
        try {
            const data = await kegiatan_service_1.kegiatanService.getAllCategories();
            return response_1.response.success(res, data, "Berhasil mengambil kategori");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getByCategory(req, res) {
        try {
            const data = await kegiatan_service_1.kegiatanService.getByCategory(Number(req.params.category));
            return response_1.response.success(res, data, "Berhasil mengambil kegiatan by kategori");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getByDepartemen(req, res) {
        try {
            const data = await kegiatan_service_1.kegiatanService.getByDepartemen(Number(req.params.departemenId));
            return response_1.response.success(res, data, "Berhasil mengambil kegiatan by departemen");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getById(req, res) {
        try {
            const data = await kegiatan_service_1.kegiatanService.getById(Number(req.params.id));
            return response_1.response.success(res, data, "Berhasil mengambil detail kegiatan");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async create(req, res) {
        try {
            const dto = kegiatan_validation_1.createKegiatanSchema.parse(req.body);
            const imageBuffer = req.file?.buffer;
            const data = await kegiatan_service_1.kegiatanService.create(dto, imageBuffer);
            return response_1.response.success(res, data, "Kegiatan berhasil dibuat", 201);
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async update(req, res) {
        try {
            const dto = kegiatan_validation_1.updateKegiatanSchema.parse(req.body);
            const imageBuffer = req.file?.buffer;
            const data = await kegiatan_service_1.kegiatanService.update(Number(req.params.id), dto, imageBuffer);
            return response_1.response.success(res, data, "Kegiatan berhasil diupdate");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async delete(req, res) {
        try {
            await kegiatan_service_1.kegiatanService.delete(Number(req.params.id));
            return response_1.response.success(res, null, "Kegiatan berhasil dihapus");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
};
