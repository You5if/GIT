import { Component, OnInit } from "@angular/core";
import { MatDialog, PageEvent, MatTableDataSource } from "@angular/material";
import { CommonService } from "src/app/components/common/common.service";
import { UIService } from "src/app/components/shared/uiservices/UI.service";
import { MessageBoxService } from "src/app/components/messagebox/message-box.service";
import { AuthService } from "src/app/components/security/auth/auth.service";
import { SDUserEntryComponent } from "./sduser-entry/sduser-entry.component";
import { SDUserModel, UserModel } from "./sduser.model";
import { RightModel } from "src/app/components/security/auth/rights.model";
import { RouterModule, Routes } from "@angular/router";
import { PageSortComponent } from "src/app/components/common/pageevents/page-sort/page-sort.component";
import { SDUserService } from "./sduser.service";
import { SelectModel } from "src/app/components/misc/SelectModel";
import { SelectService } from "src/app/components/common/select.service";

@Component({
  selector: "app-sduser",
  templateUrl: "./sduser.component.html",
  styleUrls: ["./sduser.component.scss"],
})
export class SDUserComponent implements OnInit {
  displayedColumns: string[] = ["Company", "SDUserName", "DisplayName"];

  dataSource: any;
  isLastPage = false;
  pTableName: string;
  pScreenId: number;
  pTableId: number;
  recordsPerPage: number;
  currentPageIndex: number;
  menuId: number;
  dataList: any;

  role;

  totalRecords: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  screenRights: RightModel = {
    amendFlag: true,
    createFlag: true,
    deleteFlag: true,
    editFlag: true,
    exportFlag: true,
    printFlag: true,
    reverseFlag: true,
    shortCloseFlag: true,
    viewFlag: true,
  };

  constructor(
    public dialog: MatDialog,
    private _cf: CommonService,
    private _ui: UIService,
    private _msg: MessageBoxService,
    private _auth: AuthService,
    private _select: SelectService,
    private sduserservice: SDUserService
  ) {
    this.pTableName = "SDUser";
    this.pScreenId = 50030;
    this.pTableId = 50030;
    this.recordsPerPage = 10;
    this.currentPageIndex = 1;
    this.menuId = 1019000002;
  }

  ngOnInit() {
    this.refreshMe();
    this.role = localStorage.getItem("role");
  }

  refreshMe() {
    this._cf
      .getPageData(
        "SDUser",
        this.pScreenId,
        this._auth.getUserId(),
        this.pTableId,
        this.recordsPerPage,
        this.currentPageIndex,
        false
      )
      .subscribe((result) => {
        this.totalRecords = result[0].totalRecords;
        this.recordsPerPage = this.recordsPerPage;
        this.dataSource = new MatTableDataSource(result);
        this.dataList = result;
      });

    this._auth.getScreenRights(this.menuId).subscribe((rights: RightModel) => {
      this.screenRights = {
        amendFlag: true,
        createFlag: true,
        deleteFlag: true,
        editFlag: true,
        exportFlag: true,
        printFlag: true,
        reverseFlag: true,
        shortCloseFlag: true,
        viewFlag: true,
      };
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  paginatoryOperation(event: PageEvent) {
    try {
      this._cf
        .getPageDataOnPaginatorOperation(
          event,
          this.pTableName,
          this.pScreenId,
          this._auth.getUserId(),
          this.pTableId,
          this.totalRecords
        )
        .subscribe(
          (result: SDUserModel) => {
            this._ui.loadingStateChanged.next(false);
            this.totalRecords = result[0].totalRecords;
            this.recordsPerPage = event.pageSize;
            this.dataSource = result;
            this.dataList = result;
          },
          (error) => {
            this._ui.loadingStateChanged.next(false);
            this._msg.showAPIError(error);
            return false;
          }
        );
    } catch (error) {
      this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      return false;
    }
  }

  onSort = function () {
    this.dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId,
    });
  };

  onAdd = function () {
    const result: SDUserModel = {
      sdUserId: 0,
      sdUserName: "",
      displayName: "",
      password: "",
      externalTypeId: 1,
      externalId: "app",
      activationStatusId: 60000800001,
      sdCompanyId: 0,
      roleId: 0,
      active: true,
      entryMode: "A",
      readOnly: false,
      auditColumns: null,
    };
    this.openEntry(result);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.sduserservice.getSDUserEntry(id).subscribe((result: SDUserModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = "V";
      result.readOnly = true;
      this.openEntry(result);
    });
  };

  onEdit = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.sduserservice.getSDUserEntry(id).subscribe((result: SDUserModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = "E";
      result.readOnly = false;
      this.openEntry(result);
    });
  };

  onDelete = function (id: number) {
    this._ui.loadingStateChanged.next(true);
    this.sduserservice.getSDUserEntry(id).subscribe((result: SDUserModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = "D";
      result.readOnly = false;
      this.openEntry(result);
    });
  };

  openEntry = function (result: SDUserModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(SDUserEntryComponent, {
        disableClose: true,
        data: {},
      });
    } else {
      this.dialogRef = this.dialog.open(SDUserEntryComponent, {
        disableClose: false,
        data: result,
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };
}
