import { kegiatanRepository } from "./kegiatan.repository";
import { CreateKegiatanDto, UpdateKegiatanDto } from "./kegiatan.validation";
import { uploadImage, deleteImage } from "../../utils/uploadImage";

export const kegiatanService = {
  async getAll() {
    return kegiatanRepository.findAll();
  },

  async getAllCategories() {
    const data = await kegiatanRepository.findAllCategories();
    return data.map((k) => k.category);
  },

  async getByCategory(category: string) {
    return kegiatanRepository.findByCategory(category);
  },

  async getById(id: number) {
    const data = await kegiatanRepository.findById(id);
    if (!data) throw new Error("Kegiatan tidak ditemukan");
    return data;
  },

  async create(dto: CreateKegiatanDto, imageBuffer?: Buffer) {
    let image: string | undefined;
    if (imageBuffer) image = await uploadImage(imageBuffer, "kegiatan");

    const { speakers, ...rest } = dto;

    return kegiatanRepository.create({
      ...rest,
      date: new Date(dto.date),
      ...(image && { image }),
      speakers: { create: speakers },
    });
  },

  async update(id: number, dto: UpdateKegiatanDto, imageBuffer?: Buffer) {
    const existing = await kegiatanService.getById(id);
    let image = existing.image;

    if (imageBuffer) {
      if (existing.image) await deleteImage(existing.image);
      image = await uploadImage(imageBuffer, "kegiatan");
    }

    const { speakers, ...rest } = dto;

    return kegiatanRepository.update(id, {
      ...rest,
      ...(dto.date && { date: new Date(dto.date) }),
      ...(image && { image }),
      ...(speakers && {
        speakers: { deleteMany: {}, create: speakers },
      }),
    });
  },

  async delete(id: number) {
    const existing = await kegiatanService.getById(id);
    if (existing.image) await deleteImage(existing.image);
    return kegiatanRepository.delete(id);
  },
};
