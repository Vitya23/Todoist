import { TaskStatus } from '../../todo-status/enums/taskStatus.enum';

export interface TaskI {
  id: number;
  userId?: number;
  category: number | null;
  description: string;
  status: TaskStatus;
  priority: number;
  endDate: Date;
}
