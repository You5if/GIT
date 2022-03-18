import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileListModel } from '../upload-file.model';
import { MatTableDataSource } from '@angular/material';
import { AppGlobals } from 'src/app/app.global';
import { HttpClient } from '@angular/common/http';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-uploadread-files', // step.1
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesReadComponent implements OnInit {
  displayedColumns: string[] = ['preview', 'originalFileName', 'download'];
  dataSource = new MatTableDataSource<FileListModel>();
  @Input() result: FileListModel[];
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onFileDeleteFromList = new EventEmitter();

  public progress: number;
  public message: string;
  constructor(
    private http: HttpClient,
    private _globals: AppGlobals,
    private _myservice: UploadService
  ) {
  }
  ngOnInit() {
    this.refreshMe(); // you werent calling the refreshMe function
  }
  refreshMe() {
    if (this.result !== null && this.result !== undefined) {
      for (let index = 0; index < this.result.length; index++) {
        this.result[index].apiImagePath = this._myservice.getFileIcon(this.result[index].extention, this.result[index].apiPath);
      }
      this.dataSource = new MatTableDataSource(this.result);
    }
  }

  onDownload(apiPath: string) {
    window.open(this._globals.baseAPIFileUrl + apiPath, '_blank');
  }


  onDelete(fileName: string) {
    this._myservice.deleteFile(fileName).subscribe(res => {
      this.onFileDeleteFromList.emit(res);
    });
  }
}

