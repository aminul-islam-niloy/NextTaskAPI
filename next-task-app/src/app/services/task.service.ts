import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'https://localhost:7147/api/Tasks';

  // Inject HttpClient
  http = inject(HttpClient);

  GetTasks() {
    return this.http.get<Task[]>(this.apiUrl);
  }

  AddTask(data: Task) {
    return this.http.post<Task>(this.apiUrl, data);
  }

  UpdateTask(task: Task) {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  DeleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
