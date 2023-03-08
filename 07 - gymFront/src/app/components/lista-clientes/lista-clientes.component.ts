import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  arrClientes: any[] = [];

  constructor (private clientesService: ClientesService) { }

  async ngOnInit () {
    const response = await this.clientesService.getAll();
    this.arrClientes = response;
  }

  async deleteClient (clienteId: number) {
    await this.clientesService.deleteById(clienteId);
    const response = await this.clientesService.getAll();
    this.arrClientes = response;
  }
}
