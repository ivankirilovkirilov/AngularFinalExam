import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  num_tasks: Number = 0;
  num_users: Number = 0;

  constructor(private taskService:TaskService, private authService:AuthService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.num_tasks = tasks.length;
    })
    this.authService.getUsers().subscribe((users) => {
      this.num_users = users.length;
    })
  }

}
