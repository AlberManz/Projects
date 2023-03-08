import { Injectable } from '@angular/core';
import { CanActivate , Router, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor (private router: Router) {}
  
  canActivate():  boolean | UrlTree {
    let token: string | null = localStorage.getItem('token');

    if(token === null) {
      // No tengo permisos para entrar en esta pçagina. Redirijo a login
      this.router.navigate(['/login'])
      return false
    }
    return true;
  }
  
}
