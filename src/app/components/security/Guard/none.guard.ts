import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
// import { AuthService2 } from '../auth/myauth.service';

@Injectable({
  providedIn: 'root'
})
export class NoneGuard implements CanActivate {

  constructor(
    private auth: AuthService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('role') === "5" || localStorage.getItem('role') === "-1") {
        return true
      } else {
        alert("You're either not registered or your account is on suspension");
        return false;
      }
  }

}
