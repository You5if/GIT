import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { journalentrydetailModel, JournalEntryModel } from '../journalentry.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { JournalEntryService } from '../journalentry.service';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';

import { SelectService } from 'src/app/components/common/select.service';
import { element } from '@angular/core/src/render3';
import { AppGlobals } from 'src/app/app.global';

@Component({
  selector: 'app-journalentry-entry',
  templateUrl: './journalentry-entry.component.html',
  styleUrls: ['./journalentry-entry.component.scss']
})

export class JournalEntryEntryComponent implements OnInit {
  url: string;
  dialog_title: string = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');

  direction: string;
  reference: string;
  dated: string;
  currency: string;
  narration: string;
  submit: string;
  cancel: string;
  debit: string;
  credit: string;
  lock: string;

  num: number = 0
  selectedElement: number = 0
  referenceLock: boolean = false
  narrationLock: boolean = false

  currencyType: SelectModel[] = [];
  accountType: SelectModel[] = [];

  elem = [];

  preFinalArray: journalentrydetailModel

  narr: string = "";
  refr: string = "";
  inputShared: number;
  acc:string;

  myDate = '2021-01-01';

  fArray: journalentrydetailModel[] = [];
  lastArray: journalentrydetailModel[] = [];

  journalEntryDetailDisplayedColumns: string[] =
  [
    'journalEntryDetailSrNo',
    'account',
    'debit',
    'credit',
    'journalEntryDetailDelete',
  ];
journalEntryDetailData: journalentrydetailModel[] = [];
journalEntryDetailDataFinal: journalentrydetailModel[] = [];
journalEntryDetailDeletedElementsArray: journalentrydetailModel[] = [];
journalEntryDetailTableValueAfterDeleteArray: journalentrydetailModel[] = [];
journalEntryDetailDataSource = new MatTableDataSource(this.journalEntryDetailData);
elemSource = new MatTableDataSource(this.elem);


  constructor(
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private _myService: JournalEntryService,
      private dialogRef: MatDialogRef<JournalEntryEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: JournalEntryModel
  ) { }

  ngOnInit() {

    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      
      this.direction = "ltr"
      this.reference = "Reference"
      this.narration = "Narration"
      this.dated = "Date"
      this.acc = "Account"
      this.currency = "Currency"
      this.lock = "Lock"
      this.debit = "Debit"
      this.credit = "Credit"
      this.submit = "Submit"
      this.cancel = "Cancel"
      


    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
     
      this.direction = "rtl"
      this.reference = "المرجع"
      this.narration = "السرد"
      this.dated = "التاريخ"
      this.acc = "حساب"
      this.currency = "العملة"
      this.lock = "تثبيت"
      this.debit = "الخصم"
      this.credit = "الزيادة"
      this.submit = "ارسال"
      this.cancel = "الغاء"
      

    }

    this._select.getDropdown('miscdetailid','miscdetail','misctext','miscid=17',false).subscribe((res: SelectModel[]) => {
      this.currencyType = res;
  });

  this._select.getDropdown('accountid','account','accountname','active=1 and deleted=0 and accountid>1',false).subscribe((res: SelectModel[]) => {
    this.accountType = res;
});
    this._myService.getJournalEntryDetailbyJournalEntry(this.pModel.journalEntryId).subscribe(
        (result) => {
          console.log("Res:",result)
          if(result.length > 1) {
            this.pModel.journalEntryDetailEntry = result;
          this.journalEntryDetailData = [...this.pModel.journalEntryDetailEntry];
          this.journalEntryDetailDataSource.data = [...this.journalEntryDetailData];
          for(let s=0; s<this.pModel.journalEntryDetailEntry.length; s+=2) {
            const row = {
              value: ++this.num,
               collapse: true,
               numTitle: false,
              journalEntryDetailId1: this.pModel.journalEntryDetailEntry[s].journalEntryDetailId,
              journalEntryDetailId2: this.pModel.journalEntryDetailEntry[s+1].journalEntryDetailId,
              journalEntryId: this.pModel.journalEntryId,
              accountId1: this.pModel.journalEntryDetailEntry[s].accountId,
              accountId2: this.pModel.journalEntryDetailEntry[s+1].accountId,
              reference: this.pModel.journalEntryDetailEntry[s].reference,
              narration: this.pModel.journalEntryDetailEntry[s].narration,
              debit1: this.pModel.journalEntryDetailEntry[s].debit,
              debit2: 0,
              credit1: 0,
              credit2: this.pModel.journalEntryDetailEntry[s].debit,
              'active': true,
              readOnly: false,
              auditColumns: this._auth.getAuditColumns()
            }
            this.elem.push(row);
          }
          this.elem.forEach((one) => {
            if(one && one.value != this.num) {
              one.collapse = false
              one.numTitle = true
            }

          })
          }
        }
      );

      switch (this.pModel.entryMode) {

          case 'A': {
              this.url = 'JournalEntry/Create';
              
              this.addControl();

              break;
          }

          case 'E': {
              this.url = 'JournalEntry/Edit';
              
              break;
          }

          case 'D': {
              this.url = 'JournalEntry/Delete';
              
              break;
          }

          case 'V': {
              this.url = 'JournalEntry/View';
              
              break;
          }

          default: {
              this._msg.showError('Option not implemented..!');
              break;
          }
      }

      console.log("PModel:", this.pModel)
      this.elem.forEach((uni) => {
        if(uni && uni.collapse) {
          this.refr = uni.reference
          this.narr = uni.narration

        }
      })
  }

  onRefChange(searchValue: string): void {
    console.log('I ran from ref change');
    this.elem[this.selectedElement].reference = searchValue
  }

  onNarrChange(searchValue: string): void {
    console.log('I ran from narr change');
    this.elem[this.selectedElement].narration = searchValue
  }

  addJournalEntryDetailRecord() {
    const rowFB: journalentrydetailModel = {
      journalEntryDetailId: 0,
      journalEntryId: this.pModel.journalEntryId,
      accountId: 1,
      debit: 0,
      reference: this.refr,
      narration: this.narr,
      relatedJournalEntryDetailId: 1,
      credit: 0,
      'active': true,
      readOnly: false,
      entryMode: "A",
      auditColumns: null
    };

    this.journalEntryDetailData.push(rowFB);
    this.journalEntryDetailDataSource.data = [...this.journalEntryDetailData];
    console.log("Chi", this.journalEntryDetailDataSource.data)
  }

  openThis(id: number) {
    console.log('I ran from open this');
    this.elem.forEach((one3) => {
      if(one3 && one3.value == id) {
        one3.collapse= true
        this.refr = one3.reference
        this.narr = one3.narration
      }else {
        one3.collapse = false
      }
    })

  }

  showTitle(id: number) {
    console.log('I ran from show title');
    this.elem.forEach((one1) => {
      if(one1 && one1.value == id) {
        one1.numTitle = true
      }
    })
  }
  hideTitle(id: number) {
    console.log('I ran from hide title');
    this.selectedElement = id-1
    this.elem.forEach((one1) => {
      if(one1 && one1.value == id) {
        one1.numTitle = false
        this.refr = one1.reference
        this.narr = one1.narration
      }else {
        one1.collapse = false

      }
    })
  }



  addControl() {
    console.log('I ran from add control');
    // ++this.num
    const row = {
      value: ++this.num,
       collapse: true,
       numTitle: false,
      journalEntryDetailId1: 0,
      journalEntryDetailId2: 0,
      journalEntryId: this.pModel.journalEntryId,
      accountId1: 2,
      accountId2: 2,
      reference: '',
      narration: '',
      debit1: 1,
      debit2: 0,
      credit1: 0,
      credit2: 1,
      'active': true,
      readOnly: false,
      auditColumns: this._auth.getAuditColumns()
    }
    // this.narr = row.narration
    if(this.referenceLock){
      row.reference = this.refr
    }
    if(this.narrationLock){
      row.narration = this.narr
    }

    this.elem.push(row)
    this.elemSource.data = [...this.elem]
    this.selectedElement = this.elem.length - 1;
    this.elem.forEach((one) => {
      if(one && one.value != this.num) {
        one.collapse = false
        one.numTitle = true
      }

    })
    // console.log(this.elem)
    // console.log(this.selectedElement)
  }

  deleteFun(id: number) {
    console.log('I ran from delete');
    this.elem.splice(id, 1);
    }

  checkCollapse() {

  }


  getChange(event){
    console.log('I ran from get change');
   this.refr = event
  }


  // Step.4 of 7 (next addDeletedElements)
  onDeleteJournalEntryDetail(index: number) {
    // Assinging the values in the table to a tempArray
    this.journalEntryDetailTableValueAfterDeleteArray = this.journalEntryDetailData;
    // Looping through addressData to find targeted element
    this.journalEntryDetailData = this.journalEntryDetailData.map((ele, _index) => {
      if (index === _index) {
        // if (ele.entryStatus !== 0) {
        //   ele.entryStatus = 2;
        //   ele.deleted = true;
        //   ele.active = false;
        //   // Saving the element to be pushed into the array prior to sending to the database
        //   this.journalEntryDetailDeletedElementsArray.push(ele);
        // }
        // Deleting the element from the array
        this.journalEntryDetailTableValueAfterDeleteArray.splice(index, 1);
      }
      return ele;
    });
    // Assinging the value of the new array to the table
    this.journalEntryDetailData = this.journalEntryDetailTableValueAfterDeleteArray;
    // Arranging the srNo
    this.journalEntryDetailData = this.journalEntryDetailData.map((ele, _index) => {
      // ele.srNo = _index + 1;
      return ele;
    });
    this.journalEntryDetailDataSource.data = [...this.journalEntryDetailData];
    // Preventing the table becoming empty
    if (this.journalEntryDetailData.length < 1) {
      this.addJournalEntryDetailRecord();
    }
  }


  // Step.5 of 7 (next: onSubmit / onDone)
  addDeletedElements() {
    this.journalEntryDetailDeletedElementsArray.map((ele, _index) => {
      // ele.srNo = _index + 1;
      this.journalEntryDetailData.push(ele);
    });
  }

  handleKeyUp(e){
    if(e.keyCode === 13){
       this.onSubmit();
    }
  }

  onSubmit () {
    console.log('I ran from submit');
    for(let s=0; s<this.elem.length; s++) {
      const rowFB: journalentrydetailModel = {
        journalEntryDetailId: this.elem[s].journalEntryDetailId1,
        journalEntryId: this.pModel.journalEntryId,
        accountId: this.elem[s].accountId1,
        debit: this.elem[s].debit1,
        reference: this.elem[s].reference,
        narration: this.elem[s].narration,
        relatedJournalEntryDetailId: 1,
        credit: 0,
        'active': true,
        entryMode: "A",
        readOnly: false,
        auditColumns: this.elem[s].auditColumns
      };
      const rowFB2: journalentrydetailModel = {
        journalEntryDetailId: this.elem[s].journalEntryDetailId2,
        journalEntryId: this.pModel.journalEntryId,
        accountId: this.elem[s].accountId2,
        debit: 0,
        reference: this.elem[s].reference,
        narration: this.elem[s].narration,
        relatedJournalEntryDetailId: 1,
        credit: this.elem[s].debit1,
        'active': true,
        entryMode: "A",
        readOnly: false,
        auditColumns: this.elem[s].auditColumns
      };
      this.pModel.journalEntryDetailEntry.push(rowFB);
      this.pModel.journalEntryDetailEntry.push(rowFB2);
    }

      // form.journalEntryId = this.pModel.journalEntryId;
      // form = this.pModel;
      this._ui.loadingStateChanged.next(true);

      // if (this.validateForm(form) !== true) {
      //     this._ui.loadingStateChanged.next(false);
      //     return false;
      // }

      // form.auditColumns = this._auth.getAuditColumns();
      // form.entryMode = this.pModel.entryMode;

      try {
          // Calling the service(api) to submit the data
          this._myService.getJournalEntrySubmit(this.pModel).subscribe((result: APIResultModel) => {
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

  validateForm(form: JournalEntryModel) {
      if (this.pModel.entryMode === 'E') {



      }



      return true;
  }
}
