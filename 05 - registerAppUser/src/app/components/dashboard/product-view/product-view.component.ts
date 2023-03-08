import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit{

  product: Product | any

  constructor (
    private ActivatedRoute: ActivatedRoute,
    private productsService: ProductsService
    ) {}

  ngOnInit () {
    // Capturo el id de la ruta para hacer una petición al servicio
    this.ActivatedRoute.params.subscribe(async (params: any) => { //* El async hay que hacerlo en la función activa. En este caso no es en el OnInit porque estamos en el ámbito de la función params
      let id: string = params.idproduct;

      //! Analizando la situación vemos que no nos hace falta hacer response sino que directamente se lo podemos asignar a product porque en getById ya le dije que devuelve una Promise de tipo Product
      this.product = await this.productsService.getById(id);


      //! Forma que siempre hacemos
      // let response = await this.productsService.getById(id);
      // this.product = response
    })
  }

}
