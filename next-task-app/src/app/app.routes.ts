import { Routes } from '@angular/router';
import { TaskComponent } from './components/task/task.component';

export const routes: Routes = [
    {
        path: "", component: TaskComponent
    },
    {
        path: "tasks", component: TaskComponent
    },
    { path: '', redirectTo: 'tasks', pathMatch: 'full' }

];
