import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formulario: FormGroup;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.formulario = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });
  }

  async onSubmit() {
    const response = await this.usuariosService.registro(this.formulario.value);
    // Comprobamos que la respuesta es correcta. Si existe insertId en la respuesta es que es correcta (porque el objeto que nos devuelve si está bien incluye el campo insertId)
    if (response.insertId) {
      //* Regisro correcto. Redirigimos al login
      alert('Usuario registrado correctamente')
      this.router.navigate(['/login'])
    } else {
      //* Error en registro
    }
 }

}
