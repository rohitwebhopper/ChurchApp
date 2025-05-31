export interface DonorTransact {
  id: string;
  donor: string;
  amount: number;
  transactionNumber: string;
  paymentMethod: string;
  date: string;
  type: "Tithe" | "Offering" | "Project"; 
  churchSharePercentage: number; 
  adminSharePercentage: number; 
}


