import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { BackgroundTaskService } from '../../services/background-task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  standalone: true,
  imports: [
    MaterialModule, CommonModule
  ]
})
export class TaskComponent implements OnInit, OnDestroy {
  tasksList: Task[] = [];
  private taskUpdateSubscription: Subscription | undefined;

  constructor(
    private dialog: MatDialog, 
    private taskService: TaskService,
    private backgroundTaskService: BackgroundTaskService, 
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.getAllTasks();

    // Subscribe to task updates from BackgroundTaskService
    this.taskUpdateSubscription = this.backgroundTaskService.taskUpdated.subscribe(() => {
      this.getAllTasks(); 
      this.cdr.detectChanges(); 
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from task updates if subscribed
    this.taskUpdateSubscription?.unsubscribe();
  }

  getAllTasks(): void {
    this.taskService.GetTasks().subscribe((res) => {
      this.tasksList = res;
    });
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getAllTasks(); // Refresh list after adding a task
    });
  }

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, { data: task });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getAllTasks(); // Refresh list after editing a task
    });
  }

  deleteTask(id: number): void {
    this.taskService.DeleteTask(id).subscribe(() => this.getAllTasks());
  }

  toggleCompleted(task: Task): void {
    if (task.isCompleted) {
      task.isMissed = false; // Reset missed if task is completed
    }
    this.taskService.UpdateTask(task).subscribe();
  }

  getCardStyle(task: Task): any {
    const colorMap: { [key: string]: string } = {
      '2024-11-05': '#FFCDD2', // Example color for tasks ending on Nov 5
      '2024-11-10': '#C8E6C9', // Example color for tasks ending on Nov 10
      // Add more date-color mappings as needed
    };
    
    const endDate = task.endTime.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
    const backgroundColor = colorMap[endDate] || '#FFF';
  
    return {
      'background-color': backgroundColor,
      color: '#000',
    };
  }
}
