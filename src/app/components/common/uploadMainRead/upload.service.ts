import { Injectable } from '@angular/core';
import { AppGlobals } from 'src/app/app.global';
import { Http } from '@angular/http';
import { CommonService } from '../common.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
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
    switch (extention) {
      case '.pdf': {
        return this._globals.baseAPIRootUrl + 'resources/images/pdf.jpg';
        break;
      }
      case '.doc': {
        return this._globals.baseAPIRootUrl + 'resources/images/doc.jpg';
        break;
      }
      case '.docx': {
        return this._globals.baseAPIRootUrl + 'resources/images/docx.jpg';
        break;
      }
      case '.ppt': {
        return this._globals.baseAPIRootUrl + 'resources/images/ppt.jpg';
        break;
      }
      case '.pptx': {
        return this._globals.baseAPIRootUrl + 'resources/images/pptx.jpg';
        break;
      }
      case '.xls': {
        return this._globals.baseAPIRootUrl + 'resources/images/xls.jpg';
        break;
      }
      case '.xlsx': {
        return this._globals.baseAPIFileUrl + 'resources/images/xlsx.jpg';
        break;
      }
      case '.txt': {
        return this._globals.baseAPIRootUrl + 'resources/images/txt.jpg';
        break;
      }
      case ('.jpg'): {
        return this._globals.baseAPIFileUrl + apiPath;
        break;
      }
      case '.tif': {
        return apiPath;
        break;
      }
      case '.gif': {
        return apiPath;
        break;
      }
      case '.bmp': {
        return apiPath;
        break;
      }
      case '.png': {
        return apiPath;
        break;
      }
      default: {
        return this._globals.baseAPIRootUrl + 'resources/images/unknown.jpg';
        break;
      }
    }
  }
}

