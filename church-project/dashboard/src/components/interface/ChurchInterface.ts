export interface Church {
  id: string;
  name: string;
  email: string;
  phone: number;
  bankname: string;
  accno: number;
  isccode: string;
  address: string;
  churchrule: string;
  status?: "Active" | "Inactive" | "Pending";
}
