import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';

import { Sources } from '../../../dynamic-form/source.model';
import { Send } from '../../../send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { Observable } from 'rxjs';
import { SelectModel } from 'src/app/components/misc/SelectModel';


@Injectable({
    providedIn: 'root'
})
export class AccountService {
    
    
    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}



        accountControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'Account/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        accountEntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Account/createuniv',arr);
        }

        accountEntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Account/edituniv',arr);
        }



        

         generateCode(accountType: string, parentAcoountId: string): Observable<SelectModel[]> {
            return this.httpClient.get<SelectModel[]>(this._globals.baseAPIUrl + 'Account/generatecode/' + accountType + '/' + parentAcoountId).pipe(
            map((result: SelectModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }

         
        





//Bank


}
