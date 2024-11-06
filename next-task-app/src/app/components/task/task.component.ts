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
  filteredTasks: Task[] = [];
  filter: string = 'all'; // Default filter
  private taskUpdateSubscription: Subscription | undefined;

  constructor(
    private dialog: MatDialog, 
    private taskService: TaskService,
    private backgroundTaskService: BackgroundTaskService, 
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.getAllTasks();

    this.taskUpdateSubscription = this.backgroundTaskService.taskUpdated.subscribe(() => {
      this.getAllTasks(); 
      this.cdr.detectChanges(); 
    });
  }

  ngOnDestroy(): void {
    this.taskUpdateSubscription?.unsubscribe();
  }

  getAllTasks(): void {
    this.taskService.GetTasks().subscribe((res) => {
      this.tasksList = res;
      this.applyFilter(); 
    });
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getAllTasks(); 
    });
  }

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, { data: task });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getAllTasks();
    });
  }

  deleteTask(id: number): void {
    this.taskService.DeleteTask(id).subscribe(() => this.getAllTasks());
  }

  toggleCompleted(task: Task): void {
    if (task.isCompleted) {
      task.isMissed = false; 
    }
    this.taskService.UpdateTask(task).subscribe();
  }

  setFilter(filter: string): void {
    this.filter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    switch (this.filter) {
      case 'completed':
        this.filteredTasks = this.tasksList.filter(task => task.isCompleted);
        break;
      case 'missed':
        this.filteredTasks = this.tasksList.filter(task => task.isMissed);
        break;
      case 'newest':
        this.filteredTasks = [...this.tasksList].sort((a, b) => b.id - a.id); // Newest first
        break;
      case 'oldest':
        this.filteredTasks = [...this.tasksList].sort((a, b) => a.id - b.id); // Oldest first
        break;
      default:
        this.filteredTasks = this.tasksList;
    }
  }
  

  getCardStyle(task: Task): any {
    let backgroundColor = '#EDEAF2';
    if (task.isMissed) backgroundColor = '#FFCDD2'; 
    else if (task.isCompleted) backgroundColor = '#C8E6C9'; 
    else if (new Date(task.endTime).toDateString() === new Date().toDateString()) backgroundColor = '#9BB8ED'; 

    return {
      'background-color': backgroundColor,
      color: '#000',
    };
  }
}
