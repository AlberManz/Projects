import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  product: Product | any

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit() {

    this.ActivatedRoute.params.subscribe(async (params: any) => {
      let id: string = params.idproduct;

      this.product = await this.productsService.getById(id);
    })
  }

}
