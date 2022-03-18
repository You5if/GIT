import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BusinessService } from '../system-business-profile/business.service';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Send } from 'src/app/send.model';
import { Sources } from 'src/app/source.model';
import { AlertifyService } from 'src/app/alertify.service';

export class AppUserPasswordModel {
    constructor(
    
    
            public AppUserId: number,
            public Password: string,
    
    ) { }
    }

@Component({
  selector: 'app-changepassword-entry',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordNewComponent implements OnInit {
    url: string;
  
   
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

    obj: AppUserPasswordModel = {
        AppUserId: this._auth.getUserId(),
        Password: ""
    }
  
    direction: string;
    password:string
  
    dropItem: Sources;
    container: any[][] =[];
  
    accountList: SelectModel[] = [];
  
    dialog_title: string;
  
    dropList: Sources[] = [];


  constructor(
    private dapiService: BusinessService,
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private alertify: AlertifyService,
      private dialogRef: MatDialogRef<ChangePasswordNewComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: Send
  ) { }

  ngOnInit() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this.direction = "ltr"
        this.dialog_title = "Change password"
        this.password = "New password"
        this.submit = "Submit"
        this.cancel = "Cancel"
        
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        this.direction = "rtl"
        this.dialog_title = "تغيير كلمة السر"
        this.password = "كلمة السر الجديدة"
        this.submit = "ارسال"
        this.cancel = "الغاء"
       
  
      }
  
  }

  handleKeyUp(e){
    if(e.keyCode === 13){
       this.onSubmit();
    }
  }

  onSubmit() {

    // console.log(this.obj);
    if (this.obj.Password != "") {
      this.dapiService.ChangePassword(this.obj).subscribe(nexto => {
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
    } else {
      this.alertify.error("Field can't be empty")
    }

     
          

      }



  

  onCancel() {
    this.dialogRef.close();
  }
}
