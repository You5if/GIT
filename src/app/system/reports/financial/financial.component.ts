import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { SelectService } from 'src/app/components/common/select.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { ReportPageService } from 'src/app/components/PR/report-page/report-page.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { Send } from 'src/app/send.model';
import { AccountModel } from '../../account/account.model';
import { AccountService } from '../../account/account.service';
import { SystemNavigationComponent } from '../../system-navigation/system-navigation.component';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.scss']
})
export class FinancialComponent implements OnInit {

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
        ['report', 'from', 'to', 'currency', 'fetch'];

    dataSource: any;
    selection = new SelectionModel<AccountModel>(true, []);;
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
        private _report: ReportPageService,
        private _cf: CommonService,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _globals: AppGlobals,
        private _auth: AuthService,
        private _select: SelectService,
        private accountservice: AccountService,
        public _nav: SystemNavigationComponent,
        private router: Router,
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

    this._select.getDropdown("miscdetailId", "miscdetail", "misctext", "miscid=17", false).subscribe((res: SelectModel[]) => {
      console.log("drop: ", res);
      var curr: SelectModel[] = res
      var Tdate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
      const src = [
        {report: "Revenue", currency: 17001, value: curr, fromDate: Tdate, toDate: Tdate },
        {report: "Expense", currency: 17001, value: curr, fromDate: Tdate , toDate: Tdate},
        {report: "Rev vs. Exp", currency: 17001, value: curr, fromDate: Tdate, toDate: Tdate },
        
        
      ]
            this.dataSource = new MatTableDataSource(src);
      
    });
    // this._cf.getPageData('Account', this.pScreenId, this._auth.getUserId(), this.pTableId,
    //   this.recordsPerPage, this.currentPageIndex, false).subscribe(
    //     (result) => {
    //       this.totalRecords = result[0].totalRecords;
    //       this.recordsPerPage = this.recordsPerPage;
    
          


      //   }
      // );

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

  onReport(report: string,fromDate: Date, toDate:Date, currency: number) { 
    var reportId: number
    if (report == "Expense") {
       reportId = 3; // if expense button: 3, Revenue: 4, RevVsExp: 5 
    }else if (report == "Revenue") {
     reportId = 4; // if expense button: 3, Revenue: 4, RevVsExp: 5 
    }else if (report == "Rev vs. Exp") {
      reportId = 5; // if expense button: 3, Revenue: 4, RevVsExp: 5 
    }
    
    let restOfUrl: string; 
    restOfUrl = 'from=' + fromDate; 
    restOfUrl = restOfUrl + '&to=' + toDate; 
    restOfUrl = restOfUrl + '&currency=' + currency; 
    console.log(restOfUrl)
    this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl }); 
    this._nav.onClickListItem('FRP');
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

  // onAdd = function () {
  //   this.model = {
  //     tableId: 12,
  //     recordId: 0,
  //     userId: 26,
  //     roleId: 2,
  //     languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
  //   };
  //   if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
  //     localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add account");
  //   }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
  //     localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة حساب");
  //   }
    
  //   this.openEntry2(this.model);
  // };

  // onView = (id: number) => {
  //   this._ui.loadingStateChanged.next(true);
  //   this.accountservice.getAccountEntry(id).subscribe((result: AccountModel) => {
  //     this._ui.loadingStateChanged.next(false);
  //     result.entryMode = 'V';
  //     result.readOnly = true;
  //     this.openEntry(result);
  //   });
  // }

  // onEdit = (id: number) => {
  //   // this._ui.loadingStateChanged.next(true);
  //   // this.accountservice.getAccountEntry(id).subscribe((result: AccountModel) => {
  //   //   this._ui.loadingStateChanged.next(false);
  //   //   result.entryMode = 'E';
  //   //   result.readOnly = false;
  //   //   this.openEntry(result);
  //   // });

  //   this.model = {
  //     tableId: 12,
  //     recordId: id,
  //     userId: 26,
  //     roleId: 2,
  //     languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
  //   };
  //   if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
  //     localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit account");
  //   }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
  //     localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل حساب");
  //   }
    
  //   this.openEntry2(this.model)


  // }

  onDelete = function(id: number) {

  };


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onId() {
    this.selection.selected.forEach(function(item){
      console.log(item.accountId)
    })
  }

  // openEntry = function (result: AccountModel) {
  //   if (result === undefined) {
  //     this.dialogRef = this.dialog.open(SystemAccountComponent, {
  //       disableClose: true,
  //       maxWidth: '100vw',
  //     maxHeight: '100vh',
  //     height: '100%',
  //     width: '100%',
  //     panelClass: 'custom-dialog',
  //       data: {}
  //     });
  //   } else {
  //     this.dialogRef = this.dialog.open(SystemAccountComponent, {
  //       disableClose: true,
  //       maxWidth: '100vw',
  //     maxHeight: '100vh',
  //     height: '100%',
  //     width: '100%',
  //     panelClass: 'custom-dialog',
  //       data: result
  //     });
  //   }
  //   this.dialogRef.afterClosed().subscribe(() => {
  //     this.refreshMe();
  //   });
  // };
  // openEntry2 = function (result: Send) {
  //   if (result === undefined) {
  //     this.dialogRef = this.dialog.open(SystemAccountComponent, {
  //       disableClose: true,
  //       data: {}
  //     });
  //   } else {
  //     this.dialogRef = this.dialog.open(SystemAccountComponent, {
  //       disableClose: true,
  //       data: result
  //     });
  //   }
  //   this.dialogRef.afterClosed().subscribe(() => {
  //     this.refreshMe();
  //   });
  // };

}
