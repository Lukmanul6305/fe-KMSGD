import { prisma } from "../../../config/prisma";
import { Prisma } from "@prisma/client";

export const kepengurusanRepository = {
  // Pengurus Inti
  async findPengurusIntiById(id: number) {
    return prisma.pengurusInti.findUnique({ where: { id } });
  },

  async findPengurusIntiByPeriode(periodeId: number) {
    return prisma.pengurusInti.findMany({
      where: { periodeId },
      orderBy: { id: "asc" }
    });
  },

  // Menggunakan Unchecked agar bisa menerima periodeId secara langsung
  async createPengurusInti(data: Prisma.PengurusIntiUncheckedCreateInput) {
    return prisma.pengurusInti.create({ data });
  },

  // Menggunakan Unchecked agar bisa mengubah periodeId secara langsung
  async updatePengurusInti(id: number, data: Prisma.PengurusIntiUncheckedUpdateInput) {
    return prisma.pengurusInti.update({ where: { id }, data });
  },

  async deletePengurusInti(id: number) {
    return prisma.pengurusInti.delete({ where: { id } });
  },

  // Anggota Departemen
  async findAnggotaById(id: number) {
    return prisma.anggotaDepartemen.findUnique({ where: { id } });
  },

  // Menggunakan Unchecked agar bisa menerima departemenId secara langsung
  async createAnggota(data: Prisma.AnggotaDepartemenUncheckedCreateInput) {
    return prisma.anggotaDepartemen.create({ data });
  },

  // Menggunakan Unchecked agar bisa mengubah departemenId secara langsung
  async updateAnggota(id: number, data: Prisma.AnggotaDepartemenUncheckedUpdateInput) {
    return prisma.anggotaDepartemen.update({ where: { id }, data });
  },

  async deleteAnggota(id: number) {
    return prisma.anggotaDepartemen.delete({ where: { id } });
  },
};
