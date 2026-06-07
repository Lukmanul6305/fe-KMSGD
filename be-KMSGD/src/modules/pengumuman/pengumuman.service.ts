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
    const data = await pengumumanRepository.findById(id);
    if (!data) throw new Error("Pengumuman tidak ditemukan");
    return data;
  },

  async create(dto: CreatePengumumanDto, imageBuffer?: Buffer) {
    let image: string | undefined;
    if (imageBuffer) image = await uploadImage(imageBuffer, "pengumuman");

    const { persyaratan, berkas, timeline, ...rest } = dto;

    return pengumumanRepository.create({
      ...rest,
      tanggal: new Date(dto.tanggal),
      ...(image && { image }),
      persyaratan: { create: persyaratan },
      berkas: { create: berkas },
      timeline: { create: timeline },
    });
  },

  async update(id: number, dto: UpdatePengumumanDto, imageBuffer?: Buffer) {
    const existing = await pengumumanService.getById(id);
    let image = existing.image;

    if (imageBuffer) {
      if (existing.image) await deleteImage(existing.image);
      image = await uploadImage(imageBuffer, "pengumuman");
    }

    const { persyaratan, berkas, timeline, ...rest } = dto;

    return pengumumanRepository.update(id, {
      ...rest,
      ...(dto.tanggal && { tanggal: new Date(dto.tanggal) }),
      ...(image && { image }),
      // hapus lama, buat baru — paling simpel untuk nested list
      ...(persyaratan && {
        persyaratan: { deleteMany: {}, create: persyaratan },
      }),
      ...(berkas && {
        berkas: { deleteMany: {}, create: berkas },
      }),
      ...(timeline && {
        timeline: { deleteMany: {}, create: timeline },
      }),
    });
  },

  async delete(id: number) {
    const existing = await pengumumanService.getById(id);
    if (existing.image) await deleteImage(existing.image);
    return pengumumanRepository.delete(id);
  },
};
