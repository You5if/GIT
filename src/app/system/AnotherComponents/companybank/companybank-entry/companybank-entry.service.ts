import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';


import { Send } from '../../../../send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { FileListModel } from 'src/app/system/upload/upload-file.model';


@Injectable({
    providedIn: 'root'
})
export class CompanyBankEntryService {
    
    imgData: FileListModel;

    imgFullPath: string ;
    imgFullPath2: string ;
    imgExtention: string ;
    imgApiPath: string ;
    imgFileName: string ;
    imgOriginalFileName: string ;
    
    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) {}



        companyBankControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'CompanyBank/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', response.json());
           return response.json();
           }), catchError(this._cf.handleError));
           }

           companyBankEntryA(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'CompanyBank/createuniv',arr);
        }

        companyBankEntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'CompanyBank/edituniv',arr);
        }

        imageChange(keyPass: FileListModel) {

            this.imgFullPath = keyPass.fullPath
            this.imgExtention = keyPass.extention
            this.imgFileName = keyPass.fileName
            this.imgApiPath = keyPass.apiPath
            this.imgOriginalFileName = keyPass.originalFileName
           
        }
        imageChange2(keyPass: FileListModel) {

            this.imgFullPath2 = keyPass.fullPath
            this.imgExtention = keyPass.extention
            this.imgFileName = keyPass.fileName
            this.imgApiPath = keyPass.apiPath
            this.imgOriginalFileName = keyPass.originalFileName
           
        }
        



//Bank


}
