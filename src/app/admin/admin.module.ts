import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminComponent,
    EditTaskComponent,
    UsersComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class AdminModule { }
