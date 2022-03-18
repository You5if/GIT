import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';


import { Send } from '../../../../send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';


@Injectable({
    providedIn: 'root'
})
export class ProductPricingEntryService {
    
    
    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}



        Controllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'ProductPricing/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }
        Controllers2(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'AdjustPrice/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        EntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'ProductPricing/createuniv',arr);
        }

        EntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'ProductPricing/edituniv',arr);
        }
        EntryA2(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'AdjustPrice/createuniv',arr);
        }

        EntryE2(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'AdjustPrice/edituniv',arr);
        }
        



//Bank


}
