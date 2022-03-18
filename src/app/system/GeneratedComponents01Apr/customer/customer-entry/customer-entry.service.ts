import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';


import { Send } from '../../../../send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { Observable } from 'rxjs';
import { CustomerAccountModel } from '../customer.model';


@Injectable({
    providedIn: 'root'
})
export class CustomerEntryService {
    
    
    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}



        customerControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'Customer/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        EntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Customer/createuniv',arr);
        }

        EntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Customer/edituniv',arr);
        }

        child1ItemControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'CustomerAccount/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        getCustomerItembyCustomer(id: number): Observable<CustomerAccountModel[]> {
            return this.httpClient.get<CustomerAccountModel[]>(this._globals.baseAPIUrl + 'CustomerAccount/bycustomer/' + id).pipe(
            map((result: CustomerAccountModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }
        



//Bank


}
