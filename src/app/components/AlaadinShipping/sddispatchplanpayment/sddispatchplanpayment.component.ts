import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { SDDispatchPlanPaymentEntryComponent } from './sddispatchplanpayment-entry/sddispatchplanpayment-entry.component';
import { SDDispatchPlanPaymentModel } from './sddispatchplanpayment.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { SDDispatchPlanPaymentService } from './sddispatchplanpayment.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';

@Component({
    selector: 'app-sddispatchplanpayment',
    templateUrl: './sddispatchplanpayment.component.html',
    styleUrls: ['./sddispatchplanpayment.component.scss']
  })

export class SDDispatchPlanPaymentComponent implements OnInit {

    displayedColumns: string[] =
        ['InvoiceNumber', 'PaymentDate', 'PaymentAmount', 'edit', 'view'];

    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;
    dataList: any;

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
        private sddispatchplanpaymentservice: SDDispatchPlanPaymentService
      ) {
        this.pTableName = 'SDDispatchPlanPayment';
        this.pScreenId = 50074;
        this.pTableId = 50074;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019000020;
      }

  ngOnInit() {
      this.refreshMe();
  }

  refreshMe() {
    this._cf.getPageData('SDDispatchPlanPayment', this.pScreenId, this._auth.getUserId(), this.pTableId,
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
          (result: SDDispatchPlanPaymentModel) => {
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
    const result: SDDispatchPlanPaymentModel = {

      'sdDispatchPlanPaymentId': 0,
      'sdDispatchPlanInvoiceId': 0,
      'paymentDate': new Date(),
      'paymentTypeId': 0,
      'paymentAmount': 0,
      'reference': '',
      'memo': '',
      'sdUserId': 0,
      'auditColumns': null,
      'entryMode': 'A',
      'active': true,
      'readOnly': false
    };
    this.openEntry(result);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.sddispatchplanpaymentservice.getSDDispatchPlanPaymentEntry(id).subscribe((result: SDDispatchPlanPaymentModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.sddispatchplanpaymentservice.getSDDispatchPlanPaymentEntry(id).subscribe((result: SDDispatchPlanPaymentModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'E';
      result.readOnly = false;
      this.openEntry(result);
    });
  }

  onDelete = function(id: number) {

  };

  openEntry = function (result: SDDispatchPlanPaymentModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(SDDispatchPlanPaymentEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(SDDispatchPlanPaymentEntryComponent, {
        disableClose: false,
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

}
