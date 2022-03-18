import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { min } from 'rxjs/operators';
import { DApiSerivce } from 'src/app/api.service';
import { AppGlobals } from 'src/app/app.global';
import { SelectService } from 'src/app/components/common/select.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { Sources } from 'src/app/dynamic-form/source.model';
import { Send } from 'src/app/send.model';
import { ForexService } from './forex.service';

@Component({
  selector: 'app-system-forex',
  templateUrl: './system-forex.component.html',
  styleUrls: ['./system-forex.component.scss']
})
export class SystemForexComponent implements OnInit {



  model: Send = {
    tableId: 17,
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
  successM: string;
  errorM: string;

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
  maxSize: number

  light: Sources[] = [];
  dark: Sources[] = [];

  ver2: Sources;
  ver3: Sources;
  ver4: Sources;
  obj1: Sources;
  obj2: Sources;
  dialog_title: string = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');

  direction: string;
  minDate: Date;
  maxDate:  Date;

  submit: string;
  cancel: string;
  dropItem: Sources;
  container: any[][] =[];

  accountList: SelectModel[] = [];

  dropList: Sources[] = [];


  constructor( private dapiService: ForexService,
     private _ui: UIService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private _msg: MessageBoxService,
      private dialogRef: MatDialogRef<SystemForexComponent>,
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
    this.dapiService.forexControllers(this.pModel).subscribe(res => {
      this._ui.loadingStateChanged.next(false);
      console.log("hello")
      this.data = res;

      for(let i=0;i<=this.data.length;i++){
        this.ver2 = this.data[i]
        // if((this.ver2.tableColumnId == 43 || this.ver2.tableColumnId == 44) && this.ver2.entryMode == 'A') {
        //   this.ver2.value = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
        // }
        if (this.ver2 && this.ver2.inTransaction && this.ver2.access != "NoAccess"){
          if (this.ver2.type === "dropdown") {
            this.dropList.push(this.ver2);
            console.log("droplist: ",this.dropList)
          }
          if((this.ver2.tableColumnId == 43 || this.ver2.tableColumnId == 44) && this.ver2.entryMode == 'A') {
          this.ver2.value = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
        }
          this.light.push(this.ver2);

        }else{
          if(this.ver2) {
            this.dark.push(this.ver2);
          }


        }

      }
      this.breakpoint =
      window.innerWidth <= 680
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

  // validateAmount() {
  //   this.last.records.forEach((Object3)=> {
  //     if(Object3.tableColumnId == 45){
  //       if(Object3.value >= 1){
  //         return true
  //       }else {
  //         return false
  //       }
  //     }
  //   })
  // }
  // validateDate(item1:Date, item2:Date) {
  //   if(item2>=item1) {
  //     return true
  //   }else {
  //     return false
  //   }
  // }

  // validation() {
  //   if(this.validateAmount) {
  //     this.successM += ""
  //   }else{
  //     this.errorM +="Amount is less than 1"
  //   }
  //   if(this.validateDate) {
  //     this.successM += ""
  //   }else{
  //     this.errorM +="To date cann't be less than From date"
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

     console.log(this.last);

     this.last.records.forEach((Object3)=> {
       if(Object3.tableColumnId == 43){
         this.minDate = new Date(Object3.value)
       }
       if(Object3.tableColumnId == 44){
         this.maxDate = new Date(Object3.value)
       }
      //  this.validateDate(this.minDate, this.maxDate)

       
      //  if(this.maxDate>=this.minDate) {
      //    console.log("worked")
      //  }else{
      //    console.log("noooooo")
      //  }

      if(Object3.tableColumnId == 45){
        if(Object3.value >= 1 && this.maxDate>=this.minDate) {
          if(this.last.records[0].entryMode == "A"){
            console.log('Last:', JSON.stringify(this.last));
           this.dapiService.forexEntryA(this.last).subscribe(nexto => {
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
           this.dapiService.forexEntryE(this.last).subscribe(nexto => {
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
         }
        } else {
          if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
            if(Object3.value < 1 && this.maxDate>=this.minDate) {
              this._msg.showInfo("Error!!", "Amount is less than 1");
            }else if(Object3.value >= 1 && this.maxDate<this.minDate) {
              this._msg.showInfo("Error!!", "To date cann't be less than From date");
            }else if(Object3.value < 1 && this.maxDate<this.minDate) {
              this._msg.showInfo("Error!!", "Amount is less than 1 and To date cann't be less than From date");
            }
            
          this.last.records = []
          }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
            if(Object3.value < 1 && this.maxDate>=this.minDate) {
              this._msg.showInfo("خطأ!!", "الكمية اقل من واحد");
            }else if(Object3.value >= 1 && this.maxDate<this.minDate) {
              this._msg.showInfo("خطأ!!", "تحقق من التاريخ ");
            }else if(Object3.value < 1 && this.maxDate<this.minDate) {
              this._msg.showInfo("و التار خطأ!!", "تحقق من الكمية و التاريخ");
            }
            
            
          this.last.records = []
          }
        }
      }
      
      

    })

  //   this.last.records.forEach((Object3)=> {
  //     if(Object3.tableColumnId == 43){
  //       this.minDate = new Date(Object3.value)
  //     }
  //     if(Object3.tableColumnId == 44){
  //       this.maxDate = new Date(Object3.value)
  //     }
  //    //  if(this.maxDate>=this.minDate) {
  //    //    console.log("worked")
  //    //  }else{
  //    //    console.log("noooooo")
  //    //  }

  //    if(Object3.tableColumnId == 45){
  //      if(Object3.value >= 1 && this.maxDate>=this.minDate) {
  //        if(this.last.records[0].entryMode == "A"){
  //          console.log('Last:', JSON.stringify(this.last));
  //         this.dapiService.forexEntryA(this.last).subscribe(nexto => {
  //           this.res = nexto;
  //           if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
  //            this._msg.showInfo("Message", "Forex saved succesfully");
  //          this.dialogRef.close();
  //          }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
  //            this._msg.showInfo("رسالة", "تم حفظ الفوركس بنجاح");
  //          this.dialogRef.close();
  //          }
    
  //         }, error => {
  //           console.log(error);
  //           if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
  //            this._msg.showInfo("Message", "Error!!");
  //          this.dialogRef.close();
  //          }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
             
  //            this._msg.showInfo("رسالة", "توجد مشكلة");
  //          this.dialogRef.close();
  //          }
  //         });
  //       }else if(this.last.records[0].entryMode == "E"){
  //         this.dapiService.forexEntryE(this.last).subscribe(nexto => {
  //           this.res = nexto;
  //           if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
  //            this._msg.showInfo("Message", "Forex saved succesfully");
  //          this.dialogRef.close();
  //          }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
  //            this._msg.showInfo("رسالة", "تم حفظ الفوركس بنجاح");
  //          this.dialogRef.close();
  //          }
    
  //         }, error => {
  //           console.log(error);
  //           if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
  //            this._msg.showInfo("Message", "Error!!");
  //          this.dialogRef.close();
  //          }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
             
  //            this._msg.showInfo("رسالة", "توجد مشكلة");
  //          this.dialogRef.close();
  //          }
  //         });
  //       }
  //      } else {
  //        if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
  //          if(Object3.value < 1 && this.maxDate>=this.minDate) {
  //            this._msg.showInfo("Error!!", "Amount is less than 1");
  //          }else if(Object3.value >= 1 && this.maxDate<this.minDate) {
  //            this._msg.showInfo("Error!!", "To date cann't be less than From date");
  //          }else if(Object3.value < 1 && this.maxDate<this.minDate) {
  //            this._msg.showInfo("Error!!", "Amount is less than 1 and To date cann't be less than From date");
  //          }
           
  //        this.last.records = []
  //        }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
  //          if(Object3.value < 1 && this.maxDate>=this.minDate) {
  //            this._msg.showInfo("خطأ!!", "الكمية اقل من واحد");
  //          }else if(Object3.value >= 1 && this.maxDate<this.minDate) {
  //            this._msg.showInfo("خطأ!!", "تحقق من التاريخ ");
  //          }else if(Object3.value < 1 && this.maxDate<this.minDate) {
  //            this._msg.showInfo("و التار خطأ!!", "تحقق من الكمية و التاريخ");
  //          }
           
           
  //        this.last.records = []
  //        }
  //      }
  //    }
     
     

  //  })



     

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

  addZeroes(num) {
    // Convert input string to a number and store as a variable.
        let value = Number(num).toString();
    // Split the input string into two arrays containing integers/decimals
        const res = num.split('.');
    // If there is no decimal point or only one decimal place found.
        if (res.length === 1 || res[1].length < 3) {
    // Set the number to two decimal places
          value = parseFloat(value).toFixed(2);
        }
    // Return updated or original number.
        return value;
      }

}
