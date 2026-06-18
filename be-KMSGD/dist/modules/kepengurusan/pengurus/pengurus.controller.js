"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pengurusController = void 0;
const pengurus_service_1 = require("./pengurus.service");
const pengurus_validation_1 = require("./pengurus.validation");
const response_1 = require("../../../utils/response");
const handleError_1 = __importDefault(require("../../../exceptions/handleError"));
exports.pengurusController = {
    //pengurus inti
    async getPengurusIntiByPeriode(req, res) {
        try {
            const periodeId = Number(req.query.periodeId);
            if (!periodeId) {
                return response_1.response.failed(res, "periodeId is required", 400);
            }
            const data = await pengurus_service_1.kepengurusanService.getPengurusIntiByPeriode(periodeId);
            return response_1.response.success(res, data, "Berhasil mengambil data pengurus inti");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async createPengurusInti(req, res) {
        try {
            const dto = pengurus_validation_1.createPengurusIntiSchema.parse(req.body);
            const data = await pengurus_service_1.kepengurusanService.createPengurusInti(dto, req.file?.buffer);
            return response_1.response.success(res, data, "Pengurus inti berhasil dibuat", 201);
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async updatePengurusInti(req, res) {
        try {
            const dto = pengurus_validation_1.updatePengurusIntiSchema.parse(req.body);
            const data = await pengurus_service_1.kepengurusanService.updatePengurusInti(Number(req.params.id), dto, req.file?.buffer);
            return response_1.response.success(res, data, "Pengurus inti berhasil diupdate");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async deletePengurusInti(req, res) {
        try {
            await pengurus_service_1.kepengurusanService.deletePengurusInti(Number(req.params.id));
            return response_1.response.success(res, null, "Pengurus inti berhasil dihapus");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    // Anggota
    async createAnggota(req, res) {
        try {
            const dto = pengurus_validation_1.createAnggotaSchema.parse(req.body);
            const data = await pengurus_service_1.kepengurusanService.createAnggota(dto, req.file?.buffer);
            return response_1.response.success(res, data, "Anggota berhasil dibuat", 201);
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async updateAnggota(req, res) {
        try {
            const dto = pengurus_validation_1.updateAnggotaSchema.parse(req.body);
            const data = await pengurus_service_1.kepengurusanService.updateAnggota(Number(req.params.id), dto, req.file?.buffer);
            return response_1.response.success(res, data, "Anggota berhasil diupdate");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async deleteAnggota(req, res) {
        try {
            await pengurus_service_1.kepengurusanService.deleteAnggota(Number(req.params.id));
            return response_1.response.success(res, null, "Anggota berhasil dihapus");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getAnggotaByDepartemen(req, res) {
        try {
            const departemenId = req.query.departemenId ? Number(req.query.departemenId) : undefined;
            const data = await pengurus_service_1.kepengurusanService.getAnggotaByDepartemen(departemenId);
            return response_1.response.success(res, data, "Berhasil mengambil data anggota");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    }
};
