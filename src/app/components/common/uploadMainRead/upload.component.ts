import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { AppGlobals } from 'src/app/app.global';
import { FileListModel } from './upload-file.model';
import {NgxImageCompressService} from 'ngx-image-compress';
import { UploadFilesReadComponent } from './upload-files/upload-files.component';
import { Ng2ImgMaxService } from 'ng2-img-max';


@Component({
  selector: 'app-uploadread',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadReadComponent implements OnInit { // step.2
  @Input() myFiles: FileListModel[];
  tmpFilesList: FileListModel[] = [];
  public progress: number;
  public message: string;
  public uploadStatus: boolean;
  public uploadedFile: FileListModel;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onUploadFinished = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onDeleteFile = new EventEmitter();
  @ViewChild(UploadFilesReadComponent) childFileListComponent: UploadFilesReadComponent;

  constructor(
    private http: HttpClient,
    private _globals: AppGlobals,
    private imageCompress: NgxImageCompressService,
    private ng2ImgMax: Ng2ImgMaxService,
  ) { }

  ngOnInit() {
    this.progress = 0;
    this.uploadStatus = false;
    this.uploadedFile = {
      apiPath: this._globals.baseAPIFileUrl + 'Resources/Images/NoImage.jpg',
      extention: 'jpg',
      fileName: 'NoImage.jpg',
      fullPath: this._globals.baseAPIRootUrl + 'Resources/Images/NoImage.jpg',
      originalFileName: 'NoImage.jpg',
      apiImagePath: this._globals.baseAPIRootUrl + 'Resources/Images/NoImage.jpg',
    };
  }

  public uploadFile = (files) => {
    this.uploadStatus = false;
    if (files.length === 0) {
      return;
    }
    // tslint:disable-next-line:prefer-const
    let fileToUpload = <File>files[0];
    // this.ng2ImgMax.resizeImage(fileToUpload, 400, 300).subscribe( // first way
    // this.ng2ImgMax.compressImage(image, 0.075).subscribe( // second way
    this.ng2ImgMax.compressImage(fileToUpload, 0.5).subscribe(
      result => {
        fileToUpload = result;
        const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(this._globals.baseAPIUrl + 'file/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          this.uploadStatus = false;
        } else if (event.type === HttpEventType.Response) {
          const res: any = event.body;
          this.uploadedFile = {
            apiPath:  res.apiPath,
            extention: res.extention,
            fileName: res.fileName,
            fullPath: res.fullPath,
            originalFileName: res.originalFileName,
            // apiImagePath: this._globals.baseAPIRootUrl + res.apiPath
            apiImagePath: res.apiImagePath
          };
          this.uploadStatus = true;
          this.onUploadFinished.emit(event.body);
          // this.tmpFilesList.push(this.uploadedFile);
          // this.myFiles.push(this.uploadedFile);
          this.message =  fileToUpload.name + ' upload success!';
        }
        // this.myFiles = this.tmpFilesList;
        this.childFileListComponent.refreshMe();
        return;
      });
      },
      error => {
        const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(this._globals.baseAPIUrl + 'file/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          this.uploadStatus = false;
        } else if (event.type === HttpEventType.Response) {
          const res: any = event.body;
          this.uploadedFile = {
            apiPath:  res.apiPath,
            extention: res.extention,
            fileName: res.fileName,
            fullPath: res.fullPath,
            originalFileName: res.originalFileName,
            // apiImagePath: this._globals.baseAPIRootUrl + res.apiPath
            apiImagePath: res.apiImagePath
          };
          this.uploadStatus = true;
          this.onUploadFinished.emit(event.body);
          // this.tmpFilesList.push(this.uploadedFile);
          // this.myFiles.push(this.uploadedFile);
          this.message =  fileToUpload.name + ' upload success!';
        }
        // this.myFiles = this.tmpFilesList;
        this.childFileListComponent.refreshMe();
        return;
      });
      }
    );
    }


    public onFileDeleteFromList = (event) => {
      if (event !== undefined || event !== null) {
        for (let index = 0; index < this.myFiles.length; index++) {
          if (this.myFiles[index].fileName === event._body) {
            const delIndex = this.myFiles.indexOf(this.myFiles[index], 0);
            if (delIndex > -1) {
              this.myFiles.splice(delIndex, 1);
            }
          }
        }
      }
      this.onDeleteFile.emit(event);
      this.childFileListComponent.refreshMe();
    }

    showProgress() {
      if (this.progress > 0 && this.progress < 100) {
        return true;
      } else {
        return false;
      }
    }
}


