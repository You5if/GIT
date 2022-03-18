import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SDDispatchPlanPaymentModel } from '../sddispatchplanpayment.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { SDDispatchPlanPaymentService } from '../sddispatchplanpayment.service';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sddispatchplanpayment-entry',
  templateUrl: './sddispatchplanpayment-entry.component.html',
  styleUrls: ['./sddispatchplanpayment-entry.component.scss']
})

export class SDDispatchPlanPaymentEntryComponent implements OnInit {
  url: string;
  dialog_title: string;
  paymentTypes: SelectModel[] = [];

  constructor(
      private _ui: UIService,
      private datePipe: DatePipe,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _select: SelectService,
      private _myService: SDDispatchPlanPaymentService,
      private dialogRef: MatDialogRef<SDDispatchPlanPaymentEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: SDDispatchPlanPaymentModel
  ) { }

  ngOnInit() {
      switch (this.pModel.entryMode) {

          case 'A': {
              this.url = 'SDDispatchPlanPayment/Create';
              this.dialog_title = 'Add';
              break;
          }

          case 'E': {
              this.url = 'SDDispatchPlanPayment/Edit';
              this.dialog_title = 'Edit';
              break;
          }

          case 'D': {
              this.url = 'SDDispatchPlanPayment/Delete';
              this.dialog_title = 'Delete';
              break;
          }

          case 'V': {
              this.url = 'SDDispatchPlanPayment/View';
              this.dialog_title = 'View';
              break;
          }

          default: {
              this._msg.showError('Option not implemented..!');
              break;
          }
      }
      this._select.getMisc(600049, 0, false).subscribe((res: SelectModel[]) => {
        this.paymentTypes = res;
    });
  }



  onSubmit = function (form: SDDispatchPlanPaymentModel) {
        this.pModel.paymentDate = this.datePipe.transform(this.pModel.paymentDate, 'yyyy-M-d')
      form.sdDispatchPlanPaymentId = this.pModel.sdDispatchPlanPaymentId;
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
          this._myService.getSDDispatchPlanPaymentSubmit(form).subscribe((result: APIResultModel) => {
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

  validateForm(form: SDDispatchPlanPaymentModel) {
      if (this.pModel.entryMode === 'E') {



      }



      return true;
  }
}
