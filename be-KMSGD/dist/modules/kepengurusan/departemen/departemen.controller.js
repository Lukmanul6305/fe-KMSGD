"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kepengurusanController = void 0;
const departemen_service_1 = require("./departemen.service");
const departemen_validation_1 = require("./departemen.validation");
const response_1 = require("../../../utils/response");
const handleError_1 = __importDefault(require("../../../exceptions/handleError"));
exports.kepengurusanController = {
    async getAllDepartemen(req, res) {
        try {
            const data = await departemen_service_1.kepengurusanService.getAllDepartemen();
            return response_1.response.success(res, data, "Berhasil mengambil semua data departemen");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getDepartemenByPeriode(req, res) {
        try {
            const periodeId = req.query.periodeId ? Number(req.query.periodeId) : undefined;
            if (periodeId !== undefined && isNaN(periodeId)) {
                return response_1.response.failed(res, "periodeId harus berupa angka", 400);
            }
            const data = periodeId
                ? await departemen_service_1.kepengurusanService.getDepartemenByPeriode(periodeId)
                : await departemen_service_1.kepengurusanService.getAllDepartemen();
            return response_1.response.success(res, data, "Berhasil mengambil data departemen");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getDepartemenAktif(req, res) {
        try {
            const data = await departemen_service_1.kepengurusanService.getDepartemenAktif();
            return response_1.response.success(res, data, "Berhasil mengambil departemen periode aktif");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async createDepartemen(req, res) {
        try {
            const dto = departemen_validation_1.createDepartemenSchema.parse(req.body);
            const data = await departemen_service_1.kepengurusanService.createDepartemen(dto);
            return response_1.response.success(res, data, "Departemen berhasil dibuat", 201);
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async updateDepartemen(req, res) {
        try {
            const dto = departemen_validation_1.updateDepartemenSchema.parse(req.body);
            const data = await departemen_service_1.kepengurusanService.updateDepartemen(Number(req.params.id), dto);
            return response_1.response.success(res, data, "Departemen berhasil diupdate");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async deleteDepartemen(req, res) {
        try {
            await departemen_service_1.kepengurusanService.deleteDepartemen(Number(req.params.id));
            return response_1.response.success(res, null, "Departemen berhasil dihapus");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
};
