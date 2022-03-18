import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DApiSerivce } from 'src/app/api.service';
import { AppGlobals } from 'src/app/app.global';
import { SelectService } from 'src/app/components/common/select.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { Sources } from 'src/app/dynamic-form/source.model';
import { Send } from 'src/app/send.model';
import { resValModel } from '../account.model';
import { AccountService } from './account.service';

@Component({
  selector: 'app-system-account',
  templateUrl: './system-account.component.html',
  styleUrls: ['./system-account.component.scss']
})
export class SystemAccountComponent implements OnInit {

  refString: string;
    stringOfV: string;
  tableId: string;
  tableName: string;
  displayColumn: string;
  condition: string;
  ckVal: string;


  model: Send = {
    tableId: 12,
    recordId: 0,
    userId: 26,
    roleId: 2,
    languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
  };
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
  checkedIsSub:boolean = false;
  checkParentAccountId: boolean;
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
  direction: string;
  dialog_title: string = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');

  light: Sources[] = [];
  dark: Sources[] = [];

  ver2: Sources;
  ver3: Sources;
  ver4: Sources;
  ver5: Sources;
  ver6: Sources;
  obj1: Sources;
  obj2: Sources;
  dropItem: Sources;
  dropItem2: Sources;
  container: any[][] =[];
  container2: any[][] =[];
  submit: string;
  cancel: string;
  float:string;
  numval: string;



  accountList: SelectModel[] = [];

  dropList: Sources[] = [];
  dropList2: Sources[] = [];

  val1: string;
  val11: string;
  val2: string;
  resVal: SelectModel[];

  res2: SelectModel[];

  constructor( private dapiService: AccountService,
     private _ui: UIService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private _msg: MessageBoxService,
      private dialogRef: MatDialogRef<SystemAccountComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: Send) {}

  ngOnInit(): void {

    

    




  //   this._select.getDropdown(false).subscribe((res: SelectModel[]) => {
  //     this.accountList = res;
  // });
  

  
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.submit = "Submit"
      this.cancel = "Cancel"
      
      this.float = "left"
      
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.submit = "ارسال"
      this.cancel = "الغاء"
      
      this.float = "right"
    }

    this._ui.loadingStateChanged.next(true);
    this.dapiService.accountControllers(this.pModel).subscribe(res => {
      
      this._ui.loadingStateChanged.next(false);
      console.log("check1: ", res);
      // res.sort(function(a, b) { 
      //   return a.designOrder - b.designOrder  ||  a.label.localeCompare(b.label);
      // }); 
      console.log("check2: ", res);
      this.data = res;
      console.log(JSON.stringify(this.data))
      this.data.forEach((ala2) => {
        if(ala2.tableColumnId == 28) {
          if(+ala2.value > 1) {
            this.checkParentAccountId =true
          }
        }
      })


      for(let i=0;i<this.data.length;i++){
        this.ver2 = this.data[i]
        if (this.ver2 && this.ver2.inTransaction && this.ver2.access != "NoAccess"){
          if (this.ver2.type === "dropdown") {
            this.dropList.push(this.ver2);
            console.log("droplist: ",this.dropList)
            if(this.ver2.tableColumnId == 471){
              this.val1 = this.ver2.value
            }
            if(this.ver2.tableColumnId == 472){
              this.val2 = this.ver2.value
            }
            if(this.ver2.tableColumnId == 470){
              this.dapiService.generateCode(this.val1, this.val2).subscribe(res => {
                this.resVal = res
                this.ver2.value = this.resVal[0].name
              })
            }


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

      console.log("LL", this.light)
      if(localStorage.getItem(this._globals.baseAppName + '_Add&Edit') == "Add") {
        for(let i=0;i<this.light.length;i++){
        
          this.ver5 = this.light[i]
          if(this.ver5 && this.ver5.tableColumnId == 471){
            this.val1 = this.ver5.value
          }
          if(this.ver5 && this.ver5.tableColumnId == 472){
            this.val2 = this.ver5.value
          }
          if(this.ver5 && this.ver5.tableColumnId == 470){
            console.log("NN", this.val1, this.val2)
            this.dapiService.generateCode(this.val1, this.val2).subscribe(res => {
              console.log("DD", res)
              
             
              this.light[i].value = res[0].name
              console.log("DD2", this.ver5)
            })
          }
  
        }
      }
      

      
      this.breakpoint =
      window.innerWidth <= 680
        ? 1
        : this.data[0].maxRowSize;



        for(let k=0;k<=this.dropList.length;k++) {
          if(this.dropList[k] && this.dropList[k].tableColumnId == 471) {
            this.numval = this.dropList[k].value
          }
          if( this.dropList[k] && this.dropList[k].tableColumnId == 472) {

            
            this.dropItem = this.dropList[k]
        this.refString = this.dropItem.refCondition + this.numval
        this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.refString, false).subscribe((res: SelectModel[]) => {
          console.log("drop: ", res);
          res.push({id: 1, name: "None"})
          
          res.sort(function(a, b) { 
            return a.id - b.id  ||  a.name.localeCompare(b.name);
          });
          this.dropList[k].myarray = res;
          this.container.push(res);
          console.log("F1", res)
  
  
      });
            
          } else{
            this.dropItem = this.dropList[k]
  
              // this.tableId = this.dropItem.refId;
              // this.tableName = this.dropItem.refTable;
              // this.displayColumn = this.dropItem.refColumn;
              // this.condition = this.dropItem.refCondition;
  
            this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.dropItem.refCondition, false).subscribe((res: SelectModel[]) => {
          console.log("drop: ", res);
          
          res.sort(function(a, b) { 
            return a.id - b.id  ||  a.name.localeCompare(b.name);
          });
          this.dropList[k].myarray = res;
          this.container.push(res);
          console.log(this.container)
  
  
      });
          }
          
  
        }

      
      

      



      console.log(JSON.stringify(this.data))
      console.log("light: ",this.light);
      console.log("dark: ",this.dark);



    })



  //   this.dropList.forEach((obje) => {

  //     this.tableId = obje.refId;
  //           this.tableName = obje.refTable;
  //           this.displayColumn = obje.refColumn;
  //           this.condition = obje.refCondition;
  //       this._select.getDropdown(this.tableId, this.tableName, this.displayColumn, this.condition, false).subscribe((res: SelectModel[]) => {
  //     console.log("drop: ", res)
  // });
  //   })


  }

  onParent() {
    if(this.checkParentAccountId == false) {
      this.light.forEach((ala) => {
        if(ala.tableColumnId == 28) {
          ala.value = "1"
        }
      })
    }
  }

  onCheck() {
    this.checkedIsSub = !this.checkedIsSub
    console.log(this.checkedIsSub)
    if(this.checkedIsSub != false) {
      for(let i=this.light.length-1;i>=0;i--){
        
        if(this.light[i].tableColumnId == 472){
          this.light[i].value = "1"
        }
        if(this.light[i].tableColumnId == 471){
          this.ckVal =  this.light[i].value
        }
        if(this.light[i].tableColumnId == 470){
          this.dapiService.generateCode(this.ckVal, "1").subscribe(res => {
            this.resVal = res
            console.log("VV", res)
            this.light[i].value = this.resVal[0].name
            console.log("VV", this.ver5)
          })
        }
        
      }
    }
  }

  onChangeValue2(id: number) {
    var x = 0
    for(let i=this.light.length-1;i>=0;i--){
      this.ver5 = this.light[i]
      console.log("Kl", this.light)
      
      // if(this.ver5 && this.ver5.tableColumnId == 472){
      //   this.val2 = this.ver5.value
      // }
      if(this.light[i] && this.light[i].tableColumnId == 471){
        this.val11 = this.light[i].value
        console.log("F2", this.val11)
      }
      if(this.val11){
        x = 1
        console.log("NN", this.val11, id)
        
      }
      if(x == 1) {
        this._ui.loadingStateChanged.next(true);
        this.dapiService.generateCode(this.val11, id.toString()).subscribe(res => {
          this._ui.loadingStateChanged.next(false);
          this.resVal = res
          console.log("VV", res)
          this.light[2].value = this.resVal[0].name
          console.log("VV", this.ver5)
        })
      }

    }
  }

  onChangeValue(id: number) {
    this.stringOfV = id.toString()
    console.log("working fine")
    for(let i=0;i<this.light.length;i++){
      this.ver5 = this.light[i]
      if(this.ver5 && this.ver5.tableColumnId == 471){
        this.val1 = this.ver5.value
      }
      if(this.ver5 && this.ver5.tableColumnId == 472){
        this.val2 = "1"
      }
      if(this.ver5 && this.ver5.tableColumnId == 470){
        console.log("NN", id, "1")
        this._ui.loadingStateChanged.next(true);
        this.dapiService.generateCode(id.toString(), "1").subscribe(res => {
          this._ui.loadingStateChanged.next(false);
          this.resVal = res
          console.log("VV", res)
          this.light[i].value = this.resVal[0].name
          console.log("VV", this.ver5)
        })
      }

    }
    for(let k=0;k<=this.dropList.length;k++) {
      
      if(this.dropList[k].tableColumnId == 472) {
        this.dropItem = this.dropList[k]
        this.refString = this.dropItem.refCondition + this.stringOfV
        this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.refString, false).subscribe((res: SelectModel[]) => {
          console.log("drop44: ", res);
          res.push({id: 1, name: "None"})
          this.dropList[k].myarray = res;
          this.container.push(res);
          console.log(this.container)
  
  
      });
      
      }
      

    }
  }
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
  


    handleKeyUp(e){
      if(e.keyCode === 13){
         this.onSubmit();
      }
    }



  onSubmit() {

    this.data.forEach((Object)=> this.light.forEach((obj)=>
    {
      if(Object.tableColumnId === obj.tableColumnId){
        Object.value = obj.value.toString()
      }


    }));

    console.log(JSON.stringify(this.data))

    for(let i=0;i<=this.data.length;i++){
      this.obj1 = this.data[i];
       if(this.obj1 ){
         this.last.records.push(this.obj1);
       }
     }

     console.log(JSON.stringify(this.last));

      // this.dapiService.taxEntryE(this.last).subscribe(nexto => {
      //   this.res = nexto;
      //   console.log("here response: ", this.res)
      //   this.dialogRef.close();

      //   })

      console.log("last",this.last);
      this.last.records.sort(function(a, b) { 
        return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
      }); 
      console.log("last2",this.last);
    if(this.last.records[2].value != "Error") {
      if(this.last.records[0].entryMode == "A"){
        this.dapiService.accountEntryA(this.last).subscribe(nexto => {
          this.res = nexto;
          if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
            this._msg.showInfo("Message", "Saved succesfully");
          this.dialogRef.close();
          }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
            this._msg.showInfo("رسالة", "تم حفظ بنجاح");
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
        this.dapiService.accountEntryE(this.last).subscribe(nexto => {
          this.res = nexto;
          if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
            this._msg.showInfo("Message", "Saved succesfully");
          this.dialogRef.close();
          }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
            this._msg.showInfo("رسالة", "تم حفظ بنجاح");
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
      }
  
        }else {
          if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
            this._msg.showInfo("Error", "Invalid Account Code!!");
          
          }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
            
            this._msg.showInfo("خطاء", "رمز الحساب غير صحيح");
          
          }
        }
    }











  onResize(event) {
    this.spacepoint =
      event.target.innerWidth <= 680
        ? (this.spacezone = false)
        : (this.spacezone = true);
    this.breakpoint =
      event.target.innerWidth <= 680
        ? 1
        : this.data[0].maxRowSize;
  }

  

  onCancel() {
    this.dialogRef.close();
  }

}
