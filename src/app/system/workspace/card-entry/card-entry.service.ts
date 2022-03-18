import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { Observable } from 'rxjs';
import { CardAttachModel, CardCommentModel } from '../brdstate/brdstate.model';


@Injectable({
    providedIn: 'root'
})


export class CardEntryService {

    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}

        Controllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'Card/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
           return response.json();
           }), catchError(this._cf.handleError));
        }

        EntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Card/createuniv',arr);
        }

        EntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Card/edituniv',arr);
        }
        CreateComment(arr: CardCommentModel){
           return this.http.post(this._globals.baseAPIUrl + 'CardComment/create',arr);
        }
        CreateAttach(arr: CardAttachModel){
           return this.http.post(this._globals.baseAPIUrl + 'CardAttach/create',arr);
        }
        EditComment(arr: CardCommentModel){
           return this.http.post(this._globals.baseAPIUrl + 'CardComment/edit',arr);
        }

        getComments(id: number): Observable<CardCommentModel[]> {
            return this.httpClient.get<CardCommentModel[]>(this._globals.baseAPIUrl + 'CardComment/bycard/' + id).pipe(
            map((result: CardCommentModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }
        getUsers(id: number): Observable<any[]> {
            return this.httpClient.get<any[]>(this._globals.baseAPIUrl + 'CardUser/users/' + id).pipe(
            map((result: any[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }
        getAttachments(id: number): Observable<CardAttachModel[]> {
            return this.httpClient.get<CardAttachModel[]>(this._globals.baseAPIUrl + 'CardAttach/bycard/' + id).pipe(
            map((result: CardAttachModel[]) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }
        
           
}

