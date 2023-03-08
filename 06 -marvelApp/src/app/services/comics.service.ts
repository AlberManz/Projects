import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../interfaces/comic.interface';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

public_key = 'c7e6dcca22b55b6ba87c2eee1a1c6b88';
hash = '0afff71e24fff4c59b07b534b215481f';
baseUrl = `https://gateway.marvel.com:443/v1/public/`;

  constructor(private httpClient: HttpClient) { }

  getAllComics (): Observable<Comic> {
    return this.httpClient.get<Comic>(`${this.baseUrl}comics?limit=100&offset=1100&apikey=${this.public_key}&hash=${this.hash}`)
  }

  getComicsByCharacter (pId: number): Observable<Comic> {
    return this.httpClient.get<Comic>(`${this.baseUrl}characters/${pId}/comics?apikey=${this.public_key}&hash=${this.hash}`)
  }
}
