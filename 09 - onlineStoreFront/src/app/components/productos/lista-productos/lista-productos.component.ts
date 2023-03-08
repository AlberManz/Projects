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
  pages: number = 0; // La creo para poder tener el total de páginas de la API y darle a siguiente hasta la última página


  constructor(
    private productsService: ProductsService
  ) { }


  async ngOnInit() {
    const response = await this.productsService.getAll();
    // Habría que comprobar qué pasa si devuelve error
    this.arrProducts = response.results;
    this.currentPage = response.info.current_page;
    this.pages = response.info.pages // La llenamos con el número total de páginas que trae la API
  }

  async cambiaPagina(siguiente: boolean) {
    // if (siguiente) {
    //   this.currentPage++;
    // } else {
    //   this.currentPage--;
    // }
    //* Al ser un if sencillo se puede hacer sin llaves
    if (siguiente) this.currentPage++;
    else this.currentPage--;

    //* Recuperar los productos de la nueva página
    const response = await this.productsService.getByPage(this.currentPage)
    this.arrProducts = response.results;

  }

  //* Para crear unos botones con el número de páginas hay que crear un array ya que en el ngFor no se le puede pasar un número directamente, sino un array y este es el método
  arrFromNumber(num: number): any[] {
    // al método array le pasamos el num(que son las páginas), lo rellenamos con fill() y el map() nos devuelve el número (n) y el índice (i)
    return Array(num).fill(0).map((n, i) => {
      return i + 1
    })
  }

  //* Para el paginado de botones con el número de página
  async seleccionPagina(page: number) {
    const response = await this.productsService.getByPage(page);
    this.arrProducts = response.results;

    // La página actual es igual a la page que le pasamos
    this.currentPage = page;
  }

}

