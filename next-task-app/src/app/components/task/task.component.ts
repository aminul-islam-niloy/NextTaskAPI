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
export class TaskComponent implements OnInit {
  tasksList: Task[] = [];
  private taskService = inject(TaskService);
  private dialog = inject(MatDialog);

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
      if (result) {
        this.getAllTasks(); // Refresh the task list after adding a new task
      }
    });
  }

  deleteTask(id: number) {
    this.taskService.DeleteTask(id).subscribe(() => {
      this.getAllTasks(); // Refresh the task list after deletion
    });
  }
}
