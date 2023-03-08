import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message: string = ""
  mostrarAlerta: boolean = false
  typeError: string = ""

  constructor (
    private usersService: UsersService,
    private router: Router) {}

  async getDataForm (pForm: any) {

    //! Cada vez que entremos en getDataForm se deben reiniciar las variable mostrarAlerta para qeu vuelva a false y no se quede en true
    this.mostrarAlerta = false;
   
    // Hemos recogido los datos del usuario que queremos validar en la bbdd, para ello haremos una petición de login al servicio
    // console.log(pForm.value)
    try {
      let response = await this.usersService.login(pForm.value);
      if (response.token){ //! Si es correcto me envía el token
        // Cuando tenemos un login correcto, la aplicación debe saber en todo momento que nos hemos logueado, así que guardaremos el token en local storage para poder usarlo dentro de cualquier ruta

        //? LOS GUARDS PROTEGEN LAS RUTAS DE SU ACCESO EN BASE A UNAS CONDICIONES: logueado, role, etc...
        //* Para crear un guard (ng g g guards/login --skip-tests)
        localStorage.setItem('token', response.token);

        this.router.navigate(['/dashboard'])
      }
    } catch (reject: any) {
      this.message = reject.error.error //! Esto gestionaría un error del servidor que me da por consola (el concatener palabras es para que solo salga el mensaje y no el objeto entero)
      this.mostrarAlerta = true;
      this.typeError = 'danger';
    }
  }

}
