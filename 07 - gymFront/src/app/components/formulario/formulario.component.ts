import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  formulario: FormGroup;

  constructor (
    private clientesService: ClientesService
  ) {
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      apellidos: new FormControl(),
      direccion: new FormControl(),
      email: new FormControl(),
      edad: new FormControl(),
      genero: new FormControl(),
      cuota: new FormControl(),
      fecha_nacimiento: new FormControl(),
      dni: new FormControl()
    });
  }

  async onSubmit () {
    const response = await this.clientesService.create(this.formulario.value);
    console.log(response);
  }

}
