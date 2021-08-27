import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { User } from '../User';


const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:5000"


  redirrectUrl: string | null = null;

  getUsers(): Observable<User[]> {
    if (this.isAdmin()) {
      const url = `${this.apiUrl}/users`;
      return this.http.get<User[]>(url, httpOptions);
    }
    return EMPTY;
  }

  getUserById(user_id: string): Observable<User> {
    if (this.isAdmin()) {
      const url = `${this.apiUrl}/users/${user_id}`;
      return this.http.get<User>(url, httpOptions);
    }
    return EMPTY;
  }

  updateUser(user_id: string | null, user: User): Observable<User> {
    
    if (this.isAdmin()) {
      const url = `${this.apiUrl}/users/${user_id}`;
      return this.http.put<User>(url, user, httpOptions);
    }
    return EMPTY;

  }

  loggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  isAdmin(): boolean {
    //console.log(localStorage.getItem("isAdmin"));
    //alert(localStorage.getItem("isAdmin"));
    return localStorage.getItem("isAdmin") == "true" ? true : false;
  }

  login(user: User) {
    const url = `${this.apiUrl}/login`;
    return this.http.post<any>(url, user, httpOptions);
  }

  // logout(): void {
  //   this.isLoggedIn = false;
  // }

  register(user: User) {
    const url = `${this.apiUrl}/register`;
    return this.http.post<any>(url, user, httpOptions);
  }

  logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  constructor(private http: HttpClient, private router: Router) { }
}
