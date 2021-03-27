import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() { }
  //tokenExpiration
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //var token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    //console.log(token);
    const authReq = request.clone({
      headers: new HttpHeaders({
        //'accessToken': 'base64:mcP33ANGzmG5F7LmzUoXICw/Fkje0yCuiGJkw+xCp+Q=',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    });
    return next.handle(authReq);
  }
}
