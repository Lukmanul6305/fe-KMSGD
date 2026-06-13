import { kepengurusanRepository } from "./departemen.repository";
import { CreateDepartemenDto, UpdateDepartemenDto } from "./departemen.validation";
import { prisma } from "../../../config/prisma";

export const kepengurusanService = {
  async getAllDepartemen() {
    return kepengurusanRepository.findAllDepartemen();
  },

  async getDepartemenByPeriode(periodeId: number) {
    return kepengurusanRepository.findDepartemenByPeriode(periodeId);
  },

  async getDepartemenAktif() {
    const periodeAktif = await prisma.periodeOrganisasi.findFirst({
      where: { status: "AKTIF" },
    });
    if (!periodeAktif) throw new Error("Tidak ada periode aktif");
    return kepengurusanRepository.findDepartemenByPeriode(periodeAktif.id);
  },

  async createDepartemen(dto: CreateDepartemenDto) {
    return kepengurusanRepository.createDepartemen({
      ...dto,
    });
  },

  async updateDepartemen(id: number, dto: UpdateDepartemenDto) {
    const existing = await kepengurusanRepository.findDepartemenById(id);
    if (!existing) throw new Error("Departemen tidak ditemukan");
    return kepengurusanRepository.updateDepartemen(id, {
      ...dto,
    });
  },

  async deleteDepartemen(id: number) {
    const existing = await kepengurusanRepository.findDepartemenById(id);
    if (!existing) throw new Error("Departemen tidak ditemukan");
    return kepengurusanRepository.deleteDepartemen(id);
  },
};
