import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource, PageEvent } from '@angular/material';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { SelectService } from 'src/app/components/common/select.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { Send } from 'src/app/send.model';
import { ExpenseFilingModel } from '../expensefiling/expensefiling/expensefiling.model';
import { ExpenseFilingService } from '../expensefiling/expensefiling/expensefiling.service';
import { ExpensedynamicEntryComponent } from './expensedynamic-entry/expensedynamic-entry.component';

@Component({
  selector: 'app-expensedynamic',
  templateUrl: './expensedynamic.component.html',
  styleUrls: ['./expensedynamic.component.scss']
})
export class ExpensedynamicComponent implements OnInit {

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
  configurationName: string;
  description: string;
  accountId: string;
  total: number = 0;
  totalTax: number = 0;
  subTotal: number = 0;
  indexes: ExpenseFilingModel

    displayedColumns: string[] =
        ['EntryDate', 'ToAccount', 'description', 'amount', 'edit'];

    dataSource: any;
    model: Send;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;

    
    entryDate: string;
    toAccount: string;
    
    amount: string;
    


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
        private _globals: AppGlobals,
        private _select: SelectService,
        private expensefilingservice: ExpenseFilingService
      ) {
        this.pTableName = 'ExpenseFiling';
        this.pScreenId = 18;
        this.pTableId = 18;
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
      this.entryDate = "Date"
      this.toAccount = "To Account"
      this.description = "Description"
      this.amount = "Amount"
      this.edit = "Edit"
      this.header = "Finance > Expense Dynaimc"
      
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.entryDate = "التاريخ"
      this.toAccount = "الى حساب"
      this.description = "الوصف"
      this.amount = "المبلغ"
      this.edit = "تعديل"
      this.header = "المالية > المصروفات"
      
    }
    this._cf.getPageData('ExpenseFiling', this.pScreenId, this._auth.getUserId(), this.pTableId,
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
          (result: ExpenseFilingModel) => {
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
      tableId: 18,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة");
    }
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.expensefilingservice.getExpenseFilingEntry(id).subscribe((result: ExpenseFilingModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this.model = {
      tableId: 18,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل");
    }
    this.openEntry2(this.model)
  }

  onDelete = function(id: number) {

  };

  openEntry = function (result: ExpenseFilingModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(ExpensedynamicEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(ExpensedynamicEntryComponent, {
        disableClose: true,
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };
  openEntry2 = function (result: Send) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(ExpensedynamicEntryComponent, {
        disableClose: true,
        maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'custom-dialog',
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(ExpensedynamicEntryComponent, {
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

}
