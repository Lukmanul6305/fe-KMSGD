import { prisma } from "../../../config/prisma";
import { Prisma } from "@prisma/client";

export const kepengurusanRepository = {
  async findAllDepartemen() {
    return prisma.departemen.findMany({
      include: { anggota: { orderBy: { id: "asc" } } },
      orderBy: { id: "asc" },
    });
  },

  async findDepartemenById(id: number) {
    return prisma.departemen.findUnique({
      where: { id },
      include: { anggota: { orderBy: { id: "asc" } } },
    });
  },

  async findDepartemenByPeriode(periodeId: number) {
    return prisma.departemen.findMany({
      where: { periodeId },
      include: { anggota: { orderBy: { id: "asc" } } },
      orderBy: { id: "asc" },
    });
  },

  async createDepartemen(data: Prisma.DepartemenUncheckedCreateInput) {
    return prisma.departemen.create({ data });
  },

  async updateDepartemen(id: number, data: Prisma.DepartemenUncheckedUpdateInput) {
    return prisma.departemen.update({ where: { id }, data });
  },

  async deleteDepartemen(id: number) {
    return prisma.departemen.delete({ where: { id } });
  },
};
