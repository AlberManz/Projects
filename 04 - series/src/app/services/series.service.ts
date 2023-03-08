import { Injectable } from '@angular/core';
import { SERIES } from '../db/series.db';
import { Serie } from '../interfaces/serie.interface';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  private arrSeries: Serie[] = SERIES;

  constructor() { }

  getAll (): Serie[] {
    return this.arrSeries;
  }

  getById (pId: number): Serie | undefined {
    return this.arrSeries.find(serie => serie.id === pId);
  }

  getAllChannels (): string[] {
    //! Lo mapeamos para coger SOLO las series
    let channels = this.arrSeries.map(serie => serie.canal);
    channels = [...new Set(channels)]; // Eliminamos los duplicados
    return channels
  }

  getByChannel (pCanal: string): Serie[] {
    return this.arrSeries.filter(serie => serie.canal.toLowerCase().includes(pCanal))
  }
}
