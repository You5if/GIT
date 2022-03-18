import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { PaymentToCompanyEntryComponent } from './paymenttocompany-entry/paymenttocompany-entry.component';
import { PaymentToCompanyModel } from './paymenttocompany.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { PaymentToCompanyService } from './paymenttocompany.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'app-paymenttocompany',
    templateUrl: './paymenttocompany.component.html',
    styleUrls: ['./paymenttocompany.component.scss']
  })

export class PaymentToCompanyComponent implements OnInit {

  idS : number;
  direction: string;
  customerCode: string;
  customerName: string;
  customerMobile: string;
  customer: string;
  amount: string;
  currency: string;
  balance: string;
  edit: string;
  header: string;
  submit: string;
  cancel: string;
  selection = new SelectionModel<PaymentToCompanyModel>(true, []);;

  model: Send;
    displayedColumns: string[] =
        ['select','PaymentDate', 'PaymentCode', 'PaymentType','customer', 'amount', 'currency'];

    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;

    paymentDate:string;
    paymentCode:string;
    paymentType:string;
    indexes: PaymentToCompanyModel
    clickedRows = new Set<PaymentToCompanyModel>();

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
        private _globals: AppGlobals,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _select: SelectService,
        private paymenttocompanyservice: PaymentToCompanyService
      ) {
        this.pTableName = 'PaymentToCompany';
        this.pScreenId = 49;
        this.pTableId = 49;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Revenue"
      this.paymentCode = "Payment code"
      this.paymentDate = "Payment date"
      this.paymentType = "Payment type"
      this.customer = "Customer"
      this.amount = "Amount"
      this.currency = "Currency"
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "الايرادات"
      this.paymentCode = "رمز الدفع"
      this.paymentDate = "تاريخ الدفع"
      this.paymentType = "نوع الدفع"
      this.customer = "العميل"
      this.amount = "المبلغ"
      this.currency = "العملة"
      // this.accountCode = "رمز الحساب"
      // this.accountName = "اسم الحساب"
      // this.accountType = "نوع الحساب"
      this.balance = "الحساب"
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
    }
      this.refreshMe();
  }

  refreshMe() {
    this._cf.getPageData('PaymentToCompany', this.pScreenId, this._auth.getUserId(), this.pTableId,
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
          (result: PaymentToCompanyModel) => {
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
      tableId: 49,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add revenue");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة ابراد");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.paymenttocompanyservice.getPaymentToCompanyEntry(id).subscribe((result: PaymentToCompanyModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this.model = {
      tableId: 49,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit revenue");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل ايراد");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
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

  onId(id: number, row:PaymentToCompanyModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }


  openEntry = function (result: PaymentToCompanyModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(PaymentToCompanyEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(PaymentToCompanyEntryComponent, {
        disableClose: false,
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

  openEntry2 = function (result: Send) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(PaymentToCompanyEntryComponent, {
        disableClose: true,
        
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(PaymentToCompanyEntryComponent, {
        disableClose: true,
        
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

}
