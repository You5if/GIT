import { Component, OnInit, Inject } from "@angular/core";
import { UIService } from "src/app/components/shared/uiservices/UI.service";
import { MessageBoxService } from "src/app/components/messagebox/message-box.service";
import { AuthService } from "src/app/components/security/auth/auth.service";
import { CommonService } from "src/app/components/common/common.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { SDShippingLineCompanyModel } from "../sdshippinglinecompanies.model";
import { APIResultModel } from "src/app/components/misc/APIResult.Model";
import { SDShippingLineCompaniesService } from "../sdshippinglinecompanies.service";
import { Observable, of } from "rxjs";
import {
  SelectModel,
  SelectCodeModel
} from "src/app/components/misc/SelectModel";
import { FormControl } from "@angular/forms";
import { startWith, switchMap, map } from "rxjs/operators";
import { SelectService } from "src/app/components/common/select.service";

@Component({
  selector: "app-sdshippinglinecompanies-entry",
  templateUrl: "./sdshippinglinecompanies-entry.component.html",
  styleUrls: ["./sdshippinglinecompanies-entry.component.scss"]
})
export class SDShippingLineCompaniesEntryComponent implements OnInit {
  url: string;
  dialog_title: string;
  cityTypes: SelectModel[] = [];
  stateId = 0;
  statesList: SelectModel[] = [];

  constructor(
    private _ui: UIService,
    private _msg: MessageBoxService,
    private _auth: AuthService,
    private _select: SelectService,
    private _myService: SDShippingLineCompaniesService,
    private dialogRef: MatDialogRef<SDShippingLineCompaniesEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public pModel: SDShippingLineCompanyModel
  ) {}

  ngOnInit() {
    switch (this.pModel.entryMode) {
      case "A": {
        this.url = "SDShippingLineCompanies/Create";
        this.dialog_title = "Add";
        this._select
          .getStatesByCountry(248, false)
          .subscribe((res: SelectModel[]) => {
            this.statesList = res;
          });
        this._select
          .getCitiesByState(this.stateId, false)
          .subscribe((res: SelectModel[]) => {
            this.cityTypes = res;
          });
        break;
      }

      case "E": {
        this.url = "SDShippingLineCompanies/Edit";
        this.dialog_title = "Edit";
        this._select
          .getStatesByCountry(248, false)
          .subscribe((res: SelectModel[]) => {
            this.statesList = res;
            this._select
              .getStateByCity(this.pModel.sdCityId, false)
              .subscribe((res2: SelectModel[]) => {
                this.stateId = res2[0].id;
                this._select
                  .getCitiesByState(this.stateId, false)
                  .subscribe((res3: SelectModel[]) => {
                    this.cityTypes = res3;
                  });
              });
          });
        break;
      }

      case "D": {
        this.url = "SDShippingLineCompanies/Delete";
        this.dialog_title = "Delete";
        break;
      }

      case "V": {
        this.url = "SDShippingLineCompanies/View";
        this.dialog_title = "View";
        this._select
          .getStatesByCountry(248, false)
          .subscribe((res: SelectModel[]) => {
            this.statesList = res;
            this._select
              .getStateByCity(this.pModel.sdCityId, false)
              .subscribe((res2: SelectModel[]) => {
                this.stateId = res2[0].id;
                this._select
                  .getCitiesByState(this.stateId, false)
                  .subscribe((res3: SelectModel[]) => {
                    this.cityTypes = res3;
                  });
              });
          });
        break;
      }

      default: {
        this._msg.showError("Option not implemented..!");
        break;
      }
    }
  }

  onStateChange() {
    const ii = this.stateId;
    this.pModel.sdCityId = 0;
    this._select
      .getCitiesByState(this.stateId, false)
      .subscribe((res: SelectModel[]) => {
        this.cityTypes = res;
      });
  }

  onSubmit = function(form: SDShippingLineCompanyModel) {
    form.sdShippingLineCompanyId = this.pModel.sdShippingLineCompaniesId;
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
      this._myService.getSDShippingLineCompaniesSubmit(form).subscribe(
        (result: APIResultModel) => {
          if (result.errorNo === 0) {
            this._ui.loadingStateChanged.next(false);
            this._msg.showInfo(result.errorMessage);
            this.dialogRef.close();
          } else {
            this._ui.loadingStateChanged.next(false);
            this._msg.showError(result.errorMessage);
            return false;
          }
        },
        error => {
          this._ui.loadingStateChanged.next(false);
          this._msg.showAPIError(error);
          return false;
        }
      );
    } catch (error) {
      this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      return false;
    }
  };

  onCancel() {
    this.dialogRef.close();
  }

  validateForm(form: SDShippingLineCompanyModel) {
    if (this.pModel.entryMode === "E") {
    }

    return true;
  }
}
