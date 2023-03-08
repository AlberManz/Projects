import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // Vamos a crear un componente registro con validaciones, ModelForm. Necesito la librería módulo ReactiveForm

  registerForm: FormGroup;
  message: string = ""; // La creamos para que el mensaje sea dinámico
  typeAlert: string = "" // La creamos para cambiar el tipo de error que recibe
  viewAlert: boolean = false;

  constructor (
    private usersService: UsersService,
    private router: Router) {
    this.registerForm = new FormGroup({
      first_name: new FormControl ('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl ('', [
        Validators.required
      ]),
      email: new FormControl ('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+\@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl ('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(8)
      ]),
      avatar: new FormControl ('', [])
    }, [])
  }

  async getDataForm () {
    // enviárselo al servicio. Me va a devolver una respuesta que aún no tengo determinada
    try {
      let response = await this.usersService.create(this.registerForm.value);
      if(response.createdAt){
        let alert = this.myAlert('Usuario registrado correctamente', 'success');
        if(alert){
          setTimeout(() => {
            this.router.navigate(['/login'])},
            3000)
        }
      } else {
        let alert = this.myAlert('Usuario no se ha podido registrar', 'danger');
      }
    } catch(err) {
      console.log(err)
    }
  
    this.registerForm.reset();
  }

  myAlert (pMessage: string, pType: string): boolean {
    this.viewAlert = true;
    this.message = pMessage;
    this.typeAlert = pType
    return (this.typeAlert === 'success') ? true : false;
  }

  

  checkControl (pControlName: string, pError: string): boolean {
    if (this.registerForm.get(pControlName)?.hasError(pError) && this.registerForm.get(pControlName)?.touched){
      return true
    } else {
      return false
    }
  }

}
