import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './components/security/auth/auth.service';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public _auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this._auth.getToken()}`
      }
    });

    return next.handle(request);
  }
}
