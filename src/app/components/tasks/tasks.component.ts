import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';
import { User } from 'src/app/auth/User';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  users: User[] = [];

  constructor(private authService: AuthService, private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.taskService.getUsers().subscribe((users) => {
        this.users = users;
        this.tasks.forEach((task) => {
          this.users.forEach((user) => {
            if (task.uid == user.id) {
              task.username = user.email;
            }
          });
        });
      });
    });
    
   
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

  addTask(task: Task) {
    if(this.authService.loggedIn()) {
      this.taskService.addTask(task).subscribe((task) => {
        this.tasks.push(task);
      });
    } else {
      alert("login first!");
      this.router.navigate(["/login"]);
    }
    
  }
}
