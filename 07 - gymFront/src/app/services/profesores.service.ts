import { getLocaleCurrencyCode } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  private baseUrl: string

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/profesores';
  }

  getAll() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }

    return firstValueFrom(
      this.httpClient.get<any[]>(this.baseUrl, httpOptions)
    )
  }

  deleteById(profesorId: number) {
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}/${profesorId}`)
    )
  }
}
