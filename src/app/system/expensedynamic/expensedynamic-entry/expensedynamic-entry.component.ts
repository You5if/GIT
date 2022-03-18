import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { AppGlobals } from 'src/app/app.global';
import { SelectService } from 'src/app/components/common/select.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { Send } from 'src/app/send.model';
import { Sources } from 'src/app/source.model';
import { ExpenseFilingItemModel } from '../../expensefiling/expensefiling/expensefiling.model';
import { ExpenseDynamicService } from './expensedynamic.service';

@Component({
  selector: 'app-expensedynamic-entry',
  templateUrl: './expensedynamic-entry.component.html',
  styleUrls: ['./expensedynamic-entry.component.scss']
})
export class ExpensedynamicEntryComponent implements OnInit {
  url: string;
  total: number = 0;
  totalTax: number = 0;
  totalE: string;
  subTotalE: string;
  subTotal: number = 0;
  model2: Send ;
  model3: Send ;
  model: Send = {
    tableId: 18,
    recordId: 0,
    userId: 26,
    roleId: 2,
    languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
  };
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
  childElemDark2: any = {
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
  childElemDark3: any = {
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
  verCh2: Sources;
  verCh3: Sources;
  ver3: Sources;
  ver4: Sources;
  obj1: Sources;
  obj2: Sources;
  records: Sources[] = []

  direction: string;

  dropItem: Sources;
  dropItemTax: Sources;
  container: any[][] =[];

  accountList: SelectModel[] = [];

  dialog_title: string = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');

  dropList: Sources[] = [];
  dropListTax: Sources[] = [];
  // childElem: Sources[] = [];
  childElemInit: Sources[] = [];
  childElemDark: Sources[] = [];
  childElemInit3: Sources[] = [];
  expenseFilingItemData: ExpenseFilingItemModel[] = [];
expenseFilingItemDeletedElementsArray: ExpenseFilingItemModel[] = [];
expenseFilingItemTableValueAfterDeleteArray: ExpenseFilingItemModel[] = [];
expenseFilingItemDataSource = new MatTableDataSource(this.expenseFilingItemData);

  num: number = 10;
  child1Data: any;
  vale: Sources[]


  constructor( private dapiService: ExpenseDynamicService,
     private _ui: UIService,
      private _globals: AppGlobals,
      private _msg: MessageBoxService,
      private _select: SelectService,
      private dialogRef: MatDialogRef<ExpensedynamicEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: Send) {}

  ngOnInit(): void {

    

    this.child1Data = this.last.child1;
    // console

    if(localStorage.getItem(this._globals.baseAppName + '_Add&Edit') == "Add") {
      this.addChild1ExpenseItem(0)
      
      
    }
    // this.addChild1ExpenseItem(0)
    // this.addChild1()
    // this.addChild1()
    // this.addChild1()

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
    this.dapiService.expenseControllers(this.pModel).subscribe(res => {
      this._ui.loadingStateChanged.next(false);
      // console.log("hello")
      this.data = res;
      if(localStorage.getItem(this._globals.baseAppName + '_Add&Edit') == "Edit") {
      if(this.data.length > 0) {

        this.dapiService.getExpenseItembyExpense(+this.data[0].value).subscribe((res) => {
  
        this._ui.loadingStateChanged.next(false);
        
          // console.log("EditRes",res)

          
          for(let k=0;k<res.length;k++){
            this.addChild1ExpenseItem(res[k].expenseFilingItemId)
          }

          
          
          
        }
        )
        this.dapiService.getExpenseTaxbyExpense(+this.data[0].value).subscribe((res) => {

          
          this._ui.loadingStateChanged.next(false);
          // console.log("EditRes",res)
          console.log("res:", res)
          for(let k=0;k<res.length;k++){
            this.addChild2ExpenseTax(res[k].expenseFilingTaxId)
          }

          
          
          
        }
        )
      }else {
        this.addChild1ExpenseItem(0)
      }
      
    }

      for(let i=0;i<=this.data.length;i++){
        this.ver2 = this.data[i]
        if (this.ver2 && this.ver2.inTransaction && this.ver2.access != "NoAccess"){
          if (this.ver2.type === "dropdown") {
            this.dropList.push(this.ver2);
            // console.log("droplist: ",this.dropList)


            // this.tableId = this.ver2.refId;
            // this.tableName = this.ver2.refTable;
            // this.displayColumn = this.ver2.refColumn;
            // this.condition = this.ver2.refCondition;
          }
          if((this.ver2.tableColumnId == 60) && this.ver2.entryMode == 'A') {
            this.ver2.value = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
          }
          this.light.push(this.ver2);
          // for(let i=0;i<this.lastDark.child1.length;i++){
      
          //   this.lastDark.child1[i].records.forEach((elem) => {
          //     if(elem && elem.label == "Amount") {
          //       this.subTotal += +elem.value
          //     }
          //   })
          // }
          
      
            
          

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
        // console.log("drop: ", res);
        this.dropList[k].myarray = res;
        
        // this.container.push(res);
        // console.log(this.container)


    });

      }
      // console.log("light: ",this.light);
      // console.log("dark: ",this.dark);

      



    })

    


    
    console.log("DarkInit", this.lastDark)
    

  }

 

 


  addChild1ExpenseItem(id:number) {
    
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
      tableId: 20,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    this.dapiService.expenseItemControllers(this.model2).subscribe((res) => {

      this.childElemInit = res
      

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
      this.subTotal = 0
      for(let i=0;i<this.lastDark.child1.length;i++){
      
        this.lastDark.child1[i].records.forEach((elem) => {
          if(elem && elem.label == "Amount") {
            this.subTotal += +elem.value
          }
        })
      }

      
      
     
      
    })
    console.log("child1 final", this.last)
    console.log("DarlDarl",this.lastDark)

    
  }
  addChild2ExpenseTax(id:number) {
    
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
    let childElemDark3 = {
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
      tableId: 19,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    this.dapiService.expenseTaxControllers(this.model3).subscribe((res) => {
      console.log("Tax Special:" ,res)
      this.childElemInit3 = res

      this.dropListTax.push(this.childElemInit3[2])

      for(let k=0;k<this.dropListTax.length;k++) {
        console.log("loop cycle" + k)
        this.dropItemTax = this.dropListTax[k]
        console.log("DropitemTax", this.dropItemTax)

            // this.tableId = this.dropItem.refId;
            // this.tableName = this.dropItem.refTable;
            // this.displayColumn = this.dropItem.refColumn;
            // this.condition = this.dropItem.refCondition;

          this._select.getDropdown(this.dropItemTax.refId, this.dropItemTax.refTable, this.dropItemTax.refColumn, this.dropItemTax.refCondition, false).subscribe((res: SelectModel[]) => {
        // console.log("drop: ", res);
        this.dropListTax[k].myarray = res;
        
        // this.container.push(res);
        // console.log(this.container)


    });
    
    

      }
      

      for(let i=0;i<this.childElemInit3.length;i++){
        this.verCh3 = this.childElemInit3[i]
        childElemDark3.records.push(this.verCh3);
        

      }
      this.lastDark.child2.push(childElemDark3);
      this.childElemInit3.forEach((itemE) =>{
        if (itemE && itemE.inTransaction && itemE.access != "NoAccess"){
          
          // this.childElem.records.push(itemE);
          myElem.records.push(itemE)
          
  
        }else{
          
            this.childElemDark.push(this.verCh3);
            // console.log(this.childElemDark)
          
  
  
        }
      })
      
      // this.childElem = res
      // console.log(JSON.stringify(this.child1Data))
      this.childElem3 = null
      this.childElem3 = this.childElem3

      //this.last.child1.push(this.childElem2);
      this.last.child2.push(myElem)

      // console.log(this.lastDark.child1.length)

      // this.total = 0
      // this.totalTax = 0
      // for(let i=0;i<this.lastDark.child1.length;i++){
      
      //   this.lastDark.child1[i].records.forEach((elem) => {
      //     if(elem && elem.label == "Amount") {
      //       this.total += +elem.value
      //     }
      //   })
      // }

      
    console.log(this.subTotal)
    
    for(let i=0;i<this.lastDark.child2.length;i++){
      
      this.lastDark.child2[i].records.forEach((elem) => {
        if(elem && elem.label=="TaxId"){
          this._select.getDropdown("taxId", "tax", "convert(nvarchar,taxAmount)", "active=1 and deleted=0 and taxId="+elem.value, false).subscribe((result) => {
            console.log("Result:",result)
            this.totalTax += +result[0].name
            this.total = 0
            for(let i=0;i<this.lastDark.child1.length;i++){
      
              this.lastDark.child1[i].records.forEach((elem) => {
                if(elem && elem.label == "Amount") {
                  this.total += +elem.value
                }
              })
            }
            if(this.totalTax > 0) {
              this.total += (this.total * (this.totalTax/100))
            }
            
          })
          
        }

      })


      
    }
    console.log(this.totalTax)
    
    

     
      
    })
    console.log("child22 final", this.last)
    console.log("DarlDarl2",this.lastDark)

    
    
  }

  onAmountChange(searchValue: string): void {
    // this.elem[this.selectedElement].reference = searchValue
    console.log(searchValue)
    this.totalTax = 0
    this.subTotal = 0
    this.total = 0
      for(let i=0;i<this.lastDark.child1.length;i++){
      
        this.lastDark.child1[i].records.forEach((elem) => {
          if(elem && elem.label == "Amount") {
            this.subTotal += +elem.value
          }
        })
      }

      for(let i=0;i<this.lastDark.child2.length;i++){
      
        this.lastDark.child2[i].records.forEach((elem) => {
          if(elem && elem.label=="TaxId"){
            this._select.getDropdown("taxId", "tax", "convert(nvarchar,taxAmount)", "active=1 and deleted=0 and taxId="+elem.value, false).subscribe((result) => {
              console.log("Result:",result)
              this.totalTax += +result[0].name
              this.total = 0
              for(let i=0;i<this.lastDark.child1.length;i++){
        
                this.lastDark.child1[i].records.forEach((elem) => {
                  if(elem && elem.label == "Amount") {
                    this.total += +elem.value
                  }
                })
              }
              if(this.totalTax > 0) {
                this.total += (this.total * (this.totalTax/100))
              }
              
            })
            
          }
  
        })
  
  
        
      }
    
  }


  deleteFun(id: number) {
    console.log('I ran from delete');
    // this.elem.splice(id, 1);
    this.last.child1.splice(id, 1)
    if(this.last.child1.length == 0){
      this.addChild1ExpenseItem(0)
    }
    this.lastDark.child1.splice(id, 1)
    this.subTotal = 0
      for(let i=0;i<this.lastDark.child1.length;i++){
      
        this.lastDark.child1[i].records.forEach((elem) => {
          if(elem && elem.label == "Amount") {
            this.subTotal += +elem.value
          }
        })
      }
    }
  deleteFun2(id: number) {
    console.log('I ran from delete');
    // this.elem.splice(id, 1);
    this.last.child2.splice(id, 1)
    // if(this.last.child2.length == 0){
    //   this.addChild1ExpenseItem(0)
    // }
    this.lastDark.child2.splice(id, 1)
    }
    // addChild1ExpenseItem(id:number) {
    //   this.childElem = {
    //     records: [],
    //     auditColumn: {
    //       approvalStatusId: 1100001,
    //       companyId: 10001,
    //       branchId: 201,
    //       financialYearId: 1,
    //       userId: 1,
    //       mACAddress: "unidentified",
    //       hostName: "unidentified",
    //       iPAddress: "unidentified",
    //       deviceType: "Win32"
    //     }
    //   }
    //   let myElem = {
    //     records: [],
    //     auditColumn: {
    //       approvalStatusId: 1100001,
    //       companyId: 10001,
    //       branchId: 201,
    //       financialYearId: 1,
    //       userId: 1,
    //       mACAddress: "unidentified",
    //       hostName: "unidentified",
    //       iPAddress: "unidentified",
    //       deviceType: "Win32"
    //     }
    //   }
    //   this.childElemDark2 = {
    //     records: [],
    //     auditColumn: {
    //       approvalStatusId: 1100001,
    //       companyId: 10001,
    //       branchId: 201,
    //       financialYearId: 1,
    //       userId: 1,
    //       mACAddress: "unidentified",
    //       hostName: "unidentified",
    //       iPAddress: "unidentified",
    //       deviceType: "Win32"
    //     }
    //   }
    //   this.model2 = {
    //     tableId: 20,
    //     recordId: id,
    //     userId: 26,
    //     roleId: 2,
    //     languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    //   };
    //   this.dapiService.expenseItemControllers(this.model2).subscribe((res) => {
    //     this.childElemInit = res
        
  
    //     for(let i=0;i<this.childElemInit.length;i++){
    //       this.verCh2 = this.childElemInit[i]
    //       this.childElemDark2.records.push(this.verCh2);
  
    //       if (this.verCh2 && this.verCh2.inTransaction && this.verCh2.access != "NoAccess"){
    //         // if (this.verCh2.type === "dropdown") {
    //         //   this.dropList.push(this.verCh2);
    //         //   console.log("droplist: ",this.dropList)
  
  
    //           // this.tableId = this.ver2.refId;
    //           // this.tableName = this.ver2.refTable;
    //           // this.displayColumn = this.ver2.refColumn;
    //           // this.condition = this.ver2.refCondition;
    //         // }
    //         // if((this.verCh2.tableColumnId == 60) && this.verCh2.entryMode == 'A') {
    //         //   this.verCh2.value = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
    //         // }
    //         this.childElem.records.push(this.verCh2);
    //         myElem.records.push(this.verCh2)
    //         // console.log("here is child1",this.childElem)
  
    //       }else{
            
    //           this.childElemDark.push(this.verCh2);
    //           // console.log(this.childElemDark)
            
  
  
    //       }
    //     }
    //     // this.childElem = res
    //     // console.log(JSON.stringify(this.child1Data))
    //     this.childElem2 = null
    //     this.childElem2 = this.childElem
  
    //     //this.last.child1.push(this.childElem2);
    //     this.last.child1.push(myElem)
    //     this.lastDark.child1.push(this.childElemDark2);
        
    //   })
    //   console.log("child1 final", this.last)
  
      
    // }

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
           this.dapiService.expenseEntryA(this.lastDark).subscribe(nexto => {
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
           this.dapiService.expenseEntryE(this.lastDark).subscribe(nexto => {
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
