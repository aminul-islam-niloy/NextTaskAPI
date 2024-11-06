import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
import { Subject, interval, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundTaskService {
  //for notify task that updated
  taskUpdated = new Subject<void>();

  constructor(private taskService: TaskService) {
    this.startChecking();
  }

  private startChecking(): void {
    interval(60000).pipe(
      switchMap(() => this.taskService.GetTasks())
    ).subscribe(tasks => {
      tasks.forEach(task => {
        if (!task.isCompleted && new Date(task.endTime) < new Date()) {
          task.isMissed = true;
          this.taskService.UpdateTask(task).subscribe();
        }
      });
    });

    if (onhashchange) {
      this.taskUpdated.next(); // Emit event if there are changes
    }
  }
}
