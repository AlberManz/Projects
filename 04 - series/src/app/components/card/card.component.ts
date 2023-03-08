import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/character.interface';
import { Serie } from 'src/app/interfaces/serie.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() item!: Serie | Character | any;
  name: string = "";
  url: string = "";

  ngOnInit () : void {
    this.name = (this.item.titulo) ? this.item.titulo : this.item.nombre_real;
    this.url = (this.item.titulo) ? '/serie' : '/personaje';
  }

}
