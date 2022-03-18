import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { map, catchError } from 'rxjs/operators';
import { element, elementClassProp } from '@angular/core/src/render3';
import { Http, Response } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { UserModel, SDCompanyModel, SDUserModel } from './signup.model';

@Injectable({
providedIn: 'root'
})

// Definition of service class
export class SignUpService {

   // Constructor definition
   constructor(
       private _globals: AppGlobals,
       private httpClient: HttpClient,
       private _cf: CommonService,
       private http: Http,
       private _auth: AuthService,
     ) {
     }

   // Get entry method of the model, which fethces data based on provided id (int)
   validateUserName(data: UserModel): Observable<SelectModel[]> {
    return this.http.post(this._globals.baseAPIUrl + 'User/ValidateUserName', data, this._cf.requestOptions()).pipe(
      map((response: Response) => {
      return response.json();
      }), catchError(this._cf.handleError));
  }

  getCompanySubmit(data: SDCompanyModel) {
    data.auditColumns = {
      'userId': 1,
      'hostname': 'test',
      'ipaddress': 'test',
      'devicetype': 'test',
      'macaddress': 'test',
      'companyId': 10001
      };
    return this.http.post(this._globals.baseAPIUrl + 'SDCompany/create', data, this._cf.requestOptions()).pipe(
      map((response: Response) => {
      return response.json();
      }), catchError(this._cf.handleError));
  }

  getUserSubmit(data: SDUserModel) {
    data.auditColumns = {
      'userId': 1,
      'hostname': 'test',
      'ipaddress': 'test',
      'devicetype': 'test',
      'macaddress': 'test',
      'companyId': 10001
      };
    return this.http.post(this._globals.baseAPIUrl + 'SDUser/create', data, this._cf.requestOptions()).pipe(
      map((response: Response) => {
      return response.json();
      }), catchError(this._cf.handleError));
  }
}
