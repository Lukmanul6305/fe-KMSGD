import {prisma} from "../../config/prisma";
import { Prisma } from "@prisma/client";

export const adminRepository = {
  async findAll() {
    return prisma.admin.findMany({
      select: { id: true, username: true, createdAt: true, updatedAt: true },
    });
  },

  async findById(id: number) {
    return prisma.admin.findUnique({
      where: { id },
      select: { id: true, username: true, createdAt: true, updatedAt: true },
    });
  },

  async findByUsername(username: string) {
    return prisma.admin.findUnique({ where: { username } });
  },

  async create(data: Prisma.AdminCreateInput) {
    return prisma.admin.create({
      data,
      select: { id: true, username: true, createdAt: true },
    });
  },


  async update(id: number, data: Prisma.AdminUpdateInput) {
    return prisma.admin.update({
      where: { id },
      data,
      select: { id: true, username: true, updatedAt: true },
    });
  },

  async delete(id: number) {
    return prisma.admin.delete({ where: { id } });
  },
};
