"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sambutanRepository = void 0;
const prisma_1 = require("../../config/prisma");
exports.sambutanRepository = {
    async findFirst() {
        return prisma_1.prisma.sambutan.findFirst({
            orderBy: { createdAt: "desc" },
        });
    },
    async create(data) {
        return prisma_1.prisma.sambutan.create({ data });
    },
    async update(id, data) {
        return prisma_1.prisma.sambutan.update({ where: { id }, data });
    },
    async delete(id) {
        return prisma_1.prisma.sambutan.delete({ where: { id } });
    },
};
