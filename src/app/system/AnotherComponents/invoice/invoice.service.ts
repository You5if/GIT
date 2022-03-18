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
import { InvoiceModel } from './invoice.model';

@Injectable({
providedIn: 'root'
})


// Definition of service class
export class InvoiceService {

  

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
   getInvoiceEntry(id: number): Observable<InvoiceModel> {
      return this.httpClient.get<InvoiceModel>(this._globals.baseAPIUrl + 'Invoice/' + id).pipe(
      map((result: InvoiceModel) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
   
    getDelete(id: number): Observable<any> {
      return this.httpClient.get<any>(this._globals.baseAPIUrl + 'Invoice/delete/' + id).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
   // Submit the form data to api through this method, (verify the audit column parameters are passed properly before production version is released)
   getInvoiceSubmit(data: InvoiceModel) {
      data.auditColumns = {
      'userId': 1,
      'hostname': 'test',
      'ipaddress': 'test',
      'devicetype': 'test',
      'macaddress': 'test',
      'companyId': 10001
      };
      switch (data.entryMode) {

          // Case A is for adding a new record
          case 'A': {
          return this.http.post(this._globals.baseAPIUrl + 'Invoice/create', data, this._cf.requestOptions()).pipe(
          map((response: Response) => {
          return response.json();
          }), catchError(this._cf.handleError));
          }

          // Case E is for editing an existing record
          case 'E': {
          return this.http.post(this._globals.baseAPIUrl + 'Invoice/edit', data, this._cf.requestOptions()).pipe(
          map((response: Response) => {
          return response.json();
          }), catchError(this._cf.handleError));
          }

          // Case D is for deleting a record
          case 'D': {
          return this.http.post(this._globals.baseAPIUrl + 'Invoice/delete', data, this._cf.requestOptions()).pipe(
          map((response: Response) => {
          return response.json();
          }), catchError(this._cf.handleError));
          }

          default: {
          break;
          }
      }
     }


     
}
