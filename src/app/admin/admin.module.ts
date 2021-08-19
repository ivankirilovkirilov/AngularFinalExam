import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { ManageTasksComponent } from './components/manage-tasks/manage-tasks.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminComponent,
    ManageTasksComponent,
    ManageUsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
