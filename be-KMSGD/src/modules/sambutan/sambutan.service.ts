import { sambutanRepository } from "./sambutan.repository";
import { CreateSambutanDto, UpdateSambutanDto } from "./sambutan.validation";
import { uploadImage, deleteImage } from "../../utils/uploadImage";

export const sambutanService = {
  async get() {
    return sambutanRepository.findFirst();
  },

  async create(dto: CreateSambutanDto, file?: Buffer) {
    let image = dto.image;
    
    if (file) {
      image = await uploadImage(file, "sambutan");
    }

    return sambutanRepository.create({
      ...dto,
      image,
    });
  },

  async update(id: number, dto: UpdateSambutanDto, file?: Buffer) {
    const existing = await sambutanRepository.findFirst();
    if (!existing || existing.id !== id) {
      throw new Error("Sambutan tidak ditemukan");
    }

    let image = dto.image ?? existing.image ?? undefined;

    if (file) {
      if (existing.image) {
        await deleteImage(existing.image);
      }
      image = await uploadImage(file, "sambutan");
    }

    return sambutanRepository.update(id, {
      ...dto,
      image,
    });
  },

  async delete(id: number) {
    const existing = await sambutanRepository.findFirst();
    if (!existing || existing.id !== id) {
      throw new Error("Sambutan tidak ditemukan");
    }

    if (existing.image) {
      await deleteImage(existing.image);
    }
    return sambutanRepository.delete(id);
  },
};
