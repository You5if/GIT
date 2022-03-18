import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialog } from '@angular/material';
import { SDDispatchPlanInvoiceModel, SDDispatchPlanInvoiceDetailModel } from '../sddispatchplaninvoice.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { SDDispatchPlanInvoiceService } from '../sddispatchplaninvoice.service';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { SDDispatchPlanExpenseService } from '../../sddispatchplanexpense/sddispatchplanexpense.service';
import { SDDispatchPlanExpenseModel } from '../../sddispatchplanexpense/sddispatchplanexpense.model';
import { ReportPageService } from 'src/app/components/PR/report-page/report-page.service';
import { Router } from '@angular/router';
import { SDDispatchPlanPaymentModel } from '../../sddispatchplanpayment/sddispatchplanpayment.model';
import { SDDispatchPlanPaymentComponent } from '../../sddispatchplanpayment/sddispatchplanpayment.component';
import { SDDispatchPlanPaymentEntryComponent } from '../../sddispatchplanpayment/sddispatchplanpayment-entry/sddispatchplanpayment-entry.component';

@Component({
  selector: 'app-sddispatchplaninvoice-entry',
  templateUrl: './sddispatchplaninvoice-entry.component.html',
  styleUrls: ['./sddispatchplaninvoice-entry.component.scss']
})

export class SDDispatchPlanInvoiceEntryComponent implements OnInit {
  url: string;
  dialog_title: string;
  statusTypes: SelectModel[] = [];
  invoiceDetailDisplayedColumns: string[] =
  [
    'invoiceDetailSrNo',
    'invoiceDetailId',
    'invoiceAmount',
  ];
invoiceDetailData: any[] = [];
invoiceDetailDeletedElementsArray: SDDispatchPlanInvoiceDetailModel[] = [];
invoiceDetailTableValueAfterDeleteArray: SDDispatchPlanInvoiceDetailModel[] = [];
invoiceDetailDataSource = new MatTableDataSource(this.invoiceDetailData);


  constructor(
      public dialog: MatDialog,
      private router: Router,
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _select: SelectService,
      private _myService: SDDispatchPlanInvoiceService,
      private expenseService: SDDispatchPlanExpenseService,
      private dialogRef: MatDialogRef<SDDispatchPlanInvoiceEntryComponent>,
      private dialogRef2: MatDialogRef<SDDispatchPlanPaymentEntryComponent>,
      private _report: ReportPageService,
      @Inject(MAT_DIALOG_DATA) public pModel: SDDispatchPlanInvoiceModel
  ) { }

  ngOnInit() {

      switch (this.pModel.entryMode) {

          case 'A': {
              this.url = 'SDDispatchPlanInvoice/Create';
              this.dialog_title = 'Add';
              break;
          }

          case 'E': {
              this.url = 'SDDispatchPlanInvoice/Edit';
              this.dialog_title = 'Edit';
              break;
          }

          case 'D': {
              this.url = 'SDDispatchPlanInvoice/Delete';
              this.dialog_title = 'Delete';
              break;
          }

          case 'V': {
              this.url = 'SDDispatchPlanInvoice/View';
              this.dialog_title = 'View';
              break;
          }

          default: {
              this._msg.showError('Option not implemented..!');
              break;
          }
      }

      this.invoiceDetailData = [...this.pModel.sdDispatchPlanInvoiceDetail];
      this.invoiceDetailDataSource.data = [...this.invoiceDetailData];
      for (let i = 0; i < this.invoiceDetailData.length; i++) {
        this.expenseService.getSDDispatchPlanExpenseEntry(this.invoiceDetailData[i].sdDispatchPlanExpenseId).subscribe(
          (result: SDDispatchPlanExpenseModel) => {
            this.invoiceDetailData[i].newItem = result.description;
            this.invoiceDetailData[i].price = result.amount;
          });
      }
      // this.invoiceDetailData[0].newItem = 'A';
      this.invoiceDetailDataSource.data = [...this.invoiceDetailData];
      this._select.getMisc(600038, 0, false).subscribe((res: SelectModel[]) => {
        this.statusTypes = res;
    });
  }

  addInvoiceRecord() {
    const rowFB: SDDispatchPlanInvoiceDetailModel = {
      'srNo': this.invoiceDetailData.length + 1,
      'sdDispatchPlanInvoiceDetailId': 0,
      'sdDispatchPlanInvoiceId': this.pModel.sdDispatchPlanInvoiceId,
      'sdDispatchPlanExpenseId': 0,
      'entryStatus': 0,
      'deleted': false,
      'active': true
    };
    this.invoiceDetailData.push(rowFB);
    this.invoiceDetailDataSource.data = [...this.invoiceDetailData];
  }

  onDeleteInvoice(index: number) {
    // Assinging the values in the table to a tempArray
    this.invoiceDetailTableValueAfterDeleteArray = this.invoiceDetailData;
    // Looping through addressData to find targeted element
    this.invoiceDetailData = this.invoiceDetailData.map((ele, _index) => {
      if (index === _index) {
        if (ele.entryStatus !== 0) {
          ele.entryStatus = 2;
          ele.deleted = true;
          ele.active = false;
          // Saving the element to be pushed into the array prior to sending to the database
          this.invoiceDetailDeletedElementsArray.push(ele);
        }
        // Deleting the element from the array
        this.invoiceDetailTableValueAfterDeleteArray.splice(index, 1);
      }
      return ele;
    });
    // Assinging the value of the new array to the table
    this.invoiceDetailData = this.invoiceDetailTableValueAfterDeleteArray;
    // Arranging the srNo
    this.invoiceDetailData = this.invoiceDetailData.map((ele, _index) => {
      ele.srNo = _index + 1;
      return ele;
    });
    this.invoiceDetailDataSource.data = [...this.invoiceDetailData];
    // Preventing the table becoming empty
    if (this.invoiceDetailData.length < 1) {
      this.addInvoiceRecord();
    }
  }


  // Step.5 of 7 (next: onSubmit / onDone)
  addDeletedElements() {
    this.invoiceDetailDeletedElementsArray.map((ele, _index) => {
      ele.srNo = _index + 1;
      this.invoiceDetailData.push(ele);
    });
  }




  onSubmit = function (form: SDDispatchPlanInvoiceModel) {
      form.sdDispatchPlanInvoiceId = this.pModel.sdDispatchPlanInvoiceId;
      form = this.pModel;
      this._ui.loadingStateChanged.next(true);

      if (this.validateForm(form) !== true) {
          this._ui.loadingStateChanged.next(false);
          return false;
      }

      form.auditColumns = this._auth.getAuditColumns();
      form.entryMode = this.pModel.entryMode;

      try {
          // Calling the service(api) to submit the data
          this._myService.getSDDispatchPlanInvoiceSubmit(form).subscribe((result: APIResultModel) => {
              if (result.errorNo === 0) {
                  this._ui.loadingStateChanged.next(false);
                  this._msg.showInfo(result.errorMessage);
                  this.dialogRef.close();
              } else {
                  this._ui.loadingStateChanged.next(false);
                  this._msg.showError(result.errorMessage);
                  return false;
              }
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
  };

  onCancel() {
      this.dialogRef.close();
  }

  validateForm(form: SDDispatchPlanInvoiceModel) {
      if (this.pModel.entryMode === 'E') return true;
  }

  onReport(invoiceid: number) {
    let reportId: number = 23;
    let restOfUrl: string;
    restOfUrl = 'invoiceid=' + invoiceid;
    this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
    this.router.navigate(['report']);
    this.dialogRef.close();
  }
  onPayment(invoiceid: number) {
    const result: SDDispatchPlanPaymentModel = {
      'sdDispatchPlanPaymentId': 0,
      'sdDispatchPlanInvoiceId': invoiceid,
      'paymentDate': new Date(),
      'paymentTypeId': 0,
      'paymentAmount': 0,
      'reference': '',
      'memo': '',
      'sdUserId': +this._auth.getUserId(),
      'entryMode': 'A',
      'active': true,
      'readOnly': false,
      'auditColumns': null,
    };
    this.openPaymentEntry(result);
  }

  openPaymentEntry = function (result: SDDispatchPlanPaymentModel) {
    if (result === undefined) {
      this.dialogRef2 = this.dialog.open(SDDispatchPlanPaymentEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef2 = this.dialog.open(SDDispatchPlanPaymentEntryComponent, {
        disableClose: true,
        data: result
      });
    }
    this.dialogRef2.afterClosed().subscribe(() => {
      // this.refreshMe();
    });
  };
}
