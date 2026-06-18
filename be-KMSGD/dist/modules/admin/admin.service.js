"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_repository_1 = require("./admin.repository");
const SALT_ROUNDS = 10;
exports.adminService = {
    async getAll() {
        return admin_repository_1.adminRepository.findAll();
    },
    async getById(id) {
        const admin = await admin_repository_1.adminRepository.findById(id);
        if (!admin)
            throw new Error("Admin tidak ditemukan");
        return admin;
    },
    async create(dto) {
        const existing = await admin_repository_1.adminRepository.findByUsername(dto.username);
        if (existing)
            throw new Error("Username sudah digunakan");
        const hashedPassword = await bcrypt_1.default.hash(dto.password, SALT_ROUNDS);
        return admin_repository_1.adminRepository.create({ username: dto.username, password: hashedPassword });
    },
    async update(id, dto) {
        await exports.adminService.getById(id);
        if (dto.username) {
            const existing = await admin_repository_1.adminRepository.findByUsername(dto.username);
            if (existing && existing.id !== id)
                throw new Error("Username sudah digunakan");
        }
        const data = {};
        if (dto.username)
            data.username = dto.username;
        if (dto.password)
            data.password = await bcrypt_1.default.hash(dto.password, SALT_ROUNDS);
        return admin_repository_1.adminRepository.update(id, data);
    },
    async delete(id) {
        await exports.adminService.getById(id); // pastikan admin ada
        await admin_repository_1.adminRepository.delete(id);
    },
};
