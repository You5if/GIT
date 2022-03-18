import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PaymentFromCompanyModel } from '../paymentfromcompany.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { PaymentFromCompanyService } from '../paymentfromcompany.service';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Send } from 'src/app/send.model';
import { Sources } from 'src/app/source.model';
import { CustomerEntryService } from 'src/app/system/GeneratedComponents01Apr/customer/customer-entry/customer-entry.service';
import { PaymentFromCompanyEntryService } from './paymentfromcompany-entry.service';

@Component({
  selector: 'app-paymentfromcompany-entry',
  templateUrl: './paymentfromcompany-entry.component.html',
  styleUrls: ['./paymentfromcompany-entry.component.scss']
})

export class PaymentFromCompanyEntryComponent implements OnInit {
    url: string;
  
    model: Send = {
      tableId: 59,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
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
  
    direction: string;
  
    dropItem: Sources;
    container: any[][] =[];
  
    accountList: SelectModel[] = [];
  
    dialog_title: string = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');
  
    dropList: Sources[] = [];


  constructor(
    private dapiService: PaymentFromCompanyEntryService,
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private _myService: PaymentFromCompanyService,
      private dialogRef: MatDialogRef<PaymentFromCompanyEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: Send
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
  
  
  
      this._ui.loadingStateChanged.next(true);
      this.dapiService.Controllers(this.pModel).subscribe(res => {
        this._ui.loadingStateChanged.next(false);
        console.log("hello")
        this.data = res;
        console.log(this.data)

        if(localStorage.getItem(this._globals.baseAppName + '_Add&Edit') == "Edit") {
          if(this.data.length > 0) {
    
            this.dapiService.getChild1ItembyChild1(+this.data[0].value).subscribe((res) => {
      
            this._ui.loadingStateChanged.next(false);
            
              // console.log("EditRes",res)
    
              
              for(let k=0;k<res.length;k++){
                this.addChild1Item(res[k].chequeFromCompanyId)
              }
    
              
              
              
            }
            )
            this.dapiService.getChild2ItembyChild2(+this.data[0].value).subscribe((res) => {
      
              this._ui.loadingStateChanged.next(false);
              
                // console.log("EditRes",res)
      
                
                for(let k=0;k<res.length;k++){
                  this.addChild2Item(res[k].wireTransferFromCompanyId)
                }
      
                
                
                
              }
              )

              this.dapiService.getChild3ItembyChild3(+this.data[0].value).subscribe((res) => {
      
                this._ui.loadingStateChanged.next(false);
                
                  // console.log("EditRes",res)
        
                  
                  for(let k=0;k<res.length;k++){
                    this.addChild3Item(res[k].bankDepositFromCompanyId)
                  }
        
                  
                  
                  
                }
                )

                this.dapiService.getChild4ItembyChild4(+this.data[0].value).subscribe((res) => {
      
                  this._ui.loadingStateChanged.next(false);
                  
                    // console.log("EditRes",res)
          
                    
                    for(let k=0;k<res.length;k++){
                      this.addChild4Item(res[k].paymentFromCompanyAttachmentId)
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
  
      //   for(let k=0;k<=this.dropList.length;k++) {
      //     this.dropItem = this.dropList[k]
  
      //         // this.tableId = this.dropItem.refId;
      //         // this.tableName = this.dropItem.refTable;
      //         // this.displayColumn = this.dropItem.refColumn;
      //         // this.condition = this.dropItem.refCondition;
  
      //       this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.dropItem.refCondition, false).subscribe((res: SelectModel[]) => {
      //     console.log("drop: ", res);
      //     this.dropList[k].myarray = res;
      //     this.container.push(res);
      //     console.log(this.container)
  
  
      // });
  
      //   }
        console.log("light: ",this.light);
        console.log("dark: ",this.dark);
  
        
  
  
  
      })
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
      tableId: 61,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    this.dapiService.child1ItemControllers(this.model2).subscribe((res) => {

      this.childElemInit = res
      console.log(this.childElemInit)
      

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
      tableId: 64,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    this.dapiService.child2ItemControllers(this.model22).subscribe((res) => {

      this.childElemInit2 = res
      console.log(this.childElemInit2)
      

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
      tableId: 66,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    this.dapiService.child3ItemControllers(this.model3).subscribe((res) => {

      this.childElemInit3 = res
      console.log(this.childElemInit3)
      

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
      tableId: 68,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    this.dapiService.child4ItemControllers(this.model4).subscribe((res) => {

      this.childElemInit4 = res
      console.log(this.childElemInit4)
      

      for(let i=0;i<this.childElemInit4.length;i++){
        this.verCh4 = this.childElemInit4[i]
        childElemDark2.records.push(this.verCh4);
        

      }
      this.lastDark.child4.push(childElemDark2);
      this.childElemInit4.forEach((itemE) =>{
        if (itemE && itemE.inTransaction && itemE.access != "NoAccess"){
          
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
         this.lastDark.child1[i].records[1].value = this.lastDark.records[0].value
         this.vale = this.lastDark.child1[i].records
         this.vale.forEach((val) => {
           val.entryMode = "A"
         })
       }
  
       console.log("Dark",JSON.stringify(this.lastDark));
  
       
        
            if(this.lastDark.records[0].entryMode == "A"){
              console.log('Last:', JSON.stringify(this.lastDark));
             this.dapiService.EntryA(this.lastDark).subscribe(nexto => {
               this.res = nexto;
               if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
                this._msg.showInfo("Message", "Expense saved succesfully");
              this.dialogRef.close();
              }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
                this._msg.showInfo("رسالة", "تم حفظ المصروف بنجاح");
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
                this._msg.showInfo("Message", "Expense saved succesfully");
              this.dialogRef.close();
              }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
                this._msg.showInfo("رسالة", "تم حفظ المصروف بنجاح");
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
