import { formatUrl } from "@/utils/imageBaseUrl";
import { Admin } from "@prisma/client";
import { sanitizeValue } from "@/utils/sanitizeValue";
import { formatDate } from "@/utils/formatDate";

export const formatAdmin = (admin: Admin) => {
  return {
    id: sanitizeValue(admin.id),
    name: sanitizeValue(admin.name),
    email: sanitizeValue(admin.email),
    phone: sanitizeValue(admin.phone),
    image: formatUrl(sanitizeValue(admin.image)),
    createdAt: formatDate(admin.createdAt),
    updatedAt: formatDate(admin.updatedAt),
  };
};
