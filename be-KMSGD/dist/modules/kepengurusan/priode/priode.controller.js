"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.priodeController = void 0;
const handleError_1 = __importDefault(require("../../../exceptions/handleError"));
const response_1 = require("../../../utils/response");
const priode_service_1 = require("./priode.service");
const priode_validation_1 = require("./priode.validation");
exports.priodeController = {
    async getAllPeriode(req, res) {
        try {
            const data = await priode_service_1.priodeService.getAllPeriode();
            return response_1.response.success(res, data, "Berhasil mengambil data periode");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getPeriodeAktif(req, res) {
        try {
            const data = await priode_service_1.priodeService.getPeriodeAktif();
            return response_1.response.success(res, data, "Berhasil mengambil periode aktif");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getPeriodeById(req, res) {
        try {
            const data = await priode_service_1.priodeService.getPeriodeById(Number(req.params.id));
            return response_1.response.success(res, data, "Berhasil mengambil detail periode");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async createPeriode(req, res) {
        try {
            const dto = priode_validation_1.createPeriodeSchema.parse(req.body);
            const data = await priode_service_1.priodeService.createPeriode(dto);
            return response_1.response.success(res, data, "Periode berhasil dibuat", 201);
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async updatePeriode(req, res) {
        try {
            const dto = priode_validation_1.updatePeriodeSchema.parse(req.body);
            const data = await priode_service_1.priodeService.updatePeriode(Number(req.params.id), dto);
            return response_1.response.success(res, data, "Periode berhasil diupdate");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async deletePeriode(req, res) {
        try {
            await priode_service_1.priodeService.deletePeriode(Number(req.params.id));
            return response_1.response.success(res, null, "Periode berhasil dihapus");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
};
