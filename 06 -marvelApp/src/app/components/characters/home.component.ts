import { Component } from '@angular/core';
import { debounceTime } from 'rxjs';
import { Character } from 'src/app/interfaces/character.interface';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  arrCharacters: Character[] = [];
  page!: number;
  characterName!: string;
  searchedCharacter: Character[] = [];
  showSearchedCharacter!: boolean;

  constructor (private charactersService: CharactersService) {}

  ngOnInit (): void {
   this.getData();
  }
  
  findCharacter (event: any) {
   this.characterName = event.target.value;
   this.charactersService.getCharacterByName(this.characterName)
   .pipe(
    debounceTime(400))
   .subscribe((data) => {
     if(data.data.count > 0)
     {
      this.showSearchedCharacter = true;
      this.searchedCharacter = data.data.results;
     } else {
      this.getData();
     }
   });
  }

  getData () {
    this.charactersService.getAllCharacters().subscribe((data: any) => {
      this.arrCharacters = data.data.results;
    })
    this.showSearchedCharacter = false;
  }
}


