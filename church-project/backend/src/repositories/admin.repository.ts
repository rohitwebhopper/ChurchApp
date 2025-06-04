import { prisma } from "../config/prisma";
import { AdminInput } from "@/interface/admin.interface";

export const AdminRepository = {
  createAdmin: async (data: AdminInput) => prisma.admin.create({ data }),
  
  uniqueAdmin: async (email: string) =>
    prisma.admin.findUnique({
      where: { email },
    }),

  getAdmins: async () => prisma.admin.findMany(),
  // More methods...
};
