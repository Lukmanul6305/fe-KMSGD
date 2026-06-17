import { prisma } from "../../../config/prisma";
import { deleteImage, uploadImage } from "../../../utils/uploadImage";
import { kepengurusanRepository } from "./pengurus.repository";
import { CreateAnggotaDto, CreatePengurusIntiDto, UpdateAnggotaDto, UpdatePengurusIntiDto } from "./pengurus.validation";

export const kepengurusanService = {
  // Pengurus Inti
  async getPengurusIntiByPeriode(periodeId: number) {
    return kepengurusanRepository.findPengurusIntiByPeriode(periodeId);
  },

  async createPengurusInti(dto: CreatePengurusIntiDto, imageBuffer?: Buffer) {
    let image: string | undefined;
    if (imageBuffer) image = await uploadImage(imageBuffer, "kepengurusan/inti");

    return kepengurusanRepository.createPengurusInti({
      ...dto,
      ...(image && { image }),
    });
  },

  async updatePengurusInti(id: number, dto: UpdatePengurusIntiDto, imageBuffer?: Buffer) {
    const existing = await kepengurusanRepository.findPengurusIntiById(id);
    if (!existing) throw new Error("Pengurus inti tidak ditemukan");

    let image = existing.image;
    if (imageBuffer) {
      if (existing.image) await deleteImage(existing.image);
      image = await uploadImage(imageBuffer, "kepengurusan/inti");
    }

    return kepengurusanRepository.updatePengurusInti(id, {
      ...dto,
      ...(image && { image }),
    });
  },

  async deletePengurusInti(id: number) {
    const existing = await kepengurusanRepository.findPengurusIntiById(id);
    if (!existing) throw new Error("Pengurus inti tidak ditemukan");
    if (existing.image) await deleteImage(existing.image);
    return kepengurusanRepository.deletePengurusInti(id);
  },

  // Anggota
  async createAnggota(dto: CreateAnggotaDto, imageBuffer?: Buffer) {
    let image: string | undefined;
    if (imageBuffer) image = await uploadImage(imageBuffer, "kepengurusan/anggota");

    return kepengurusanRepository.createAnggota({
      ...dto,
      ...(image && { image }),
    });
  },

  async updateAnggota(id: number, dto: UpdateAnggotaDto, imageBuffer?: Buffer) {
    const existing = await kepengurusanRepository.findAnggotaById(id);
    if (!existing) throw new Error("Anggota tidak ditemukan");

    let image = existing.image;
    if (imageBuffer) {
      if (existing.image) await deleteImage(existing.image);
      image = await uploadImage(imageBuffer, "kepengurusan/anggota");
    }

    return kepengurusanRepository.updateAnggota(id, {
      ...dto,
      ...(image && { image }),
    });
  },

  async deleteAnggota(id: number) {
    const existing = await kepengurusanRepository.findAnggotaById(id);
    if (!existing) throw new Error("Anggota tidak ditemukan");
    if (existing.image) await deleteImage(existing.image);
    return kepengurusanRepository.deleteAnggota(id);
  },
  async getAnggotaByDepartemen(departemenId?: number) {
    return prisma.anggotaDepartemen.findMany({
      where: departemenId ? { departemenId } : undefined,
      include: { departemen: { select: { namaDepartemen: true } } },
      orderBy: { createdAt: "asc" },
    });
  },
};
