import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Send } from 'src/app/send.model';
import { Sources } from 'src/app/source.model';
import { CardEntryService } from './card-entry.service';
import { FileListModel } from './upload/upload-file.model';
import { CardAttachModel, CardCommentModel } from '../brdstate/brdstate.model';
import { CheckfordeleteComponent } from './checkfordelete/checkfordelete.component';
import { CardUserEntryComponent } from './carduser-entry/carduser-entry.component';

@Component({
  selector: 'app-card-entry',
  templateUrl: './card-entry.component.html',
  styleUrls: ['./card-entry.component.scss']
})

export class CardEntryComponent implements OnInit {

	url: string;

    model: Send = {
      tableId: 74,
      recordId: 0,
      userId: +this._auth.getUserId(),
      roleId: +localStorage.getItem('role'),
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };

    role: string = localStorage.getItem('role');
    last: any = {
      records: [],
      auditColumn: {
        approvalStatusId: 1100001,
        companyId: 10001,
        branchId: 201,
        financialYearId: 1,
        userId: 1,
        mACAddress: "unidentified",
        hostName: "unidentified",
        iPAddress: "unidentified",
        deviceType: "Win32"
      }
    }
    myFormGroup: FormGroup;

    breakpoint: number;
    checked= false;
    checkedR = false;
    disabled = false;
    sources: Sources[] = [];
    res: any;
    spacepoint: any;
    spacezone: boolean;
    data: Sources[];
    ver: Sources;
    maxSize: number;
    submit: string;
    cancel: string;
  
    light: Sources[] = [];
    dark: Sources[] = [];
  
    ver2: Sources;
    ver3: Sources;
    ver4: Sources;
    obj1: Sources;
    obj2: Sources;
    newComment: CardCommentModel = {
      cardCommentId: 0,
      comment: '',
      commentDate: null,
      aPIImagePath: "",
      aPIPath: "",
      extension: "",
      fileName: "",
      fullPath: "",
      originalFileName: "",
      cardId: this.pModel.cardD.cardId,
      employeeId: null,
      clientVisible: true,
      edit: false,
      active: true,
      entryMode: 'A',
      readOnly: true,
      auditColumns: {
       approvalStatusId: 1100001,
       companyId: 10001,
       branchId: 201,
       financialYearId: 1,
       userId: 1,
       mACAddress: "unidentified",
       hostName: "unidentified",
       iPAddress: "unidentified",
       deviceType: "Win32"
     },
     }

    
     editComment: CardCommentModel
  
    direction: string;
  
    dropItem: Sources;
    container: any[][] =[];
  
    accountList: SelectModel[] = [];
  
    dialog_title: string = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');
  
    dropList: Sources[] = [];

    lFiles: FileListModel[] = [];

    showit: boolean = false;
  comment: boolean = false;

  employees: any[]

  comments: CardCommentModel[]
  attachments: CardAttachModel[]
  imgHttp:string = "http://g"
  deleteModel: { name: any; id: any; };


  constructor(
	  private dapiService: CardEntryService,
      private _ui: UIService,
      private _msg: MessageBoxService,
      public dialog: MatDialog,
      private _auth: AuthService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private dialogRef: MatDialogRef<CardEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: any
  ) { }

  ngOnInit() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this.direction = "ltr"
        this.submit = "Submit"
        this.cancel = "Cancel"
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        this.direction = "rtl"
        this.submit = "ارسال"
        this.cancel = "الغاء"
      }

      this.newComment.employeeId = this._auth.getUserId()
      this.newComment.comment = ''

      this._ui.loadingStateChanged.next(true);
      this.dapiService.getComments(this.pModel.cardD.cardId).subscribe((response) => {
        this._ui.loadingStateChanged.next(false);
        this.comments = response
        console.log(this.comments);
        
        this.comments.forEach((com) => {
          com.commentDate = com.commentDate.toString().replace('T', ' ')
          com.edit = false
        })
      })
      this._ui.loadingStateChanged.next(true);
      this.dapiService.getUsers(this.pModel.cardD.cardId).subscribe((response) => {
        this._ui.loadingStateChanged.next(false);
        this.employees = response
        console.log(this.employees);
      })

      this._ui.loadingStateChanged.next(true);
      this.dapiService.getAttachments(this.pModel.cardD.cardId).subscribe((response) => {
        this._ui.loadingStateChanged.next(false);
        this.attachments = response
        if (this.attachments.length > 0) {
          this.showit = true
        }else {
          this.showit = false
        }
        this.attachments.forEach((att) => {
          att.attachDate = att.attachDate.toString().replace('T', ' ')
          att.attachmentDownload = this.imgHttp.concat(att.fullPath.substring(att.fullPath.indexOf('g') + 1))
        })
        console.log(this.attachments);
        
      })

      this._ui.loadingStateChanged.next(true);
      this.dapiService.Controllers(this.pModel.model).subscribe(res => {
        this._ui.loadingStateChanged.next(false);
        this.data = res;

        this.data[9].value = this.pModel.cardD.startDate
     this.data[10].value = this.pModel.cardD.endDate

    console.log(this.data);
    

        for(let i=0;i<=this.data.length;i++){
          this.ver2 = this.data[i]
          if (this.ver2 && this.ver2.inTransaction && this.ver2.access != "NoAccess"){
            if (this.ver2.type === "dropdown") {
              this.dropList.push(this.ver2);
              console.log("droplist: ",this.dropList)
            }
            this.light.push(this.ver2);
  
          }else{
            if(this.ver2) {
              this.dark.push(this.ver2);
            }
          }
        }
        this.breakpoint =
        window.innerWidth <= 960
          ? 1
          : 2;
  
        for(let k=0;k<=this.dropList.length;k++) {
          this.dropItem = this.dropList[k]
  
          this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.dropItem.refCondition, false).subscribe((res: SelectModel[]) => {
          this.dropList[k].myarray = res;
          this.container.push(res);
      });
  
        }  
      })
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
    this.lFiles.push(file); 
    var newAttach: CardAttachModel = {
      cardAttachId: 0,
      attachDate: new Date(),
      originalFileName: file.originalFileName,
      fileName: file.fileName,
      extension: file.extention,
      fullPath: file.fullPath,
      aPIPath: file.apiPath,
      aPIImagePath: file.apiPath,
      attachmentDownload: '',
      cardId: this.pModel.cardD.cardId,
      employeeId: this._auth.getUserId(),
      clientVisible: true,
      active: true,
      entryMode: 'A',
      readOnly: true,
      auditColumns: {
       approvalStatusId: 1100001,
       companyId: 10001,
       branchId: 201,
       financialYearId: 1,
       userId: 1,
       mACAddress: "unidentified",
       hostName: "unidentified",
       iPAddress: "unidentified",
       deviceType: "Win32"
     },
     }

     this.dapiService.CreateAttach(newAttach).subscribe((response) => {
      console.log(response);
      this._ui.loadingStateChanged.next(true);
        this.dapiService.getAttachments(this.pModel.cardD.cardId).subscribe((res) => {
          this._ui.loadingStateChanged.next(false);
          this.attachments = res
          this.attachments.forEach((att) => {
            att.attachmentDownload = this.imgHttp.concat(att.fullPath.substring(att.fullPath.indexOf('g') + 1))
            att.attachDate = att.attachDate.toString().replace('T', ' ')
          })
        
          if (this.attachments.length > 0) {
            this.showit = true
          }else {
            this.showit = false
          }
        })
        
    })
    console.log(this.attachments);
    
    // this.imagePathUrl2 = this.imgHttp.concat(file.fullPath.substring(file.fullPath.indexOf('h') + 1))
    // console.log(this.imagePathUrl2);
    
    // this.showit = true
    // and it pushes the files to this array also, then why doesnt it show?
    // this.data = this.lFiles;
    // this.validatedisabled = false
    // this.validatedisabledmethod();
    // bro problem is not this component, it somehow is not reflecting in other two... the files which i brought here..
    // yea i was just making sure they were leaving here correctly.. now i will go to step 2, sorry ok
}

onAddComment() {
  this.comment = true;
}
onEditComment(comment: CardCommentModel) {
  comment.edit = true
  this.editComment = comment
}
onDeleteComment(comment: CardCommentModel) {
  this.deleteModel = {
    name: "CardComment",
    id: comment.cardCommentId
  }
  // change it this.openConfirmDialog(this.deleteModel)
}
onDeleteUser(employee: any) {
  this.deleteModel = {
    name: "CardUser",
    id: employee.cardUserId
  }
  this.openConfirmDialog(this.deleteModel)
}
openConfirmDialog = function(result: any) {
  if (result === undefined) {
    this.dialogRef2 = this.dialog.open(CheckfordeleteComponent, {
      disableClose: true,
      
      data: {}
    });
  } else {
    this.dialogRef2 = this.dialog.open(CheckfordeleteComponent, {
      disableClose: true,
      
      data: result
    });
  }
  this.dialogRef2.afterClosed().subscribe(() => {
   
      this.dapiService.getUsers(this.pModel.cardD.cardId).subscribe((response) => {
        this.employees = response
        console.log(this.employees);
      })
  });
}

onAddEmployee = function() {
  if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
    localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Employees");
  }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
    localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "الموظفون");
  }
  this.dialogRef3 = this.dialog.open(CardUserEntryComponent, {
    disableClose: true,
    
    data: {
      cardId: this.pModel.cardD.cardId,
      model: {
        tableId: 88,
        recordId: 0,
        userId: 26,
        roleId: 2,
        languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
      }
    }
  });
  this.dialogRef3.afterClosed().subscribe(() => {
    this.dapiService.getUsers(this.pModel.cardD.cardId).subscribe((response) => {
      this.employees = response
      console.log(this.employees);
    })
  });
}

onNewEditComment() {
  this.editComment.auditColumns = {
    approvalStatusId: 1100001,
    companyId: 10001,
    branchId: 201,
    financialYearId: 1,
    userId: 1,
    mACAddress: "unidentified",
    hostName: "unidentified",
    iPAddress: "unidentified",
    deviceType: "Win32"
  }
  console.log(this.editComment);
  
  this.dapiService.EditComment(this.editComment).subscribe((response) => {
    console.log(response);
    this._ui.loadingStateChanged.next(true);
      this.dapiService.getComments(this.pModel.cardD.cardId).subscribe((res) => {
        this._ui.loadingStateChanged.next(false);
        this.comments = res
        this.comments.forEach((com) => {
          com.commentDate = com.commentDate.toString().replace('T', ' ')
          com.edit = false
        })
      })
    
  })
}

onNewComment() {
  this.newComment.commentDate = new Date()
  console.log(this.newComment);
  
  this.dapiService.CreateComment(this.newComment).subscribe((response) => {
    console.log(response);
    this._ui.loadingStateChanged.next(true);
      this.dapiService.getComments(this.pModel.cardD.cardId).subscribe((res) => {
        this._ui.loadingStateChanged.next(false);
        this.comments = res
        this.comments.forEach((com) => {
          com.commentDate = com.commentDate.toString().replace('T', ' ')
          com.edit = false
        })
      })
    
  })
  this.newComment.comment = ''
  this.newComment.commentDate = null
}
  onSubmit() {
    
    
    this.data.forEach((Object)=> this.light.forEach((obj)=>
    {
      if(Object.tableColumnId === obj.tableColumnId){
        Object.value = obj.value
      }
    }));
	
    for(let i=0;i<=this.data.length;i++){
      this.obj1 = this.data[i];
       if(this.obj1 ){
         this.last.records.push(this.obj1);
       }
     }
     this.last.records[9].value = new Date(this.last.records[9].value.toString())
     this.last.records[10].value = new Date(this.last.records[10].value.toString())
     console.log(this.last);

          if(this.last.records[0].entryMode == "A"){
           this.last.auditColumn = this._auth.getAuditColumns();
           this.dapiService.EntryA(this.last).subscribe(nexto => {
             this.res = nexto;
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfo("Message", "saved succesfully");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              this._msg.showInfo("رسالة", "تم الحفظ بنجاح");
            this.dialogRef.close();
            }
     
           }, error => {
             console.log(error);
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfo("Message", "Error!!");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              this._msg.showInfo("رسالة", "توجد مشكلة");
            this.dialogRef.close();
            }
           });
         }else if(this.last.records[0].entryMode == "E"){
           this.last.auditColumn = this._auth.getAuditColumns();
           this.dapiService.EntryE(this.last).subscribe(nexto => {
             this.res = nexto;
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfo("Message", "saved succesfully");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              this._msg.showInfo("رسالة", "تم الحفظ بنجاح");
            this.dialogRef.close();
            }
     
           }, error => {
             if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
              this._msg.showInfo("Message", "Error!!");
            this.dialogRef.close();
            }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
              
              this._msg.showInfo("خطأ!!", "توجد مشكلة");
            this.dialogRef.close();
            }
           });
         }
      }

  onResize(event) {
    this.spacepoint =
      event.target.innerWidth <= 960
        ? (this.spacezone = false)
        : (this.spacezone = true);
    this.breakpoint =
      event.target.innerWidth <= 960
        ? 1
        : 2;
  }

  onCancel() {
    this.dialogRef.close();
  }
}

