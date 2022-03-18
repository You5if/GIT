import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';

import { Sources } from '../../dynamic-form/source.model';
import { Send } from '../../send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { FileListModel } from 'src/app/components/common/upload/upload-file.model';
import { AppUserPasswordModel } from '../system-navigation/change-password.component';


@Injectable({
    providedIn: 'root'
})
export class BusinessService {

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



        businessControllers(model: Send) {
            return this.http.post(this._globals.baseAPIUrl + 'Business/getuniventry', model, this._cf.requestOptions()).pipe(
           map((response: any) => {
               console.log('here: ', JSON.stringify(response.json()));
           return response.json();
           }), catchError(this._cf.handleError));
           }

        businessEntryE(arr: any){
           return this.http.post(this._globals.baseAPIUrl + 'Business/edituniv',arr);
        }
        ChangePassword(arr: AppUserPasswordModel){
           return this.http.post(this._globals.baseAPIUrl + 'AppUser/changepassword',arr);
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
