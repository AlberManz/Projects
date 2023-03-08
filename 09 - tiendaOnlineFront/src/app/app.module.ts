import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ListaProductosComponent } from './components/productos/lista-productos/lista-productos.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FormProductsComponent } from './components/productos/form-products/form-products.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListaProductosComponent,
    FormProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
