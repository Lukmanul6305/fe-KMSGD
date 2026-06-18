"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = uploadImage;
exports.deleteImage = deleteImage;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
async function uploadImage(buffer, folder = "kegiatan") {
    return new Promise((resolve, reject) => {
        cloudinary_1.default.uploader
            .upload_stream({ folder }, (error, result) => {
            if (error || !result)
                return reject(error);
            resolve(result.secure_url);
        })
            .end(buffer);
    });
}
async function deleteImage(imageUrl) {
    const publicId = imageUrl
        .split("/")
        .slice(-2)
        .join("/")
        .replace(/\.[^.]+$/, "");
    await cloudinary_1.default.uploader.destroy(publicId);
}
