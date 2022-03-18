import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SDVehicleDetailModel } from '../sdvehicledetail.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { SDVehicleDetailService } from '../sdvehicledetail.service';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { SDCarModelModel } from '../../sdcarmodel/sdcarmodel.model';
import { SDCarModelEntryComponent } from '../../sdcarmodel/sdcarmodel-entry/sdcarmodel-entry.component';
import { SDCarMakeEntryComponent } from '../../sdcarmake/sdcarmake-entry/sdcarmake-entry.component';
import { SDCarMakeModel } from '../../sdcarmake/sdcarmake.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sdvehicledetail-entry',
  templateUrl: './sdvehicledetail-entry.component.html',
  styleUrls: ['./sdvehicledetail-entry.component.scss']
})

export class SDVehicleDetailEntryComponent implements OnInit {
  options: FormGroup;
  url: string;
  dialog_title: string;
  runConditions: SelectModel[] = [];
  vehicleTypes: SelectModel[] = [];
  dispatchStatusList: SelectModel[] = [];
  cityTypes: SelectModel[] = [];
  stateId = 0;
  statesList: SelectModel[] = [];
  countryId = 248;
  countryList: SelectModel[] = [];
  postalList: SelectModel[] = [];
  carMakes: SelectModel[] = [];
  carModels: SelectModel[] = [];
  years: number[];
  companyTypes: SelectModel[] = [];
  userCompany: number = +localStorage.getItem('sdCompanyId');
  usersList: any;
  role: string;


  constructor(
      public dialog: MatDialog,
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _select: SelectService,
      private _myService: SDVehicleDetailService,
      private fb: FormBuilder,
      public datePipe: DatePipe,
      private dialogRef: MatDialogRef<SDVehicleDetailEntryComponent>,
      // private dialogRef2: MatDialogRef<SDCarMakeEntryComponent>,
      private dialogRef3: MatDialogRef<SDCarModelEntryComponent, SDCarMakeEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: SDVehicleDetailModel
  ) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit() {
    this.role = localStorage.getItem('role')
    this._select.getUsers(false).subscribe(data => this.usersList = data);
      switch (this.pModel.entryMode) {

          case 'A': {
              this.url = 'SDVehicleDetail/Create';
              this.dialog_title = 'Add';
              this._select.getStatesByCountry(248, false).subscribe((res: SelectModel[]) => {
                this.statesList = res;
            });
            this._select.getCitiesByState(this.stateId, false).subscribe((res: SelectModel[]) => {
              this.cityTypes = res;
            });
            this._select.getPostalCodeByCity(0, false).subscribe((res: SelectModel[]) => {
              this.postalList = res;
            });
            this._select.getCountry(false).subscribe((res: SelectModel[]) => {
              this.countryList = res;
            });
              break;
          }

          case 'E': {
              this.url = 'SDVehicleDetail/Edit';
              this.dialog_title = 'Edit';
              this._select.getStatesByCountry(248, false).subscribe((res: SelectModel[]) => {
                this.statesList = res;
                this._select.getStateByCity(this.pModel.sdCityId, false).subscribe((res2: SelectModel[]) => {
                  this.stateId = res2[0].id;
                  this._select.getShippingCities(false).subscribe((res3: SelectModel[]) => {
                    this.cityTypes = res3;
                    this._select.getPostalCodeByCity(this.pModel.sdCityId, false).subscribe((resPostal: SelectModel[]) => {
                      this.postalList = resPostal;
                    });
                  });
                });
            });
              break;
          }

          case 'D': {
              this.url = 'SDVehicleDetail/Delete';
              this.dialog_title = 'Delete';
              break;
          }

          case 'V': {
              this.url = 'SDVehicleDetail/View';
              this.dialog_title = 'View';
              this.url = 'SDVehicleDetail/Edit';
              this.dialog_title = 'Edit';
              this._select.getStatesByCountry(248, false).subscribe((res: SelectModel[]) => {
                this.statesList = res;
                this._select.getStateByCity(this.pModel.sdCityId, false).subscribe((res2: SelectModel[]) => {
                  this.stateId = res2[0].id;
                  this._select.getShippingCities(false).subscribe((res3: SelectModel[]) => {
                    this.cityTypes = res3;
                    this._select.getPostalCodeByCity(this.pModel.sdCityId, false).subscribe((resPostal: SelectModel[]) => {
                      this.postalList = resPostal;
                    });
                  });
                });
              });
              break;
          }

          default: {
              this._msg.showError('Option not implemented..!');
              break;
          }
      }
      this._select.getMisc(600015, 0, false).subscribe((res: SelectModel[]) => {
        this.runConditions = res;
      });
      this._select.getMisc(600016, 0, false).subscribe((res: SelectModel[]) => {
        this.vehicleTypes = res;
      });
      this._select.getMisc(600017, 0, false).subscribe((res: SelectModel[]) => {
        this.dispatchStatusList = res;
      });
      this._select.getCarMake(false).subscribe((res: SelectModel[]) => {
        this.carMakes = res;
      });
      this._select.getCarModel(this.pModel.sdCarMakeId, false).subscribe((res: SelectModel[]) => {
        this.carModels = res;
      });
      this.years = this._select.generateNumbers(1950, new Date().getFullYear() + 1);
      this._select.getCompanyName(this.userCompany).subscribe((res: SelectModel[]) => {
        this.companyTypes = res;
    });
  }

  onRemarks() {
    this.pModel.sdUserId = +this._auth.getUserId();
    this.pModel.remarksDate = new Date();
  }

  onCustomerRemarks() {
    this.pModel.customerUserId = +this._auth.getUserId();
    this.pModel.customerRemarksDate = new Date();
  }

  onMakeChange() {
    // const ii = this.stateId;
    this.pModel.sdCarModelId = 0;
    this._select.getCarModel(this.pModel.sdCarMakeId, false).subscribe((res: SelectModel[]) => {
      this.carModels = res;
    });
  }

  onCountryChange() {
    this.stateId = 0;
    this.pModel.sdCityId = 0;
    this.pModel.sdCityPostalCodeId = 1;
    this._select.getStatesByCountry(this.countryId, false).subscribe((res: SelectModel[]) => {
      this.statesList = res;
    });
    this._select.getShippingCities(false).subscribe((res: SelectModel[]) => {
      this.cityTypes = res;
    });
    this._select.getPostalCodeByCity(this.pModel.sdCityId, false).subscribe((res: SelectModel[]) => {
      this.postalList = res;
    });
  }

  onStateChange() {
    const ii = this.stateId;
    this.pModel.sdCityId = 0;
    this.pModel.sdCityPostalCodeId = 1;
    this._select.getShippingCities(false).subscribe((res: SelectModel[]) => {
      this.cityTypes = res;
    });
    this._select.getPostalCodeByCity(this.pModel.sdCityId, false).subscribe((res: SelectModel[]) => {
      this.postalList = res;
    });
    // this._select.getCountryByState(this.stateId, false).subscribe((res: SelectModel[]) => {
    //   this.countryId = res[0].id;
    //   this.onCountryChange();
    //   this.stateId = ii;
    // });
    // this.stateId = ii;
  }

  onCityChange() {
    // const ii = this.stateId;
    this.pModel.sdCityPostalCodeId = 1;
    this._select.getPostalCodeByCity(this.pModel.sdCityId, false).subscribe((res: SelectModel[]) => {
      this.postalList = res;
    });
  }



  onSubmit = function (form: SDVehicleDetailModel) {
      this.pModel.receivedOn = this.datePipe.transform(this.pModel.receivedOn, 'yyyy-M-d')
      this.pModel.sdCityPostalCodeId = 1;
      form.sdVehicleDetailId = this.pModel.sdVehicleDetailId;
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
          this._myService.getSDVehicleDetailSubmit(form).subscribe((result: APIResultModel) => {
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

  validateForm(form: SDVehicleDetailModel) {
      if (this.pModel.entryMode === 'E') {



      }



      return true;
  }

  onMakeAdd = function () {
    const result: SDCarMakeModel = {
      
      'sdCarMakeId': 0,
      'carMake': '',
      'auditColumns': null,
      'entryMode': 'A',
      'active': true,
      'readOnly': false
    };
    this.openMakeEntry(result);
  };

  openMakeEntry = function (result: SDCarMakeModel) {
    if (result === undefined) {
      this.dialogRef3 = this.dialog.open(SDCarMakeEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef3 = this.dialog.open(SDCarMakeEntryComponent, {
        disableClose: true,
        data: result
      });
    }
    this.dialogRef3.afterClosed().subscribe(() => {
      this._select.getCarMake(false).subscribe((res: SelectModel[]) => {
        this.carMakes = res;
      });
    });
  };

  onModelAdd = function () {
    const result: SDCarModelModel = {
      
      'sdCarModelId': 0,
      'carModel': '',
      'sdCarMakeId': 0,
      'auditColumns': null,
      'entryMode': 'A',
      'active': true,
      'readOnly': false
    };
    this.openModelEntry(result);
  };

  openModelEntry = function (result: SDCarModelModel) {
    if (result === undefined) {
      this.dialogRef3 = this.dialog.open(SDCarModelEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef3 = this.dialog.open(SDCarModelEntryComponent, {
        disableClose: true,
        data: result
      });
    }
    this.dialogRef3.afterClosed().subscribe(() => {
      this._select.getCarModel(this.pModel.sdCarMakeId, false).subscribe((res: SelectModel[]) => {
        this.carModels = res;
      });
    });
  };
}
