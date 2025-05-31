export interface ProjectData {
  name: string;
  description: string;
  setAmount: number;
  active: boolean;
}

export interface ProjectTableData {
  id: number;
  name: string;
  churchName: string;
  description: string;
  setAmount: number;
  receivedAmount: number;
  active: boolean;
  createdAt: string;
}
