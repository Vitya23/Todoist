import { TaskStatus } from 'src/app/shared/enums/todo.enum';

export interface TaskI {
  id: number;
  userId?: number;
  category: number | null;
  description: string;
  status: TaskStatus;
  priority: number;
  endDate: Date;
}
