import { getLocaleCurrencyCode } from '@angular/common';
import { Injectable } from '@angular/core';
import { CHARACTERS } from '../db/personajes.db';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private arrCharacters: Character[] = CHARACTERS;

  constructor() { }

  getAll (): Character[] {
    return this.arrCharacters
  }

  getById(pId: number): Character | undefined {
    return this.arrCharacters.find( character => character.id === pId)
  }

  getByIdSerie (pIdSerie: number) : Character[] {
    return this.arrCharacters.filter(character => character.serie === pIdSerie)
  }
}
