import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  asideVisible: boolean = true;

  constructor (private router: Router) {}

  ngDoCheck () : void {
    //! Capturo la ruta y no lo puedo hacer en el ngOnInit porque el app-component se carga al principio y el ngOnInit solo se carga una vez
    // El asideVisible solo es visible si estamos en /personajes y en /series
    //! asideVisible será visible (true) si router.url es igual a /personajes o si incluye /series (para que se muestre también cuando cambio de canal en el selector) sino no será visible (false)
    this.asideVisible = (this.router.url === '/personajes' || this.router.url.includes('/series')) ? true : false
  }

}
