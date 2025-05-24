export interface ChurchEvent {
  id: string;
  image: string;
  title: string;
  event_date: string;
  event_time: string;
  location: string;
  hosted_by: string;
  description: string;
  upcoming: boolean;
  latitude: number;
  longitude: number;
  status: "Active" | "InActive";
}
