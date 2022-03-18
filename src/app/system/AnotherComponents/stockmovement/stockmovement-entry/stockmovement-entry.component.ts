import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StockMovementModel } from '../stockmovement.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { StockMovementService } from '../stockmovement.service';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Send } from 'src/app/send.model';
import { Sources } from 'src/app/source.model';
import { StockMovementEntryService } from './stockmovement-entry.service';
import { productPricingModel } from '../../invoice/invoice.model';

@Component({
  selector: 'app-stockmovement-entry',
  templateUrl: './stockmovement-entry.component.html',
  styleUrls: ['./stockmovement-entry.component.scss']
})

export class StockMovementEntryComponent implements OnInit {
    url: string;
  
    model: Send = {
      tableId: 40,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    model2: Send ;
    childElemInit: Sources[] = [];
    verCh2: Sources;
    childElemDark: Sources[] = [];
    vale: Sources[]
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
    last: any = {
      records: [],
      child1: [],
      child2: [],
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
    alarray: Sources[];
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
    dropItemchild: Sources;
    container: any[][] =[];
  
    accountList: SelectModel[] = [];
  
    dialog_title: string = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');
  
    dropList: Sources[] = [];
    dropListItem: Sources[] = [];


  constructor(
    private dapiService: StockMovementEntryService,
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private _myService: StockMovementService,
      private dialogRef: MatDialogRef<StockMovementEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: Send
  ) { }

  ngOnInit() {

    if(localStorage.getItem(this._globals.baseAppName + '_Add&Edit') == "Add") {
      this.addChild1Item(0)
      
      
    }
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

        if(localStorage.getItem(this._globals.baseAppName + '_Add&Edit2') == "Edit") {
          if(this.data.length > 0) {
    
            this.dapiService.getChild1ItembyChild1(+this.data[0].value).subscribe((res) => {
              this._ui.loadingStateChanged.next(false);
            
            
              console.log("EditRes",res)
    
              
              for(let k=0;k<res.length;k++){
                this.addChild1Item(res[k].stockMovementProductId)
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
      tableId: 41,
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

      this.dropListItem.push(this.childElemInit[2])
      this.dropListItem.push(this.childElemInit[3])
      console.log(this.dropListItem)
      console.log(this.childElemInit[2])
      for(let k=0;k<this.dropListItem.length;k++) {
        console.log("loop cycle" + k)
        this.dropItemchild = this.dropListItem[k]
        console.log("DropitemTax", this.dropItemchild)

            // this.tableId = this.dropItem.refId;
            // this.tableName = this.dropItem.refTable;
            // this.displayColumn = this.dropItem.refColumn;
            // this.condition = this.dropItem.refCondition;

            
            if(this.dropItemchild.tableColumnId == 243) {
              this.dapiService.getProductPricing(0).subscribe((result) => {
                this.dropItemchild.myarray = result
              })

            }else {
              this._select.getDropdown(this.dropItemchild.refId, this.dropItemchild.refTable, this.dropItemchild.refColumn, this.dropItemchild.refCondition, false).subscribe((res: SelectModel[]) => {
                // console.log("drop: ", res);
                this.dropListItem[k].myarray = res;
                this.onChangeValue(+this.dropListItem[k].value, (k/2) )
              });
            }
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

  onChangeValue(id: number, id2: number) {
    this.dapiService.getProductPricing(id).subscribe((resu: productPricingModel) => {
      console.log(resu)
      this.alarray = this.last.child1[id2].records
      console.log(this.alarray)
      this.alarray.forEach((element) => {
        if(element.tableColumnId == 243){
          element.myarray = resu
        }
      });
    })
    // this.stringOfV = id.toString()
    // console.log("working fine")
    // for(let k=0;k<=this.dropList.length;k++) {
      
    //   if(this.dropList[k].tableColumnId == 292) {
    //     this.dropItem = this.dropList[k]
    //     this.refString = this.dropItem.refCondition + this.stringOfV
    //     this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.refString, false).subscribe((res: SelectModel[]) => {
    //       console.log("drop: ", res);
    //       this.dropList[k].myarray = res;
    //       this.container.push(res);
    //       console.log(this.container)
  
  
    //   });
      
    //   }
      

    // }
  }



  deleteFun(id: number) {
    console.log('I ran from delete');
    // this.elem.splice(id, 1);
    this.last.child1.splice(id, 1)
    this.lastDark.child1.splice(id, 1)
    if(this.last.child1.length == 0){
      this.addChild1Item(0)
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
         this.lastDark.child1[i].records[1].value = this.lastDark.records[0].value
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
