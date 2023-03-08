import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/users';
  }

  login(formsValue: { email: string, password: string }) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, formsValue)
    )
  }

}
