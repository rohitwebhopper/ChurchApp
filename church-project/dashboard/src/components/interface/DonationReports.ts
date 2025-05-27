export interface DonationRep {
  id: number;
  donor: string;
  amount: number;
  date: string;
  description: string;
  type: "Tithe" | "Offering" | "Project";
  projectName?: string;
  churchId: string;
  churchName: string;
}
