import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
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
  isLoggedIn = false;


  redirrectUrl: string | null = null;


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

  constructor(private http: HttpClient) { }
}
