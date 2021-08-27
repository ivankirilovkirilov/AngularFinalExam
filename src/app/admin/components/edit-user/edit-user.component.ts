import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  id!: string | null;
  email!: string;
  isAdmin!: boolean | undefined;
  password: string = "";

  constructor(private _Activatedroute: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
    });
    if (this.id == null) {
      return;
    }
    this.authService.getUserById(this.id).subscribe((user) => {
      
      this.email = user.email;
      this.isAdmin = user.isAdmin;
    })
  }

  onSubmit() {
    const updatedUser: User = {
      email: this.email,
      isAdmin: this.isAdmin,
      password: this.password
    }

    if (this.email == "" || this.password == "") {
      alert("incorrect data");
      return;
    } 

    this.authService.updateUser(this.id, updatedUser).subscribe();
    this.router.navigate(['/admin/users']);
  }

}
