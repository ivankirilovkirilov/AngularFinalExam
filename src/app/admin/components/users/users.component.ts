import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: User[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

}
