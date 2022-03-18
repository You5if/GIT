import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';


import { Send } from '../../../../send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { Observable } from 'rxjs';
import { bankdepositfromcompanyModel, chequefromcompanyModel, PaymentfromcompanyattachmentModel, wiretransferfromcompanyModel } from '../paymentfromcompany.model';


@Injectable({
    providedIn: 'root'
})
export class PaymentFromCompanyEntryService {
    
    
    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}



        Controllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'PaymentFromCompany/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        EntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'PaymentFromCompany/createuniv',arr);
        }

        EntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'PaymentFromCompany/edituniv',arr);
        }

        child1ItemControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'ChequeFromCompany/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        getChild1ItembyChild1(id: number): Observable<chequefromcompanyModel[]> {
            return this.httpClient.get<chequefromcompanyModel[]>(this._globals.baseAPIUrl + 'ChequeFromCompany/bypayment/' + id).pipe(
            map((result: chequefromcompanyModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }

           child2ItemControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'WireTransferFromCompany/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        getChild2ItembyChild2(id: number): Observable<wiretransferfromcompanyModel[]> {
            return this.httpClient.get<wiretransferfromcompanyModel[]>(this._globals.baseAPIUrl + 'WireTransferFromCompany/bypayment/' + id).pipe(
            map((result: wiretransferfromcompanyModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }
           child3ItemControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'BankDepositFromCompany/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        getChild3ItembyChild3(id: number): Observable<bankdepositfromcompanyModel[]> {
            return this.httpClient.get<bankdepositfromcompanyModel[]>(this._globals.baseAPIUrl + 'BankDepositFromCompany/bypayment/' + id).pipe(
            map((result: bankdepositfromcompanyModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }

           child4ItemControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'PaymentFromCompanyAttachment/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        getChild4ItembyChild4(id: number): Observable<PaymentfromcompanyattachmentModel[]> {
            return this.httpClient.get<PaymentfromcompanyattachmentModel[]>(this._globals.baseAPIUrl + 'PaymentFromCompanyAttachment/bypayment/' + id).pipe(
            map((result: PaymentfromcompanyattachmentModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }
        
        



//Bank


}
