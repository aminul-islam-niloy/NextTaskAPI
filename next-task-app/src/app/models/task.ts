export interface Task {
  id: number;
  name: string;
  startTime: Date;
  endTime: Date;
  isCompleted: boolean;
  isMissed: boolean;
}
