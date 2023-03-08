import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface FormRegistro {
  // el username lo ponemos como opcional para que la interfaz nos valga para registro y login(en login el username no hace falta)
  username?: string,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/usuarios';
  }

  //* Se puede poner formRegistro de tipo any, pasar el objeto { username: string, email: string, password: string} o podemos generar una interfaz arriba solo para este servicio
  registro(formRegistro: FormRegistro) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/registro`, formRegistro)
    );
  }

  login(formLogin: FormRegistro) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, formLogin)
    );
  }

  isLogged(): boolean {
    if (localStorage.getItem('token')) {
      return true
    } else {
      return false
    }
  }

}
