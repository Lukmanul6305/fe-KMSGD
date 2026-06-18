"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.galeriController = void 0;
const galeri_service_1 = require("./galeri.service");
const galeri_validation_1 = require("./galeri.validation");
const response_1 = require("../../utils/response");
const handleError_1 = __importDefault(require("../../exceptions/handleError"));
exports.galeriController = {
    async getAll(req, res) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 12;
            const data = await galeri_service_1.galeriService.getAll(page, limit);
            return response_1.response.success(res, data, "Berhasil mengambil data galeri");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getByTipe(req, res) {
        try {
            const tipe = req.params.tipe.toUpperCase();
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 12;
            const data = await galeri_service_1.galeriService.getByTipe(tipe, page, limit);
            return response_1.response.success(res, data, `Berhasil mengambil galeri ${tipe}`);
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getByKegiatan(req, res) {
        try {
            const data = await galeri_service_1.galeriService.getByKegiatan(Number(req.params.kegiatanId));
            return response_1.response.success(res, data, "Berhasil mengambil galeri kegiatan");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getById(req, res) {
        try {
            const data = await galeri_service_1.galeriService.getById(Number(req.params.id));
            return response_1.response.success(res, data, "Berhasil mengambil detail galeri");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async create(req, res) {
        try {
            const dto = galeri_validation_1.createGaleriSchema.parse(req.body);
            const files = {
                image: req.files?.image?.[0]?.buffer,
                thumbnail: req.files?.thumbnail?.[0]?.buffer,
            };
            const data = await galeri_service_1.galeriService.create(dto, files);
            return response_1.response.success(res, data, "Galeri berhasil dibuat", 201);
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async update(req, res) {
        try {
            const dto = galeri_validation_1.updateGaleriSchema.parse(req.body);
            const files = {
                image: req.files?.image?.[0]?.buffer,
                thumbnail: req.files?.thumbnail?.[0]?.buffer,
            };
            const data = await galeri_service_1.galeriService.update(Number(req.params.id), dto, files);
            return response_1.response.success(res, data, "Galeri berhasil diupdate");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async delete(req, res) {
        try {
            await galeri_service_1.galeriService.delete(Number(req.params.id));
            return response_1.response.success(res, null, "Galeri berhasil dihapus");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
};
