import { kategoriPengumumanRepository } from "./kategoriPengumuman.repository";
import { CreateKategoriDto, UpdateKategoriDto } from "./kategoriPengumuman.validation";

export const kategoriPengumumanService = {
  async getAll() {
    return kategoriPengumumanRepository.findAll();
  },

  async getById(id: number) {
    const data = await kategoriPengumumanRepository.findById(id);
    if (!data) throw new Error("Kategori pengumuman tidak ditemukan");
    return data;
  },

  async create(dto: CreateKategoriDto) {
    return kategoriPengumumanRepository.create(dto);
  },

  async update(id: number, dto: UpdateKategoriDto) {
    await kategoriPengumumanService.getById(id);
    return kategoriPengumumanRepository.update(id, dto);
  },

  async delete(id: number) {
    await kategoriPengumumanService.getById(id);
    return kategoriPengumumanRepository.delete(id);
  },
};
