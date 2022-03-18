import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppGlobals } from 'src/app/app.global';
import { IMenu, IMenuItem } from 'src/app/components/dynamic/menu/menu.interface';
import { HttpClient } from '@angular/common/http';
import { map, catchError, switchMap, switchMapTo } from 'rxjs/operators';
import { CommonService } from 'src/app/components/common/common.service';
import { AuthService } from '../../security/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private _globals: AppGlobals,
    private httpClient: HttpClient,
    private _cf: CommonService,
    private _auth: AuthService
  ) { }

  getMenus(): Observable<IMenuItem[]> {
    return this.httpClient.get<IMenuItem[]>(this._globals.baseAPIUrl + 'menu/' + this._auth.getUserId()).pipe(
      map((response: IMenuItem[]) => {
        return response;
      }),
      catchError(this._cf.handleError));
  }
}
