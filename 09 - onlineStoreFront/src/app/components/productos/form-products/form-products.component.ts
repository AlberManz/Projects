import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent {

  formulario: FormGroup;

  arrErrores: string[] = [];

  files: any;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {
    this.formulario = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      price: new FormControl(),
      available: new FormControl(),
      stock: new FormControl(),
      department: new FormControl()

    });
  }

  async onSubmit() {

    if (!this.formulario.value.available) {
      this.formulario.value.available = false;
    }

    const { name, description, price, available, stock, department } = this.formulario.value;
    const fd = new FormData();

    fd.append('image', this.files[0]);
    fd.append('name', name);
    fd.append('department', department);
    fd.append('description', description);
    fd.append('price', price);
    fd.append('available', available);
    fd.append('stock', stock);

    const response = await this.productsService.create(fd);
    if (response._id) {
      this.router.navigate(['/productos']);
    } else {
      this.arrErrores = response;
    }
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }
}
