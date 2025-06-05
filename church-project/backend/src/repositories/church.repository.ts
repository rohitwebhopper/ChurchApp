import { prisma } from "@/config/prisma";
import { Status } from "@prisma/client";

export const ChurchRepository = {
  async create(data: any) {
    return prisma.church.create({ data });
  },
  async findAll() {
    return prisma.church.findMany();
  },
  async findUnique(name: string) {
    return prisma.church.findUnique({ where: { name } });
  },
  async findById(id: string) {
    return prisma.church.findUnique({ where: { id } });
  },
  async update(id: string, data: any) {
    return prisma.church.update({ where: { id }, data });
  },
  async delete(id: string) {
    return prisma.church.delete({ where: { id } });
  },
  async updateStatus(id: string, status: Status) {
    return prisma.church.update({ where: { id }, data: { status } });
  },
};
