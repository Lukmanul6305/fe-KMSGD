import { galeriRepository } from "./galeri.repository";
import { CreateGaleriDto, UpdateGaleriDto } from "./galeri.validation";
import { uploadImage, deleteImage } from "../../utils/uploadImage";

export const galeriService = {
  async getAll(page?: number, limit?: number) {
    return galeriRepository.findAll(page, limit);
  },

  async getByTipe(tipe: "FOTO" | "VIDEO", page = 1, limit = 12) {
    return galeriRepository.findByTipe(tipe, page, limit);
  },

  async getByKegiatan(kegiatanId: number) {
    return galeriRepository.findByKegiatan(kegiatanId);
  },

  async getById(id: number) {
    const data = await galeriRepository.findById(id);
    if (!data) throw new Error("Galeri tidak ditemukan");
    return data;
  },

  // FOTO: upload file ke Cloudinary → url = cloudinary url
  // VIDEO: url = YouTube link, thumbnail opsional di-upload ke Cloudinary
  async create(dto: CreateGaleriDto, files?: { image?: Buffer; thumbnail?: Buffer }) {
    let url = dto.url;
    let thumbnail = dto.thumbnail;

    if (dto.tipe === "FOTO" && files?.image) {
      url = await uploadImage(files.image, "galeri/foto");
    }
    if (files?.thumbnail) {
      thumbnail = await uploadImage(files.thumbnail, "galeri/thumbnail");
    }

    if (!url) {
      throw new Error(dto.tipe === "FOTO" ? "Gambar wajib diupload untuk tipe FOTO" : "Link video wajib diisi untuk tipe VIDEO");
    }

    return galeriRepository.create({
      ...dto,
      url,
      ...(thumbnail && { thumbnail }),
      ...(dto.kegiatanId && { kegiatan: { connect: { id: dto.kegiatanId } } }),
    });
  },

  async update(id: number, dto: UpdateGaleriDto, files?: { image?: Buffer; thumbnail?: Buffer }) {
    const existing = await galeriService.getById(id);
    let url = dto.url ?? existing.url;
    let thumbnail = dto.thumbnail ?? existing.thumbnail ?? undefined;

    if (dto.tipe === "FOTO" && files?.image) {
      if (existing.tipe === "FOTO") await deleteImage(existing.url);
      url = await uploadImage(files.image, "galeri/foto");
    }
    if (files?.thumbnail) {
      if (existing.thumbnail) await deleteImage(existing.thumbnail);
      thumbnail = await uploadImage(files.thumbnail, "galeri/thumbnail");
    }

    return galeriRepository.update(id, {
      ...dto,
      url,
      ...(thumbnail && { thumbnail }),
      ...(dto.kegiatanId && { kegiatan: { connect: { id: dto.kegiatanId } } }),
    });
  },

  async delete(id: number) {
    const existing = await galeriService.getById(id);
    if (existing.tipe === "FOTO") await deleteImage(existing.url);
    if (existing.thumbnail) await deleteImage(existing.thumbnail);
    return galeriRepository.delete(id);
  },
};
