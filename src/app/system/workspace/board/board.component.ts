import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { BoardEntryComponent } from './board-entry/board-entry.component';
import { BoardModel } from './board.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { BoardService } from './board.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Send } from 'src/app/send.model';
import { WorkspaceEntryService } from '../workspace-entry/workspace-entry.service';
import { SystemNavigationComponent } from '../../system-navigation/system-navigation.component';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
  })

export class BoardComponent implements OnInit {

    displayedColumns: string[] =
        ['boardId'];
    boards: BoardModel[]

        // boards: BoardModel[] = [{
        //   boardId: 0,
        //    boardName: "Hilali",
        //    remarks: "string",
        //    aPIImagePath: "string",
        //    aPIPath: "string",
        //    extension: "string",
        //    fileName: "string",
        //    fullPath: "string",
        //    originalFileName: "string",
        //    workspaceId: 0,
        //    active: true,
        //    entryMode: "string",
        //    readOnly: true,
        //    auditColumns: "any",
        // },{
        //   boardId: 1,
        //    boardName: "GIT",
        //    remarks: "string",
        //    aPIImagePath: "string",
        //    aPIPath: "string",
        //    extension: "string",
        //    fileName: "string",
        //    fullPath: "string",
        //    originalFileName: "string",
        //    workspaceId: 0,
        //    active: true,
        //    entryMode: "string",
        //    readOnly: true,
        //    auditColumns: "any",
        // },{
        //   boardId: 2,
        //    boardName: "LMS",
        //    remarks: "string",
        //    aPIImagePath: "string",
        //    aPIPath: "string",
        //    extension: "string",
        //    fileName: "string",
        //    fullPath: "string",
        //    originalFileName: "string",
        //    workspaceId: 0,
        //    active: true,
        //    entryMode: "string",
        //    readOnly: true,
        //    auditColumns: "any",
        // },{
        //   boardId: 3,
        //    boardName: "GG",
        //    remarks: "string",
        //    aPIImagePath: "string",
        //    aPIPath: "string",
        //    extension: "string",
        //    fileName: "string",
        //    fullPath: "string",
        //    originalFileName: "string",
        //    workspaceId: 0,
        //    active: true,
        //    entryMode: "string",
        //    readOnly: true,
        //    auditColumns: "any",
        // }]
        model: Send;
  edit: string;
  header:string
  submit: string;
  product:string;
  cancel: string;
  direction: string;
  workId: number
    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    role = localStorage.getItem("role");
    menuId: number;
    breakpoint: number

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
        private _globals: AppGlobals,
        private _ui: UIService,
        public _nav: SystemNavigationComponent,
        private _msg: MessageBoxService,
        private dapiService: WorkspaceEntryService,
        private _auth: AuthService,
        private _select: SelectService,
        private boardservice: BoardService
      ) {
        this.pTableName = 'Board';
        this.pScreenId = 71;
        this.pTableId = 71;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    this._ui.loadingStateChanged.next(true);
    this.dapiService.getWorkspaceEntry(+localStorage.getItem(this._globals.baseAppName + '_workspaceId')).subscribe(res => {
      this._ui.loadingStateChanged.next(false);
      this.header = res.workspacename
      this.workId = res.workspaceId
    })
      this.refreshMe();
  }

  refreshMe() {
    this.breakpoint =
        window.innerWidth <= 960
          ? 2
          : 4;
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
    }
    
    if (this.role === "2") {
      this._ui.loadingStateChanged.next(true);
    this.boardservice.getBoardsEntry(+localStorage.getItem(this._globals.baseAppName + '_workspaceId')).subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      this.boards = result
      console.log(result);
    })
      
    }else if (this.role === "8") {
      this._ui.loadingStateChanged.next(true);
      this.boardservice.getEmployeeBoards(this._auth.getUserId(), +localStorage.getItem(this._globals.baseAppName + '_workspaceId')).subscribe(
        (result) => {
          this._ui.loadingStateChanged.next(false);
          this.boards = result
          // console.log(result);
          

        }
      )
    }


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
          (result: BoardModel) => {
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

  onBoardState(id: number) {
    localStorage.setItem(this._globals.baseAppName + '_boardId', id.toString())
    this._nav.onClickListItem('BS');
  }
  onAdd = function () {
    this.model = {
      tableId: 71,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add board");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة لوحة");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.boardservice.getBoardEntry(id).subscribe((result: BoardModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    // this._ui.loadingStateChanged.next(true);
    // this.boardservice.getBoardEntry(id).subscribe((result: WorkspaceModel) => {
    //   this._ui.loadingStateChanged.next(false);
    //   result.entryMode = 'E';
    //   result.readOnly = false;
    //   this.openEntry(result);
    // });
  }

  onDelete = function(id: number) {
      
  };

  openEntry = function (result: BoardModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(BoardEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(BoardEntryComponent, {
        disableClose: false,
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };
  openEntry2 = function (result: Send) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(BoardEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(BoardEntryComponent, {
        disableClose: true,
        
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

  onResize(event) {
    
    this.breakpoint =
      event.target.innerWidth <= 960
        ? 2
        : 4;
  }

  onCancel() {
    this._nav.onClickListItem('WS');
  }

}
