import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { JournalEntryEntryComponent } from './journalentry-entry/journalentry-entry.component';
import { JournalEntryModel } from './journalentry.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { JournalEntryService } from './journalentry.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { formatDate } from '@angular/common';
import { AppGlobals } from 'src/app/app.global';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'app-journalentry',
    templateUrl: './journalentry.component.html',
    styleUrls: ['./journalentry.component.scss']
  })

export class JournalEntryComponent implements OnInit {

  indexes: JournalEntryModel
  direction: string;
  entryDate: string;
  debitacc: string;
  creditacc: string;
  currency: string;
  selection = new SelectionModel<JournalEntryModel>(true, []);;
  amount: string;
  edit: string;
  header: string;

    displayedColumns: string[] =
        ['select','EntryDate',  'creditacc', 'debitacc', 'amount', 'currency'];

    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;
    clickedRows = new Set<JournalEntryModel>();

    totalRecords: number;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    screenRights: RightModel = {
        amendFlag: true,
        createFlag: true,
        deleteFlag: true,
        editFlag: true,
        exportFlag: true,
        printFlag: true,
        reverseFlag: true,
        shortCloseFlag: true,
        viewFlag: true
      };

    constructor(
        public dialog: MatDialog,
        private _cf: CommonService,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _globals: AppGlobals,
        private _auth: AuthService,
        private _select: SelectService,
        private journalentryservice: JournalEntryService
      ) {
        this.pTableName = 'JournalEntry';
        this.pScreenId = 15;
        this.pTableId = 15;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
      this.refreshMe();
  }

  refreshMe() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.entryDate = "Date"
      this.debitacc = "To Acc."
      this.creditacc = "From Acc."
      this.amount = "Amount"
      this.currency = "Currency"
      this.edit = "Edit"
      this.header = "Journals"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.entryDate = "التاريخ"
      this.debitacc = "الخصومات"
      this.creditacc = "حساب الخصومات"
      this.amount = "المبلغ"
      this.currency = "العملة"
      this.edit = "تعديل"
      this.header = "السجلات"
    }
    this._cf.getPageData('JournalEntry', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);
          this.indexes = result

        }
      );

    this._auth.getScreenRights(this.menuId).subscribe((rights: RightModel) => {
      this.screenRights = {
        amendFlag: true,
        createFlag: true,
        deleteFlag: true,
        editFlag: true,
        exportFlag: true,
        printFlag: true,
        reverseFlag: true,
        shortCloseFlag: true,
        viewFlag: true
      };
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  paginatoryOperation(event: PageEvent) {
    try {
      this._cf.getPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        this.pTableId, this.totalRecords).subscribe(
          (result: JournalEntryModel) => {
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

  onSort = function () {
    this.dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
  };

  onAdd = function () {
    const result: JournalEntryModel = {
      'journalEntryId': 0,
      'entryName': '',
      'currency': 17001,
      'description': '',
      'auditColumns': this._auth.getAuditColumns(),
      'entryMode': 'A',
      journalEntryDetailEntry: [],
      'active': true,
      'readOnly': false,
      'entryDate': formatDate(new Date(), 'yyyy-MM-dd', 'en_US')
    };
    localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add");
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add journal");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة سجل");
    }
    this.openEntry(result);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.journalentryservice.getJournalEntryEntry(id).subscribe((result: JournalEntryModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.journalentryservice.getJournalEntryEntry(id).subscribe((result: JournalEntryModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'E';
      result.readOnly = false;
      if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit journal");
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل سجل");
      }
      this.openEntry(result);
    });
  }

  onDelete = function(id: number) {

  };

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        (this.selection.clear() ,this.clickedRows.clear()):
        (this.selection.clear(), this.dataSource.data.forEach(row => {this.selection.select(row); if (!this.clickedRows.has(row)) {

          this.clickedRows.add(row)
        }}))
  }

  onId(id: number, row:JournalEntryModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  openEntry = function (result: JournalEntryModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(JournalEntryEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(JournalEntryEntryComponent, {
        disableClose: true,
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

}
