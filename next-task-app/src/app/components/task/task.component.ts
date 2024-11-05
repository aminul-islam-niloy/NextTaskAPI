import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;

  tasksList: Task[] = [];
  taskService = inject(TaskService);
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: [''],
      startTime: [''],
      endTime: [''],
      isCompleted: [false],
      isMissed: [false],
    });
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  openModal() {
    const taskModal = document.getElementById('myModal');
    if (taskModal) {
      taskModal.style.display = 'block';
    }
  }

  closeModal() {
    this.taskForm.reset();
    if (this.model) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  getAllTasks() {
    this.taskService.GetTasks().subscribe((res) => {
      this.tasksList = res;
    });
  }

  addTask() {
    const taskData: Task = this.taskForm.value;
    this.taskService.AddTask(taskData).subscribe((res) => {
      this.getAllTasks(); // Refresh the task list after adding
      this.closeModal(); // Close the modal
    });
  }
  
  deleteTask(id: number) {
    this.taskService.DeleteTask(id).subscribe(() => {
      this.getAllTasks(); // Refresh the task list after deletion
    });
  }
  


}