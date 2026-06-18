"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeBackgroundController = void 0;
const homeBackground_service_1 = require("./homeBackground.service");
const homeBackground_validation_1 = require("./homeBackground.validation");
const response_1 = require("../../utils/response");
const handleError_1 = __importDefault(require("../../exceptions/handleError"));
exports.homeBackgroundController = {
    async getAll(req, res) {
        try {
            const { page, limit } = homeBackground_validation_1.homeBackgroundQuerySchema.parse(req.query);
            const data = await homeBackground_service_1.homeBackgroundService.getAll(page, limit);
            return response_1.response.success(res, data, "Berhasil mengambil data background");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getActive(req, res) {
        try {
            const data = await homeBackground_service_1.homeBackgroundService.getActive();
            res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
            return response_1.response.success(res, data, "Berhasil mengambil background aktif");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async getById(req, res) {
        try {
            const { id } = homeBackground_validation_1.homeBackgroundIdSchema.parse(req.params);
            const data = await homeBackground_service_1.homeBackgroundService.getById(id);
            return response_1.response.success(res, data, "Berhasil mengambil detail background");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async create(req, res) {
        try {
            let bodyData = { ...req.body };
            // Multer sometimes sends boolean fields as strings if using FormData
            if (typeof bodyData.isActive === 'boolean') {
                bodyData.isActive = bodyData.isActive ? "true" : "false";
            }
            const dto = homeBackground_validation_1.createHomeBackgroundSchema.parse(bodyData);
            const fileBuffer = req.files?.image?.[0]?.buffer;
            const data = await homeBackground_service_1.homeBackgroundService.create(dto, fileBuffer);
            return response_1.response.success(res, data, "Background berhasil ditambahkan", 201);
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async update(req, res) {
        try {
            const { id } = homeBackground_validation_1.homeBackgroundIdSchema.parse(req.params);
            let bodyData = { ...req.body };
            if (typeof bodyData.isActive === 'boolean') {
                bodyData.isActive = bodyData.isActive ? "true" : "false";
            }
            const dto = homeBackground_validation_1.updateHomeBackgroundSchema.parse(bodyData);
            const fileBuffer = req.files?.image?.[0]?.buffer;
            const data = await homeBackground_service_1.homeBackgroundService.update(id, dto, fileBuffer);
            return response_1.response.success(res, data, "Background berhasil diupdate");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
    async delete(req, res) {
        try {
            const { id } = homeBackground_validation_1.homeBackgroundIdSchema.parse(req.params);
            await homeBackground_service_1.homeBackgroundService.delete(id);
            return response_1.response.success(res, null, "Background berhasil dihapus");
        }
        catch (error) {
            return (0, handleError_1.default)(res, error);
        }
    },
};
