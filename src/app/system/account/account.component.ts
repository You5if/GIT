import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import {SelectionModel} from '@angular/cdk/collections';

import { AccountModel } from './account.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { AccountService } from './account.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { SystemAccountComponent } from './system-account/system-account.component';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
  })

export class AccountComponent implements OnInit {

  idS : number;
  direction: string;
  accountCode: string;
  accountName: string;
  accountType: string;
  balance: string;
  edit: string;
  header: string;
  submit: string;
  cancel: string;

  model: Send;

  indexes: AccountModel;

    displayedColumns: string[] =
        ['select', 'AccountCode', 'AccountName', 'AccountType'];

    dataSource: any;
    selection = new SelectionModel<AccountModel>(true, []);;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;
    clickedRows = new Set<AccountModel>();

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
        private _globals: AppGlobals,
        private _auth: AuthService,
        private _select: SelectService,
        private accountservice: AccountService
      ) {
        this.pTableName = 'Account';
        this.pScreenId = 12;
        this.pTableId = 12;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
      this.refreshMe();
  }

  refreshMe() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Account"
      this.accountCode = "Account Code"
      this.accountName = "Account Name"
      this.accountType = "Account Type"
      this.balance = "Balance"
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "الحسابات"
      this.accountCode = "رمز الحساب"
      this.accountName = "اسم الحساب"
      this.accountType = "نوع الحساب"
      this.balance = "الحساب"
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
    }
    this._cf.getPageData('Account', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);
          this.indexes = result


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
          (result: AccountModel) => {
            this._ui.loadingStateChanged.next(false);
            this.totalRecords = result[0].totalRecords;
            this.recordsPerPage = event.pageSize;
            this.dataSource = result;
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
    this.model = {
      tableId: 12,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add account");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة حساب");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.accountservice.getAccountEntry(id).subscribe((result: AccountModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    // this._ui.loadingStateChanged.next(true);
    // this.accountservice.getAccountEntry(id).subscribe((result: AccountModel) => {
    //   this._ui.loadingStateChanged.next(false);
    //   result.entryMode = 'E';
    //   result.readOnly = false;
    //   this.openEntry(result);
    // });

    this.model = {
      tableId: 12,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit account");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل حساب");
    }
    
    this.openEntry2(this.model)


  }

  onDelete = function(id: number) {

  };


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        (this.selection.clear() ,this.clickedRows.clear()):
        (this.selection.clear(), this.dataSource.data.forEach(row => {this.selection.select(row); if (!this.clickedRows.has(row)) {

          this.clickedRows.add(row)
        }}))
  }


  onId(id: number, row:AccountModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  openEntry = function (result: AccountModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(SystemAccountComponent, {
        disableClose: true,
        maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'custom-dialog',
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(SystemAccountComponent, {
        disableClose: true,
        maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'custom-dialog',
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };
  openEntry2 = function (result: Send) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(SystemAccountComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(SystemAccountComponent, {
        disableClose: true,
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

}
