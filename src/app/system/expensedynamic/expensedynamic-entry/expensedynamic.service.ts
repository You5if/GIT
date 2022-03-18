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
import { ExpenseFilingItemModel, ExpenseFilingTaxModel } from '../../expensefiling/expensefiling/expensefiling.model';


@Injectable({
    providedIn: 'root'
})
export class ExpenseDynamicService {
    
    
    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}



        expenseControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'ExpenseFiling/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

           expenseEntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'ExpenseFiling/createuniv',arr);
        }
        expenseEntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'ExpenseFiling/edituniv',arr);
        }

        expenseItemControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'ExpenseFilingItem/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }
        expenseTaxControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'ExpenseFilingTax/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

           getExpenseItembyExpense(id: number): Observable<ExpenseFilingItemModel[]> {
            return this.httpClient.get<ExpenseFilingItemModel[]>(this._globals.baseAPIUrl + 'ExpenseFilingItem/byexpense/' + id).pipe(
            map((result: ExpenseFilingItemModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }

           getExpenseTaxbyExpense(id: number): Observable<ExpenseFilingTaxModel[]> {
            return this.httpClient.get<ExpenseFilingTaxModel[]>(this._globals.baseAPIUrl + 'ExpenseFilingTax/byexpense/' + id).pipe(
            map((result: ExpenseFilingTaxModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }



//Bank


}
