import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Serie } from 'src/app/interfaces/serie.interface';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-serie-view',
  templateUrl: './serie-view.component.html',
  styleUrls: ['./serie-view.component.css']
})
export class SerieViewComponent implements OnInit {

  serie!: Serie

  constructor (
    private seriesService: SeriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit () {
    this.activatedRoute.params.subscribe((params: any) => {
      let id = parseInt(params.idserie)
      let response = this.seriesService.getById(id)

      if (response) {
        this.serie = response;
      } else {
        this.router.navigate(['/series'])
      }
    })
  }
}
