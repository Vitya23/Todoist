export interface TaskI {
  id?: number;
  userId?: number;
  category: number;
  description: string;
  status?: string;
  priority: number;
  endDate: Date;
}