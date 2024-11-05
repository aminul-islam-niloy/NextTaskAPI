import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  standalone: true,
  imports: [
    MaterialModule,CommonModule
  ]
})


export class TaskComponent {
  tasksList: Task[] = [];

  constructor(private dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.GetTasks().subscribe((res) => {
      this.tasksList = res;
    });
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(AddTaskDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getAllTasks(); // Refresh list after adding a task
    });
  }

  openEditTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, { data: task });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getAllTasks(); // Refresh list after editing a task
    });
  }

  deleteTask(id: number) {
    this.taskService.DeleteTask(id).subscribe(() => this.getAllTasks());
  }

  toggleCompleted(task: Task) {
    if (task.isCompleted) {
      task.isMissed = false; // Reset missed if task is completed
    }
    this.taskService.UpdateTask(task).subscribe();
  }

  getCardStyle(task: any): any {
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