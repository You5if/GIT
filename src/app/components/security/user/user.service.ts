import { Injectable } from '@angular/core';
import { AppGlobals } from 'src/app/app.global';
import { Http, Response } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { CommonService } from '../../common/common.service';
import { ChangePasswordModel } from './change-password/change-password.model';
import { APIResultModel } from '../../misc/APIResult.Model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _globals: AppGlobals,
    private http: Http,
    private _cf: CommonService

  ) { }


  changepassword(model: ChangePasswordModel) {
    return this.http.post(this._globals.baseAPIUrl + 'user/changepassword', model, this._cf.requestOptions()).pipe(
      map((response: Response) => {
        return response;
      }), catchError(this._cf.handleError)
    );
  }

}
