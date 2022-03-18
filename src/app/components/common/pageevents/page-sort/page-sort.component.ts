import { Component, OnInit, Inject } from '@angular/core';
import { PageSortModel } from './PageSortModel';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { CommonService } from '../../common.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { PageEventsService } from '../page-events.service';
import { SelectService } from '../../select.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';


@Component({
  selector: 'app-page-sort',
  templateUrl: './page-sort.component.html',
  styleUrls: ['./page-sort.component.scss']
})
export class PageSortComponent implements OnInit {
  displaySortColumns: string[] =
    [
      'sortOrderNo',
      'columnId',
      'direction',
      'delete'];
  pageSortDataSource = new MatTableDataSource<PageSortModel>();
  tableId: number;
  pDirections: SelectModel[];
  pColumns: SelectModel[];
  pageSortData: PageSortModel[];
  lvSerialNo: number;
  constructor(
    private _cf: CommonService,
    private _auth: AuthService,
    private _Service: PageEventsService,
    private _select: SelectService,
    private _msg: MessageBoxService,
    private dialogRef: MatDialogRef<PageSortComponent>,
    @Inject(MAT_DIALOG_DATA) public pTableId: number
  ) { }

  ngOnInit() {
    this.tableId = this.pTableId;
    this.lvSerialNo = 1;
    this.refreshMe();
  }
  refreshMe() {
    this._select.getMisc(901, 0, false).subscribe((data: SelectModel[]) => {
      this.pDirections = data;
    });
    this._select.getPageSortColumns(this.tableId).subscribe((data: SelectModel[]) => {
      this.pColumns = data;
    });
    this._Service.getPageSortEntry(this.tableId).subscribe(data => {
      this.pageSortData = data;
      this.pageSortDataSource = new MatTableDataSource(this.pageSortData);
      this.addRecords(false);
    });
  }

  addRecords(pCheckValidation: boolean) {
    if (pCheckValidation === true) {

    }
    const row: PageSortModel = {
      directionId: 0,
      columnId: 0,
      columnName: '',
      deleted: false,
      direction: '',
      pageColumnsId: 0,
      sortOrderNo: this.lvSerialNo,
      tableId: 0,
      userId: 0,
    };
    this.lvSerialNo = this.lvSerialNo + 1;

    this.pageSortData.push(row);
    this.pageSortDataSource.data = [...this.pageSortData];
  }

  onSubmit = function(form: PageSortComponent) {
    for (let index = 0; index < this.pageSortData.length; index++) {
      const element = this.pageSortData[index];
      if (element.columnId <= 0 || element.columnId === null) {
        this._msg.blank('Column');
        return false;
      }
      if (element.directionId <= 0 || element.directionId === null) {
        this._msg.blank('Direction');
        return false;
      }
    }
    return false;
  };

  onCancel() {
    this.dialogRef.close();
  }

  onDelete = function(id: number) {
    this.pageSortData.splice(id, 1);
    this.pageSortDataSource.data = [...this.pageSortData];
  };
}
