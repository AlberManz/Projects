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

  constructor(
    private usersService: UsersService,
    private router: Router) { }

  async getDataForm(pForm: any) {

    this.mostrarAlerta = false;

    try {
      let response = await this.usersService.login(pForm.value);
      if (response.token) {

        localStorage.setItem('token', response.token);

        this.router.navigate(['/dashboard'])
      }
    } catch (reject: any) {
      this.message = reject.error.error
      this.mostrarAlerta = true;
      this.typeError = 'danger';
    }
  }
}
