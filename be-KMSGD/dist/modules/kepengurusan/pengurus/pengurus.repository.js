"use strict";
// import { prisma } from "../../../config/prisma";
// import { Prisma } from "@prisma/client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kepengurusanRepository = void 0;
// export const kepengurusanRepository = {
//   // Pengurus Inti
//   async findPengurusIntiById(id: number) {
//     return prisma.pengurusInti.findUnique({ where: { id } });
//   },
//   async createPengurusInti(data: Prisma.PengurusIntiCreateInput) {
//     return prisma.pengurusInti.create({ data });
//   },
//   async updatePengurusInti(id: number, data: Prisma.PengurusIntiUpdateInput) {
//     return prisma.pengurusInti.update({ where: { id }, data });
//   },
//   async deletePengurusInti(id: number) {
//     return prisma.pengurusInti.delete({ where: { id } });
//   },
//   // Anggota Departemen
//   async findAnggotaById(id: number) {
//     return prisma.anggotaDepartemen.findUnique({ where: { id } });
//   },
//   async createAnggota(data: Prisma.AnggotaDepartemenCreateInput) {
//     return prisma.anggotaDepartemen.create({ data });
//   },
//   async updateAnggota(id: number, data: Prisma.AnggotaDepartemenUpdateInput) {
//     return prisma.anggotaDepartemen.update({ where: { id }, data });
//   },
//   async deleteAnggota(id: number) {
//     return prisma.anggotaDepartemen.delete({ where: { id } });
//   },
// };
const prisma_1 = require("../../../config/prisma");
exports.kepengurusanRepository = {
    // Pengurus Inti
    async findPengurusIntiById(id) {
        return prisma_1.prisma.pengurusInti.findUnique({ where: { id } });
    },
    async findPengurusIntiByPeriode(periodeId) {
        return prisma_1.prisma.pengurusInti.findMany({
            where: { periodeId },
            orderBy: { id: "asc" }
        });
    },
    // Menggunakan Unchecked agar bisa menerima periodeId secara langsung
    async createPengurusInti(data) {
        return prisma_1.prisma.pengurusInti.create({ data });
    },
    // Menggunakan Unchecked agar bisa mengubah periodeId secara langsung
    async updatePengurusInti(id, data) {
        return prisma_1.prisma.pengurusInti.update({ where: { id }, data });
    },
    async deletePengurusInti(id) {
        return prisma_1.prisma.pengurusInti.delete({ where: { id } });
    },
    // Anggota Departemen
    async findAnggotaById(id) {
        return prisma_1.prisma.anggotaDepartemen.findUnique({ where: { id } });
    },
    // Menggunakan Unchecked agar bisa menerima departemenId secara langsung
    async createAnggota(data) {
        return prisma_1.prisma.anggotaDepartemen.create({ data });
    },
    // Menggunakan Unchecked agar bisa mengubah departemenId secara langsung
    async updateAnggota(id, data) {
        return prisma_1.prisma.anggotaDepartemen.update({ where: { id }, data });
    },
    async deleteAnggota(id) {
        return prisma_1.prisma.anggotaDepartemen.delete({ where: { id } });
    },
};
