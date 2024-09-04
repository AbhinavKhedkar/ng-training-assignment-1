import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'tasks/create', component: CreateTaskComponent},
    {path:'tasks/delete/:id', component: DeleteTaskComponent},
    {path:'tasks/edit/:id', component: EditTaskComponent},
];
