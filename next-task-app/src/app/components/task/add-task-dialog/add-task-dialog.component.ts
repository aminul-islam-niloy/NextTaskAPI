import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  standalone: true,
  imports: [
    MaterialModule, ReactiveFormsModule
  ]
})
export class AddTaskDialogComponent {
  taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      isCompleted: [false],
      isMissed: [false],
    });
  }

  saveTask() {
    if (this.taskForm.valid) {
      const newTask: Task = this.taskForm.value;
      this.taskService.AddTask(newTask).subscribe(() => {
        this.dialogRef.close(true); // Close the dialog and return true
      });
    }
  }
}
