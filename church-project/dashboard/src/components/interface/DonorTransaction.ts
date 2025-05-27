export interface DonorTransact {
  id: number;
  transactionNumber: string;
  donor: string;
  amount: number;
  date: string;
  description: string;
  type: "Tithe" | "Offering" | "Project";
  churchName: string;
  paymentMethod: "Paystack" | "Bank Transfer" | "Card";
}
