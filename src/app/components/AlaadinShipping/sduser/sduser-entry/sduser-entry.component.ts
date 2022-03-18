import { Component, OnInit, Inject } from "@angular/core";
import { UIService } from "src/app/components/shared/uiservices/UI.service";
import { MessageBoxService } from "src/app/components/messagebox/message-box.service";
import { AuthService } from "src/app/components/security/auth/auth.service";
import { CommonService } from "src/app/components/common/common.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { SDUserModel, UserModel } from "../sduser.model";
import { APIResultModel } from "src/app/components/misc/APIResult.Model";
import { SDUserService } from "../sduser.service";
import { Observable, of } from "rxjs";
import {
  SelectModel,
  SelectCodeModel,
} from "src/app/components/misc/SelectModel";
import { FormControl } from "@angular/forms";
import { startWith, switchMap, map } from "rxjs/operators";
import { SelectService } from "src/app/components/common/select.service";

@Component({
  selector: "app-sduser-entry",
  templateUrl: "./sduser-entry.component.html",
  styleUrls: ["./sduser-entry.component.scss"],
})
export class SDUserEntryComponent implements OnInit {
  url: string;
  dialog_title: string;
  companyTypes: SelectModel[] = [];
  roleNames: SelectModel[] = [];
  userCompany: number = +localStorage.getItem("sdCompanyId");
  valUserObject: UserModel;

  constructor(
    private _ui: UIService,
    private _msg: MessageBoxService,
    private _auth: AuthService,
    private _select: SelectService,
    private _myService: SDUserService,
    private dialogRef: MatDialogRef<SDUserEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public pModel: SDUserModel
  ) {}

  ngOnInit() {
    this.valUserObject = {
      username: "",
      password: "",
    };
    switch (this.pModel.entryMode) {
      case "A": {
        this.url = "SDUser/Create";
        this.dialog_title = "Add";
        break;
      }

      case "E": {
        this.url = "SDUser/Edit";
        this.dialog_title = "Edit";
        break;
      }

      case "D": {
        this.url = "SDUser/Delete";
        this.dialog_title = "Delete";
        break;
      }

      case "V": {
        this.url = "SDUser/View";
        this.dialog_title = "View";
        break;
      }

      default: {
        this._msg.showError("Option not implemented..!");
        break;
      }
    }
    this._select
      .getCompanyName(this.userCompany)
      .subscribe((res: SelectModel[]) => {
        this.companyTypes = res;
      });
    this._select.getRole(false).subscribe((res: SelectModel[]) => {
      this.roleNames = res;
    });
  }

  onSubmit = function (form: SDUserModel) {
    //   this.pModel.password = '-';
    this._ui.loadingStateChanged.next(true);
    this.valUserObject.username = this.pModel.sdUserName;
    this.valUserObject.password = this.pModel.password;
    if (this.pModel.entryMode === "A") {
      this._myService.validateUserName(this.valUserObject).subscribe(
        (result: SelectModel[]) => {
          console.log(result);
          if (result[0].id === 0) {
            this._ui.loadingStateChanged.next(false);
            // adding new user

            form.sdUserId = this.pModel.sdUserId;
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
              this._myService.getSDUserSubmit(form).subscribe(
                (resultUser: APIResultModel) => {
                  if (resultUser.errorNo === 0) {
                    this._ui.loadingStateChanged.next(false);
                    this._msg.showInfo(resultUser.errorMessage);
                    this.dialogRef.close();
                  } else {
                    this._ui.loadingStateChanged.next(false);
                    this._msg.showError(resultUser.errorMessage);
                    return false;
                  }
                },
                (error) => {
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
            // end of adding new user
          } else {
            this._ui.loadingStateChanged.next(false);
            this._msg.showInfo("Error!!", "User Already Exists");
          }
        },
        (error) => {
          this._ui.loadingStateChanged.next(false);
          this._msg.showAPIError(error);
          return false;
        }
      );
    } else if (this.pModel.entryMode === "E" || this.pModel.entryMode === 'D') {
      this.pModel.password = '-';
      form.sdUserId = this.pModel.sdUserId;
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
        this._myService.getSDUserSubmit(form).subscribe(
          (resultUser: APIResultModel) => {
            if (resultUser.errorNo === 0) {
              this._ui.loadingStateChanged.next(false);
              this._msg.showInfo(resultUser.errorMessage);
              this.dialogRef.close();
            } else {
              this._ui.loadingStateChanged.next(false);
              this._msg.showError(resultUser.errorMessage);
              return false;
            }
          },
          (error) => {
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
    }
  };

  onDelete() {
    console.log(JSON.stringify(this.pModel));
    this._myService.delete(this.pModel).subscribe((res) => {
      console.log(res);
      window.location.reload();
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  validateForm(form: SDUserModel) {
    if (this.pModel.entryMode === "E") {
    }

    return true;
  }
}
