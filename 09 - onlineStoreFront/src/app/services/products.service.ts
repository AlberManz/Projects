import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/products';
  }

  getAll() {
    return firstValueFrom(
      this.httpClient.get<any>(this.baseUrl)
    );
  }

  getByPage(page: number) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}?page=${page}`)
    )
  }

  create(formValues: FormData) {
    return firstValueFrom(
      this.httpClient.post<any>(this.baseUrl, formValues)
    );
  }
}
