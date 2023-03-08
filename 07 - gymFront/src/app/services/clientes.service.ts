import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/clientes';
  }

  getAll() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }

    return firstValueFrom(
      this.httpClient.get<any[]>(this.baseUrl, httpOptions)
    );
  }

  create (formValues: any) {
    return firstValueFrom(
      this.httpClient.post(this.baseUrl, formValues)
    );
  }

  deleteById (clienteId: number) {
    return firstValueFrom(
      this.httpClient.delete(`${this.baseUrl}/${clienteId}`)
    );
  }

}
