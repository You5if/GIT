import { Component, OnInit, Inject } from '@angular/core';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { AppGlobals } from 'src/app/app.global';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileListModel } from 'src/app/components/common/upload/upload-file.model';
import { HttpClient } from '@angular/common/http';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { AuthService } from 'src/app/components/security/auth/auth.service';

@Component({
    selector: 'app-attendance-uploadread',
    templateUrl: './uploadRead.component.html',
    styleUrls: ['./uploadRead.component.scss']
})
export class AttendanceuploadReadComponent implements OnInit {
    lFiles: FileListModel[] = [];
    tempFiles: FileListModel[] = [];
    validatedisabled = true;
    submitdisabled = true;
    finalsubmitdisabled = true;
    constructor(
        // private _user: UserService,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _globals: AppGlobals,
        private http: HttpClient,
        public dialogRef: MatDialogRef<FileListModel[]>,
        @Inject(MAT_DIALOG_DATA) public data: FileListModel[]
    ) { }

    ngOnInit() {
      // this.refreshMe();
      this.tempFiles = this.data; // this is my data i bring ready from outside
      this.data = [];
      // this.lFiles = this.data;
      for (let i = 0; i < this.tempFiles.length; i++) {
        this.uploadFinished(this.tempFiles[i]); // so i call the event here in oninit by my data
      }
    }

    refreshMe() {

    }

    public uploadFinished = (event) => { // this is event being called when file gets uploaded
        const file: FileListModel = {
            originalFileName: event.originalFileName,
            fileName: event.fileName,
            extention: event.extention,
            fullPath: event.fullPath,
            apiPath: event.apiPath,
            apiImagePath: event.apiPath
        };
        this.lFiles.push(file); // and it pushes the files to this array also, then why doesnt it show?
        // this.data = this.lFiles;
        // this.validatedisabled = false
        // this.validatedisabledmethod();
        // bro problem is not this component, it somehow is not reflecting in other two... the files which i brought here..
        // yea i was just making sure they were leaving here correctly.. now i will go to step 2, sorry ok
    }

    public deleteFile = (event) => {
        if (event !== undefined || event !== null) {
            for (let index = 0; index < this.lFiles.length; index++) {
                if (this.lFiles[index].fileName === event._body) {
                    const delIndex = this.lFiles.indexOf(this.lFiles[index], 0);
                    if (delIndex > -1) {
                        this.lFiles.splice(delIndex, 1);
                    }
                }
            }
        }
    }

    onCancel() {
      this.dialogRef.close();
    }

    onSubmit() {
        this.http.post(this._globals.baseAPIUrl + 'HRMSAttendance/DDo', {})
            .subscribe((res: APIResultModel) => {
                if (res.errorNo === 0) {
                    this._msg.showInfo('Success', 'Files uploaded');
                } else {
                    this._msg.showInfo('Error', res.errorMessage);
                }
            });
    }

    // onValidate() {
    //     const data = { fileName: this.lFiles[0].fullPath };
    //     this.http.post(this._globals.baseAPIUrl + 'HRMSAttendance/validate', data)
    //         .subscribe((res: APIResultModel) => {
    //             if (res.errorNo === 0) {
    //                 this._msg.showInfo('Success', 'File is valid');
    //                 this.validatedisabled = true;
    //                 this.submitdisabled = false;
    //                 this.validatedisabledmethod();
    //                 this.submitdisabledmethod();
    //             } else {
    //                 this._msg.showInfo('Error', res.errorMessage);
    //             }
    //         });
    // }

    // validatedisabledmethod() {
    //     return this.validatedisabled;
    // }

    // submitdisabledmethod() {
    //     return this.submitdisabled;
    // }

    // finalsubmitdisabledmethod()
    // {
    //     return this.finalsubmitdisabled;
    // }

    onSubmitFile(): void {
        const data = { fileName: this.lFiles[0].fullPath };
        this.http.post(this._globals.baseAPIUrl + 'HRMSAttendance/upload', data)
            .subscribe((res: APIResultModel) => {
                if (res.errorNo === 0) {
                    this._msg.showInfo('Success', 'File submitted');
                    this.submitdisabled = true;
                    // this.finalsubmitdisabled = false
                    // this.submitdisabledmethod();
                    // this.finalsubmitdisabledmethod();
                } else {
                    this._msg.showInfo('Error', res.errorMessage);
                }
            });
    }

    onFinalSubmitFile(): FileListModel[] {
        this.data = this.lFiles;
        this.dialogRef.close({data: this.lFiles});
        return this.lFiles;

        // return this.lFiles;
    }

}
