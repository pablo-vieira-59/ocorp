import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MiddlewareService {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    var token = localStorage.getItem("token");

    const modifiedRequest = request.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + token,
      }
    });

    // Pass the modified request to the next interceptor or the final HTTP handler
    return next.handle(modifiedRequest);
  }
}
