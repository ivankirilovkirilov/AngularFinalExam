import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersGuard } from './users.guard';

const appRoutes: Routes = [
  {path: '', redirectTo: 'tasks', pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent, canActivate: [UsersGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [UsersGuard]},
  {path: 'profile', component: ProfileComponent},
  {path: 'tasks', component: TasksComponent},
  {path: '**', component: PageNotFoundComponent},
  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
