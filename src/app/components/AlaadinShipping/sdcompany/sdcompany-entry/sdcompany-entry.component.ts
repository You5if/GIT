import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { SDCompanyModel, sdCompanyLocationModel } from '../sdcompany.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { SDCompanyService } from '../sdcompany.service';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';

@Component({
  selector: 'app-sdcompany-entry',
  templateUrl: './sdcompany-entry.component.html',
  styleUrls: ['./sdcompany-entry.component.scss']
})

export class SDCompanyEntryComponent implements OnInit {
  url: string;
  dialog_title: string;
  companycity = '';
  locationDisplayedColumns: string[] =
    [
      'locationSrNo',
      'location'
    ];
  locationData: sdCompanyLocationModel[] = [];
  locationDeletedElementsArray: sdCompanyLocationModel[] = [];
  locationTableValueAfterDeleteArray: sdCompanyLocationModel[] = [];
  locationDataSource = new MatTableDataSource(this.locationData);

  constructor(
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _select: SelectService,
      private _myService: SDCompanyService,
      private dialogRef: MatDialogRef<SDCompanyEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: SDCompanyModel
  ) { }

  ngOnInit() {
      switch (this.pModel.entryMode) {

          case 'A': {
              this.url = 'SDCompany/Create';
              this.dialog_title = 'Add';
              break;
          }

          case 'E': {
              this.url = 'SDCompany/Edit';
              this.dialog_title = 'Edit';
              this.locationData = this.pModel.sdCompanyLocation;
              this.locationDataSource.data = [...this.locationData];
              break;
          }

          case 'D': {
              this.url = 'SDCompany/Delete';
              this.dialog_title = 'Delete';
              break;
          }

          case 'V': {
              this.url = 'SDCompany/View';
              this.dialog_title = 'View';
              break;
          }

          default: {
              this._msg.showError('Option not implemented..!');
              break;
          }
      }
      if (this.locationData.length < 1) {
              this.addLocationRecord();
          }
      this._select.getCityName(this.pModel.sdCityId, false).subscribe((resPostal: SelectModel[]) => {
        this.companycity = resPostal[0].name;
      });
  }

  addLocationRecord() {
    const rowFB: sdCompanyLocationModel = {
      'sdCompanyLocationId': 0,
      'srNo': this.locationData.length + 1,
      'sdCompanyId': this.pModel.sdCompanyId,
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



  onSubmit = function (form: SDCompanyModel) {
      this.addDeletedElements();
      this.pModel.sdCompanyLocation = [...this.locationData];
      form.sdCompanyId = this.pModel.sdCompanyId;
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
          this._myService.getSDCompanySubmit(form).subscribe((result: APIResultModel) => {
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

  validateForm(form: SDCompanyModel) {
      if (this.pModel.entryMode === 'E') {



      }



      return true;
  }
}
