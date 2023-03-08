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
  //* Sabemos que los errores es un array de strings porque lo hemos visto en el back al hacer el mapped()
  arrErrores: string[] = [];
  //* Creamos una variable files para llenarla con la imagen que se suba
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
      // image: new FormControl() LO QUITAMOS PORQUE SE METE EN FORMDATA
    });
  }

  async onSubmit() {
    //* Hay que gestionar que el checkbox si no se selecciona al principio devuelve un null
    // Si no viene el valor de available que se ponga como false
    if (!this.formulario.value.available) {
      this.formulario.value.available = false;
    }
    //! PARA ENVÍO DE IMÁGENES
    // Transformar a objeto FormData para envío de formulario con imágenes
    // Hacemos un destructuring para no tener que ir poniendo todo el rato this.formulario.value sino directamente el nombre de la variable que hemos extraído
    const { name, description, price, available, stock, department } = this.formulario.value;
    const fd = new FormData();
    //* Hay que pasarle el nombre del campo y el primer archivo dentro de files porque solo cargamos una imagen (para más es más complicado)
    fd.append('image', this.files[0]);
    fd.append('name', name);
    fd.append('department', department);
    fd.append('description', description);
    fd.append('price', price);
    fd.append('available', available);
    fd.append('stock', stock);
    //* Quitar el campo image del FormGroup arriba

    const response = await this.productsService.create(fd);
    //* Si existe el id es que se ha creado el producto
    if (response._id) {
      this.router.navigate(['/productos']);
    } else {
      this.arrErrores = response;
    }
  }

  onChange($event: any) {
    // console.log($event.target.files) Así vemos información del archivo que se ha seleccionado para cargar. Importante para nosotros será el name y el type (para poder guardarlo con su extensión correcta)
    this.files = $event.target.files;
  }

}
