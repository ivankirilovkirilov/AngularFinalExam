import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.loggedOut(url);
  }
  
  loggedOut(url: string) {

    if (!this.authService.loggedIn()) {
      return true;
    }

    if(this.authService.isAdmin()) {
      this.authService.redirrectUrl = url;

      return this.router.parseUrl('/admin');

    }

    this.authService.redirrectUrl = url;

    return this.router.parseUrl('/tasks');
    
  }
}
