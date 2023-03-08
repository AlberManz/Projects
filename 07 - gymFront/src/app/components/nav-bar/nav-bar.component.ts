import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(
    private router: Router,
    public usuariosService: UsuariosService
  ) { }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
