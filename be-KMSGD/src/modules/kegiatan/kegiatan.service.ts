import { uploadImage, deleteImage } from "../../utils/uploadImage";
import { kegiatanRepository } from "./kegiatan.repository";
import { CreateKegiatanDto, UpdateKegiatanDto } from "./kegiatan.validation";

export const kegiatanService = {
  async getAll() {
    return kegiatanRepository.findAll();
  },

  async getAllAdmin() {
    return kegiatanRepository.findAllAdmin();
  },

  async getAllCategories() {
    return kegiatanRepository.findAllCategories();
  },

  async getByCategory(kategoriId: number) {
    return kegiatanRepository.findByCategory(kategoriId);
  },

  async getByDepartemen(departemenId: number) {
    return kegiatanRepository.findByDepartemen(departemenId);
  },

  async getById(id: number) {
    const data = await kegiatanRepository.findPublishedById(id);
    if (!data) throw new Error("Kegiatan tidak ditemukan");
    return data;
  },

  async getByIdAdmin(id: number) {
    const data = await kegiatanRepository.findById(id);
    if (!data) throw new Error("Kegiatan tidak ditemukan");
    return data;
  },

  async create(dto: CreateKegiatanDto, imageBuffer?: Buffer) {
    const { startTime, endTime, ...rest } = dto;

    let image: string | undefined;
    if (imageBuffer) image = await uploadImage(imageBuffer, "kegiatan");

    return kegiatanRepository.create({
      ...rest,
      startTime: new Date(startTime!),
      ...(endTime && { endTime: new Date(endTime) }),
      ...(image && { image }),
    });
  },

  async update(id: number, dto: UpdateKegiatanDto, imageBuffer?: Buffer) {
    const existing = await kegiatanService.getByIdAdmin(id);

    const { startTime, endTime, ...rest } = dto;

    let image = existing.image;
    if (imageBuffer) {
      if (existing.image) await deleteImage(existing.image);
      image = await uploadImage(imageBuffer, "kegiatan");
    }

    return kegiatanRepository.update(id, {
      ...rest,
      ...(startTime && { startTime: new Date(startTime) }),
      ...(endTime && { endTime: new Date(endTime) }),
      ...(image && { image }),
    });
  },

  async delete(id: number) {
    const existing = await kegiatanService.getByIdAdmin(id);
    if (existing.image) await deleteImage(existing.image);
    return kegiatanRepository.delete(id);
  },
};
