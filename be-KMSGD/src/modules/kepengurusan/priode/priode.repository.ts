import { prisma } from "../../../config/prisma";
import { Prisma } from "@prisma/client";

const periodeInclude = {
  pengurusInti: { orderBy: { id: "asc" as const } },
  departemen: {
    orderBy: { id: "asc" as const },
    include: { anggota: { orderBy: { id: "asc" as const } } },
  },
};

export const priodeRepository = {
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
};
