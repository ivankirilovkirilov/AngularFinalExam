import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  id!: string | null;

  constructor(private _Activatedroute: ActivatedRoute, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
    });
    if (this.id == null) {
      return;
    }

    this.authService.deleteUserById(this.id).subscribe();
    this.router.navigate(["/admin/users"]);
  }

}
