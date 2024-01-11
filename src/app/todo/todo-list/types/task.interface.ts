import { TaskStatus } from '../../todo-status/types/taskStatus.type';

export interface TaskI {
  id: number;
  userId?: number;
  category: number | null;
  description: string;
  status: TaskStatus;
  priority: number;
  endDate: Date;
}
