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
import { SignUpService } from './signup.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SDCompanyModel, SDUserModel,  UserModel, sdCompanyLocationModel } from './signup.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
  })

export class SignUpComponent implements OnInit {

    userObject: SDUserModel;
    companyObject: SDCompanyModel;
    valUserObject: UserModel;
    initialCheckup = false;
    companyTypes: SelectModel[] = [];

    cityList: SelectModel[] = [];
    timeZoneList: SelectModel[] = [];
    workingDaysList: SelectModel[] = [];
    cityTypes: SelectModel[] = [];
    countryId = 0;
    countryList: SelectModel[] = [];
    postalList: SelectModel[] = [];
    statesList: SelectModel[] = [];
    roleNames: SelectModel[] = [];
    stateId = 0;
    filteredCountry = 0;
    filteredCountries: SelectModel[] = [];
    smallScreen: boolean;
    locationDisplayedColumns: string[] =
    [
      'locationSrNo',
      'location',
      'locationDelete',
    ];
  locationData: sdCompanyLocationModel[] = [];
  locationDeletedElementsArray: sdCompanyLocationModel[] = [];
  locationTableValueAfterDeleteArray: sdCompanyLocationModel[] = [];
  locationDataSource = new MatTableDataSource(this.locationData);

    constructor(
        public dialog: MatDialog,
        private _cf: CommonService,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _select: SelectService,
        private _myService: SignUpService,
        private router: Router,
        private breakpointObserver: BreakpointObserver,
      ) {
        breakpointObserver.observe([
          Breakpoints.XSmall
        ]).subscribe(result => {
          this.smallScreen = result.matches;
        })
      }

  ngOnInit() {
      this.refreshMe();
  }

  refreshMe() {

    this._select.getRole(false).subscribe((res: SelectModel[]) => {
      this.roleNames = res;
  });

    this._select.getMisc(600001, 0, false).subscribe((res: SelectModel[]) => {
      this.companyTypes = res;
  });

  this._select.getStatesByCountry(this.countryId, false).subscribe((res: SelectModel[]) => {
    this.statesList = res;
});

this._select.getMisc(600004, 0, false).subscribe((res: SelectModel[]) => {
  this.timeZoneList = res;
});

this._select.getMisc(600003, 0, false).subscribe((res: SelectModel[]) => {
  this.workingDaysList = res;
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


    this.userObject = {
          sdUserId: 0,
          sdUserName: '',
          displayName: '',
          password: '',
          externalTypeId: 1,
          externalId: 'app',
          activationStatusId: 60000800001,
          sdCompanyId: 0,
          roleId: 4,
          active: true,
          entryMode: 'A',
          readOnly: false,
          auditColumns: null,
    };
    this.valUserObject = {
      username: '',
      password: '',
      roleId: 4,
    };
    this.companyObject = {
      sdCompanyId: 0,
      sdCityId: 0,
      sdCityPostalCodeId: 1,
      address: '',
      otherInformation: '',
      company: '',
      sdCompanyLocation: [],
      active: true,
      entryMode: 'A',
      readOnly: false,
      auditColumns: null,
    };


  }

  addLocationRecord() {
    const rowFB: sdCompanyLocationModel = {
      'sdCompanyLocationId': 0,
      'srNo': this.locationData.length + 1,
      'sdCompanyId': this.companyObject.sdCompanyId,
      'location': '',
      'entryStatus': 0,
      'deleted': false,
      'active': true
    };
    this.locationData.push(rowFB);
    this.locationDataSource.data = [...this.locationData];
  }

  onDeleteLocation(index: number) {
    // Assinging the values in the table to a tempArray
    this.locationTableValueAfterDeleteArray = this.locationData;
    // Looping through addressData to find targeted element
    this.locationData = this.locationData.map((ele, _index) => {
      if (index === _index) {
        if (ele.entryStatus !== 0) {
          ele.entryStatus = 2;
          ele.deleted = true;
          ele.active = false;
          // Saving the element to be pushed into the array prior to sending to the database
          this.locationDeletedElementsArray.push(ele);
        }
        // Deleting the element from the array
        this.locationTableValueAfterDeleteArray.splice(index, 1);
      }
      return ele;
    });
    // Assinging the value of the new array to the table
    this.locationData = this.locationTableValueAfterDeleteArray;
    // Arranging the srNo
    this.locationData = this.locationData.map((ele, _index) => {
      ele.srNo = _index + 1;
      return ele;
    });
    this.locationDataSource.data = [...this.locationData];
    // Preventing the table becoming empty
    if (this.locationData.length < 1) {
      this.addLocationRecord();
    }
  }

  addDeletedElements() {
    this.locationDeletedElementsArray.map((ele, _index) => {
      ele.srNo = _index + 1;
      this.locationData.push(ele);
    });
  }

  onCountryChange() {
    this.stateId = 0;
    this.companyObject.sdCityId = 0;
    this.companyObject.sdCityPostalCodeId = 1;
    this._select.getStatesByCountry(this.countryId, false).subscribe((res: SelectModel[]) => {
      this.statesList = res;
    });
    this._select.getCitiesByState(this.stateId, false).subscribe((res: SelectModel[]) => {
      this.cityTypes = res;
    });
    this._select.getPostalCodeByCity(this.companyObject.sdCityId, false).subscribe((res: SelectModel[]) => {
      this.postalList = res;
    });
  }

  onStateChange() {
    const ii = this.stateId;
    this.companyObject.sdCityId = 0;
    this.companyObject.sdCityPostalCodeId = 1;
    this._select.getCitiesByState(this.stateId, false).subscribe((res: SelectModel[]) => {
      this.cityTypes = res;
    });
    this._select.getPostalCodeByCity(this.companyObject.sdCityId, false).subscribe((res: SelectModel[]) => {
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
    this.companyObject.sdCityPostalCodeId = 1;
    this._select.getPostalCodeByCity(this.companyObject.sdCityId, false).subscribe((res: SelectModel[]) => {
      this.postalList = res;
    });
  }



  onNext() {
    this._ui.loadingStateChanged.next(true);
    this._myService.validateUserName(this.valUserObject).subscribe((result: SelectModel[]) => {
        this.userObject.sdUserName = this.valUserObject.username;
        this.userObject.password = this.valUserObject.password;
        this.userObject.roleId = this.valUserObject.roleId;
        if (result[0].id === 0) {
          this._ui.loadingStateChanged.next(false);
          if (this.locationData.length < 1)
          {
              this.addLocationRecord();
          }
          this.initialCheckup = true;
        } else {
          this._ui.loadingStateChanged.next(false);
          this._msg.showInfo('Error!!', 'User Already Exists');
        }
    }, error => {
      this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      return false;
    });
  }

  onSubmit() {
      this._ui.loadingStateChanged.next(true);
      this.onSubmitCompany();

  }



  onSubmitCompany() {
      this.addDeletedElements();
      this.companyObject.sdCompanyLocation = [...this.locationData];
      if (this.validateCompany(this.companyObject) !== true) {
        this._ui.loadingStateChanged.next(false);
        return false;
      }
      // this.companyObject.auditColumns = this._auth.getAuditColumns();
      try {
        // Calling the service(api) to submit the data
        this._myService.getCompanySubmit(this.companyObject).subscribe((result: APIResultModel) => {
            if (result.errorNo === 0) {
                // this._ui.loadingStateChanged.next(false);
                // this._msg.showInfo('Information', result.errorMessage);
                this.userObject.sdCompanyId = result.id;
                if (this.validateUser(this.userObject) !== true) {
                  this._ui.loadingStateChanged.next(false);
                  return false;
                }

                  // Calling the service(api) to submit the data
                  this._myService.getUserSubmit(this.userObject).subscribe((result2: APIResultModel) => {
                      if (result.errorNo === 0) {
                          this._ui.loadingStateChanged.next(false);
                          this._msg.showInfo('Information', result2.errorMessage);
                          this.router.navigate(['/sdvhcledtl']);
                      } else {
                          this._ui.loadingStateChanged.next(false);
                          this._msg.showError(result2.errorMessage);
                          return false;
                      }
                  }, error => {
                      this._ui.loadingStateChanged.next(false);
                      this._msg.showAPIError(error);
                      return false;
                    });

                // this.dialog.close();
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

  validateUser(form: SDUserModel) {
    let validationError =  false;
        if (form.entryMode === 'E') {
            if (form.sdUserId <= 0 || form.sdUserId === null) {
                this._msg.blankGroup('User Entry');
                validationError = true;
            }
     }
        if (form.sdUserName === '' || form.sdUserName === null) {
            this._msg.blankGroup('User Name');
            validationError = true;
        }
        if (form.displayName === '' || form.displayName === null) {
            this._msg.blankGroup('Display Name');
            validationError = true;
        }
        if (form.password === '' || form.password === null) {
            this._msg.blankGroup('Password');
            validationError = true;
        }
        if (form.externalTypeId < 0 || form.externalTypeId === null) {
            this._msg.blankGroup('External Type');
            validationError = true;
        }
        if (form.externalId === '' || form.externalId === null) {
            this._msg.blankGroup('External Id');
            validationError = true;
        }
        if (form.activationStatusId < 0 || form.activationStatusId === null) {
            this._msg.blankGroup('Activation Status');
            validationError = true;
        }
        if (form.sdCompanyId < 0 || form.sdCompanyId === null) {
            this._msg.blankGroup('Company');
            validationError = true;
        }

    if (validationError === true) {
      this._msg.blankGroupMessage();
      return false;
     } else {
      return true;
    }
  }

  validateCompany(form: SDCompanyModel) {
    let validationError =  false;
        if (form.entryMode === 'E') {
            if (form.sdCompanyId <= 0 || form.sdCompanyId === null) {
                this._msg.blankGroup('Company');
                validationError = true;
            }
     }
        if (form.company === '' || form.company === null) {
            this._msg.blankGroup('Company');
            validationError = true;
        }





    if (validationError === true) {
      this._msg.blankGroupMessage();
      return false;
     } else {
      return true;
    }
  }

}
