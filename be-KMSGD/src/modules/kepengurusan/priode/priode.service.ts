import { priodeRepository } from "./priode.repository";
import { CreatePeriodeDto, UpdatePeriodeDto } from "./priode.validation";
import { prisma } from "../../../config/prisma";

export const priodeService = {
  async getAllPeriode() {
    return priodeRepository.findAllPeriode();
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
    // Validasi: hanya boleh 1 periode AKTIF
    if (dto.status === "AKTIF") {
      const existing = await prisma.periodeOrganisasi.findFirst({
        where: { status: "AKTIF" },
      });
      if (existing) {
        throw new Error(
          `Sudah ada periode aktif: "${existing.periode}". Ubah status periode tersebut ke DEMISIONER terlebih dahulu sebelum membuat periode aktif baru.`
        );
      }
    }
    return priodeRepository.createPeriode(dto);
  },

  async updatePeriode(id: number, dto: UpdatePeriodeDto) {
    await priodeService.getPeriodeById(id);

    // Validasi: jika mengubah status ke AKTIF, pastikan tidak ada periode aktif lain
    if (dto.status === "AKTIF") {
      const existingAktif = await prisma.periodeOrganisasi.findFirst({
        where: { status: "AKTIF", NOT: { id } },
      });
      if (existingAktif) {
        throw new Error(
          `Sudah ada periode aktif: "${existingAktif.periode}". Ubah status periode tersebut ke DEMISIONER terlebih dahulu.`
        );
      }
    }

    return priodeRepository.updatePeriode(id, dto);
  },

  async deletePeriode(id: number) {
    await priodeService.getPeriodeById(id);
    return priodeRepository.deletePeriode(id);
  },
};
