import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { ChequeToCompanyEntryComponent } from './chequetocompany-entry/chequetocompany-entry.component';
import { ChequeToCompanyModel } from './chequetocompany.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { ChequeToCompanyService } from './chequetocompany.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { SelectionModel } from '@angular/cdk/collections';
import { AppGlobals } from 'src/app/app.global';

@Component({
    selector: 'app-chequetocompany',
    templateUrl: './chequetocompany.component.html',
    styleUrls: ['./chequetocompany.component.scss']
  })

export class ChequeToCompanyComponent implements OnInit {

    displayedColumns: string[] =
        ['select','chequeNumber', 'amount', 'currencyName', 'customerName', 'customerMobile1', 'dueDate'];

    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;
    chequeNumber:string;
    dueDate:string;
    amount:string;
    currencyName:string;
    customerName:string;
    customerMobile1:string;
    header: string;
    direction : string
    indexes: ChequeToCompanyModel
    clickedRows = new Set<ChequeToCompanyModel>();
    selection = new SelectionModel<ChequeToCompanyModel>(true, []);;

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
        private chequetocompanyservice: ChequeToCompanyService
      ) {
        this.pTableName = 'ChequeToCompany';
        this.pScreenId = 51;
        this.pTableId = 51;
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
      this.header = "Cheque"
      this.chequeNumber = "Cheque number"
      this.amount = "Amount"
      this.currencyName = "Currency"
      this.customerName = "Customer"
      this.customerMobile1 = "Contact"
      this.dueDate = "Due date"
     
      
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "الشيكات"
      this.chequeNumber = "رقم الشيك"
      this.amount = "المبلغ"
      this.currencyName = "العملة"
      this.customerName = "العميل"
      this.customerMobile1 = "الهاتف"
      this.dueDate = "تاريخ الاستحقاق"
      
      
    }
    this._cf.getPageData('ChequeToCompany', this.pScreenId, this._auth.getUserId(), this.pTableId,
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
          (result: ChequeToCompanyModel) => {
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

  onId(id: number, row:ChequeToCompanyModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  onAdd = function () {
    const result: ChequeToCompanyModel = {
      
      'chequeToCompanyId': 0,
      'chequeNumber': '',
      'chequeType': 0,
      'currency': 0,
      'amount': 0,
      'fromCheque': 0,
      'toCheque': 0,
      'bankListId': 0,
      'chequeName': '',
      'description': '',
      'companyBankBranchAccountId': 0,
      'dueDate': new Date(),
      'customerId': 0,
      'customerAccountId': 0,
      'paymentToCompanyId': 0,
      'auditColumns': null,
      'entryMode': 'A',
      'active': true,
      'readOnly': false
    };
    this.openEntry(result);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.chequetocompanyservice.getChequeToCompanyEntry(id).subscribe((result: ChequeToCompanyModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.chequetocompanyservice.getChequeToCompanyEntry(id).subscribe((result: ChequeToCompanyModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'E';
      result.readOnly = false;
      this.openEntry(result);
    });
  }

  onDelete = function(id: number) {
      
  };

  openEntry = function (result: ChequeToCompanyModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(ChequeToCompanyEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(ChequeToCompanyEntryComponent, {
        disableClose: false,
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

}
