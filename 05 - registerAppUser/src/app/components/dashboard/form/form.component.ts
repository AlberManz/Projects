import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  arrCategorias: string[] = [];
  titulo: string = "Agregar"
  mensaje: string = "";
  vistaAlerta: boolean = false;
  tipoAlerta: string = ""

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = new FormGroup({
      name: new FormControl('', []),
      description: new FormControl('', []),
      price: new FormControl('', []),
      category: new FormControl('', []),
      image: new FormControl('', []),
      active: new FormControl('', [])
    }, [])
  }

  async ngOnInit(): Promise<void> {
    this.arrCategorias = await this.productsService.getAllCategories();


    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.idproduct
      if (id) {

        this.titulo = 'Actualizar';
        let producto: Product = await this.productsService.getById(id);

        this.form = new FormGroup({
          _id: new FormControl(producto._id, []),
          name: new FormControl(producto.name, []),
          description: new FormControl(producto.description, []),
          price: new FormControl(producto.price, []),
          category: new FormControl(producto.category, []),
          image: new FormControl(producto.image, []),
          active: new FormControl(producto.active, [])
        }, [])
      }
    })
  }

  async getDataForm(): Promise<void> {
    this.vistaAlerta = false;

    if (this.form.value._id) {

      let response: any = await this.productsService.update(this.form.value)
      if (!response.error) {
        this.router.navigate(['/dashboard', 'products'])
      } else {
        this.mensaje = response.error;
        this.vistaAlerta = true;
        this.tipoAlerta = 'danger';
      }

    } else {
      let response: any = await this.productsService.create(this.form.value);

      if (response.id) {
        this.router.navigate(['/dashboard', 'products'])
      }
    }
  }
}


