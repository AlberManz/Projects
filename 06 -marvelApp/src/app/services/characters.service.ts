import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

publicKey = 'c7e6dcca22b55b6ba87c2eee1a1c6b88';
hash = '0afff71e24fff4c59b07b534b215481f';
baseUrl = `https://gateway.marvel.com:443/v1/public/characters`;

  constructor(private httpClient: HttpClient) { }

  getAllCharacters (): Observable<Character> {
    return this.httpClient.get<Character>(`${this.baseUrl}?limit=100&ts=1&apikey=${this.publicKey}&hash=${this.hash}`);
  }

  getCharacterById (pId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/" + pId + `?apikey=${this.publicKey}&ts=1&hash=${this.hash}`);
  }

  getCharacterByName (characterName: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}?name=${characterName}&ts=1&apikey=${this.publicKey}&hash=${this.hash}`);
  }
}




