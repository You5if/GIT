import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent, MatTableDataSource, MatDialogRef } from '@angular/material';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { SDDispatchPlanEntryComponent } from './sddispatchplan-entry/sddispatchplan-entry.component';
import { SDDispatchPlanModel } from './sddispatchplan.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { SDDispatchPlanService } from './sddispatchplan.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { SDDispatchPlanExpenseModel } from '../sddispatchplanexpense/sddispatchplanexpense.model';
import { SDDispatchPlanExpenseEntryComponent } from '../sddispatchplanexpense/sddispatchplanexpense-entry/sddispatchplanexpense-entry.component';
import { SDDispatchPlanInvoiceService } from '../sddispatchplaninvoice/sddispatchplaninvoice.service';
import { SDDispatchPlanInvoiceModel } from '../sddispatchplaninvoice/sddispatchplaninvoice.model';
import { SDDispatchPlanInvoiceEntryComponent } from '../sddispatchplaninvoice/sddispatchplaninvoice-entry/sddispatchplaninvoice-entry.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'app-sddispatchplan',
    templateUrl: './sddispatchplan.component.html',
    styleUrls: ['./sddispatchplan.component.scss']
  })

export class SDDispatchPlanComponent implements OnInit {

    displayedColumns: string[] =
        ['PlanCode', 'Customer', 'SDCompanyId', 'SDShippingLineCompaniesId', 'BookingNumber', 'Description', 'LoadingPlanNumber', 'options'];

    dataList: any;
    breakpoint: number;

    smallScreen: boolean;
    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;
    userCompany: number = +localStorage.getItem('sdCompanyId');

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
        private sddispatchplanservice: SDDispatchPlanService,
        private invoiceService: SDDispatchPlanInvoiceService,
        private breakpointObserver: BreakpointObserver,
      ) {
        this.pTableName = 'SDDispatchPlan';
        this.pScreenId = 50067;
        this.pTableId = 50067;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019000013;
        breakpointObserver.observe([
          Breakpoints.XSmall
        ]).subscribe(result => {
          this.smallScreen = result.matches;
        });
      }

  ngOnInit() {
      this.refreshMe();
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
    this.userCompany= +localStorage.getItem('sdCompanyId');
    this._cf.getPageData('SDDispatchPlan', this.pScreenId, this._auth.getUserId(), this.pTableId,
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
          (result: SDDispatchPlanModel) => {
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
    const result: SDDispatchPlanModel = {
      'sdDispatchPlanId': 0,
      'planCode': 'A',
      'sdCompanyId': 0,
      'customerName': '',
      'sdShippingLineCompanyId': 0,
      'bookingNumber': '',
      'bookingNumberURL': '',
      'containerNumber': '',
      'description': '',
      'loadingPlanNumber': '',
      'dispatchDate': new Date(),
      'sdCompanyLocationId': 0,
      'planStatusId': 0,
      'sdDispatchPlanVehicle': [],
      'auditColumns': null,
      'entryMode': 'A',
      'active': true,
      'readOnly': false,
      'remarks': '',
      'sealNumber': '',
      'sdUserId': 0,
      'remarksDate': new Date(),
      'customerRemarks': '',
      'customerUserId': 0,
      'customerRemarksDate': new Date()
    };
    this.openEntry(result);
  };

  onAddExpense = function(id: number) {
    const result: SDDispatchPlanExpenseModel = {
      'sdDispatchPlanExpenseId': 0,
      'expenseTypeId': 60004800001,
      'sdDispatchPlanId': id,
      'sdVehicleDetailId': 1,
      'amount': 0,
      'costPrice': 0,
      'billableItemId': 1,
      'description': '',
      'expenseDate': new Date(),
      'paymentStatusId': 60004700002,
      'paymentTypeId': 1,
      'referenceNumber': '',
      'auditColumns': null,
      'entryMode': 'A',
      'active': true,
      'readOnly': false
    };
    this.openExpense(result);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.sddispatchplanservice.getSDDispatchPlanEntry(id).subscribe((result: SDDispatchPlanModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onViewInvoice = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.invoiceService.getSDDispatchPlanInvoiceEntry(id).subscribe((result: SDDispatchPlanInvoiceModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openInvoice(result);
    });
  }

  onEdit = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.sddispatchplanservice.getSDDispatchPlanEntry(id).subscribe((result: SDDispatchPlanModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'E';
      result.readOnly = false;
      this.openEntry(result);
    });
  }

  onVEdit = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.sddispatchplanservice.getSDDispatchPlanEntry(id).subscribe((result: SDDispatchPlanModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'B';
      result.readOnly = false;
      this.openEntry(result);
    });
  }

  onDelete = function(id: number) {

  };

  openEntry = function (result: SDDispatchPlanModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(SDDispatchPlanEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(SDDispatchPlanEntryComponent, {
        disableClose: true,
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

  openExpense = function (result: SDDispatchPlanExpenseModel) {
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

  openInvoice = function (result: SDDispatchPlanInvoiceModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(SDDispatchPlanInvoiceEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(SDDispatchPlanInvoiceEntryComponent, {
        disableClose: true,
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

}
