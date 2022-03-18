import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FileListModel } from "../upload-file.model";
import { MatTableDataSource } from "@angular/material";
import { AppGlobals } from "src/app/app.global";
import { HttpClient } from "@angular/common/http";
import { UploadService } from "../upload.service";
import { MessageBoxService } from "src/app/components/messagebox/message-box.service";

@Component({
  selector: "app-upload2-files", // step.1
  templateUrl: "./upload-files.component.html",
  styleUrls: ["./upload-files.component.scss"]
})
export class UploadFiles2Component implements OnInit {
  displayedColumns: string[] = [
    "preview",
    "originalFileName",
    "download",
    "delete"
  ];
  dataSource = new MatTableDataSource<FileListModel>();
  @Input() result: FileListModel[];
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onFileDeleteFromList = new EventEmitter();
  role: string;

  dataList: any;
  public progress: number;
  public message: string;
  constructor(
    private _msg: MessageBoxService,
    private http: HttpClient,
    private _globals: AppGlobals,
    private _myservice: UploadService
  ) {}
  ngOnInit() {
    
    this.role = localStorage.getItem("role");
    this.refreshMe(); // you werent calling the refreshMe function
  }
  refreshMe() {
    if (this.result !== null && this.result !== undefined) {
      for (let index = 0; index < this.result.length; index++) {
        this.result[index].apiImagePath = this._myservice.getFileIcon(
          this.result[index].extention,
          this.result[index].apiPath
          
        );
      }
      this.dataSource = new MatTableDataSource(this.result);
      this.dataList = this.result;
      
    }
  }

  onDownload(apiPath: string) {
    window.open(this._globals.baseAPIFileUrl + apiPath, "_blank");
  }

  onDelete(fileName: string) {
    this._myservice.deleteFile(fileName).subscribe(res => {
      this.onFileDeleteFromList.emit(res);
    });
  }
}
