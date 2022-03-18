import { Injectable } from '@angular/core';
import { AppGlobals } from 'src/app/app.global';
import { Http } from '@angular/http';

import { map } from 'rxjs/operators';
import { CommonService } from 'src/app/components/common/common.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { FileListModel } from 'src/app/components/common/upload/upload-file.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  imgData: FileListModel;

    imgFullPath: string ;
    imgFullPath2: string ;
    imgExtention: string ;
    imgApiPath: string ;
    imgFileName: string ;
    imgOriginalFileName: string ;

  constructor(
    private _msg: MessageBoxService,
    private _globals: AppGlobals,
    private http: Http,
    private _cf: CommonService
  ) { }

  deleteFile(pFileName: string) {
    return this.http.post(this._globals.baseAPIUrl + 'file/delete/' + pFileName, this._cf.requestOptions ).pipe(
      map((res) => {
        return res;
      }));
  }

  getFileIcon(extention: string, apiPath: string) {
    
    switch (extention.toLowerCase()) {
      case '.pdf': {
        // this._msg.showInfo("Message", "file uploaded succesfully");
        return this._globals.baseAPIRootUrl + 'resources/images/pdf.jpg';
        break;
      }
      case '.doc': {
        // this._msg.showInfo("Message", "file uploaded succesfully");
        return this._globals.baseAPIRootUrl + 'resources/images/doc.jpg';
        break;
      }
      case '.docx': {
        // this._msg.showInfo("Message", "file uploaded succesfully");
        return this._globals.baseAPIRootUrl + 'resources/images/docx.jpg';
        break;
      }
      case '.ppt': {
        // this._msg.showInfo("Message", "file uploaded succesfully");
        return this._globals.baseAPIRootUrl + 'resources/images/ppt.jpg';
        break;
      }
      case '.pptx': {
        // this._msg.showInfo("Message", "file uploaded succesfully");
        return this._globals.baseAPIRootUrl + 'resources/images/pptx.jpg';
        break;
      }
      case '.xls': {
        // this._msg.showInfo("Message", "file uploaded succesfully");
        return this._globals.baseAPIRootUrl + 'resources/images/xls.jpg';
        break;
      }
      case '.xlsx': {
        // this._msg.showInfo("Message", "file uploaded succesfully");
        return this._globals.baseAPIFileUrl + 'resources/images/xlsx.jpg';
        break;
      }
      case '.txt': {
        // this._msg.showInfo("Message", "file uploaded succesfully");
        return this._globals.baseAPIRootUrl + 'resources/images/txt.jpg';
        break;
      }
      case ('.jpg'): {
        // this._msg.showInfo("Message", "file uploaded succesfully");
        return this._globals.baseAPIFileUrl + apiPath;
        break;
      }
      case ('.jpeg'): {
        // this._msg.showInfo("Message", "file uploaded succesfully");
        return this._globals.baseAPIFileUrl + apiPath;
        break;
      }
      case ('.png'): {
        // this._msg.showInfo("Message", "file uploaded succesfully");
        return this._globals.baseAPIFileUrl + apiPath;
        break;
      }
      case '.tif': {
        // this._msg.showInfo("Message", "file uploaded succesfully");
        return apiPath;
        break;
      }
      case '.gif': {
        // this._msg.showInfo("Message", "file uploaded succesfully");
        return apiPath;
        break;
      }
      case '.bmp': {
        // this._msg.showInfo("Message", "file uploaded succesfully");
        return apiPath;
        break;
      }
      default: {
        // this._msg.showInfo("Message", "file uploaded succesfully");
        return this._globals.baseAPIRootUrl + 'resources/images/unknown.jpg';
        break;
      }
    }
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
}

