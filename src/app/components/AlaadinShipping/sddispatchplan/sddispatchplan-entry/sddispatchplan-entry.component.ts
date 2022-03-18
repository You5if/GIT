import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialog } from '@angular/material';
import { SDDispatchPlanModel, SDDispatchPlanVehicleModel, SDDispatchVehicleGeneratorModel } from '../sddispatchplan.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { SDDispatchPlanService } from '../sddispatchplan.service';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { SDVehicleDetailService } from '../../sdvehicledetail/sdvehicledetail.service';
import { SDVehicleDetailModel } from '../../sdvehicledetail/sdvehicledetail.model';
import { SDVehicleDetailEntryComponent } from '../../sdvehicledetail/sdvehicledetail-entry/sdvehicledetail-entry.component';
import { AttendanceuploadReadComponent } from 'src/app/components/StatesDispatch/uploadRead/uploadRead.component';
import { FileListModel } from 'src/app/components/common/upload/upload-file.model';
import { SDCompanyModel } from 'src/app/components/security/signup/signup.model';
import { SDCompanyEntryComponent } from '../../sdcompany/sdcompany-entry/sdcompany-entry.component';
import { SDCompanyService } from '../../sdcompany/sdcompany.service';
import { SDShippingLineCompanyModel } from '../../sdshippinglinecompanies/sdshippinglinecompanies.model';
import { SDShippingLineCompaniesEntryComponent } from '../../sdshippinglinecompanies/sdshippinglinecompanies-entry/sdshippinglinecompanies-entry.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sddispatchplan-entry',
  templateUrl: './sddispatchplan-entry.component.html',
  styleUrls: ['./sddispatchplan-entry.component.scss']
})

export class SDDispatchPlanEntryComponent implements OnInit {
  url: string;
  dialog_title: string;
  vehicleBatch: string;
  planEdit = false;
  vehicleEdit = false;
  userCompany: number = +localStorage.getItem('sdCompanyId');
  companyTypes: SelectModel[] = [];
  statusTypes: SelectModel[] = [];
  shippingCompanies: SelectModel[] = [];
  vehicleBatches: SelectModel[] = [];
  role: string;

  vehicleDisplayedColumns: string[] =
  [
    'vehicleSrNo',
    'sdVehicleDetailId',
    'model',
    'vehicleColor',
    'vin',
    'vehicleDetails',
    'vehiclePic',
    'vehicleDelete',
  ];
vehicleData: SDDispatchPlanVehicleModel[] = [];
vehicleDeletedElementsArray: SDDispatchPlanVehicleModel[] = [];
vehicleTableValueAfterDeleteArray: SDDispatchPlanVehicleModel[] = [];
vehicleDataSource = new MatTableDataSource(this.vehicleData);
lFilesRecovered: FileListModel[];
locationTypes: SelectModel[] = [];


  constructor(
      private sdcompanyservice: SDCompanyService,
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _select: SelectService,
      private _myService: SDDispatchPlanService,
      private vehicleService: SDVehicleDetailService,
      private sdvehicledetailservice: SDVehicleDetailService,
      public dialog: MatDialog,
      private dialogRef3: MatDialogRef<AttendanceuploadReadComponent>,
      private dialogRef: MatDialogRef<SDDispatchPlanEntryComponent>,
      private dialogRef2: MatDialogRef<SDCompanyEntryComponent, SDShippingLineCompaniesEntryComponent>,
      private datePipe: DatePipe,
      @Inject(MAT_DIALOG_DATA) public pModel: SDDispatchPlanModel
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role')
    this.userCompany = +localStorage.getItem('sdCompanyId');
      switch (this.pModel.entryMode) {

          case 'A': {
              this.url = 'SDDispatchPlan/Create';
              this.dialog_title = 'Add';
              this.planEdit = true;
              this.vehicleEdit = false;
              break;
          }

          case 'B': {
            this.url = 'SDDispatchPlan/Edit';
            this.dialog_title = 'Edit';
            this.pModel.entryMode = 'E';
            this.planEdit = false;
            this.vehicleEdit = true;
            break;
        }

          case 'E': {
              this.url = 'SDDispatchPlan/Edit';
              this.dialog_title = 'Edit';
              this.planEdit = true;
              this.vehicleEdit = false;
              break;
          }

          case 'D': {
              this.url = 'SDDispatchPlan/Delete';
              this.dialog_title = 'Delete';
              break;
          }

          case 'V': {
              this.url = 'SDDispatchPlan/View';
              this.dialog_title = 'View';
              this.planEdit = true;
              this.vehicleEdit = false;
              break;
          }

          default: {
              this._msg.showError('Option not implemented..!');
              break;
          }
      }
      this._select.getConsignee(this.pModel.sdCompanyId, false).subscribe((res: SelectModel[]) => {
        this.locationTypes = res;
    });

      this.vehicleData = [...this.pModel.sdDispatchPlanVehicle];
      this.vehicleDataSource.data = [...this.vehicleData];
      this._select.getCompanyName(this.userCompany).subscribe((res: SelectModel[]) => {
        this.companyTypes = res;
    });
    this._select.getMisc(600023, 0, false).subscribe((res: SelectModel[]) => {
      this.statusTypes = res;
  });
  this._select.getShippingCompany(false).subscribe((res: SelectModel[]) => {
    this.shippingCompanies = res;
  });
  this._select.getVehicleBatch(false).subscribe((res: SelectModel[]) => {
    this.vehicleBatches = res;
  });
  this.vehicleData = [...this.pModel.sdDispatchPlanVehicle];

      for(let i = 0; i < this.vehicleData.length ; i++ ){
        this.getVehicleName(i, this.vehicleData[i].sdVehicleDetailId);
        // this.vehicleDataSource.data = [...this.vehicleData];
      }
      this.vehicleDataSource.data = [...this.vehicleData];
  }

  getVehicleName(ii: number, index: number) {
    let myvehname = '';
    // this.vehicleService.getSDVehicleDetailEntry(index).subscribe((result: SDVehicleDetailModel) => {
    this._myService.onGenerateByPlan(index).subscribe((result: any) => {
      myvehname = result.vehicleName;
      // this.vehicleData[ii].vehicleName = result[0].vehicleName;
      this.vehicleData[ii].make = result[0].make;
      this.vehicleData[ii].model = result[0].model;
      this.vehicleData[ii].vehicleColor = result[0].vehicleColor;
      this.vehicleData[ii].vin = result[0].vin;
      // this.vehicleDataSource.data = [...this.vehicleData];
    });
  }


  onFetchDetail = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.sdvehicledetailservice.getSDVehicleDetailEntry(id).subscribe((result: SDVehicleDetailModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openVehicleEntry(result);
    });
  }

  onCompanyChange() {
    this.pModel.sdCompanyLocationId = 0;
    this._select.getConsignee(this.pModel.sdCompanyId, false).subscribe((res: SelectModel[]) => {
      this.locationTypes = res;
  });
  }

  openVehicleEntry = function (result: SDVehicleDetailModel) {
    if (result === undefined) {
      this.dialogRef2 = this.dialog.open(SDVehicleDetailEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef2 = this.dialog.open(SDVehicleDetailEntryComponent, {
        disableClose: true,
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      // this.refreshMe();
    });
  };

  onFetchPic = (id: number) =>{
    this.sdvehicledetailservice.getSDVehicleDetailEntry(id).subscribe((result: SDVehicleDetailModel) => {
      // this._ui.loadingStateChanged.next(false);
      result.entryMode = 'E';
      result.readOnly = false;
      // this.openEntry(result);
      if (result === undefined) {
        this.dialogRef3 = this.dialog.open(AttendanceuploadReadComponent, {
          disableClose: true,
          data: {}
        });
      } else {
        this.lFilesRecovered = [];
        for (let i = 0; i < result.sdVehicleDetailPic.length; i++) {
          const rowFB: FileListModel = {
            apiPath: result.sdVehicleDetailPic[i].apiPath,
            apiImagePath: result.sdVehicleDetailPic[i].apiImagePath,
            extention: result.sdVehicleDetailPic[i].extension,
            fileName: result.sdVehicleDetailPic[i].fileName,
            fullPath: result.sdVehicleDetailPic[i].fullPath,
            originalFileName: result.sdVehicleDetailPic[i].originalFileName,
          };

        this.lFilesRecovered.push(rowFB);
        }
        this.dialogRef3 = this.dialog.open(AttendanceuploadReadComponent, {
          disableClose: true,
          data: this.lFilesRecovered // result
        });
      }
    });
  }


  addVehicles() {
    if (confirm('Are you sure?')) {
      this._myService.onGenerate(this.vehicleBatch).subscribe((result: SDDispatchVehicleGeneratorModel[]) => {
        result.map((ele) => {
            // Sets value for row elements
            const rowFB: SDDispatchPlanVehicleModel = {
                'sdDispatchPlanVehicleId': 0,
                'srNo': this.vehicleData.length + 1,
                // 'vehicleName': '',
                'make': ele.make,
                'model': ele.model,
                'vin': ele.vin,
                'vehicleColor': ele.vehicleColor,
                'sdDispatchPlanId': this.pModel.sdDispatchPlanId,
                'sdVehicleDetailId': ele.sdVehicleDetailId,
                active: true,
                deleted: false,
                entryStatus: 0
            };
            this.vehicleData.push(rowFB);
            this.vehicleDataSource.data = [...this.vehicleData];

        });

    });
    }
  }

  addVehicleRecord() {
    const rowFB: SDDispatchPlanVehicleModel = {
      'srNo': this.vehicleData.length + 1,
      // 'vehicleName': '',
       make: '',
       model: '',
      'vin': '',
      'vehicleColor': '',
      'sdDispatchPlanId': this.pModel.sdDispatchPlanId,
      'sdDispatchPlanVehicleId': 0,
      'sdVehicleDetailId': 0,
      'entryStatus': 0,
      'deleted': false,
      'active': true
    };
    this.vehicleData.push(rowFB);
    this.vehicleDataSource.data = [...this.vehicleData];
  }

  onDeleteVehicle(index: number) {
    // Assinging the values in the table to a tempArray
    this.vehicleTableValueAfterDeleteArray = this.vehicleData;
    // Looping through addressData to find targeted element
    this.vehicleData = this.vehicleData.map((ele, _index) => {
      if (index === _index) {
        if (ele.entryStatus !== 0) {
          ele.entryStatus = 2;
          ele.deleted = true;
          ele.active = false;
          // Saving the element to be pushed into the array prior to sending to the database
          this.vehicleDeletedElementsArray.push(ele);
        }
        // Deleting the element from the array
        this.vehicleTableValueAfterDeleteArray.splice(index, 1);
      }
      return ele;
    });
    // Assinging the value of the new array to the table
    this.vehicleData = this.vehicleTableValueAfterDeleteArray;
    // Arranging the srNo
    this.vehicleData = this.vehicleData.map((ele, _index) => {
      ele.srNo = _index + 1;
      return ele;
    });
    this.vehicleDataSource.data = [...this.vehicleData];
    // Preventing the table becoming empty
    // if (this.vehicleData.length < 1) {
    //   this.addVehicleRecord();
    // }
  }

  addDeletedElements() {
    this.vehicleDeletedElementsArray.map((ele, _index) => {
      ele.srNo = _index + 1;
      this.vehicleData.push(ele);
    });
  }

  onSubmit = function (form: SDDispatchPlanModel) {
    this.pModel.dispatchDate = this.datePipe.transform(this.pModel.dispatchDate, 'yyyy-M-d')
    this.addDeletedElements();
    form.sdDispatchPlanId = this.pModel.sdDispatchPlanId;
    form = this.pModel;
    form.sdDispatchPlanVehicle = [...this.vehicleData];
    this._ui.loadingStateChanged.next(true);

    if (this.validateForm(form) !== true) {
        this._ui.loadingStateChanged.next(false);
        return false;
    }

    form.auditColumns = this._auth.getAuditColumns();
    form.entryMode = this.pModel.entryMode;
    try {
        // Calling the service(api) to submit the data
        this._myService.getSDDispatchPlanSubmit(form).subscribe((result: APIResultModel) => {
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

  validateForm(form: SDDispatchPlanModel) {
      if (this.pModel.entryMode === 'E') {
      }
      return true;
  }

  onCompanyEdit = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.sdcompanyservice.getSDCompanyEntry(id).subscribe((result: SDCompanyModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'E';
      result.readOnly = false;
      this.openCompanyEntry(result);
    });
  }

  openCompanyEntry = function (result: SDCompanyModel) {
    if (result === undefined) {
      this.dialogRef2 = this.dialog.open(SDCompanyEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef2 = this.dialog.open(SDCompanyEntryComponent, {
        disableClose: true,
        data: result
      });
    }
    this.dialogRef2.afterClosed().subscribe(() => {
      this._select.getConsignee(this.pModel.sdCompanyId, false).subscribe((res: SelectModel[]) => {
        this.locationTypes = res;
      });
      this.onCompanyChange();
    });
  };

  onAddShippingLineCompany = function () {
    const result: SDShippingLineCompanyModel = {
      'sdShippingLineCompanyId': 0,
      'company': '',
      'sdCityId': 0,
      'address': '',
      'mobile': '',
      'email': '',
      'otherInformation': '',
      'auditColumns': null,
      'entryMode': 'A',
      'active': true,
      'readOnly': false
    };
    this.openShippingLineCompanyEntry(result);
  };

  openShippingLineCompanyEntry = function (result: SDShippingLineCompanyModel) {
    if (result === undefined) {
      this.dialogRef2 = this.dialog.open(SDShippingLineCompaniesEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef2 = this.dialog.open(SDShippingLineCompaniesEntryComponent, {
        disableClose: true,
        data: result
      });
    }
    this.dialogRef2.afterClosed().subscribe(() => {
      this._select.getShippingCompany(false).subscribe((res: SelectModel[]) => {
        this.shippingCompanies = res;
      });
    });
  };
}
