import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  arrProducts: Product[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  mensaje: string = "";
  vistaAlerta: boolean = false;
  tipoAlerta: string = "";

  constructor (private productsService: ProductsService) {}

  async ngOnInit (): Promise<void> {
    let response = await this.productsService.getAll();
    //console.log(response)
    this.currentPage = response.page; // Se ve en el objeto que imprimimos por consola
    this.totalPages = response.total_pages; // Esto se ve en el console.log que hacemos de response. Al igual que accedemos a results, podemos acceder a total_pages
    this.arrProducts = response.results;
  }

  async goToPage ($event: any): Promise<void> {
    this.currentPage = ($event.target.innerText === 'Next') ? this.currentPage + 1 : this.currentPage - 1;

    let response = await this.productsService.getAll(this.currentPage);
    this.arrProducts = response.results
  }

  async deleteProduct (pId: string | undefined): Promise<void> {
    this.vistaAlerta = false
    if (pId !== undefined) {
      let response = await this.productsService.delete(pId);
      if (response.id) {
        this.mensaje = 'Producto borrado correctamente';
        this.tipoAlerta = 'success';
        this.vistaAlerta = true;
      } else {
        this.mensaje = response.error;
        this.tipoAlerta = 'danger';
        this.vistaAlerta = true;
      }
    }
  }
}

