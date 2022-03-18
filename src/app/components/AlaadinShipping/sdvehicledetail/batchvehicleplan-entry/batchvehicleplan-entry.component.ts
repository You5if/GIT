import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SDVehicleDetailModel, PlanVehiclesBatch } from '../sdvehicledetail.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { SDVehicleDetailService } from '../sdvehicledetail.service';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';

@Component({
  selector: 'app-batchvehicleplan-entry',
  templateUrl: './batchvehicleplan-entry.component.html',
  styleUrls: ['./batchvehicleplan-entry.component.scss']
})

export class BatchVehiclePlanEntryComponent implements OnInit {

  options: FormGroup;
  filteredPlans: Observable<SelectCodeModel[]>;
  planAC = new FormControl();

  constructor(
    private _ui: UIService,
    private _msg: MessageBoxService,
    private _auth: AuthService,
    private _select: SelectService,
    private _myService: SDVehicleDetailService,
    fb: FormBuilder,
    private dialogRef: MatDialogRef<BatchVehiclePlanEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public pModel: PlanVehiclesBatch
) {
  this.options = fb.group({
    hideRequired: false,
    floatLabel: 'auto',
  });
}

ngOnInit() {
  this.filteredPlans = this.planAC.valueChanges.pipe(startWith(''),
switchMap(value => this._planFilter(value)));
}

private _planFilter(fieldName: string = '') {
  if (fieldName.length >= 3)
  {
      return this._select.getPlanName(fieldName).pipe(
          map((results) => {
              return results;
          }));
  }
  else {
      return of(null);
  }
}

onPlanSelect(pId: number) {
  //  Assiging the managerId
  this.pModel.sdDispatchPlanId = pId;
  //  Setting the value for Manger name
  this._select.getPlanDetails(pId).subscribe((fieldDetails: SelectModel[]) => {
      const name = fieldDetails.filter(ele => ele.id === pId)[0].name;
      this.planAC.setValue(`${ name}`);
  });
}

onCancel() {
  this.dialogRef.close();
}

onSubmit = function (form: PlanVehiclesBatch) {
  for(let i = 0; i < this.pModel.sdDispatchPlanVehicles.length ; i++) {
    this.pModel.sdDispatchPlanVehicles[i].sdDispatchPlanId = this.pModel.sdDispatchPlanId;
  }
  form = this.pModel;
  this._ui.loadingStateChanged.next(true);
  // if (this.validateForm(form) !== true) {
  //     this._ui.loadingStateChanged.next(false);
  //     return false;
  // }
  form.auditColumns = this._auth.getAuditColumns();
  try {
      // Calling the service(api) to submit the data
      this._myService.getSDBatchVehiclesSubmit(form).subscribe((result: APIResultModel) => {
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

}


