import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Serie } from '../interfaces/serie.interface';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

public_key = 'c7e6dcca22b55b6ba87c2eee1a1c6b88';
hash = '0afff71e24fff4c59b07b534b215481f';
baseUrl = `https://gateway.marvel.com:443/v1/public/`;

  constructor(private httpClient: HttpClient) { }

  getAllSeries (): Observable<Serie> {
    return this.httpClient.get<Serie>(`${this.baseUrl}series?limit=100&offset=1100&apikey=${this.public_key}&hash=${this.hash}`)
  }

  getSeriesByCharacter (pId: number): Observable<any> {
    return this.httpClient.get<Serie>(`${this.baseUrl}characters/${pId}/series?apikey=${this.public_key}&hash=${this.hash}`)
  }
}
