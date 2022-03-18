import { Injectable } from '@angular/core';
import { AppGlobals } from 'src/app/app.global';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { CommonService } from '../common.service';
import { AuthService } from '../../security/auth/auth.service';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PageEventsService {

  constructor(
    private _globals: AppGlobals,
    private http: Http,
    private _cf: CommonService,
    private _auth: AuthService
  ) { }

  getPageSortEntry(pTableId: number) {
    return this.http.post(this._globals.baseAPIUrl + 'PageEvents/GetSortPageEntry/'
      + pTableId + '/' + this._auth.getUserId(), [], this._cf.requestOptions()).pipe(
        map((response: Response) => {
          return response.json();
        }), catchError(this._cf.handleError));
  }
}
