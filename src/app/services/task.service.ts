import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Task';
import { User } from '../auth/User';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUserUrl = "http://localhost:5000/users";
  private apiUrl = "http://localhost:5000/tasks";

  constructor(private http: HttpClient) { }


  getTasks(): Observable<Task[]> {
    //const url = `${this.apiUrl}?uid=${uid}`;
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTasksByUser(user_id: Number) {
    const url = `${this.apiUrl}?uid=${user_id}`;
    return this.http.get<Task[]>(url);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  } 

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task):Observable<Task> {
    const url = `${this.apiUrl}`;
    return this.http.post<Task>(url, task, httpOptions);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUserUrl);
  }
}
