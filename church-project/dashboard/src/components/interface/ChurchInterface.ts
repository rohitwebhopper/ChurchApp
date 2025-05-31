export interface Church {
  id: number;
  name: string;
  email: string;
  phone: number;
  regNo: string;
  bankname: string;
  accno: number;
  isccode: string;
  address: string;
  churchrule: string;
  status?: "Active" | "Inactive" | "Pending";
}
