import { formatImageUrl } from "@/utils/imageBaseUrl";
import { Admin } from "@prisma/client";

export const formatAdmin = (admin: Admin) => {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
    image: formatImageUrl(admin.image),
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  };
};
