import { formatDate } from "@/utils/formatDate";
import { formatUrl } from "@/utils/imageBaseUrl";
import { sanitizeValue } from "@/utils/sanitizeValue";
import { Church } from "@prisma/client";

export const formatChurch = (church: Church) => {
  return {
    id: church.id,
    name: sanitizeValue(church.name),
    email: sanitizeValue(church.email),
    phone: sanitizeValue(church.phone),
    image: formatUrl(sanitizeValue(church.image)),
    agreement: formatUrl(sanitizeValue(church.agreement_url)),
    address: sanitizeValue(church.address),
    bank_name: sanitizeValue(church.bank_name),
    bank_acc_no: sanitizeValue(church.bank_acc_no),
    ifsc_code: sanitizeValue(church.ifsc_code),
    church_rules: sanitizeValue(church.church_rules),
    status: church.status,
    createdAt: formatDate(church.createdAt),
    updatedAt: formatDate(church.updatedAt),
  };
};
