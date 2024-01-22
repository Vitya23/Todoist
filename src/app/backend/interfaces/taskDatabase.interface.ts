export interface taskDataBase {
  id: number;
  userId?: number;
  category: number | null;
  description: string;
  status: string;
  priority: number;
  endDate: Date;
}
