import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { ListaProfesoresComponent } from './components/lista-profesores/lista-profesores.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { RegistroComponent } from './components/usuarios/registro/registro.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'clientes', component: ListaClientesComponent, canActivate: [LoginGuard] },
  { path: 'clientes/new', component: FormularioComponent, canActivate: [LoginGuard] },
  { path: 'profesores', component: ListaProfesoresComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
