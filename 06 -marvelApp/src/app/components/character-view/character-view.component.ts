import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/interfaces/character.interface';
import { CharactersService } from 'src/app/services/characters.service';
import { ComicsService } from 'src/app/services/comics.service';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.css']
})
export class CharacterViewComponent implements OnInit {

  characterInfo: Character[] = [];
  comics: any[] =[];
  series: any[] =[];
  showComicsDiv: boolean = false;
  showSeriesDiv: boolean = false;


  constructor (
    private charactersService: CharactersService,
    private comicsService: ComicsService,
    private seriesService: SeriesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit () {
    
    this.activatedRoute.params.subscribe((params: any) => {
      
      let id = parseInt(params.idcharacter)

      this.charactersService.getCharacterById(id)
      .subscribe((data: any) => {
        this.characterInfo = data.data.results
      });
    })
  }

  fetchComicsByCharacter (characterId: number){
    this.comicsService.getComicsByCharacter(characterId)
    .subscribe((data: any)=>{
      if(data.data.count > 0)
      {
        this.comics = data.data.results;
        this.showComicsDiv = true;
      }
    })
  }

  fetchSeriesByCharacter (characterId: number) {
    this.seriesService.getSeriesByCharacter(characterId)
    .subscribe((data: any)=>{
      if (data.data.count > 0)
      {
        this.series = data.data.results;
        this.showSeriesDiv = true;
      }
    })
  }
}
