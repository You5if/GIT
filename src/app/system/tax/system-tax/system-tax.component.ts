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
import { TaxService } from './tax.service';

@Component({
  selector: 'app-system-tax',
  templateUrl: './system-tax.component.html',
  styleUrls: ['./system-tax.component.scss']
})
export class SystemTaxComponent implements OnInit {



  model: Send = {
    tableId: 11,
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


  constructor( private dapiService: TaxService,
     private _ui: UIService,
      private _globals: AppGlobals,
      private _msg: MessageBoxService,
      private _select: SelectService,
      private dialogRef: MatDialogRef<SystemTaxComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: Send) {}

  ngOnInit(): void {

    


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
    this.dapiService.taxControllers(this.pModel).subscribe(res => {
      this._ui.loadingStateChanged.next(false);
      console.log("hello")
      this.data = res;

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
  handleKeyUp(e){
    if(e.keyCode === 13){
       this.onSubmit();
    }
  }
  onSubmit() {

    this.data.forEach((Object)=> this.light.forEach((obj)=>
    {
      if(Object.tableColumnId === obj.tableColumnId){
        Object.value = obj.value
      }

    }));

    console.log(JSON.stringify(this.data))

    for(let i=0;i<=this.data.length;i++){
      this.obj1 = this.data[i];
       if(this.obj1 ){
         this.last.records.push(this.obj1);
       }
     }

     this.last.records.sort(function(a, b) { 
      return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
    });
     console.log(this.last);

     this.last.records.forEach((Object3)=> {
      if(Object3.tableColumnId == 20){
        if(Object3.value >= 1) {
          if(this.last.records[0].entryMode == "A"){
            console.log('Last:', JSON.stringify(this.last));
           this.dapiService.taxEntryA(this.last).subscribe(nexto => {
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
         }else if(this.last.records[0].entryMode == "E"){
           this.dapiService.taxEntryE(this.last).subscribe(nexto => {
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
        } else {
          if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
            this._msg.showInfo("Error!!", "Amount is less than 1");
          this.last.records = []
          }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
            
            this._msg.showInfo("خطأ!!", "الكمية اقل من واحد");
          this.last.records = []
          }
          
        }
      }
      
      

    })

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
