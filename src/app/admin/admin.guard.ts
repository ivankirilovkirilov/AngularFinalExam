import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(
    //next: ActivatedRouteSnapshot,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree{
      const url: string = state.url;
      return this.isAdmin(url);
  }


  isAdmin(url: string): true|UrlTree {
    if (this.authService.isAdmin()) {
      //alert(next);
      
      return true;
    }
    
    this.authService.redirrectUrl = url;

    return this.router.parseUrl('/tasks');
  }
  
}
