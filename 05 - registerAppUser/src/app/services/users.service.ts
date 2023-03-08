import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = "https://reqres.in/api";


  constructor(private httpClient: HttpClient) { }

  // El servicio va a hacer peticiones http. Necesitamos el httpClientModule, httpClient y la url a la cual nos conectamos

  create (pUser: User): Promise<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders ({
    //     'Content-type': 'application/json',
    //     'token': 'nlka54564' Esto habrá casos en el que nos lo exijan
    //   })
    // }

    return lastValueFrom(this.httpClient.post<User>(this.baseUrl + '/users', pUser, this.getHeaders()))
  }

  login(pFormValue: any): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/login`, pFormValue, this.getHeaders()))
  }

  getHeaders (): any { // Como la estábamos necesitando dos veces hacemos una función
    return {
      headers: new HttpHeaders ({
        'Content-type': 'application/json',
      })
    }
  }
}
