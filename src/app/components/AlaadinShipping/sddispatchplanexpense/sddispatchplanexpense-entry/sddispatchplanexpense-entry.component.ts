import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SDDispatchPlanExpenseModel } from '../sddispatchplanexpense.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { SDDispatchPlanExpenseService } from '../sddispatchplanexpense.service';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sddispatchplanexpense-entry',
  templateUrl: './sddispatchplanexpense-entry.component.html',
  styleUrls: ['./sddispatchplanexpense-entry.component.scss']
})

export class SDDispatchPlanExpenseEntryComponent implements OnInit {
  url: string;
  dialog_title: string;
  billableItems: SelectModel[] = [];
  paymentTypes: SelectModel[] = [];


  constructor(
      private _ui: UIService,
      private datePipe: DatePipe,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _select: SelectService,
      private _myService: SDDispatchPlanExpenseService,
      private dialogRef: MatDialogRef<SDDispatchPlanExpenseEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: SDDispatchPlanExpenseModel
  ) {
      dialogRef.disableClose = true;
  }

  ngOnInit() {
      switch (this.pModel.entryMode) {

          case 'A': {
              this.url = 'SDDispatchPlanExpense/Create';
              this.dialog_title = 'Add';
              break;
          }

          case 'E': {
              this.url = 'SDDispatchPlanExpense/Edit';
              this.dialog_title = 'Edit';
              break;
          }

          case 'D': {
              this.url = 'SDDispatchPlanExpense/Delete';
              this.dialog_title = 'Delete';
              break;
          }

          case 'V': {
              this.url = 'SDDispatchPlanExpense/View';
              this.dialog_title = 'View';
              break;
          }

          default: {
              this._msg.showError('Option not implemented..!');
              break;
          }
      }
      if(this.pModel.expenseTypeId === 60004800001) {
      this._select.getMisc(600050, 0, false).subscribe((res: SelectModel[]) => {
        this.billableItems = res;
    });
    }
    if(this.pModel.expenseTypeId === 60004800002) {
      this._select.getMisc(600045, 0, false).subscribe((res: SelectModel[]) => {
        this.billableItems = res;
    });
    }
    this._select.getMisc(600020, 0, false).subscribe((res: SelectModel[]) => {
      this.paymentTypes = res;
  });
  }



  onSubmit = function (form: SDDispatchPlanExpenseModel) {
        this.pModel.expenseDate = this.datePipe.transform(this.pModel.expenseDate, 'yyyy-M-d')
      form.sdDispatchPlanExpenseId = this.pModel.sdDispatchPlanExpenseId;
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
          this._myService.getSDDispatchPlanExpenseSubmit(form).subscribe((result: APIResultModel) => {
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

  validateForm(form: SDDispatchPlanExpenseModel) {
      if (this.pModel.entryMode === 'E') {



      }



      return true;
  }
}
