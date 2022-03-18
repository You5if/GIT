import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { Observable } from 'rxjs';
import { WorkspaceModel } from '../workspace/workspace.model';



@Injectable({
    providedIn: 'root'
})


export class TemplateService {

    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}

        Controllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'Workspace/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
           return response.json();
           }), catchError(this._cf.handleError));
        }

        EntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Workspace/createuniv',arr);
        }

        EntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Workspace/edituniv',arr);
        }

        getWorkspaceEntry(id: number): Observable<WorkspaceModel> {
            return this.httpClient.get<WorkspaceModel>(this._globals.baseAPIUrl + 'Workspace/' + id).pipe(
            map((result: WorkspaceModel) => {
            return result;
            }), catchError(this._cf.handleError)
            );
           }
}

