import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent, MatTableDataSource, MatDialogRef } from '@angular/material';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { Router } from '@angular/router';
import { SDBatchVehicleEntryService } from './sdbatchvehicleentry.service';
import { UploadComponent } from 'src/app/components/common/upload/upload.component';
import { SDBatchVehicleEntryModel, SDVehicleDetailPic } from './sdbatchvehicleentry.model';
import { FileListModel } from '../../common/upload/upload-file.model';

@Component({
    selector: 'app-sdbatchvehicleentry',
    templateUrl: './sdbatchvehicleentry.component.html',
    styleUrls: ['./sdbatchvehicleentry.component.scss']
  })

export class SDBatchVehicleEntryComponent implements OnInit {
  lFiles: FileListModel[] = [];
  options: FormGroup;
  selectionType: string;
  selectionTypes: string[] = ['Single', 'Batch'];
  singleVisible = true;
  multipleVisible = false;
  userCompany: number = +localStorage.getItem('sdCompanyId');
  pModel: SDBatchVehicleEntryModel;
  vehicleTypes: SelectModel[] = [];
  runConditions: SelectModel[] = [];
  carMakes: SelectModel[] = [];
  carModels: SelectModel[] = [];
  companyTypes: SelectModel[] = [];

  cityList: SelectModel[] = [];
  years: number[];
  cityTypes: SelectModel[] = [];

  statesList: SelectModel[] = [];
    countryId = 248;
    countryList: SelectModel[] = [];
    postalList: SelectModel[] = [];
    stateId = 0;

    constructor(
        public dialog: MatDialog,
        private _cf: CommonService,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _select: SelectService,
        private _myService: SDBatchVehicleEntryService,
        private dialogRef: MatDialogRef<SDBatchVehicleEntryComponent>,
        private router: Router,
        fb: FormBuilder,
      ) {
        this.options = fb.group({
          hideRequired: false,
          floatLabel: 'auto',
        })
      }

  ngOnInit() {
      this.refreshMe();
  }

  refreshMe() {
    this.selectionType = this.selectionTypes[0];
    this.userCompany = +localStorage.getItem('sdCompanyId');

    this.pModel = {
      sdCompanyId: 1,
      vehicleName: '-',
      runConditionId: 1,
      vin: 'N/A',
      year: 1,
      sdCarMakeId: 1,
      sdCarModelId: 1,
      vehicleTypeId: 1,
      vehicleColor: '-',
      lotNumber: 'N/A',
      licensePlate: 'N/A',
      carLocation: 'N/A',
      carTagNumber: 'N/A',
      keysAvailable: true,
      titleAvailable: true,
      sdCityId: 1,
      sdCityPostalCodeId: 1,
      wideLoad: false,
      additionalInformation: 'N/A',
      qty: 1,
      sdVehicleDetailPic: [],
      auditColumns: null,
    };
    this._select.getMisc(600016, 0, false).subscribe((res: SelectModel[]) => {
      this.vehicleTypes = res;
  });
  this._select.getMisc(600015, 0, false).subscribe((res: SelectModel[]) => {
    this.runConditions = res;
  });
  this.years = this._select.generateNumbers(1950, new Date().getFullYear() + 1);
  this._select.getStatesByCountry(248, false).subscribe((res: SelectModel[]) => {
    this.statesList = res;
});
this._select.getShippingCities(false).subscribe((res: SelectModel[]) => {
  this.cityTypes = res;
});
this._select.getPostalCodeByCity(0, false).subscribe((res: SelectModel[]) => {
  this.postalList = res;
});
this._select.getCountry(false).subscribe((res: SelectModel[]) => {
  this.countryList = res;
});
this._select.getCarMake(false).subscribe((res: SelectModel[]) => {
  this.carMakes = res;
});
this._select.getCarModel(this.pModel.sdCarMakeId, false).subscribe((res: SelectModel[]) => {
  this.carModels = res;
});
this._select.getCompanyName(this.userCompany).subscribe((res: SelectModel[]) => {
  this.companyTypes = res;
});
  }

  onMakeChange() {
    // const ii = this.stateId;
    this.pModel.sdCarModelId = 0;
    this._select.getCarModel(this.pModel.sdCarMakeId, false).subscribe((res: SelectModel[]) => {
      this.carModels = res;
    });
  }

  public uploadFinished = (event) => { // this is event being called when file gets uploaded
    const file: FileListModel = {
        originalFileName: event.originalFileName,
        fileName: event.fileName,
        extention: event.extention,
        fullPath: event.fullPath,
        apiPath: event.apiPath,
        apiImagePath: event.apiPath
    };
    this.lFiles.push(file); // and it pushes the files to this array also, then why doesnt it show?
    // this.data = this.lFiles;
    // this.validatedisabled = false
    // this.validatedisabledmethod();
    // bro problem is not this component, it somehow is not reflecting in other two... the files which i brought here..
    // yea i was just making sure they were leaving here correctly.. now i will go to step 2, sorry ok
}

public deleteFile = (event) => {
    if (event !== undefined || event !== null) {
        for (let index = 0; index < this.lFiles.length; index++) {
            if (this.lFiles[index].fileName === event._body) {
                const delIndex = this.lFiles.indexOf(this.lFiles[index], 0);
                if (delIndex > -1) {
                    this.lFiles.splice(delIndex, 1);
                }
            }
        }
    }
}

  onCountryChange() {
    this.stateId = 0;
    this.pModel.sdCityId = 0;
    this.pModel.sdCityPostalCodeId = 1;
    this._select.getStatesByCountry(248, false).subscribe((res: SelectModel[]) => {
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

  radioChange(event: any) {
    if (event.value === 'Single') {
      this.singleVisible = true;
      this.pModel.qty = 1;
      this.multipleVisible = false;
    } else {
      this.pModel.vin = 'N/A';
      this.pModel.licensePlate = 'N/A';
      this.singleVisible = false;
      this.multipleVisible = true;
    }
  }



  onSubmit(form: SDBatchVehicleEntryModel) {
    this._ui.loadingStateChanged.next(true);
    if (this.validateForm(form) !== true) {
      this._ui.loadingStateChanged.next(false);
      return false;
  }

  form.auditColumns = this._auth.getAuditColumns();
  try {
    let vehiclepicdata: SDVehicleDetailPic[] = [];
    for (let i = 0; i < this.lFiles.length; i++) {
      let rowFB: SDVehicleDetailPic = {
        sdVehicleDetailPicId: 0,
        srNo: i+1,
        sdVehicleDetailId: 0,
        apiImagePath: this.lFiles[i].apiImagePath,
        apiPath: this.lFiles[i].apiPath,
        extension: this.lFiles[i].extention,
        fileName: this.lFiles[i].fileName,
        fullPath: this.lFiles[i].fullPath,
        originalFileName: this.lFiles[i].originalFileName,
        active: true,
        entryMode: 'A',
        readOnly: false,
        auditColumns: this._auth.getAuditColumns(),
      };
      vehiclepicdata.push(rowFB);
    }
    this.pModel.sdVehicleDetailPic = [...vehiclepicdata];

    this.pModel.sdCityPostalCodeId = 1;
    this.pModel.auditColumns = this._auth.getAuditColumns();
    form = this.pModel;
    // Calling the service(api) to submit the data
    this._myService.getSubmit(form).subscribe((result: APIResultModel) => {
        if (result.errorNo === 0) {
            this._ui.loadingStateChanged.next(false);
            this._msg.showInfo('Info', result.errorMessage);
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

  }

  validateForm(form: SDBatchVehicleEntryModel) {
    let validationError =  false;

            if (form.sdCompanyId <= 0 || form.sdCompanyId === null) {
                this._msg.blankGroup('Company');
                validationError = true;
            }
        if (form.vehicleName === '' || form.vehicleName === null) {
            this._msg.blankGroup('Vehicle');
            validationError = true;
        }
        if (form.runConditionId < 0 || form.runConditionId === null) {
            this._msg.blankGroup('Run Condition');
            validationError = true;
        }
        if (form.vin === '' || form.vin === null) {
          this._msg.blankGroup('VIN');
          validationError = true;
        }
        if (form.year < 0 || form.year === null) {
          this._msg.blankGroup('Year');
          validationError = true;
        }
        if (form.vehicleTypeId < 0 || form.vehicleTypeId === null) {
          this._msg.blankGroup('Vehicle Type');
          validationError = true;
        }
        if (form.vehicleColor === '' || form.vehicleColor === null) {
          this._msg.blankGroup('Vehicle Color');
          validationError = true;
        }
        if (form.licensePlate === '' || form.licensePlate === null) {
          this._msg.blankGroup('License Plate');
          validationError = true;
        }

        if (form.sdCityId < 0 || form.sdCityId === null) {
          this._msg.blankGroup('City');
          validationError = true;
        }
        if (form.additionalInformation === '' || form.additionalInformation === null) {
          this._msg.blankGroup('Additional Information');
          validationError = true;
        }
        if (form.qty < 0 || form.qty === null) {
          this._msg.blankGroup('Quantity');
          validationError = true;
        }
    if (validationError === true) {
      this._msg.blankGroupMessage();
      return false;
     } else {
      return true;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  // onUpload = function () {
  //   this.dialogRef = this.dialog.open(AttendanceuploadComponent, {
  //     disableClose: true,
  //     data: {}
  //   });
  //   this.dialogRef.afterClosed().subscribe((result: any) => {
  //     this.refreshMe();
  //   });
  // };


  }

