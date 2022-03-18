import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PaymentToCompanyModel } from '../paymenttocompany.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { PaymentToCompanyService } from '../paymenttocompany.service';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Send } from 'src/app/send.model';
import { Sources } from 'src/app/source.model';
import { PaymentToCompanyEntryService } from './paymenttocompany-entry.service';
import { FileListModel } from 'src/app/system/upload/upload-file.model';

@Component({
  selector: 'app-paymenttocompany-entry',
  templateUrl: './paymenttocompany-entry.component.html',
  styleUrls: ['./paymenttocompany-entry.component.scss']
})

export class PaymentToCompanyEntryComponent implements OnInit {
    url: string;
    model2: Send ;
    model22: Send ;
    model3: Send ;
    model4: Send ;
    childElemInit: Sources[] = [];
    childElemInit2: Sources[] = [];
    childElemInit3: Sources[] = [];
    childElemInit4: Sources[] = [];
    verCh2: Sources;
    verCh22: Sources;
    verCh3: Sources;
    verCh4: Sources;
    inAppearance : boolean;
    chAppearance : boolean;
    childElemDark: Sources[] = [];
    childElemDark2: Sources[] = [];
    childElemDark3: Sources[] = [];
    childElemDark4: Sources[] = [];
    vale: Sources[]
    vale2: Sources[]
    vale3: Sources[]
    vale4: Sources[]
    childElem: any = {
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
    childElemT: any = {
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
    childElem3: any = {
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
    childElem4: any = {
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
    childElem2: any = {
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
    childElem2T: any = {
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
    childElem23: any = {
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
    childElem24: any = {
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
    last: any = {
      records: [],
      child1: [],
      child2: [],
      child3: [],
      child4: [],
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
    lastDark: any = {
      records: [],
      child1: [],
      child2: [],
      child3: [],
      child4: [],
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
    model: Send = {
      tableId: 49,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    
    myFormGroup: FormGroup;
  
    breakpoint: number;
    paymentTypeOption: string;
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
    stringOfV: string;
  refString: string;

  
    direction: string;
    dropListItem1: Sources[] = [];
    dropItemchild1: Sources;
  
    dropItem: Sources;
    container: any[][] =[];
  
    accountList: SelectModel[] = [];
  
    dialog_title: string = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');
  
    dropList: Sources[] = [];

    showit: boolean;
  visible: boolean = true;
  imagePathUrl: string;
  imagePathUrl2: string;
  lFiles: FileListModel[] = [];
  imgHttp:string = "http://h"



  constructor(
    private dapiService: PaymentToCompanyEntryService,
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private _myService: PaymentToCompanyService,
      private dialogRef: MatDialogRef<PaymentToCompanyEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: Send
  ) { }

  ngOnInit() {
    this.showit = false
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this.direction = "ltr"
        
        this.submit = "Submit"
        this.cancel = "Cancel"
        
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        this.direction = "rtl"
        this.submit = "ارسال"
        this.cancel = "الغاء"
       
  
      }

      this.inAppearance = false
      this.chAppearance = false
  
  
  
      this._ui.loadingStateChanged.next(true);
      this.dapiService.Controllers(this.pModel).subscribe(res => {
        this._ui.loadingStateChanged.next(false);
        console.log("hello")
        this.data = res;
        
        if(localStorage.getItem(this._globals.baseAppName + '_Add&Edit2') == "Edit") {
          this.onChangePaymentTypeEdit(+this.data[3].value)
          if(this.data.length > 0) {
    
            this.dapiService.getChild1ItembyChild1(+this.data[0].value).subscribe((res) => {
      
            this._ui.loadingStateChanged.next(false);
            
              console.log("EditRes1",res)
    
              
              for(let k=0;k<res.length;k++){
                this.addChild1Item(res[k].chequeToCompanyId)
              }
    
              
              
              
            }
            )
            this.dapiService.getChild2ItembyChild2(+this.data[0].value).subscribe((res) => {
      
              this._ui.loadingStateChanged.next(false);
              
                console.log("EditRes2",res)
      
                
                for(let k=0;k<res.length;k++){
                  this.addChild2Item(res[k].wireTransferToCompanyId)
                }
      
                
                
                
              }
              )

              this.dapiService.getChild3ItembyChild3(+this.data[0].value).subscribe((res) => {
      
                this._ui.loadingStateChanged.next(false);
                
                  console.log("EditRes3",res)
        
                  
                  for(let k=0;k<res.length;k++){
                    this.addChild3Item(res[k].bankDepositToCompanyId)
                  }
        
                  
                  
                  
                }
                )

                this.dapiService.getChild4ItembyChild4(+this.data[0].value).subscribe((res) => {
      
                  this._ui.loadingStateChanged.next(false);
                  
                    console.log("EditRes2",res)
          
                    
                    for(let k=0;k<res.length;k++){
                      this.addChild4Item(res[k].paymentToCompanyAttachmentId)
                    }
          
                    
                    
                    
                  }
                  )
            
          }else {
            this.addChild1Item(0)
          }
          
        }
  
        for(let i=0;i<=this.data.length;i++){
          this.ver2 = this.data[i]
          if (this.ver2 && this.ver2.inTransaction && this.ver2.access != "NoAccess"){
            if (this.ver2.type === "dropdown") {
              this.dropList.push(this.ver2);
              console.log("droplist: ",this.dropList)
  
  
              // this.tableId = this.ver2.refId;
              // this.tableName = this.ver2.refTable;
              // this.displayColumn = this.ver2.refColumn;
              // this.condition = this.ver2.refCondition;
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
          : this.data[0].maxRowSize;
  
        for(let k=0;k<=this.dropList.length;k++) {
          this.dropItem = this.dropList[k]
  
              // this.tableId = this.dropItem.refId;
              // this.tableName = this.dropItem.refTable;
              // this.displayColumn = this.dropItem.refColumn;
              // this.condition = this.dropItem.refCondition;
  
            this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.dropItem.refCondition, false).subscribe((res: SelectModel[]) => {
          console.log("drop: ", res);
          this.dropList[k].myarray = res;
          this.container.push(res);
          console.log(this.container)
  
  
      });
  
        }
        console.log("light: ",this.light);
        console.log("dark: ",this.dark);
  
        
  
  
  
      })
  }

  public uploadFinished = (event, id: number) => { // this is event being called when file gets uploaded
    
    var file: FileListModel = {
        originalFileName: event.originalFileName,
        fileName: event.fileName,
        extention: event.extention,
        fullPath: event.fullPath,
        apiPath: event.apiPath,
        apiImagePath: event.apiPath
    };
    this.lFiles.push(file); 
    console.log(id);
    
    
    // this.last.child4[id].records[1].value = this.imgHttp.concat(file.fullPath.substring(file.fullPath.indexOf('h') + 1))
    this.lastDark.child4[id].records.forEach((Object2)=> {
      if(Object2 && Object2.tableColumnId === 370){
        if(file.fullPath != null) {
          Object2.value = this.imgHttp.concat(file.fullPath.substring(file.fullPath.indexOf('h') + 1))
        }else {
          Object2.value = Object2.value
        }
        
      }else if(Object2 && Object2.tableColumnId === 371){
        if(file.apiPath != null) {
          Object2.value = file.apiPath
        }else {
          Object2.value = Object2.value
        }
        
      }else if(Object2 && Object2.tableColumnId === 372){
        if(file.extention != null) {
          Object2.value = file.extention
        }else {
          Object2.value = Object2.value
        }
        
      }else if(Object2 && Object2.tableColumnId === 373){
        if(file.fileName != null) {
          Object2.value = file.fileName
        }else {
          Object2.value = Object2.value
        }
        
      }
      // else if(Object2.tableColumnId === 15){
      //   Object2.value = this.dapiService.imgFullPath
      // }
      else if(Object2 && Object2.tableColumnId === 375){
        if(file.originalFileName != null) {
          Object2.value = file.originalFileName
        }else {
          Object2.value = Object2.value
        }
        
      }
    })
    this.last.child4[id].records.forEach((Object2)=> {
      if(Object2 && Object2.tableColumnId === 370){
        if(file.fullPath != null) {
          Object2.value = this.imgHttp.concat(file.fullPath.substring(file.fullPath.indexOf('h') + 1))
        }else {
          Object2.value = Object2.value
        }
        
      }else if(Object2 && Object2.tableColumnId === 371){
        if(file.apiPath != null) {
          Object2.value = file.apiPath
        }else {
          Object2.value = Object2.value
        }
        
      }else if(Object2 && Object2.tableColumnId === 372){
        if(file.extention != null) {
          Object2.value = file.extention
        }else {
          Object2.value = Object2.value
        }
        
      }else if(Object2 && Object2.tableColumnId === 373){
        if(file.fileName != null) {
          Object2.value = file.fileName
        }else {
          Object2.value = Object2.value
        }
        
      }
      // else if(Object2.tableColumnId === 15){
      //   Object2.value = this.dapiService.imgFullPath
      // }
      else if(Object2 && Object2.tableColumnId === 375){
        if(file.originalFileName != null) {
          Object2.value = file.originalFileName
        }else {
          Object2.value = Object2.value
        }
        
      }
    })
    
    
    this.showit = true
    // and it pushes the files to this array also, then why doesnt it show?
    // this.data = this.lFiles;
    // this.validatedisabled = false
    // this.validatedisabledmethod();
    // bro problem is not this component, it somehow is not reflecting in other two... the files which i brought here..
    // yea i was just making sure they were leaving here correctly.. now i will go to step 2, sorry ok
}

  onChangePaymentAganist(id: number) {
    if (id == 26001) {
      this.light[7].value = "1"
      this.light[8].value = "1"
      this.inAppearance = true
      this.chAppearance = false
    } else if (id == 26002) {
      this.light[7].value = "1"
      this.light[8].value = "1"
      this.inAppearance = false
      this.chAppearance = true
    } else if (id == 26003) {
      this.light[7].value = "1"
      this.light[8].value = "1"
      this.inAppearance = false
      this.chAppearance = false
    }
  }

  onChangePaymentType(id: number) {
    
    console.log(id);
    if (id == 18001) {
      
      this.paymentTypeOption = "Cash"
      // this.onClose()
      this.lastDark.child1 = []
      this.lastDark.child2 = []
      this.lastDark.child3 = []
      this.last.child1 = []
      this.last.child2 = []
      this.last.child3 = []
    } else if (id == 18002) {
      this.paymentTypeOption = "Cheque"
      this.addChild1Item(0)
      this.lastDark.child2 = []
      this.lastDark.child3 = []
      this.last.child2 = []
      this.last.child3 = []
    } else if (id == 18003) {
      this.paymentTypeOption = "Wire tran"
      this.addChild2Item(0)
      this.lastDark.child1 = []
      this.lastDark.child3 = []
      this.last.child1 = []
      this.last.child3 = []
    } else if (id == 18004) {
      this.paymentTypeOption = "Deposite"
      this.addChild3Item(0)
      this.lastDark.child1 = []
      this.lastDark.child2 = []
      this.last.child1 = []
      this.last.child2 = []
    } 
    console.log("close");
    
    
    
  }

  onClose() {
    this._ui.loadingStateChanged.next(true);
    this._ui.loadingStateChanged.next(false);
  }
  onChangePaymentTypeEdit(id: number) {
    this._ui.loadingStateChanged.next(true);
    console.log(id);
    if (id == 18001) {
      this.paymentTypeOption = "Cash"
      
    } else if (id == 18002) {
      this.paymentTypeOption = "Cheque"
      
    } else if (id == 18003) {
      this.paymentTypeOption = "Wire tran"
      
    } else if (id == 18004) {
      this.paymentTypeOption = "Deposite"
      
    } 
    this._ui.loadingStateChanged.next(false);
  }



  addChild1Item(id:number) {
    
    let myElem = {
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
    let childElemDark2 = {
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
    this.model2 = {
      tableId: 51,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    this._ui.loadingStateChanged.next(true);
    this.dapiService.child1ItemControllers(this.model2).subscribe((res) => {
      this._ui.loadingStateChanged.next(false);

      this.childElemInit = res
      console.log(this.childElemInit)

      this.dropListItem1.push(this.childElemInit[2])
      this.dropListItem1.push(this.childElemInit[3])
      this.dropListItem1.push(this.childElemInit[7])
      this.dropListItem1.push(this.childElemInit[10])
      for(let k=0;k<this.dropListItem1.length;k++) {
        console.log("loop cycle" + k)
        this.dropItemchild1 = this.dropListItem1[k]
        console.log("DropitemTax", this.dropItemchild1)

            // this.tableId = this.dropItem.refId;
            // this.tableName = this.dropItem.refTable;
            // this.displayColumn = this.dropItem.refColumn;
            // this.condition = this.dropItem.refCondition;
            
            
              this._select.getDropdown(this.dropListItem1[k].refId, this.dropListItem1[k].refTable, this.dropListItem1[k].refColumn, this.dropListItem1[k].refCondition, false).subscribe((res: SelectModel[]) => {
                this.dropListItem1[k].myarray = res
              })

            

            
          
        
        // this.container.push(res);
        // console.log(this.container)


    
  }
      

      for(let i=0;i<this.childElemInit.length;i++){
        this.verCh2 = this.childElemInit[i]
        childElemDark2.records.push(this.verCh2);
        

      }
      this.lastDark.child1.push(childElemDark2);
      this.childElemInit.forEach((itemE) =>{
        if (itemE && itemE.inTransaction && itemE.access != "NoAccess"){
          
          // this.childElem.records.push(itemE);
          myElem.records.push(itemE)
          
  
        }else{
          
            this.childElemDark.push(this.verCh2);
            // console.log(this.childElemDark)
          
  
  
        }
      })
      
      // this.childElem = res
      // console.log(JSON.stringify(this.child1Data))
      this.childElem2 = null
      this.childElem2 = this.childElem

      //this.last.child1.push(this.childElem2);
      this.last.child1.push(myElem)
     
      
    })
    console.log("child1 final", this.last)
    console.log("DarlDarl",this.lastDark)

    
  }
  addChild2Item(id:number) {
    
    let myElem = {
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
    let childElemDark2 = {
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
    this.model22 = {
      tableId: 54,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    this._ui.loadingStateChanged.next(true);
    this.dapiService.child2ItemControllers(this.model22).subscribe((res) => {
      this._ui.loadingStateChanged.next(false);

      this.childElemInit2 = res
      console.log(this.childElemInit2)

      this.dropListItem1.push(this.childElemInit2[4])
      
      for(let k=0;k<this.dropListItem1.length;k++) {
        console.log("loop cycle" + k)
        this.dropItemchild1 = this.dropListItem1[k]
        console.log("DropitemTax", this.dropItemchild1)

            
              this._select.getDropdown(this.dropListItem1[k].refId, this.dropListItem1[k].refTable, this.dropListItem1[k].refColumn, this.dropListItem1[k].refCondition, false).subscribe((res: SelectModel[]) => {
                this.dropListItem1[k].myarray = res
              })


    
  }
      

      for(let i=0;i<this.childElemInit2.length;i++){
        this.verCh22 = this.childElemInit2[i]
        childElemDark2.records.push(this.verCh22);
        

      }
      this.lastDark.child2.push(childElemDark2);
      this.childElemInit2.forEach((itemE) =>{
        if (itemE && itemE.inTransaction && itemE.access != "NoAccess"){
          
          // this.childElem.records.push(itemE);
          myElem.records.push(itemE)
          
  
        }else{
          
            this.childElemDark2.push(this.verCh2);
            // console.log(this.childElemDark)
          
  
  
        }
      })
      
      // this.childElem = res
      // console.log(JSON.stringify(this.child1Data))
      this.childElem2T = null
      this.childElem2T = this.childElemT

      //this.last.child1.push(this.childElem2);
      this.last.child2.push(myElem)
     
      
    })
    console.log("child2 final", this.last)
    

    
  }

  addChild3Item(id:number) {
    
    let myElem = {
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
    let childElemDark2 = {
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
    this.model3 = {
      tableId: 56,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    this._ui.loadingStateChanged.next(true);
    this.dapiService.child3ItemControllers(this.model3).subscribe((res) => {
      this._ui.loadingStateChanged.next(false);

      this.childElemInit3 = res
      console.log(this.childElemInit3)

      this.dropListItem1.push(this.childElemInit3[2])
      
      for(let k=0;k<this.dropListItem1.length;k++) {
        console.log("loop cycle" + k)
        this.dropItemchild1 = this.dropListItem1[k]
        console.log("DropitemTax", this.dropItemchild1)

            
              this._select.getDropdown(this.dropListItem1[k].refId, this.dropListItem1[k].refTable, this.dropListItem1[k].refColumn, this.dropListItem1[k].refCondition, false).subscribe((res: SelectModel[]) => {
                this.dropListItem1[k].myarray = res
              })


    
  }
      

      for(let i=0;i<this.childElemInit3.length;i++){
        this.verCh3 = this.childElemInit3[i]
        childElemDark2.records.push(this.verCh3);
        

      }
      this.lastDark.child3.push(childElemDark2);
      this.childElemInit3.forEach((itemE) =>{
        if (itemE && itemE.inTransaction && itemE.access != "NoAccess"){
          
          // this.childElem.records.push(itemE);
          myElem.records.push(itemE)
          
  
        }else{
          
            this.childElemDark3.push(this.verCh3);
            // console.log(this.childElemDark)
          
  
  
        }
      })
      
      // this.childElem = res
      // console.log(JSON.stringify(this.child1Data))
      this.childElem23 = null
      this.childElem23 = this.childElem3

      //this.last.child1.push(this.childElem2);
      this.last.child3.push(myElem)
     
      
    })
    console.log("child3 final", this.last)
    console.log("DarlDarl",this.lastDark)

    
  }

  addChild4Item(id:number) {
    
    let myElem = {
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
    let childElemDark2 = {
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
    this.model4 = {
      tableId: 58,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    this._ui.loadingStateChanged.next(true);
    this.dapiService.child4ItemControllers(this.model4).subscribe((res) => {
      this._ui.loadingStateChanged.next(false);

      this.childElemInit4 = res
      console.log(this.childElemInit4)
      

      for(let i=0;i<this.childElemInit4.length;i++){
        this.verCh4 = this.childElemInit4[i]
        childElemDark2.records.push(this.verCh4);
        

      }
      this.lastDark.child4.push(childElemDark2);
      this.childElemInit4.forEach((itemE) =>{
        if (itemE && itemE.tableColumnId == 370){
          
          // this.childElem.records.push(itemE);
          myElem.records.push(itemE)
          
  
        }else{
          
            this.childElemDark4.push(this.verCh4);
            // console.log(this.childElemDark)
          
  
  
        }
      })
      
      // this.childElem = res
      // console.log(JSON.stringify(this.child1Data))
      this.childElem24 = null
      this.childElem24 = this.childElem4

      //this.last.child1.push(this.childElem2);
      this.last.child4.push(myElem)
     
      
    })
    console.log("child4 final", this.last)
    console.log("DarlDarl",this.lastDark)

    
  }

  deleteFun(id: number) {
    console.log('I ran from delete');
    // this.elem.splice(id, 1);
    this.last.child1.splice(id, 1)
    if(this.last.child1.length == 0){
      this.addChild1Item(0)
    }
    this.lastDark.child1.splice(id, 1)
    }
  deleteFun2(id: number) {
    console.log('I ran from delete');
    // this.elem.splice(id, 1);
    this.last.child2.splice(id, 1)
    if(this.last.child2.length == 0){
      this.addChild2Item(0)
    }
    this.lastDark.child2.splice(id, 1)
    }
  deleteFun3(id: number) {
    console.log('I ran from delete');
    // this.elem.splice(id, 1);
    this.last.child3.splice(id, 1)
    if(this.last.child3.length == 0){
      this.addChild3Item(0)
    }
    this.lastDark.child3.splice(id, 1)
    }
  deleteFun4(id: number) {
    console.log('I ran from delete');
    // this.elem.splice(id, 1);
    this.last.child4.splice(id, 1)
    if(this.last.child4.length == 0){
      this.addChild4Item(0)
    }
    this.lastDark.child4.splice(id, 1)
    }

    onChangeValueC(id: number) {
      this.stringOfV = id.toString()
      console.log("working fine")
      for(let k=0;k<=this.dropList.length;k++) {
        
        if(this.dropList[k].tableColumnId == 308) {
          this.dropItem = this.dropList[k]
          this.refString = this.dropItem.refCondition + this.stringOfV
          this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.refString, false).subscribe((res: SelectModel[]) => {
            console.log("drop: ", res);
            this.dropList[k].myarray = res;
            this.container.push(res);
            console.log(this.container)
    
    
        });
        
        }
        if(this.dropList[k].tableColumnId == 309) {
          this.dropItem = this.dropList[k]
          this.refString = this.dropItem.refCondition + this.stringOfV
          this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.refString, false).subscribe((res: SelectModel[]) => {
            console.log("drop: ", res);
            this.dropList[k].myarray = res;
            this.container.push(res);
            console.log(this.container)
    
    
        });
        
        }
        if(this.dropList[k].tableColumnId == 311) {
          this.dropItem = this.dropList[k]
          this.refString = this.dropItem.refCondition + this.stringOfV
          this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.refString, false).subscribe((res: SelectModel[]) => {
            console.log("drop: ", res);
            this.dropList[k].myarray = res;
            this.container.push(res);
            console.log(this.container)
    
    
        });
        
        }
        
  
      }
    }

    handleKeyUp(e){
      if(e.keyCode === 13){
         this.onSubmit();
      }
    }

    onSubmit() {

      // this.data.forEach((Object)=> this.light.forEach((obj)=>
      // {
      //   if(Object.tableColumnId === obj.tableColumnId){
      //     Object.value = obj.value
      //   }
  
      // }));
      // this.childElemInit.forEach((Object)=> this.childElem.forEach((obj)=>
      // {
      //   if(Object.tableColumnId === obj.tableColumnId){
      //     Object.value = obj.value
      //   }
  
      // }));
  
      // console.log(JSON.stringify(this.data))
  
      for(let i=0;i<=this.data.length;i++){
        this.obj1 = this.data[i];
         if(this.obj1 ){
          //  this.last.records.push(this.obj1);
           this.lastDark.records.push(this.obj1);
         }
       }
  
      //  console.log(JSON.stringify(this.last));
      //  console.log("Dark",JSON.stringify(this.lastDark));
  
       for(let i=0; i< this.lastDark.child1.length;i++){
         this.lastDark.child1[i].records[0].value = "0"
        //  this.lastDark.child1[i].records[1].value = this.lastDark.records[0].value
         this.vale = this.lastDark.child1[i].records
         this.vale.forEach((val) => {
           val.entryMode = "A"
         })
       }

       this.lastDark.records.sort(function(a, b) { 
        return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
      });
      for (let i = 0; i < this.lastDark.child1.length; i++) {
        this.lastDark.child1[i].records.sort(function(a, b) { 
          return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
        });
      }
      for (let i = 0; i < this.lastDark.child2.length; i++) {
        this.lastDark.child2[i].records.sort(function(a, b) { 
          return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
        });
      }
      for (let i = 0; i < this.lastDark.child3.length; i++) {
        this.lastDark.child3[i].records.sort(function(a, b) { 
          return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
        });
      }
      for (let i = 0; i < this.lastDark.child4.length; i++) {
        this.lastDark.child4[i].records.sort(function(a, b) { 
          return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
        });
      }
  
       console.log("Dark",JSON.stringify(this.lastDark));
  
       
        
            if(this.lastDark.records[0].entryMode == "A"){
              console.log('Last:', JSON.stringify(this.lastDark));
             this.dapiService.EntryA(this.lastDark).subscribe(nexto => {
               this.res = nexto;
               if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
                this._msg.showInfo("Message", "Saved succesfully");
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
           }else if(this.lastDark.records[0].entryMode == "E"){
             this.dapiService.EntryE(this.lastDark).subscribe(nexto => {
               this.res = nexto;
               if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
                this._msg.showInfo("Message", "Saved succesfully");
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
        : this.data[0].maxRowSize;
  }

  onCancel() {
    this.dialogRef.close();
  }

}
