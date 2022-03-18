import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { map, catchError } from 'rxjs/operators';
import { element, elementClassProp } from '@angular/core/src/render3';
import { Http, Response } from '@angular/http';
import { CountryModel } from './country/country.model';

@Injectable({
  providedIn: 'root'
})
export class RegionalService {

  mSelectList: SelectModel[];

  constructor(
    private _globals: AppGlobals,
    private httpClient: HttpClient,
    private _cf: CommonService,
    private http: Http
  ) { }

  getCountryEntry(pId: number) {
    return this.httpClient.get<CountryModel>(this._globals.baseAPIUrl + 'country/' + pId).pipe(
      map((response: CountryModel) => {
        return response;
      }),
      catchError(this._cf.handleError));
  }

  getCountrySubmit(data: CountryModel) {
    switch (data.entryMode) {
      case 'A': {
        return this.http.post(this._globals.baseAPIUrl + 'country/create', data, this._cf.requestOptions()).pipe(
          map((response: Response) => {
            return response.json();
          }), catchError(this._cf.handleError));
        break;
      }
      case 'E': {
        return this.http.post(this._globals.baseAPIUrl + 'country/edit', data, this._cf.requestOptions()).pipe(
          map((response: Response) => {
            return response.json();
          }), catchError(this._cf.handleError));
        break;
        }
        case 'D': {
        return this.http.post(this._globals.baseAPIUrl + 'country/delete', data, this._cf.requestOptions()).pipe(
          map((response: Response) => {
            return response.json();
          }), catchError(this._cf.handleError));
        break;
      }
      default: {
        break;
      }
    }
  }

  getCountry(pSearch: string) {
    return this.http.post(this._globals.baseAPIUrl + 'Ddl/acCountry/' + pSearch + '/false', this._cf.requestOptions()).pipe(
      map((response: Response) => {
        return response.json();
      }), catchError(this._cf.handleError)
    );
  }
}
