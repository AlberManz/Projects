import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //* Aquí meto todo lo que tenga que hacer el interceptor
    //! En este caso vamos a meter la petición de cabecera con el token

    //* Metemos el token en una variable para trabajar más cómodos
    const token = localStorage.getItem('token');

    //* Cambiarmos el nombre de la variable request porque la vamos a modificar(y vamos a clonar la original por lo que pueda pasar)
    let req = request;

    if (token) {
      req = request.clone({
        setHeaders: {
          authorization: token
        }
      })
    }
    return next.handle(req);
  }
}
