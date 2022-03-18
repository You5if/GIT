import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { ExpenseFilingItemModel, ExpenseFilingModel, ExpenseFilingTaxModel } from '../expensefiling.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { ExpenseFilingService } from '../expensefiling.service';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';

@Component({
  selector: 'app-expensefiling-entry',
  templateUrl: './expensefiling-entry.component.html',
  styleUrls: ['./expensefiling-entry.component.scss']
})

export class ExpenseFilingEntryComponent implements OnInit {
  url: string;
  dialog_title: string = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');
  direction: string;
  entryDate: string;
  currency: string;
  fromAcc: string;
  toAcc: string;
  paymentType: string;
  itemE: string;
  amountE: string;
  deleteE: string;
  taxE: string;
  submit: string;
  cancel: string;
  total: number = 0;
  totalTax: number = 0;
  totalE: string;
  subTotalE: string;
  subTotal: number = 0;
  AE:boolean;
  expenseCode: string;


  accountType: SelectModel[] = [];
  currencyType: SelectModel[] = [];
  paymentTypeArray: SelectModel[] = [];
  taxType: SelectModel[] = [];

  expenseFilingItemDisplayedColumns: string[] =
  [
    'item',
    'amount',
    'itemDelete',
  ];
expenseFilingItemData: ExpenseFilingItemModel[] = [];
expenseFilingItemDeletedElementsArray: ExpenseFilingItemModel[] = [];
expenseFilingItemTableValueAfterDeleteArray: ExpenseFilingItemModel[] = [];
expenseFilingItemDataSource = new MatTableDataSource(this.expenseFilingItemData);

expenseFilingTaxDisplayedColumns: string[] =
  [
    'tax',
    'taxDelete',
  ];
expenseFilingTaxData: ExpenseFilingTaxModel[] = [];
expenseFilingTaxDeletedElementsArray: ExpenseFilingTaxModel[] = [];
expenseFilingTaxTableValueAfterDeleteArray: ExpenseFilingTaxModel[] = [];
expenseFilingTaxDataSource = new MatTableDataSource(this.expenseFilingTaxData);


  constructor(
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private _myService: ExpenseFilingService,
      private dialogRef: MatDialogRef<ExpenseFilingEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: ExpenseFilingModel
  ) { }

  ngOnInit() {
    event.preventDefault()

    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      
      this.direction = "ltr"
      this.entryDate = "Entry Date"
      this.currency = "Currency"
      this.fromAcc = "From Account"
      this.toAcc = "To Account"
      this.paymentType = "Payment Type"
      this.itemE = "Item"
      this.amountE = "Amount"
      this.deleteE = "Delete"
      this.taxE = "Tax"
      this.submit = "Submit"
      this.cancel = "Cancel"
      this.totalE = "Total"
      this.subTotalE = "Sub-total"


    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      
      this.direction = "rtl"
      this.entryDate = "التاريخ"
      this.currency = "العملة"
      this.fromAcc = "من حساب"
      this.toAcc = "الى حساب"
      this.paymentType = "طريقة الدفع"
      this.itemE = "مصروف"
      this.amountE = "المبلغ"
      this.deleteE = "مسح"
      this.taxE = "الضرائب"
      this.submit = "ارسال"
      this.cancel = "الغاء"
      this.totalE = "المجموع الكلي"
      this.subTotalE = "المجموع"

    }

    

    this._select.getDropdown('accountid','account','accountname','active=1 and deleted=0 and accountid>1',false).subscribe((res: SelectModel[]) => {
      this.accountType = res;
  });

  this._select.getDropdown('taxid','tax','taxname','active=1 and deleted=0 and taxid>1',false).subscribe((res: SelectModel[]) => {
    this.taxType = res;
});

  this._select.getDropdown('miscdetailid','miscdetail','misctext','miscid=17',false).subscribe((res: SelectModel[]) => {
    this.currencyType = res;
});

this._select.getDropdown('miscdetailid','miscdetail','misctext','miscid=18',false).subscribe((res: SelectModel[]) => {
  this.paymentTypeArray = res;
});

    this._myService.getExpenseItembyExpense(this.pModel.expenseFilingId).subscribe(
      (result) => {
        console.log(result)
        this.pModel.expenseFilingItem = result;
        this.expenseFilingItemData = [...this.pModel.expenseFilingItem];
        this.expenseFilingItemDataSource.data = [...this.expenseFilingItemData];
        this.total = 0
        this.subTotal = 0
    this.expenseFilingItemData.forEach((mer) => {
      this.subTotal += mer.amount
    })

    this.totalTax = 0
    this.expenseFilingTaxData.forEach((mer2) => {
      var i = 0
      this._select.getDropdown("taxId", "tax", "convert(nvarchar,taxAmount)", "active=1 and deleted=0 and taxId="+mer2.taxId, false).subscribe((result) => {
        // console.log(result)
        this.expenseFilingTaxData[i].taxAmount = +result[0].name;
        this.totalTax += this.expenseFilingTaxData[i].taxAmount;
        this.total = 0
        this.expenseFilingItemData.forEach((mer) => {
          this.total += mer.amount

        })
        if(this.totalTax > 0) {
          this.total += (this.total * (this.totalTax/100))
        }
        console.log(this.totalTax)
      })

    })



      }
    );
    this._myService.getExpenseTaxbyExpense(this.pModel.expenseFilingId).subscribe(
      (result) => {
        this.pModel.expenseFilingTax = result;
        this.expenseFilingTaxData = [...this.pModel.expenseFilingTax];
        this.expenseFilingTaxDataSource.data = [...this.expenseFilingTaxData];

      }
    );

    if (this.expenseFilingItemData.length < 1) {
      this.addExpenseFilingItemRecord();
  }

  if (this.expenseFilingTaxData.length < 1) {
    this.addExpenseFilingTaxRecord();
}
      switch (this.pModel.entryMode) {

          case 'A': {
            this._ui.loadingStateChanged.next(true);
            this._myService.getExpenseCode().subscribe((result) => {
              this._ui.loadingStateChanged.next(false);
              console.log("epCode",result)
              this.expenseCode = result[0].name
              this.pModel.expenseCode = result[0].name
              
            })
              this.url = 'ExpenseFiling/Create';
              this.AE = true

              break;
          }

          case 'E': {

              this.url = 'ExpenseFiling/Edit';
              this.AE = false
              break;
          }

          case 'D': {
              this.url = 'ExpenseFiling/Delete';

              break;
          }

          case 'V': {
              this.url = 'ExpenseFiling/View';

              break;
          }

          default: {
              this._msg.showError('Option not implemented..!');
              break;
          }
      }
      
  }

  onChangeDrop(id: number) {
    console.log(this.expenseFilingTaxData)
    this.totalTax = 0
    this.expenseFilingTaxData.forEach((mer2) => {
      var i = 0
      this._select.getDropdown("taxId", "tax", "convert(nvarchar,taxAmount)", "active=1 and deleted=0 and taxId="+mer2.taxId, false).subscribe((result) => {
        // console.log(result)
        this.expenseFilingTaxData[i].taxAmount = +result[0].name;
        this.totalTax += this.expenseFilingTaxData[i].taxAmount;
        this.total = 0
        this.expenseFilingItemData.forEach((mer) => {
          this.total += mer.amount
        })
        if(this.totalTax > 0) {
          this.total += (this.total * (this.totalTax/100))
        }
        console.log(this.totalTax)
      })

    })

    console.log(this.totalTax)

  }

  addExpenseFilingItemRecord() {
    const rowFB: ExpenseFilingItemModel = {
      expenseFilingItemId: 0,
      expenseFilingId: this.pModel.expenseFilingId,
      itemName: '',
      amount: 0,
      journalEntryId: 1,
      journalEntryDetailId: 1,
      'active': true,
      readOnly: false,
      auditColumns: null
    };
    this.expenseFilingItemData.push(rowFB);
    this.expenseFilingItemDataSource.data = [...this.expenseFilingItemData];
    // this.total = 0
    // this.expenseFilingItemData.forEach((mer) => {
    //   this.total += mer.amount
    // })
  }

  onAmountChange(searchValue: string): void {
    // this.elem[this.selectedElement].reference = searchValue
    console.log(searchValue)
    this.total = 0
    this.subTotal = 0
    this.expenseFilingItemData.forEach((mer) => {
      this.total += mer.amount
      this.subTotal += mer.amount
    })
    this.totalTax = 0
    this.expenseFilingTaxData.forEach((mer2) => {
      var i = 0
        // console.log(result)
        this.totalTax += this.expenseFilingTaxData[i].taxAmount;
        console.log(this.totalTax)
    })
    if(this.totalTax > 0) {

      this.total += (this.total * (this.totalTax/100))

    }
  }

  addExpenseFilingTaxRecord() {
    const rowFB: ExpenseFilingTaxModel = {
      expenseFilingTaxId: 0,
      expenseFilingId: this.pModel.expenseFilingId,
      taxId: 1,
      taxAmount: 0,
      journalEntryId: 1,
      journalEntryDetailId: 1,
      'active': true,
      readOnly: false,
      auditColumns: null
    };
    this.expenseFilingTaxData.push(rowFB);
    this.expenseFilingTaxDataSource.data = [...this.expenseFilingTaxData];
  }

  onDeleteExpenseFilingItem(index: number) {
    // Assinging the values in the table to a tempArray
    this.expenseFilingItemTableValueAfterDeleteArray = this.expenseFilingItemData;
    // Looping through addressData to find targeted element
    this.expenseFilingItemData = this.expenseFilingItemData.map((ele, _index) => {
      if (index === _index) {
        this.expenseFilingItemTableValueAfterDeleteArray.splice(index, 1);
      }
      return ele;
    });
    // Assinging the value of the new array to the table
    this.expenseFilingItemData = this.expenseFilingItemTableValueAfterDeleteArray;
    // Arranging the srNo
    this.expenseFilingItemData = this.expenseFilingItemData.map((ele, _index) => {
      // ele.srNo = _index + 1;
      return ele;
    });
    this.expenseFilingItemDataSource.data = [...this.expenseFilingItemData];
    // Preventing the table becoming empty
    if (this.expenseFilingItemData.length < 1) {
      this.addExpenseFilingItemRecord();
    }
    this.total = 0
    this.subTotal = 0
    this.expenseFilingItemData.forEach((mer) => {
      this.total += mer.amount
      this.subTotal += mer.amount
    })

    this.totalTax = 0
    this.expenseFilingTaxData.forEach((mer2) => {
      var i = 0
        // console.log(result)
        this.totalTax += this.expenseFilingTaxData[i].taxAmount;
        console.log(this.totalTax)
    })
    if(this.totalTax > 0) {
      this.total += (this.total * (this.totalTax/100))
    }
  }

  onDeleteExpenseFilingTax(index: number) {
    this.totalTax = 0
    this.total = 0
    this.expenseFilingItemData.forEach((mer) => {
      this.total += mer.amount
    })
    this.expenseFilingTaxData.forEach((mer2) => {
      var i = 0
        // console.log(result)
        this.totalTax += this.expenseFilingTaxData[i].taxAmount;
        ++i;
        console.log(this.totalTax)
    })
    this.totalTax -= this.expenseFilingTaxData[index].taxAmount;
    if(this.totalTax > 0) {
      this.total += (this.total * (this.totalTax/100))
    }
    // Assinging the values in the table to a tempArray
    this.expenseFilingTaxTableValueAfterDeleteArray = this.expenseFilingTaxData;
    // Looping through addressData to find targeted element
    this.expenseFilingTaxData = this.expenseFilingTaxData.map((ele, _index) => {
      if (index === _index) {
        this.expenseFilingTaxTableValueAfterDeleteArray.splice(index, 1);
      }
      return ele;
    });
    // Assinging the value of the new array to the table
    this.expenseFilingTaxData = this.expenseFilingTaxTableValueAfterDeleteArray;
    // Arranging the srNo
    this.expenseFilingTaxData = this.expenseFilingTaxData.map((ele, _index) => {
      // ele.srNo = _index + 1;
      return ele;
    });
    this.expenseFilingTaxDataSource.data = [...this.expenseFilingTaxData];
    // Preventing the table becoming empty
    if (this.expenseFilingTaxData.length < 1) {
      this.addExpenseFilingTaxRecord();
    }


  }


  // handleKeyUp(e){
  //   if(e.keyCode === 13){
  //      this.onSubmit();
  //   }
  // }
  onSubmit = function (form: ExpenseFilingModel) {
      form.expenseFilingId = this.pModel.expenseFilingId;
      this.pModel.expenseFilingItem = [...this.expenseFilingItemData];
      this.pModel.expenseFilingTax = [...this.expenseFilingTaxData];
      form = this.pModel;
      this._ui.loadingStateChanged.next(true);

      if (this.validateForm(form) !== true) {
          this._ui.loadingStateChanged.next(false);
          return false;
      }

      form.auditColumns = this._auth.getAuditColumns();
      form.entryMode = this.pModel.entryMode;
      for (var index in form.expenseFilingItem) {
        form.expenseFilingItem[index].auditColumns =  this._auth.getAuditColumns();// prints elements: 10, 20, 30, 40
      }
      for (var index in form.expenseFilingTax) {
        form.expenseFilingTax[index].auditColumns =  this._auth.getAuditColumns();// prints elements: 10, 20, 30, 40
      }
      console.log(JSON.stringify(form))

      try {
          // Calling the service(api) to submit the data
          this._myService.getExpenseFilingSubmit(form).subscribe((result: APIResultModel) => {
              if (result.errorNo === 0) {
                  this._ui.loadingStateChanged.next(false);
                  if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
                    this._msg.showInfo("Message", "Saved succesfully");
                  this.dialogRef.close();
                  }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
                    this._msg.showInfo("رسالة", "تم الحفظ بنجاح");
                  this.dialogRef.close();
                  }
              } else {
                  this._ui.loadingStateChanged.next(false);
                  if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
                    this._msg.showInfo("Message", "Error!!");
                  this.dialogRef.close();
                  }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {

                    this._msg.showInfo("رسالة", "توجد مشكلة");
                  this.dialogRef.close();
                  }
              }
          }, error => {
              this._ui.loadingStateChanged.next(false);
              if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
                this._msg.showInfo("Message", "Error!!");
              this.dialogRef.close();
              }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {

                this._msg.showInfo("رسالة", "توجد مشكلة");
              this.dialogRef.close();
              }
            });
      } catch (error) {
          this._ui.loadingStateChanged.next(false);
          if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
            this._msg.showInfo("Message", "Error!!");
          this.dialogRef.close();
          }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {

            this._msg.showInfo("رسالة", "توجد مشكلة");
          this.dialogRef.close();
          }
      }
  };

  onCancel() {
      this.dialogRef.close();
  }

  validateForm(form: ExpenseFilingModel) {
      if (this.pModel.entryMode === 'E') {



      }



      return true;
  }
}
