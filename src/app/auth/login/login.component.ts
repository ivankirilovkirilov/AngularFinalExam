import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;


  constructor(private authService: AuthService, private router: Router) {}

  

  onSubmit() {
    console.log(this.email);
    const tryToLoginUser: User = {
      email: this.email,
      password: this.password
    }
    this.authService.login(tryToLoginUser).subscribe((response) => {
      console.log(response);
      localStorage.setItem("id", response.user.id);
      localStorage.setItem("email", response.user.email);
      localStorage.setItem("isAdmin", response.user.isAdmin);
      localStorage.setItem("token", response.accessToken);
      if (response.user.isAdmin == true) {
        this.router.navigate(["/admin"]);
      } else {
        this.router.navigate(["/tasks"]);
      }
    }, (error) => {
      alert("wrong email or password");
    })

  }
}
