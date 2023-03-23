import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  asideVisible: boolean = true;

  constructor(private router: Router) { }

  ngDoCheck(): void {
    this.asideVisible = (this.router.url === '/personajes' || this.router.url.includes('/series')) ? true : false
  }

}
