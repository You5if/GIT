import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SDCompanyContactsModel } from '../sdcompanycontacts.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { SDCompanyContactsService } from '../sdcompanycontacts.service';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';

@Component({
  selector: 'app-sdcompanycontacts-entry',
  templateUrl: './sdcompanycontacts-entry.component.html',
  styleUrls: ['./sdcompanycontacts-entry.component.scss']
})

export class SDCompanyContactsEntryComponent implements OnInit {
  url: string;
  dialog_title: string;


  constructor(
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _select: SelectService,
      private _myService: SDCompanyContactsService,
      private dialogRef: MatDialogRef<SDCompanyContactsEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: SDCompanyContactsModel
  ) { }

  ngOnInit() {
      switch (this.pModel.entryMode) {

          case 'A': {
              this.url = 'SDCompanyContacts/Create';
              this.dialog_title = 'Add';
              break;
          }

          case 'E': {
              this.url = 'SDCompanyContacts/Edit';
              this.dialog_title = 'Edit';
              break;
          }

          case 'D': {
              this.url = 'SDCompanyContacts/Delete';
              this.dialog_title = 'Delete';
              break;
          }

          case 'V': {
              this.url = 'SDCompanyContacts/View';
              this.dialog_title = 'View';
              break;
          }

          default: {
              this._msg.showError('Option not implemented..!');
              break;
          }
      }
  }



  onSubmit = function (form: SDCompanyContactsModel) {
      form.sdCompanyContactsId = this.pModel.sdCompanyContactsId;
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
          this._myService.getSDCompanyContactsSubmit(form).subscribe((result: APIResultModel) => {
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

  validateForm(form: SDCompanyContactsModel) {
      if (this.pModel.entryMode === 'E') {



      }



      return true;
  }
}
