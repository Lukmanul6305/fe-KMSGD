import { kepengurusanRepository } from "./kepengurusan.repository";
import { uploadImage, deleteImage } from "../../utils/uploadImage";
import { CreatePeriodeDto, UpdatePeriodeDto, CreatePengurusIntiDto, UpdatePengurusIntiDto, CreateDepartemenDto, UpdateDepartemenDto, CreateAnggotaDto, UpdateAnggotaDto } from "./kepengurusan.validation";

export const kepengurusanService = {
  // Periode
  async getAllPeriode() {
    return kepengurusanRepository.findAllPeriode();
  },

  async getPeriodeAktif() {
    const data = await kepengurusanRepository.findPeriodeAktif();
    if (!data) throw new Error("Tidak ada periode aktif");
    return data;
  },

  async getPeriodeById(id: number) {
    const data = await kepengurusanRepository.findPeriodeById(id);
    if (!data) throw new Error("Periode tidak ditemukan");
    return data;
  },

  async createPeriode(dto: CreatePeriodeDto) {
    return kepengurusanRepository.createPeriode(dto);
  },

  async updatePeriode(id: number, dto: UpdatePeriodeDto) {
    await kepengurusanService.getPeriodeById(id);
    return kepengurusanRepository.updatePeriode(id, dto);
  },

  async deletePeriode(id: number) {
    await kepengurusanService.getPeriodeById(id);
    return kepengurusanRepository.deletePeriode(id);
  },

  // Pengurus Inti
  async createPengurusInti(dto: CreatePengurusIntiDto, imageBuffer?: Buffer) {
    let image: string | undefined;
    if (imageBuffer) image = await uploadImage(imageBuffer, "kepengurusan/inti");

    return kepengurusanRepository.createPengurusInti({
      ...dto,
      ...(image && { image }),
      periode: { connect: { id: dto.periodeId } },
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
      ...(dto.periodeId && { periode: { connect: { id: dto.periodeId } } }),
    });
  },

  async deletePengurusInti(id: number) {
    const existing = await kepengurusanRepository.findPengurusIntiById(id);
    if (!existing) throw new Error("Pengurus inti tidak ditemukan");
    if (existing.image) await deleteImage(existing.image);
    return kepengurusanRepository.deletePengurusInti(id);
  },

  // Departemen
  async createDepartemen(dto: CreateDepartemenDto) {
    return kepengurusanRepository.createDepartemen({
      ...dto,
      periode: { connect: { id: dto.periodeId } },
    });
  },

  async updateDepartemen(id: number, dto: UpdateDepartemenDto) {
    const existing = await kepengurusanRepository.findDepartemenById(id);
    if (!existing) throw new Error("Departemen tidak ditemukan");
    return kepengurusanRepository.updateDepartemen(id, {
      ...dto,
      ...(dto.periodeId && { periode: { connect: { id: dto.periodeId } } }),
    });
  },

  async deleteDepartemen(id: number) {
    const existing = await kepengurusanRepository.findDepartemenById(id);
    if (!existing) throw new Error("Departemen tidak ditemukan");
    return kepengurusanRepository.deleteDepartemen(id);
  },

  // Anggota
  async createAnggota(dto: CreateAnggotaDto, imageBuffer?: Buffer) {
    let image: string | undefined;
    if (imageBuffer) image = await uploadImage(imageBuffer, "kepengurusan/anggota");

    return kepengurusanRepository.createAnggota({
      ...dto,
      ...(image && { image }),
      departemen: { connect: { id: dto.departemenId } },
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
      ...(dto.departemenId && { departemen: { connect: { id: dto.departemenId } } }),
    });
  },

  async deleteAnggota(id: number) {
    const existing = await kepengurusanRepository.findAnggotaById(id);
    if (!existing) throw new Error("Anggota tidak ditemukan");
    if (existing.image) await deleteImage(existing.image);
    return kepengurusanRepository.deleteAnggota(id);
  },
};
