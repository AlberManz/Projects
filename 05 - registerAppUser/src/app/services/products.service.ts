import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = "https://peticiones.online/api/products/"

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll (pPage: number = 1): Promise<any> {
    let rutaFinal = this.baseUrl + '?page=' + pPage;
    return lastValueFrom(this.httpClient.get<any>(rutaFinal))
  }

  getById (pId: string): Promise<Product> {
    return lastValueFrom(this.httpClient.get<Product>(`${this.baseUrl}${pId}`))
  }

  delete (pId: string): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pId}`))
  }

  getAllCategories (): Promise<string[]> {
    return lastValueFrom(this.httpClient.get<string[]>(`${this.baseUrl}categories`))
  }

  create (pFormValue: Product): Promise<Product> {
    return lastValueFrom(this.httpClient.post<Product>(this.baseUrl, pFormValue)) // Le mandamos la url y lo que vamos a añadir que es el pFormValue que es lo que hemos rellenado en el formulario de new product
  }

  update (pFormValue: Product): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}${pFormValue._id}`, pFormValue)) // Concateno la baseUrl con el id porque así me lo pide la API para actualizar. El id viene dentro de la información del Form (lo hemos añadido lo primero cuando hemos vuelto a crear el FormGroup)
  }
}
