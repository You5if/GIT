import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DApiSerivce } from 'src/app/api.service';
import { AppGlobals } from 'src/app/app.global';
import { SelectService } from 'src/app/components/common/select.service';
import { FileListModel } from 'src/app/components/common/upload/upload-file.model';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { Sources } from 'src/app/dynamic-form/source.model';
import { Send } from 'src/app/send.model';
import { SystemNavigationComponent } from '../system-navigation/system-navigation.component';
import { UploadService } from '../upload/upload.service';
import { BusinessService } from './business.service';

@Component({
  selector: 'app-system-business-profile',
  templateUrl: './system-business-profile.component.html',
  styleUrls: ['./system-business-profile.component.scss']
})
export class SystemBusinessProfileComponent implements OnInit {
  lFiles: FileListModel[] = [];

  model: Send = {
    tableId: 10,
    recordId: 2,
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

  visible: boolean = true;
  submit: string;
  
  breakpoint: number;
  checked= false;
  checkedR = false;
  disabled = false;
  sources: Sources[] = [];
  res: any;
  spacepoint: any;
  spacezone: boolean;
  phoneN: boolean = false;
  data: Sources[];
  ver: Sources;
  imgHttp:string = "http://h"
  maxSize: number

  light: Sources[] = [];
  dark: Sources[] = [];
  
  ver2: Sources;
  ver3: Sources;
  ver4: Sources;
  obj1: Sources;
  obj2: Sources;
  imagePathUrl: string;
  imagePathUrl2: string;
  addNumber: string;
  dot: Sources;

  direction: string;

  dropItem: Sources;
  container: any[][] =[];

  accountList: SelectModel[] = [];

  dropList: Sources[] = [];

  imgDataS: FileListModel;

  imgFullPath: string;
  showit: boolean;
 

  constructor( private dapiService: BusinessService,
   private upload: UploadService,
     private _ui: UIService,
     private _msg: MessageBoxService,
      private _globals: AppGlobals,
      public _nav: SystemNavigationComponent,
      private _select: SelectService,) {}

      
  ngOnInit(): void {
    this.showit = false
    this.refreshMe();    
  }

  public uploadFinished = (event) => { // this is event being called when file gets uploaded
    
    const file: FileListModel = {
        originalFileName: event.originalFileName,
        fileName: event.fileName,
        extention: event.extention,
        fullPath: event.fullPath,
        apiPath: event.apiPath,
        apiImagePath: event.apiPath
    };
    this.lFiles.push(file); 
    this.imagePathUrl2 = this.imgHttp.concat(file.fullPath.substring(file.fullPath.indexOf('h') + 1))
    console.log(this.imagePathUrl2);
    
    this.showit = true
    // and it pushes the files to this array also, then why doesnt it show?
    // this.data = this.lFiles;
    // this.validatedisabled = false
    // this.validatedisabledmethod();
    // bro problem is not this component, it somehow is not reflecting in other two... the files which i brought here..
    // yea i was just making sure they were leaving here correctly.. now i will go to step 2, sorry ok
}

handleKeyUp(e){
  if(e.keyCode === 13){
     this.onSubmit();
  }
}
  
  onSubmit() {
    console.log(this.upload.imgFullPath)
    
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

     
     this.last.records.forEach((Object2)=> {
      if(Object2 && Object2.tableColumnId === 11){
        if(this.upload.imgFullPath != null) {
          Object2.value = this.imgHttp.concat(this.upload.imgFullPath.substring(this.upload.imgFullPath.indexOf('h') + 1))
        }else {
          Object2.value = Object2.value
        }
        
      }else if(Object2 && Object2.tableColumnId === 12){
        if(this.upload.imgApiPath != null) {
          Object2.value = this.upload.imgApiPath
        }else {
          Object2.value = Object2.value
        }
        
      }else if(Object2 && Object2.tableColumnId === 13){
        if(this.upload.imgExtention != null) {
          Object2.value = this.upload.imgExtention
        }else {
          Object2.value = Object2.value
        }
        
      }else if(Object2 && Object2.tableColumnId === 14){
        if(this.upload.imgFileName != null) {
          Object2.value = this.upload.imgFileName
        }else {
          Object2.value = Object2.value
        }
        
      }
      // else if(Object2.tableColumnId === 15){
      //   Object2.value = this.dapiService.imgFullPath
      // }
      else if(Object2 && Object2.tableColumnId === 16){
        if(this.upload.imgOriginalFileName != null) {
          Object2.value = this.upload.imgOriginalFileName
        }else {
          Object2.value = Object2.value
        }
        
      }
    
    })
    this.last.records.sort(function(a, b) { 
      return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
    });
    console.log(JSON.stringify(this.last));

    //  for(let l=0;l<=this.last.length;l++) {
    //    this.dot = this.last[l];
    //    if(this.dot && this.dot.) {

    //    }

    //  }
    this._ui.loadingStateChanged.next(true);
      this.dapiService.businessEntryE(this.last).subscribe(nexto => {
        this._ui.loadingStateChanged.next(false);
        this.res = nexto;
        //  this.refreshMe();
        
        this.visible = false;
        if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
          this._msg.showInfo("Message", "Saved succesfully");
          this._nav.onBusiness('Home')
        this._nav.onClickListItem('H');
        }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
          this._msg.showInfo("رسالة", "تم الحفظ بنجاح");
          this._nav.onBusiness('Home')
        this._nav.onClickListItem('H');
        }
        
        
        
        
        
      }, error => {
        console.log(error);
        this._msg.showInfo("Message", "Error!!");
        
      });

      

      }


      refreshMe() {
        if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
          this.direction = "ltr"
          this.submit = "Submit"
          this.addNumber = "Add another phone number"
        }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
          this.direction = "rtl"
          this.submit = "ارسال"
          this.addNumber = "اضف رقم هاتف اخر"
          
        }
        this.light = [];
        this.dark = [];
        this.dropList= [];
        if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
          this.direction = "ltr"
        }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
          this.direction = "rtl"
        }
        
        
        this._ui.loadingStateChanged.next(true);
        this.dapiService.businessControllers(this.model).subscribe(res => {
          this._ui.loadingStateChanged.next(false);
          this.data = res;
          this.data.forEach((ala3) => {
            if(ala3.tableColumnId == 8) {
              if(ala3.value != "") {
                this.phoneN = true
              }else {
                this.phoneN = false
              }
            }
          })
          console.log("hello", this.data)
    
          for(let i=0;i<this.data.length;i++){
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
              
            }else if(this.ver2 && this.ver2.tableColumnId == 11) {
              this.imagePathUrl = this.ver2.value
              console.log("img :" , this.imagePathUrl);
            }
            else{
              if(this.ver2) {
                this.dark.push(this.ver2);
              }
              
              
            }
    
          }
    
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
          
          this.breakpoint =
          window.innerWidth <= 960
            ? 1
            : this.data[0].maxRowSize;
          
    
          
        })
      }

  
    
  
    onAddPhone() {
      this.phoneN = true
    }
  
      

    


  onResize(event) {
    this.spacepoint =
      event.target.innerWidth <= 740
        ? (this.spacezone = false)
        : (this.spacezone = true);
    this.breakpoint =
      event.target.innerWidth <= 740
        ? 1
        : this.data[0].maxRowSize;
  }
  
}





