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
export class ProductEntryService {
    
    
    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}



        productControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'Product/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        productEntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Product/createuniv',arr);
        }

        productEntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Product/edituniv',arr);
        }
        



//Bank


}
