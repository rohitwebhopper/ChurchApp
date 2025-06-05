import { ExistingFile } from "@/utils/multer";
import { AdminRepository } from "@/repositories/admin.repository";
import { AdminInput, AdminLogin } from "@/interface/admin.interface";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
const expiresIn = Number(process.env.EXPIRED_TOKEN) || 86400;

export const AdminUsecase = {
  registerAdmin: async (data: AdminInput) => {
    const unique = await AdminRepository.uniqueAdmin(data.email);
    if (unique) {
      data.image !== null && ExistingFile(data.image);
      throw new Error("Admin allready exist");
    }
    return await AdminRepository.createAdmin(data);
  },

  loginAdmin: async (data: AdminLogin) => {
    const admin = await AdminRepository.uniqueAdmin(data.email);

    if (!admin) {
      throw new Error("Account not found");
    }

    const validPassword = await bcrypt.compare(data.password, admin.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    const payload = {
      id: admin.id,
      name: admin.name,
      role: admin.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
      expiresIn: expiresIn,
    });

    return { token, admin: payload };
  },
};
