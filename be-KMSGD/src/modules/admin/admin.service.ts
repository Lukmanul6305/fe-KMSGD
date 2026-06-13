import bcrypt from "bcrypt";
import { adminRepository } from "./admin.repository";
import { CreateAdminDto, UpdateAdminDto } from "./admin.validation";

const SALT_ROUNDS = 10;

export const adminService = {
  async getAll() {
    return adminRepository.findAll();
  },

  async getById(id: number) {
    const admin = await adminRepository.findById(id);
    if (!admin) throw new Error("Admin tidak ditemukan");
    return admin;
  },

  async create(dto: CreateAdminDto) {
    const existing = await adminRepository.findByUsername(dto.username);
    if (existing) throw new Error("Username sudah digunakan");

    const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);
    return adminRepository.create({ username: dto.username, password: hashedPassword });
  },

  async update(id: number, dto: UpdateAdminDto) {
    await adminService.getById(id);

    if (dto.username) {
      const existing = await adminRepository.findByUsername(dto.username);
      if (existing && existing.id !== id) throw new Error("Username sudah digunakan");
    }

    const data: { username?: string; password?: string } = {};
    if (dto.username) data.username = dto.username;
    if (dto.password) data.password = await bcrypt.hash(dto.password, SALT_ROUNDS);

    return adminRepository.update(id, data);
  },

  async delete(id: number) {
    await adminService.getById(id); // pastikan admin ada
    await adminRepository.delete(id);
  },
};
