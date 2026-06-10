import { kegiatanRepository } from "./kegiatan.repository";
import { CreateKegiatanDto, UpdateKegiatanDto } from "./kegiatan.validation";

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

  async create(dto: CreateKegiatanDto) {
    const { speakers, ...rest } = dto;

    return kegiatanRepository.create({
      ...rest,
      date: new Date(dto.date),
      speakers: { create: speakers },
    });
  },

  async update(id: number, dto: UpdateKegiatanDto) {
    await kegiatanService.getById(id); // validasi exists

    const { speakers, ...rest } = dto;

    return kegiatanRepository.update(id, {
      ...rest,
      ...(dto.date && { date: new Date(dto.date) }),
      ...(speakers && {
        speakers: { deleteMany: {}, create: speakers },
      }),
    });
  },

  async delete(id: number) {
    await kegiatanService.getById(id);
    return kegiatanRepository.delete(id);
  },
};
