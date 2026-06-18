"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sambutanService = void 0;
const sambutan_repository_1 = require("./sambutan.repository");
const uploadImage_1 = require("../../utils/uploadImage");
exports.sambutanService = {
    async get() {
        return sambutan_repository_1.sambutanRepository.findFirst();
    },
    async create(dto, file) {
        let image = dto.image;
        if (file) {
            image = await (0, uploadImage_1.uploadImage)(file, "sambutan");
        }
        return sambutan_repository_1.sambutanRepository.create({
            ...dto,
            image,
        });
    },
    async update(id, dto, file) {
        const existing = await sambutan_repository_1.sambutanRepository.findFirst();
        if (!existing || existing.id !== id) {
            throw new Error("Sambutan tidak ditemukan");
        }
        let image = dto.image ?? existing.image ?? undefined;
        if (file) {
            if (existing.image) {
                await (0, uploadImage_1.deleteImage)(existing.image);
            }
            image = await (0, uploadImage_1.uploadImage)(file, "sambutan");
        }
        return sambutan_repository_1.sambutanRepository.update(id, {
            ...dto,
            image,
        });
    },
    async delete(id) {
        const existing = await sambutan_repository_1.sambutanRepository.findFirst();
        if (!existing || existing.id !== id) {
            throw new Error("Sambutan tidak ditemukan");
        }
        if (existing.image) {
            await (0, uploadImage_1.deleteImage)(existing.image);
        }
        return sambutan_repository_1.sambutanRepository.delete(id);
    },
};
