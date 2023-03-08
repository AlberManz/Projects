import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  arrChannels: string[] = []
  selectActive: boolean = true

  constructor (
    private seriesServices:SeriesService,
    private router: Router
    ) {}

  ngOnInit () : void{
    this.arrChannels = this.seriesServices.getAllChannels()
  }

  ngDoCheck () : void {
    let path = this.router.url
    this.selectActive = (path.includes('personaje') ? false : true) // ponemos includes personaje porque de esa manera nos valdrá para personaje y personajes y me lo quitará de cualquier url que tenga la palabra personaje/personajes
  }

  getChannels ($event: any): void {
    if($event.target.value === 'todas'){
      // Todas las series
      this.router.navigate(['/series'])
    }else{
      // Iríamos a la ruta de series por canal
      this.router.navigate(['/series', this.urlSanitizer($event.target.value)])
    }
  }

  urlSanitizer (pChannel: string): string {
    let resultado = pChannel.split(" ")[0]; // Parto lo que recibo (que son dos palabras) y las parto por el espacio, quedándome con la primera parte (por eso [0])
    return resultado.toLowerCase()
  }
}


