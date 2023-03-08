import { Component } from '@angular/core';
import { Comic } from 'src/app/interfaces/comic.interface';
import { ComicsService } from 'src/app/services/comics.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent {

  allComics: Comic[] = [];

  constructor (private comicsService: ComicsService) {}

  ngOnInit (): void {
    this.comicsService.getAllComics().subscribe((data: any) => {
      this.allComics = data.data.results
    })
  }

}
