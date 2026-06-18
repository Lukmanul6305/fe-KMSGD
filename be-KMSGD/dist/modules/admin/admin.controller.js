"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const response_1 = require("../../utils/response");
const admin_service_1 = require("./admin.service");
const admin_validation_1 = require("./admin.validation");
const handleError_1 = __importDefault(require("../../exceptions/handleError"));
exports.adminController = {
    async getAll(req, res) {
        try {
            const data = await admin_service_1.adminService.getAll();
            response_1.response.success(res, data, "Berhasil mengambil data admin");
        }
        catch (error) {
            (0, handleError_1.default)(res, error);
        }
    },
    async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const data = await admin_service_1.adminService.getById(id);
            response_1.response.success(res, data, "Berhasil mengambil data admin");
        }
        catch (error) {
            (0, handleError_1.default)(res, error);
        }
    },
    async create(req, res) {
        try {
            const dto = admin_validation_1.createAdminSchema.parse(req.body);
            const data = await admin_service_1.adminService.create(dto);
            response_1.response.success(res, data, "Admin berhasil dibuat", 201);
        }
        catch (error) {
            (0, handleError_1.default)(res, error);
        }
    },
    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const dto = admin_validation_1.updateAdminSchema.parse(req.body);
            const data = await admin_service_1.adminService.update(id, dto);
            response_1.response.success(res, data, "Admin berhasil diupdate");
        }
        catch (error) {
            (0, handleError_1.default)(res, error);
        }
    },
    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            await admin_service_1.adminService.delete(id);
            response_1.response.success(res, null, "Admin berhasil dihapus");
        }
        catch (error) {
            (0, handleError_1.default)(res, error);
        }
    },
};
