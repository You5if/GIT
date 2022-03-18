import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';

import { Sources } from '../../../dynamic-form/source.model';
import { Send } from '../../../send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';


@Injectable({
    providedIn: 'root'
})
export class ForexService {
    
    
    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}



        forexControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'Forex/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        forexEntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Forex/createuniv',arr);
        }
        forexEntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Forex/edituniv',arr);
        }



//Bank


}
