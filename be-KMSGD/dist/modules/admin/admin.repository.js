"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRepository = void 0;
const prisma_1 = require("../../config/prisma");
exports.adminRepository = {
    async findAll() {
        return prisma_1.prisma.admin.findMany({
            select: { id: true, username: true, createdAt: true, updatedAt: true },
        });
    },
    async findById(id) {
        return prisma_1.prisma.admin.findUnique({
            where: { id },
            select: { id: true, username: true, createdAt: true, updatedAt: true },
        });
    },
    async findByUsername(username) {
        return prisma_1.prisma.admin.findUnique({ where: { username } });
    },
    async create(data) {
        return prisma_1.prisma.admin.create({
            data,
            select: { id: true, username: true, createdAt: true },
        });
    },
    async update(id, data) {
        return prisma_1.prisma.admin.update({
            where: { id },
            data,
            select: { id: true, username: true, updatedAt: true },
        });
    },
    async delete(id) {
        return prisma_1.prisma.admin.delete({ where: { id } });
    },
};
