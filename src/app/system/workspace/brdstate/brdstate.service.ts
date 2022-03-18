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
import { BrdMemberModel, BrdStateModel, CardModel } from './brdstate.model';
import { BoardModel } from '../workspace.model';

@Injectable({
providedIn: 'root'
})

// Definition of service class
export class BrdStateService {

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
   getBrdStateEntry(id: number): Observable<BrdStateModel> {
      return this.httpClient.get<BrdStateModel>(this._globals.baseAPIUrl + 'BrdState/' + id).pipe(
      map((result: BrdStateModel) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }

   // Submit the form data to api through this method, (verify the audit column parameters are passed properly before production version is released)
   getBrdStateSubmit(data: BrdStateModel) {
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
          return this.http.post(this._globals.baseAPIUrl + 'BrdState/create', data, this._cf.requestOptions()).pipe(
          map((response: Response) => {
          return response.json();
          }), catchError(this._cf.handleError));
          }

          // Case E is for editing an existing record
          case 'E': {
          return this.http.post(this._globals.baseAPIUrl + 'BrdState/edit', data, this._cf.requestOptions()).pipe(
          map((response: Response) => {
          return response.json();
          }), catchError(this._cf.handleError));
          }

          // Case D is for deleting a record
          case 'D': {
          return this.http.post(this._globals.baseAPIUrl + 'BrdState/delete', data, this._cf.requestOptions()).pipe(
          map((response: Response) => {
          return response.json();
          }), catchError(this._cf.handleError));
          }

          default: {
          break;
          }
      }
     }

     createState(arr: any){
      return this.http.post(this._globals.baseAPIUrl + 'BrdState/create',arr);
   }
     editState(arr: any){
      return this.http.post(this._globals.baseAPIUrl + 'BrdState/edit',arr);
   }
     CardA(arr: CardModel){
      return this.http.post(this._globals.baseAPIUrl + 'Card/create',arr);
   }

   CardE(arr: CardModel){
      return this.http.post(this._globals.baseAPIUrl + 'Card/edit',arr);
   }

   MemberA(arr: any){
      return this.http.post(this._globals.baseAPIUrl + 'BrdMember/create',arr);
   }

   getBoardStateEntry(id: number): Observable<BrdStateModel[]> {
    return this.httpClient.get<BrdStateModel[]>(this._globals.baseAPIUrl + 'BrdState/byboard/' + id).pipe(
    map((result: BrdStateModel[]) => {
    return result;
    }), catchError(this._cf.handleError)
    );
   }
   getLastState(id: number): Observable<any> {
      return this.httpClient.get<any>(this._globals.baseAPIUrl + 'Board/laststate/' + id).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
   getCards(id: number): Observable<CardModel[]> {
    return this.httpClient.get<CardModel[]>(this._globals.baseAPIUrl + 'Card/byboard/' + id).pipe(
    map((result: CardModel[]) => {
    return result;
    }), catchError(this._cf.handleError)
    );
   }
   getEmployeeCards(id: number, id2: number): Observable<CardModel[]> {
    return this.httpClient.get<CardModel[]>(this._globals.baseAPIUrl + 'Card/byemployee/' + id + '/' + id2).pipe(
    map((result: CardModel[]) => {
    return result;
    }), catchError(this._cf.handleError)
    );
   }
   getMembers(id: number): Observable<BrdMemberModel[]> {
      return this.httpClient.get<BrdMemberModel[]>(this._globals.baseAPIUrl + 'BrdMember/byboard/' + id).pipe(
      map((result: BrdMemberModel[]) => result), catchError(this._cf.handleError)
      );
     }
   getBoardEntry(id: number): Observable<BoardModel> {
    return this.httpClient.get<BoardModel>(this._globals.baseAPIUrl + 'Board/' + id).pipe(
    map((result: BoardModel) => {
    return result;
    }), catchError(this._cf.handleError)
    );
   }
}
