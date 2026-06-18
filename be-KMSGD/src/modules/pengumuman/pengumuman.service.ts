import { pengumumanRepository } from "./pengumuman.repository";
import { CreatePengumumanDto, UpdatePengumumanDto } from "./pengumuman.validation";
import { uploadImage, deleteImage } from "../../utils/uploadImage";

export const pengumumanService = {
  async getAll() {
    return pengumumanRepository.findAll();
  },

  async getPenting() {
    return pengumumanRepository.findPenting();
  },

  async getById(id: number) {
    const data = await pengumumanRepository.findPublishedById(id);
    if (!data) throw new Error("Pengumuman tidak ditemukan");
    return data;
  },

  async getByIdAdmin(id: number) {
    const data = await pengumumanRepository.findById(id);
    if (!data) throw new Error("Pengumuman tidak ditemukan");
    return data;
  },

  async create(dto: CreatePengumumanDto, imageBuffer?: Buffer) {
    let image: string | undefined;
    if (imageBuffer) image = await uploadImage(imageBuffer, "pengumuman");

    const { timeline, ...rest } = dto;

    return pengumumanRepository.create({
      ...rest,
      tanggal: new Date(dto.tanggal),
      ...(image && { image }),
      timeline: { create: timeline },
    });
  },

  async update(id: number, dto: UpdatePengumumanDto, imageBuffer?: Buffer) {
    const existing = await pengumumanService.getByIdAdmin(id);
    let image = existing.image;

    if (imageBuffer) {
      if (existing.image) await deleteImage(existing.image);
      image = await uploadImage(imageBuffer, "pengumuman");
    }

    const { timeline, ...rest } = dto;

    return pengumumanRepository.update(id, {
      ...rest,
      ...(dto.tanggal && { tanggal: new Date(dto.tanggal) }),
      ...(image && { image }),
      ...(timeline && {
        timeline: { deleteMany: {}, create: timeline },
      }),
    });
  },

  async delete(id: number) {
    const existing = await pengumumanService.getByIdAdmin(id);
    if (existing.image) await deleteImage(existing.image);
    return pengumumanRepository.delete(id);
  },
};
