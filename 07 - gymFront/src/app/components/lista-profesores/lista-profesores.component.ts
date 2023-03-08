import { Component, OnInit } from '@angular/core';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styleUrls: ['./lista-profesores.component.css']
})
export class ListaProfesoresComponent implements OnInit {

  arrProfesores: any[] = [];

  constructor(private profesoresService: ProfesoresService) { }

  async ngOnInit() {
    this.arrProfesores = await this.profesoresService.getAll();
    
  }

  async deleteProfesor(profesorId: number) {
    await this.profesoresService.deleteById(profesorId);
    this.arrProfesores = await this.profesoresService.getAll();
    
  }
}
