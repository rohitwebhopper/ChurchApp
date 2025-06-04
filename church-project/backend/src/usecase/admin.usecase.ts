import { ExistingImage } from "@/utils/multer";
import { AdminRepository } from "../repositories/admin.repository";
import { AdminInput } from "@/interface/admin.interface";

export const AdminUsecase = {
  registerAdmin: async (data: AdminInput) => {
    const unique = await AdminRepository.uniqueAdmin(data.email);
    if (unique) {
      data.image !== null && ExistingImage(data.image);
      throw new Error("Admin allready exist");
    }
    return await AdminRepository.createAdmin(data);
  },
};
