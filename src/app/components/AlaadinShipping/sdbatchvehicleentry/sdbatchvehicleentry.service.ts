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
import { SDBatchVehicleEntryModel, SDVehicleBatchModel } from './sdbatchvehicleentry.model';
// import { SDCompanyModel } from './sdcompany.model';

@Injectable({
providedIn: 'root'
})

// Definition of service class
export class SDBatchVehicleEntryService {

   // Constructor definition
   constructor(
       private _globals: AppGlobals,
       private httpClient: HttpClient,
       private _cf: CommonService,
       private http: Http,
       private _auth: AuthService,
     ) {
     }


     getSDVehicleBatchEntry(id: number): Observable<SDVehicleBatchModel> {
      return this.httpClient.get<SDVehicleBatchModel>(this._globals.baseAPIUrl + 'SDVehicleBatch/' + id).pipe(
      map((result: SDVehicleBatchModel) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }

   getSubmit(data: SDBatchVehicleEntryModel) {

          return this.http.post(this._globals.baseAPIUrl + 'SDBatchVehicleEntry/create', data, this._cf.requestOptions()).pipe(
          map((response: Response) => {
          return response.json();
          }), catchError(this._cf.handleError));
     }
}
