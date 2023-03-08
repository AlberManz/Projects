import { Component, OnInit } from '@angular/core';
import { Serie } from 'src/app/interfaces/serie.interface';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  allSeries: Serie[] = [];

  constructor (private seriesService: SeriesService) {}

  ngOnInit (): void {
    this.seriesService.getAllSeries()
    .subscribe((data: any) => {
      this.allSeries = data.data.results;
    });
  }
}
