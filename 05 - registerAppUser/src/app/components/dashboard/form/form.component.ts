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
  titulo: string = "Agregar" // Le ponemos Agregar porque se inicializa con esa que es la de new-product y que tendrá que cambiar a actualizar
  //* Propiedades de la alerta
  mensaje: string = "";
  vistaAlerta: boolean = false;
  tipoAlerta: string = ""

  constructor (
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

  async ngOnInit (): Promise<void> {
    // Pedimos todas las categorías al servicio
    this.arrCategorias = await this.productsService.getAllCategories();

    // Cuando cargamos el componente, si tenemos una ruta dinámica habrá una parte activa que nos indica que estaremos actualizando y si no estaremos creando
    this.activatedRoute.params.subscribe(async (params:any) => {
      let id = params.idproduct
      if (id) {
        // Si existe id entonces se actualiza
        this.titulo = 'Actualizar'; // Esto quiere decir que si hay ruta activa (habrá id que es lo que diferencia a ambas rutas) se pone Actualizar y sino será Insertar, porque new-product es una ruta fija
        // Para actualizar debemos hacer una petición al servicio para traernos los datos del producto por ID
        // Llenamos los campos del formulario con los datos de esa petición y gestionamos la actualización con la API
        let producto: Product = await this.productsService.getById(id);
        // Una vez tengo el id que queremos actualizar, creamos de nuevo el formulario llenándolos con los datos que tiene cada producto
        this.form = new FormGroup({
          _id: new FormControl(producto._id, []), // El producto que se actualiza ya tiene id mientras que le que se crea no, de modo que lo paso para que sea el factor diferenciador
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

  async getDataForm (): Promise<void> {
    this.vistaAlerta = false;
    //! TRY - CATCH nos ayuda a gestionar errores, es una buena práctica. En este caso no lo ponemos porque la API no me devuelve un error
    if(this.form.value._id){
      // Si existe el valor de _id estoy actualizando
      let response: any = await this.productsService.update(this.form.value)
      if (!response.error) {
        this.router.navigate(['/dashboard', 'products'])
      } else {
        this.mensaje = response.error; // Podemos usar el error que nos devuelve la API o escribir uno "No se ha podido actualizar el producto"
        this.vistaAlerta = true;
        this.tipoAlerta = 'danger';
      }

    } else {
      let response: any = await this.productsService.create(this.form.value);
      // Si insertamos correctamente deberíamos redirigir al listado de productos y ver el producto nuevo insertado. No lo vamos a ver porque es una API fake pero con esto de debajo redirigimos si existe un id (es la cláusula que ponemos para comprobar que ha ido bien) a dashboard/products
      if (response.id){
        this.router.navigate(['/dashboard', 'products'])
      }
    }
  }
}


