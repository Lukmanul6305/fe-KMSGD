import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";

export const sambutanRepository = {
  async findFirst() {
    return prisma.sambutan.findFirst({
      orderBy: { createdAt: "desc" },
    });
  },

  async create(data: Prisma.SambutanCreateInput) {
    return prisma.sambutan.create({ data });
  },

  async update(id: number, data: Prisma.SambutanUpdateInput) {
    return prisma.sambutan.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.sambutan.delete({ where: { id } });
  },
};
