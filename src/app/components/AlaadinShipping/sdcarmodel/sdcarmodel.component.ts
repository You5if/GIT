import { Component, OnInit } from "@angular/core";
import { MatDialog, PageEvent, MatTableDataSource } from "@angular/material";
import { CommonService } from "src/app/components/common/common.service";
import { UIService } from "src/app/components/shared/uiservices/UI.service";
import { MessageBoxService } from "src/app/components/messagebox/message-box.service";
import { AuthService } from "src/app/components/security/auth/auth.service";
import { SDCarModelEntryComponent } from "./sdcarmodel-entry/sdcarmodel-entry.component";
import { SDCarModelModel } from "./sdcarmodel.model";
import { RightModel } from "src/app/components/security/auth/rights.model";
import { RouterModule, Routes } from "@angular/router";
import { PageSortComponent } from "src/app/components/common/pageevents/page-sort/page-sort.component";
import { SDCarModelService } from "./sdcarmodel.service";
import { SelectModel } from "src/app/components/misc/SelectModel";
import { SelectService } from "src/app/components/common/select.service";

@Component({
  selector: "app-sdcarmodel",
  templateUrl: "./sdcarmodel.component.html",
  styleUrls: ["./sdcarmodel.component.scss"]
})
export class SDCarModelComponent implements OnInit {
  role = localStorage.getItem("role");
  displayedColumns: string[] = [
    "CarModel",
    "CarMake",
    "edit",
    "delete",
    "view"
  ];
  dataList: any;
  breakpoint: number;

  dataSource: any;
  isLastPage = false;
  pTableName: string;
  pScreenId: number;
  pTableId: number;
  recordsPerPage: number;
  currentPageIndex: number;
  menuId: number;

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
    viewFlag: true
  };

  constructor(
    public dialog: MatDialog,
    private _cf: CommonService,
    private _ui: UIService,
    private _msg: MessageBoxService,
    private _auth: AuthService,
    private _select: SelectService,
    private sdcarmodelservice: SDCarModelService
  ) {
    this.pTableName = "SDCarModel";
    this.pScreenId = 50073;
    this.pTableId = 50073;
    this.recordsPerPage = 10;
    this.currentPageIndex = 1;
    this.menuId = 1019000019;
  }

  ngOnInit() {
    this.refreshMe();
    if (window.innerWidth <= 425) {
      this.breakpoint = 1;
    } else if (window.innerWidth <= 895) {
      this.breakpoint = 2;
    } else if (window.innerWidth <= 1200) {
      this.breakpoint = 3;
    } else if (window.innerWidth <= 1440) {
      this.breakpoint = 4;
    } else if (window.innerWidth <= 2560) {
      this.breakpoint = 5;
    }
  }

  onResize(event) {
    if (window.innerWidth <= 425) {
      this.breakpoint = 1;
    } else if (window.innerWidth <= 895) {
      this.breakpoint = 2;
    } else if (window.innerWidth <= 1200) {
      this.breakpoint = 3;
    } else if (window.innerWidth <= 1440) {
      this.breakpoint = 4;
    } else if (window.innerWidth <= 2560) {
      this.breakpoint = 5;
    }
  }

  refreshMe() {
    this._cf
      .getPageData(
        "SDCarModel",
        this.pScreenId,
        this._auth.getUserId(),
        this.pTableId,
        this.recordsPerPage,
        this.currentPageIndex,
        false
      )
      .subscribe(result => {
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
        viewFlag: true
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
          (result: SDCarModelModel) => {
            this._ui.loadingStateChanged.next(false);
            this.totalRecords = result[0].totalRecords;
            this.recordsPerPage = event.pageSize;
            this.dataSource = result;
            this.dataList = result;
          },
          error => {
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

  onSort = function() {
    this.dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
  };

  onAdd = function() {
    const result: SDCarModelModel = {
      sdCarModelId: 0,
      carModel: "",
      sdCarMakeId: 0,
      auditColumns: null,
      entryMode: "A",
      active: true,
      readOnly: false
    };
    this.openEntry(result);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.sdcarmodelservice
      .getSDCarModelEntry(id)
      .subscribe((result: SDCarModelModel) => {
        this._ui.loadingStateChanged.next(false);
        result.entryMode = "V";
        result.readOnly = true;
        this.openEntry(result);
      });
  };

  onEdit = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.sdcarmodelservice
      .getSDCarModelEntry(id)
      .subscribe((result: SDCarModelModel) => {
        this._ui.loadingStateChanged.next(false);
        result.entryMode = "E";
        result.readOnly = false;
        this.openEntry(result);
      });
  };

  onDelete = function(id: number) {
    this._ui.loadingStateChanged.next(true);
    this.sdcarmodelservice
      .getSDCarModelEntry(id)
      .subscribe((result: SDCarModelModel) => {
        this._ui.loadingStateChanged.next(false);
        result.entryMode = "D";
        result.readOnly = false;
        this.openEntry(result);
      });
  };

  openEntry = function(result: SDCarModelModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(SDCarModelEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(SDCarModelEntryComponent, {
        disableClose: true,
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };
}
