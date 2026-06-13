import { kategoriKegiatanRepository } from "./kategoriKegiatan.repository";
import { CreateKategoriDto, UpdateKategoriDto } from "./kategoriKegiatan.validation";

export const kategoriKegiatanService = {
  async getAll() {
    return kategoriKegiatanRepository.findAll();
  },

  async getById(id: number) {
    const data = await kategoriKegiatanRepository.findById(id);
    if (!data) throw new Error("Kategori Kegiatan tidak ditemukan");
    return data;
  },

  async create(dto: CreateKategoriDto) {
    return kategoriKegiatanRepository.create(dto);
  },

  async update(id: number, dto: UpdateKategoriDto) {
    await kategoriKegiatanService.getById(id);
    return kategoriKegiatanRepository.update(id, dto);
  },

  async delete(id: number) {
    await kategoriKegiatanService.getById(id);
    return kategoriKegiatanRepository.delete(id);
  },
};
