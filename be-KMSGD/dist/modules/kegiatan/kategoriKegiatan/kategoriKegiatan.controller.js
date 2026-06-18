"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kategoriKegiatanController = void 0;
const kategoriKegiatan_service_1 = require("./kategoriKegiatan.service");
const kategoriKegiatan_validation_1 = require("./kategoriKegiatan.validation");
const response_1 = require("../../../utils/response");
const handleError_1 = __importDefault(require("../../../exceptions/handleError"));
exports.kategoriKegiatanController = {
    async getAll(req, res) {
        try {
            const data = await kategoriKegiatan_service_1.kategoriKegiatanService.getAll();
            return response_1.response.success(res, data, "Berhasil mengambil semua data kategori kegiatan");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getById(req, res) {
        try {
            const data = await kategoriKegiatan_service_1.kategoriKegiatanService.getById(Number(req.params.id));
            return response_1.response.success(res, data, "Berhasil mengambil detail kategori kegiatan");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async create(req, res) {
        try {
            const dto = kategoriKegiatan_validation_1.createKategoriSchema.parse(req.body);
            const data = await kategoriKegiatan_service_1.kategoriKegiatanService.create(dto);
            return response_1.response.success(res, data, "Kategori kegiatan berhasil dibuat", 201);
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async update(req, res) {
        try {
            const dto = kategoriKegiatan_validation_1.updateKategoriSchema.parse(req.body);
            const data = await kategoriKegiatan_service_1.kategoriKegiatanService.update(Number(req.params.id), dto);
            return response_1.response.success(res, data, "Kategori kegiatan berhasil diupdate");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async delete(req, res) {
        try {
            await kategoriKegiatan_service_1.kategoriKegiatanService.delete(Number(req.params.id));
            return response_1.response.success(res, null, "Kategori kegiatan berhasil dihapus");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
};
