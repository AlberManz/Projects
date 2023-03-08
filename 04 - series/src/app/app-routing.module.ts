import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterViewComponent } from './components/character-view/character-view.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { CastingComponent } from './components/serie-view/casting/casting.component';
import { SeasonsComponent } from './components/serie-view/seasons/seasons.component';
import { SerieViewComponent } from './components/serie-view/serie-view.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'series' },
  { path: 'series', component: ItemListComponent },
  { path: 'series/:channel', component: ItemListComponent},
  { 
    path: 'serie/:idserie', component: SerieViewComponent, children: [
        { path: '', pathMatch: 'full', redirectTo: 'temporadas'},
        { path: 'reparto', component: CastingComponent },
        { path: 'temporadas', component: SeasonsComponent }
      ]
  },
  { path: 'personajes', component: ItemListComponent},
  { path: 'personaje/:idcharacter', component: CharacterViewComponent},
  { path: '**', redirectTo: 'series' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
