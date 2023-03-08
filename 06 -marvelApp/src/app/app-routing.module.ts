import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterViewComponent } from './components/character-view/character-view.component';
import { ComicsComponent } from './components/comics/comics.component';
import { HomeComponent } from './components/characters/home.component';
import { SeriesComponent } from './components/series/series.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "characters" },
  { path: "characters", component: HomeComponent },
  { path: "character/:idcharacter", component: CharacterViewComponent },
  { path: "comics", component: ComicsComponent },
  { path: "series", component: SeriesComponent },
  { path: "**", redirectTo: "characters" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
