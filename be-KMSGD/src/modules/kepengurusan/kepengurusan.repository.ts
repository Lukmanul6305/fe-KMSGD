import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";

const periodeInclude = {
  pengurusInti: { orderBy: { urutan: "asc" as const } },
  departemen: {
    orderBy: { urutan: "asc" as const },
    include: { anggota: { orderBy: { urutan: "asc" as const } } },
  },
};

export const kepengurusanRepository = {
  // Periode
  async findAllPeriode() {
    return prisma.periodeOrganisasi.findMany({
      orderBy: { createdAt: "desc" },
      include: periodeInclude,
    });
  },

  async findPeriodeAktif() {
    return prisma.periodeOrganisasi.findFirst({
      where: { status: "AKTIF" },
      include: periodeInclude,
    });
  },

  async findPeriodeById(id: number) {
    return prisma.periodeOrganisasi.findUnique({
      where: { id },
      include: periodeInclude,
    });
  },

  async createPeriode(data: Prisma.PeriodeOrganisasiCreateInput) {
    return prisma.periodeOrganisasi.create({ data });
  },

  async updatePeriode(id: number, data: Prisma.PeriodeOrganisasiUpdateInput) {
    return prisma.periodeOrganisasi.update({ where: { id }, data });
  },

  async deletePeriode(id: number) {
    return prisma.periodeOrganisasi.delete({ where: { id } });
  },

  // Pengurus Inti
  async findPengurusIntiById(id: number) {
    return prisma.pengurusInti.findUnique({ where: { id } });
  },

  async createPengurusInti(data: Prisma.PengurusIntiCreateInput) {
    return prisma.pengurusInti.create({ data });
  },

  async updatePengurusInti(id: number, data: Prisma.PengurusIntiUpdateInput) {
    return prisma.pengurusInti.update({ where: { id }, data });
  },

  async deletePengurusInti(id: number) {
    return prisma.pengurusInti.delete({ where: { id } });
  },

  // Departemen
  async findDepartemenById(id: number) {
    return prisma.departemen.findUnique({
      where: { id },
      include: { anggota: { orderBy: { urutan: "asc" } } },
    });
  },

  async createDepartemen(data: Prisma.DepartemenCreateInput) {
    return prisma.departemen.create({ data });
  },

  async updateDepartemen(id: number, data: Prisma.DepartemenUpdateInput) {
    return prisma.departemen.update({ where: { id }, data });
  },

  async deleteDepartemen(id: number) {
    return prisma.departemen.delete({ where: { id } });
  },

  // Anggota Departemen
  async findAnggotaById(id: number) {
    return prisma.anggotaDepartemen.findUnique({ where: { id } });
  },

  async createAnggota(data: Prisma.AnggotaDepartemenCreateInput) {
    return prisma.anggotaDepartemen.create({ data });
  },

  async updateAnggota(id: number, data: Prisma.AnggotaDepartemenUpdateInput) {
    return prisma.anggotaDepartemen.update({ where: { id }, data });
  },

  async deleteAnggota(id: number) {
    return prisma.anggotaDepartemen.delete({ where: { id } });
  },
};
