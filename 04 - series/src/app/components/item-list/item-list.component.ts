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

  //* Opción con 2 arrays más fácil de la otra forma
  // arrSeries: Serie[] = []
  // arrCharacters: Character[] = []

  titulo: string=""
  arrItems: Serie[] | Character[] | any[] = []
  canal: string = "" // Creamose sta propiedad porque queremos pintar el nombre de la serie en el html

  constructor (
    private seriesService: SeriesService,
    private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit () {
    //! Aquí vamos a tener que discriminar entre series y personajes, estamos en un componente que tiene ruta estática
    // Opción 1: javascript -> console.log(window.location)
    // Opción 2: con router -> console.log(this.router.url)
    this.titulo = this.activatedRoute.snapshot.url[0].path // Captura de ruta estática (si hacemos un console.log vemos que dentro del objeto hay un url que es un array y queremos la posición .)
    this.arrItems = (this.titulo === 'series') ? this.seriesService.getAll() : this.charactersService.getAll()
  }

  ngDoCheck (): void {
    if(this.activatedRoute.snapshot.url.length > 1){ // Con esto comprobamos que el array url tiene más de un elemento, lo que significa que la ruta va a tener varias partes
      this.canal = this.activatedRoute.snapshot.url[1].path
      this.arrItems = this.seriesService.getByChannel(this.canal)
    }
  }

}
