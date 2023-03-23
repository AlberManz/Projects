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

  constructor(
    private seriesServices: SeriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.arrChannels = this.seriesServices.getAllChannels()
  }

  // Filtro
  ngDoCheck(): void {
    let path = this.router.url
    this.selectActive = (path.includes('personaje') ? false : true)
  }

  // Conseguimos los canales
  getChannels($event: any): void {
    if ($event.target.value === 'todas') {
      this.router.navigate(['/series'])
    } else {
      this.router.navigate(['/series', this.urlSanitizer($event.target.value)])
    }
  }

  // Sanitizamos la url
  urlSanitizer(pChannel: string): string {
    let resultado = pChannel.split(" ")[0]
    return resultado.toLowerCase()
  }
}


