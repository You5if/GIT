import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AppGlobals } from 'src/app/app.global';
import { SelectService } from 'src/app/components/common/select.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { Send } from 'src/app/send.model';
import { SystemNavigationComponent } from 'src/app/system/system-navigation/system-navigation.component';
import { WorkspaceEntryService } from '../workspace-entry/workspace-entry.service';
import { BoardModel, WorkspaceModel } from '../workspace.model';


@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  name: string
  boards: BoardModel[] = [{
    boardId: 0,
     boardName: "Hilali",
     remarks: "string",
     aPIImagePath: "string",
     aPIPath: "string",
     extension: "string",
     fileName: "string",
     fullPath: "string",
     originalFileName: "string",
     workspaceId: 0,
     active: true,
     entryMode: "string",
     readOnly: true,
     auditColumns: "any",
  },{
    boardId: 1,
     boardName: "GIT",
     remarks: "string",
     aPIImagePath: "string",
     aPIPath: "string",
     extension: "string",
     fileName: "string",
     fullPath: "string",
     originalFileName: "string",
     workspaceId: 0,
     active: true,
     entryMode: "string",
     readOnly: true,
     auditColumns: "any",
  },{
    boardId: 2,
     boardName: "LMS",
     remarks: "string",
     aPIImagePath: "string",
     aPIPath: "string",
     extension: "string",
     fileName: "string",
     fullPath: "string",
     originalFileName: "string",
     workspaceId: 0,
     active: true,
     entryMode: "string",
     readOnly: true,
     auditColumns: "any",
  },{
    boardId: 3,
     boardName: "GG",
     remarks: "string",
     aPIImagePath: "string",
     aPIPath: "string",
     extension: "string",
     fileName: "string",
     fullPath: "string",
     originalFileName: "string",
     workspaceId: 0,
     active: true,
     entryMode: "string",
     readOnly: true,
     auditColumns: "any",
  }]
  direction: string = "ltr";

  breakpoint: number
  constructor(
    
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      
      private _select: SelectService,
    private _globals: AppGlobals,
    private dapiService: WorkspaceEntryService,
    public _nav: SystemNavigationComponent,
    @Inject(MAT_DIALOG_DATA) public pModel: WorkspaceModel
  ) { }

  ngOnInit() {

    this._ui.loadingStateChanged.next(true);
    this.dapiService.getWorkspaceEntry(+localStorage.getItem(this._globals.baseAppName + '_workspaceId')).subscribe(res => {
      this._ui.loadingStateChanged.next(false);
      this.name = res.workspacename
    })
    
    this.name = this.pModel.workspacename
    this.breakpoint =
        window.innerWidth <= 960
          ? 2
          : 4;
  }

  onBoard(id: number) {
    localStorage.setItem(this._globals.baseAppName + '_boardId', id.toString())
    // this._nav.onClickListItem('WB');
  }
  onResize(event) {
    
    this.breakpoint =
      event.target.innerWidth <= 960
        ? 2
        : 4;
  }
  onCancel() {
    localStorage.setItem(this._globals.baseAppName + '_boardId', "")
    this._nav.onClickListItem('WS');
  }


}
