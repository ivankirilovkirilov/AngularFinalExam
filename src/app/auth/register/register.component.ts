import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //accessToken: string = "";
  //user!: User;
  email!: string;
  password!: string;


  constructor(private authService: AuthService, private router: Router) {
    
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.email || !this.password) {
      alert("Please add a task!");
      return;
    }
    
    const newUser: User = {
      email: this.email,
      password: this.password,
      isAdmin: false
    }

    this.authService.register(newUser).subscribe((response) => {
      //this.accessToken = response.accessToken;
      //this.user = response.user;
      localStorage.setItem("id", response.user.id);
      localStorage.setItem("email", response.user.email);
      localStorage.setItem("isAdmin", response.user.isAdmin);
      localStorage.setItem("token", response.accessToken);
      console.log(localStorage.getItem('user'))
      alert("Successfully registered!");

      console.log(response.accessToken);
      console.log(response.user);
      if (response.user.isAdmin == true) {
        this.router.navigate(["/admin"]);
      } else {
        this.router.navigate(["/tasks"]);
      }
    }, (error) => {
      alert("Please try with another email!");
    }
    );
    // this.subscription = this.authService.register(newUser).subscribe((accessToken) => {
    //   this.accessToken = accessToken;
    // });
  }
}
