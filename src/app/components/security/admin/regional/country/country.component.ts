import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/components/common/common.service';
import { RegionalService } from '../regional.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { CountryModel } from './country.model';
import { AuthService } from '../../../auth/auth.service';
import { CountryEntryComponent } from './country-entry/country-entry.component';
import { RightModel } from '../../../auth/rights.model';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  displayedColumns: string[] =
    ['countryCode', 'country', 'isoAlpha2Code', 'isoAlpha3Code', 'isoNumericCode', 'active', 'edit', 'delete', 'view'];

  dataSource: any;
  isLastPage = false;
  pTableName: string;
  pScreenId: number;
  pTableId: number;
  recordsPerPage: number;
  currentPageIndex: number;
  menuId: number;

  // MatPaginator Inputs
  totalRecords: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // Screen Rights
  screenRights: RightModel = {
    amendFlag: false,
    createFlag: false,
    deleteFlag: false,
    editFlag: false,
    exportFlag: false,
    printFlag: false,
    reverseFlag: false,
    shortCloseFlag: false,
    viewFlag: false
  };

  constructor(
    public dialog: MatDialog,
    private _cf: CommonService,
    private _Service: RegionalService,
    private _ui: UIService,
    private _msg: MessageBoxService,
    private _auth: AuthService

  ) {
    this.pTableName = 'country';
    this.pScreenId = 10001;
    this.pTableId = 1;
    this.recordsPerPage = 10;
    this.currentPageIndex = 1;
    this.menuId = 1012414101;
  }

  ngOnInit() {
    this.refreshMe();
  }

  refreshMe() {
    this._cf.getPageData('country', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = 10;
          this.dataSource = new MatTableDataSource(result);
        }
      );
    this._auth.getScreenRights(this.menuId).subscribe((rights: RightModel) => {
      this.screenRights = rights;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  paginatoryOperation(event: PageEvent) {
    try {
      this._cf.getPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        this.pTableId, this.totalRecords).subscribe(
          (result: CountryModel) => {
            this._ui.loadingStateChanged.next(false);
            this.totalRecords = result[0].totalRecords;
            this.recordsPerPage = event.pageSize;
            this.dataSource = result;
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

  onAdd = function() {
    const result: CountryModel = {
      active: true,
      country: '',
      countryCode: '',
      countryId: 0,
      isoAlpha2Code: '',
      isoAlpha3Code: '',
      isoNumericCode: '',
      entryMode: 'A',
      readOnly: false,
      auditColumns: null
    };
    this.openEntry(result);
  };

  onView = function (id: number) {
    this._ui.loadingStateChanged.next(true);
    this._Service.getCountryEntry(id).subscribe((result: CountryModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  };

  onEdit = function (id: number) {
    this._ui.loadingStateChanged.next(true);
    this._Service.getCountryEntry(id).subscribe((result: CountryModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'E';
      result.readOnly = false;
      this.openEntry(result);
    });
  };

  onDelete = function (id: number) {
    this._ui.loadingStateChanged.next(true);
    this._Service.getCountryEntry(id).subscribe((result: CountryModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'D';
      result.readOnly = true;
      this.openEntry(result);
    });
  };

  openEntry = function (country_data?: CountryModel) {
    if (country_data === undefined) {
      this.dialogRef = this.dialog.open(CountryEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(CountryEntryComponent, {
        disableClose: true,
        data: country_data
      });
    }
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.refreshMe();
    });
  };

  onSort = function() {
    this.dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
  };
}
