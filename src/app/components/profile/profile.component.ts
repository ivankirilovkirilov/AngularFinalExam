import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  num_tasks: Number = 0;

  constructor(private taskService: TaskService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.taskService.getTasksByUser(parseInt(JSON.stringify(localStorage.getItem('id')).replace("\"", ""))).subscribe((tasks) => {
        this.num_tasks = tasks.length;
      }); 
    }
  }
}
