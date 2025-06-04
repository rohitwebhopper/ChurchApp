import { Role } from "@prisma/client";

export interface AdminInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  image: string | null;
  role: Role;
}
