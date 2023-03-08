// Libreries
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { RegistroComponent } from './components/usuarios/registro/registro.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ListaProfesoresComponent } from './components/lista-profesores/lista-profesores.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaClientesComponent,
    FormularioComponent,
    RegistroComponent,
    LoginComponent,
    NavBarComponent,
    ListaProfesoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
