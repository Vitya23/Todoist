import { PriorityI } from './priority.interface';

export interface TaskRequestI {
  description: string;
  endDate: Date;
  priority: PriorityI;
  category: number | null;
}
