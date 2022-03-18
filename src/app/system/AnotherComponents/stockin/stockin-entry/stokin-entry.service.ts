import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';


import { Send } from '../../../../send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { Observable } from 'rxjs';
import { stockinproductModel } from '../stockin.model';
import { productPricingModel } from '../../invoice/invoice.model';


@Injectable({
    providedIn: 'root'
})
export class StockInEntryService {
    
    
    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}



        Controllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'StockIn/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        EntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'StockIn/createuniv',arr);
        }

        EntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'StockIn/edituniv',arr);
        }
        child1ItemControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'StockInProduct/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

        getChild1ItembyChild1(id: number): Observable<stockinproductModel[]> {
            return this.httpClient.get<stockinproductModel[]>(this._globals.baseAPIUrl + 'StockInProduct/bystockin/' + id).pipe(
            map((result: stockinproductModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }

           getProductPricing(id: number): Observable<productPricingModel> {
            return this.httpClient.get<productPricingModel>(this._globals.baseAPIUrl + 'ProductPricing/productpricing/' + id).pipe(
            map((result: productPricingModel) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }



//Bank


}
