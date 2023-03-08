import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsListComponent } from './components/dashboard/products-list/products-list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { ProductViewComponent } from './components/dashboard/product-view/product-view.component';
import { FormComponent } from './components/dashboard/form/form.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  //! Aquí no podemos entrar a no ser que estemos logueados, que haremos con GUARD
  { path: "dashboard", component: DashboardComponent, canActivate:[LoginGuard], children: 
    [
      { path: "", pathMatch: "full", redirectTo: "products" },
      { path: "products", component: ProductsListComponent },
      { path: "product/:idproduct", component: ProductViewComponent},
      { path: "new-product", component: FormComponent},
      { path: "update/:idproduct", component: FormComponent}
    ] 
  },
  { path: "**", redirectTo: "/" } // Enviamos a la ruta raíz (home) con /
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
