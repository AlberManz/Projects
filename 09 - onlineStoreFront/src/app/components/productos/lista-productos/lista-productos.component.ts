import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  arrProducts: any[] = [];
  currentPage: number = 0;
  pages: number = 0;


  constructor(
    private productsService: ProductsService
  ) { }


  async ngOnInit() {
    const response = await this.productsService.getAll();
    this.arrProducts = response.results;
    this.currentPage = response.info.current_page;
    this.pages = response.info.pages
  }

  async cambiaPagina(siguiente: boolean) {

    if (siguiente) this.currentPage++;
    else this.currentPage--;

    const response = await this.productsService.getByPage(this.currentPage)
    this.arrProducts = response.results;
  }

  arrFromNumber(num: number): any[] {
    return Array(num).fill(0).map((n, i) => {
      return i + 1
    })
  }

  async seleccionPagina(page: number) {
    const response = await this.productsService.getByPage(page);
    this.arrProducts = response.results;

    this.currentPage = page;
  }
}

