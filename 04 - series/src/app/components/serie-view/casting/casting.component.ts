import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/interfaces/character.interface';
import { CharactersService } from 'src/app/services/characters.service';


@Component({
  selector: 'app-casting',
  templateUrl: './casting.component.html',
  styleUrls: ['./casting.component.css']
})
export class CastingComponent implements OnInit {

  characters: Character[] = []

  constructor (
    private charactersService:CharactersService,
    private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit () {
      this.activatedRoute.parent?.params.subscribe((params:any) => {
        let id = parseInt(params.idserie)
        this.characters = this.charactersService.getByIdSerie(id);
      })
    }

}
