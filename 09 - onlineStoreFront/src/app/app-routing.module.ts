import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormProductsComponent } from './components/productos/form-products/form-products.component';
import { LoginComponent } from './components/login/login.component';
import { ListaProductosComponent } from './components/productos/lista-productos/lista-productos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ListaProductosComponent },
  { path: 'productos/new', component: FormProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
