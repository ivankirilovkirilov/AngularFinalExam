import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  num_tasks: Number = 0;
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.taskService.getTasksByUser(parseInt(JSON.stringify(localStorage.getItem('id')).replace("\"", ""))).subscribe((tasks) => {
        tasks.forEach((task) => {
          task.username = "You";
        })
        this.tasks = tasks;
        this.num_tasks = tasks.length;
      }); 
    }
  }
  deleteTask(task: Task) {
    if(this.authService.loggedIn()) {
      if (localStorage.getItem("isAdmin") === "true" || parseInt(JSON.stringify(localStorage.getItem('id')).replace("\"", "")) === task.uid) {
        this.taskService.deleteTask(task).subscribe(() => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
        });
      } else {
        alert("You don't have permissions to delete this Task!");
      }
      
    } else {
      alert("login first!");
      this.router.navigate(["/login"]);
    }
    
  }

  toggleReminder(task: Task) {
    if(this.authService.loggedIn()) {
      if (localStorage.getItem("isAdmin") === "true" || parseInt(JSON.stringify(localStorage.getItem('id')).replace("\"", "")) === task.uid) { 
        task.reminder = !task.reminder;
        //console.log(task.reminder);
        this.taskService.updateTaskReminder(task).subscribe();
      } else {
        alert("You don't have permissions to toggle the reminder of this Task!");
      }
    } else {
      alert("login first!");
      this.router.navigate(["/login"]);
    }
   
  }
}
