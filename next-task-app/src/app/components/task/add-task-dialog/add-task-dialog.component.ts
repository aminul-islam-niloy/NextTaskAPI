import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task';
import { MaterialModule } from '../../../material.module';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  standalone: true,
  imports: [
    MaterialModule, ReactiveFormsModule,MatInputModule,
    MatFormFieldModule,
    NgxMatTimepickerModule
  ]
})
export class AddTaskDialogComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    private fb: FormBuilder,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public task: Task | null
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      isCompleted: [false],
      isMissed: [false],
    });
  }

  ngOnInit(): void {
    if (this.task) {
      this.taskForm.patchValue(this.task); // Populate form if editing
    }
  }

  saveTask() {
    if (this.taskForm.valid) {
      const taskData: Task = this.taskForm.value;
      if (this.task) {
        // Editing existing task
        taskData.id = this.task.id;
        this.taskService.UpdateTask(taskData).subscribe(() => this.dialogRef.close(true));
      } else {
        // Adding new task
        this.taskService.AddTask(taskData).subscribe(() => this.dialogRef.close(true));
      }
    }
  }
}

