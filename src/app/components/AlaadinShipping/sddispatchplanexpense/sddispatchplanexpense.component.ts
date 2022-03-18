import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { SDDispatchPlanExpenseEntryComponent } from './sddispatchplanexpense-entry/sddispatchplanexpense-entry.component';
import { SDDispatchPlanExpenseModel } from './sddispatchplanexpense.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { SDDispatchPlanExpenseService } from './sddispatchplanexpense.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';

@Component({
    selector: 'app-sddispatchplanexpense',
    templateUrl: './sddispatchplanexpense.component.html',
    styleUrls: ['./sddispatchplanexpense.component.scss']
  })

export class SDDispatchPlanExpenseComponent implements OnInit {

    displayedColumns: string[] =
        ['SDDispatchPlanId', 'ExpenseDate', 'BillableItemId', 'Description', 'PaymentTypeId', 'Amount', 'edit', 'delete', 'view'];

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
        private sddispatchplanexpenseservice: SDDispatchPlanExpenseService
      ) {
        this.pTableName = 'SDDispatchPlanExpense';
        this.pScreenId = 50068;
        this.pTableId = 50068;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019000014;
      }

  ngOnInit() {
      this.refreshMe();
      this.breakpoint = (window.innerWidth <= 425) ? 1 : 5;
      if(window.innerWidth <= 425) {
        this.breakpoint = 1;
      } else if (window.innerWidth <= 895) {
        this.breakpoint = 2;
      } else if(window.innerWidth <= 1210) {
        this.breakpoint = 3;
      } else if(window.innerWidth <= 1440) {
        this.breakpoint = 4;
      } else if(window.innerWidth <= 2560) {
        this.breakpoint = 5;
      }
  }

  onResize(event) {
    if(window.innerWidth <= 425) {
      this.breakpoint = 1;
    } else if (window.innerWidth <= 895) {
      this.breakpoint = 2;
    } else if(window.innerWidth <= 1200) {
      this.breakpoint = 3;
    } else if(window.innerWidth <= 1440) {
      this.breakpoint = 4;
    } else if(window.innerWidth <= 2560) {
      this.breakpoint = 5;
    }
  }

  refreshMe() {
    this._cf.getPageData('SDDispatchPlanExpense', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);
          this.dataList = result;
        }
      );

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
      this._cf.getPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        this.pTableId, this.totalRecords).subscribe(
          (result: SDDispatchPlanExpenseModel) => {
            this._ui.loadingStateChanged.next(false);
            this.totalRecords = result[0].totalRecords;
            this.recordsPerPage = event.pageSize;
            this.dataSource = result;
            this.dataList = result;
          }, error => {
            this._ui.loadingStateChanged.next(false);
            this._msg.showAPIError(error);
            return false;
          });
    } catch (error) {
      this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      return false;
    }
  }

  onSort = function () {
    this.dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
  };

  onAdd = function () {
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.sddispatchplanexpenseservice.getSDDispatchPlanExpenseEntry(id).subscribe((result: SDDispatchPlanExpenseModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.sddispatchplanexpenseservice.getSDDispatchPlanExpenseEntry(id).subscribe((result: SDDispatchPlanExpenseModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'E';
      result.readOnly = false;
      this.openEntry(result);
    });
  }

  onDelete = function(id: number) {

  };

  openEntry = function (result: SDDispatchPlanExpenseModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(SDDispatchPlanExpenseEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(SDDispatchPlanExpenseEntryComponent, {
        disableClose: true,
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

}
