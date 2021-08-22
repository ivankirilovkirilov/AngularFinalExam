import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private authService: AuthService, private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(task: Task) {
    if(this.authService.loggedIn()) {
      this.taskService.deleteTask(task).subscribe(() => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      });
    } else {
      alert("login first!");
      this.router.navigate(["/login"]);
    }
    
  }

  toggleReminder(task: Task) {
    if(this.authService.loggedIn()) {
      task.reminder = !task.reminder;
      //console.log(task.reminder);
      this.taskService.updateTaskReminder(task).subscribe();
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
