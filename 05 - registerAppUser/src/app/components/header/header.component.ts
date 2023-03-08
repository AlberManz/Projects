import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor (private router: Router) {}

  cerrarSesion (): void {
    // Vaciar el token del localStorage y redirigir a login
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
