import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/interfaces/character.interface';
import { Serie } from 'src/app/interfaces/serie.interface';
import { CharactersService } from 'src/app/services/characters.service';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  titulo: string = ""
  arrItems: Serie[] | Character[] | any[] = []
  canal: string = ""

  constructor(
    private seriesService: SeriesService,
    private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.titulo = this.activatedRoute.snapshot.url[0].path
    this.arrItems = (this.titulo === 'series') ? this.seriesService.getAll() : this.charactersService.getAll()
  }

  ngDoCheck(): void {
    if (this.activatedRoute.snapshot.url.length > 1) {
      this.canal = this.activatedRoute.snapshot.url[1].path
      this.arrItems = this.seriesService.getByChannel(this.canal)
    }
  }

}
