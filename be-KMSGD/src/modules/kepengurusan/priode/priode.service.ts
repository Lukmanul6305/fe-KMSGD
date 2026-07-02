import { priodeRepository } from "./priode.repository";
import { CreatePeriodeDto, UpdatePeriodeDto } from "./priode.validation";
import { prisma } from "../../../config/prisma";

export const priodeService = {
  async getAllPeriode() {
    return priodeRepository.findAllPeriode();
  },
  async getAllPeriodeSimple() {
    return priodeRepository.findAllPeriodeSimple();
  },

  async getPeriodeAktif() {
    const data = await priodeRepository.findPeriodeAktif();
    if (!data) throw new Error("Tidak ada periode aktif");
    return data;
  },

  async getPeriodeById(id: number) {
    const data = await priodeRepository.findPeriodeById(id);
    if (!data) throw new Error("Periode tidak ditemukan");
    return data;
  },

  async createPeriode(dto: CreatePeriodeDto) {
    if (dto.status === "AKTIF") {
      await prisma.periodeOrganisasi.updateMany({
        where: { status: "AKTIF" },
        data: { status: "DEMISIONER" },
      });
    }
    return priodeRepository.createPeriode(dto);
  },

  async updatePeriode(id: number, dto: UpdatePeriodeDto) {
    await priodeService.getPeriodeById(id);

    if (dto.status === "AKTIF") {
      await prisma.periodeOrganisasi.updateMany({
        where: { status: "AKTIF", NOT: { id } },
        data: { status: "DEMISIONER" },
      });
    }

    return priodeRepository.updatePeriode(id, dto);
  },

  async deletePeriode(id: number) {
    await priodeService.getPeriodeById(id);
    return priodeRepository.deletePeriode(id);
  },
};
