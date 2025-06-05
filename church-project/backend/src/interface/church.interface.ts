import { Status } from "@prisma/client";

export interface ChurchDTO {
  name: string;
  email: string;
  phone: string;
  address: string;
  bank_name?: string;
  bank_acc_no?: string;
  ifsc_code?: string;
  church_rules?: string;
  image: string | null;
  agreement_url: string | null;
  status?: Status;
}

export type ChurchUpdateDTO = Partial<ChurchDTO>;