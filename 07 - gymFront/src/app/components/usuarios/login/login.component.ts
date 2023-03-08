import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;
  errorMessage: string;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.errorMessage = '';
    this.formulario = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  async onSubmit() {
    //* Cuando le volvemos a dar al botón y se lanza esta función, el errorMessage vuelve a vacío 
    this.errorMessage = '';
    const response = await this.usuariosService.login(this.formulario.value);
    console.log(response);
    if (response.erroraco) {
      this.errorMessage = response.erroraco;
    } else {
      //* Si le ponemos el await espera a que se cierre la alerta y luego hace el router.navigate. Si no se pone, se ve por debajo de la alerta la página clientes (en este caso) 
      await Swal.fire({
        title: 'Estás dentro',
        text: response.success,
        icon: 'success',
        confirmButtonText: 'Pa-lante'
      })
      localStorage.setItem('token', response.token);
      this.router.navigate(['/clientes']);
    }
  }
}
