"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kategoriPengumumanController = void 0;
const kategoriPengumuman_service_1 = require("./kategoriPengumuman.service");
const kategoriPengumuman_validation_1 = require("./kategoriPengumuman.validation");
const response_1 = require("../../../utils/response");
const handleError_1 = __importDefault(require("../../../exceptions/handleError"));
exports.kategoriPengumumanController = {
    async getAll(req, res) {
        try {
            const data = await kategoriPengumuman_service_1.kategoriPengumumanService.getAll();
            return response_1.response.success(res, data, "Berhasil mengambil semua data kategori pengumuman");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getById(req, res) {
        try {
            const data = await kategoriPengumuman_service_1.kategoriPengumumanService.getById(Number(req.params.id));
            return response_1.response.success(res, data, "Berhasil mengambil detail kategori pengumuman");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async create(req, res) {
        try {
            const dto = kategoriPengumuman_validation_1.createKategoriSchema.parse(req.body);
            const data = await kategoriPengumuman_service_1.kategoriPengumumanService.create(dto);
            return response_1.response.success(res, data, "Kategori pengumuman berhasil dibuat", 201);
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async update(req, res) {
        try {
            const dto = kategoriPengumuman_validation_1.updateKategoriSchema.parse(req.body);
            const data = await kategoriPengumuman_service_1.kategoriPengumumanService.update(Number(req.params.id), dto);
            return response_1.response.success(res, data, "Kategori pengumuman berhasil diupdate");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async delete(req, res) {
        try {
            await kategoriPengumuman_service_1.kategoriPengumumanService.delete(Number(req.params.id));
            return response_1.response.success(res, null, "Kategori pengumuman berhasil dihapus");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
};
