import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Serie } from 'src/app/interfaces/serie.interface';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {

  arrSeasons: string[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private seriesService: SeriesService
  ) { }

  ngOnInit() {
    this.activatedRoute.parent?.params.subscribe((params: any) => {
      let idSerie = parseInt(params.idserie)
      let response = this.seriesService.getById(idSerie)
      if (response) {
        this.arrSeasons = response.temporadas
      }
    })
  }

}
