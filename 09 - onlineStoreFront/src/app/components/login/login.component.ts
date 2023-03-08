import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;
  errorMsg: string = '';

  constructor(
    private usersService: UsersService
  ) {
    this.formulario = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  async onSubmit() {
    this.errorMsg = '';
    const response = await this.usersService.login(this.formulario.value);
    console.log(response);
    if (response.fatal) {
      this.errorMsg = response.fatal;
    } else {
      await Swal.fire({
        title: 'Welcome!',
        text: 'Login correcto.',
        imageUrl: '../assets/images/mario-pipe.gif',
        imageWidth: 300,
        imageHeight: 180,
        imageAlt: 'Mario victory',
      })
    }
    localStorage.setItem('token', response.token);
  }

}
