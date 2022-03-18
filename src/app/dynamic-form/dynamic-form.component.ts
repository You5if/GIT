import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { DApiSerivce } from '../api.service';
import { AppGlobals } from '../app.global';
import { SelectService } from '../components/common/select.service';
import { MessageBoxService } from '../components/messagebox/message-box.service';
import { SelectModel } from '../components/misc/SelectModel';
import { Send } from '../send.model';
import { AccountService } from '../system/account/system-account/account.service';


import { Sources } from './source.model';



@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  model: Send = {
    tableId: 10,
    recordId: 0,
    userId: 26,
    roleId: 1,
    languageId: 16001
  };
  last: any = {
    records: [],
    child1Records: [],
    child2Records: [],
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
  data: any;
  child1Data: any;
  child2Data: any;
  ver: Sources;
  maxSize: number;
  selectedE: number;
  childCont: Sources[];
  testArrary: any = {
    parent: [
      {
        "tableColumnId": 24,
        "tableId": 12,
        "entryMode": "A",
        "recordId": 0,
        "language": "English",
        "direction": "LTR",
        "access": "Editable",
        "accessId": 14001,
        "label": "AccountId",
        "value": "0",
        "inTransaction": true,
        "applicationOrder": 1,
        "designOrder": 1,
        "groupName": "",
        "min": "",
        "max": "",
        "type": "Number",
        "refTable": "",
        "refId": "",
        "refColumn": "",
        "refCondition": "",
        "cssClass": "",
        "instruction": "",
        "maxRowSize": 2
    },
    {
        "tableColumnId": 26,
        "tableId": 12,
        "entryMode": "A",
        "recordId": 0,
        "language": "English",
        "direction": "LTR",
        "access": "Editable",
        "accessId": 14003,
        "label": "AccountCode",
        "value": "",
        "inTransaction": true,
        "applicationOrder": 3,
        "designOrder": 3,
        "groupName": "",
        "min": "",
        "max": "",
        "type": "Text",
        "refTable": "",
        "refId": "",
        "refColumn": "",
        "refCondition": "",
        "cssClass": "",
        "instruction": "",
        "maxRowSize": 2
    },
    {
        "tableColumnId": 27,
        "tableId": 12,
        "entryMode": "A",
        "recordId": 0,
        "language": "English",
        "direction": "LTR",
        "access": "Editable",
        "accessId": 14003,
        "label": "AccountType",
        "value": "19001",
        "inTransaction": true,
        "applicationOrder": 4,
        "designOrder": 4,
        "groupName": "",
        "min": "",
        "max": "",
        "type": "dropdown",
        "refTable": "MiscDetail",
        "refId": "MiscDetailId",
        "refColumn": "MiscText",
        "refCondition": "miscid=19",
        "cssClass": "",
        "instruction": "",
        "maxRowSize": 2
    },
    {
        "access": "Editable",
        "accessId": 14003,
        "applicationOrder": 4,
        "cssClass": "",
        "designOrder": 4,
        "direction": "LTR",
        "entryMode": "A",
        "groupName": "",
        "inTransaction": true,
        "instruction": "",
        "label": "ToDate",
        "language": "English",
        "max": "",
        "maxRowSize": 2,
        "min": "",
        "recordId": 0,
        "refColumn": "",
        "refCondition": "",
        "refId": "",
        "refTable": "",
        "tableColumnId": 44,
        "tableId": 17,
        "type": "Date",
        "value": "1900-01-01"
    }
    ],
    child1: [
      [
        {
          "newId": 0,
          "tableColumnId": 24,
          "tableId": 12,
          "entryMode": "A",
          "recordId": 0,
          "language": "English",
          "direction": "LTR",
          "access": "Editable",
          "accessId": 14001,
          "label": "AccountId",
          "value": "0",
          "inTransaction": true,
          "applicationOrder": 1,
          "designOrder": 1,
          "groupName": "",
          "min": "",
          "max": "",
          "type": "Number",
          "refTable": "",
          "refId": "",
          "refColumn": "",
          "refCondition": "",
          "cssClass": "",
          "instruction": "",
          "maxRowSize": 2
      },
      {
        "newId": 1,
          "tableColumnId": 26,
          "tableId": 12,
          "entryMode": "A",
          "recordId": 0,
          "language": "English",
          "direction": "LTR",
          "access": "Editable",
          "accessId": 14003,
          "label": "AccountCode",
          "value": "",
          "inTransaction": true,
          "applicationOrder": 3,
          "designOrder": 3,
          "groupName": "",
          "min": "",
          "max": "",
          "type": "Text",
          "refTable": "",
          "refId": "",
          "refColumn": "",
          "refCondition": "",
          "cssClass": "",
          "instruction": "",
          "maxRowSize": 2
      },
      {
        "newId": 2,
          "tableColumnId": 27,
          "tableId": 12,
          "entryMode": "A",
          "recordId": 0,
          "language": "English",
          "direction": "LTR",
          "access": "Editable",
          "accessId": 14003,
          "label": "AccountType",
          "value": "19001",
          "inTransaction": true,
          "applicationOrder": 4,
          "designOrder": 4,
          "groupName": "",
          "min": "",
          "max": "",
          "type": "dropdown",
          "refTable": "MiscDetail",
          "refId": "MiscDetailId",
          "refColumn": "MiscText",
          "refCondition": "miscid=19",
          "cssClass": "",
          "instruction": "",
          "maxRowSize": 2,
          "myarray": [
            {
                "id": 19001,
                "name": "Asset"
            },
            {
                "id": 19005,
                "name": "Equity"
            },
            {
                "id": 19003,
                "name": "Expense"
            },
            {
                "id": 19002,
                "name": "Liability"
            },
            {
                "id": 19006,
                "name": "Other"
            },
            {
                "id": 19004,
                "name": "Revenue"
            }
        ]
      },
      {
        "newId": 3,
          "access": "Editable",
          "accessId": 14003,
          "applicationOrder": 4,
          "cssClass": "",
          "designOrder": 4,
          "direction": "LTR",
          "entryMode": "A",
          "groupName": "",
          "inTransaction": true,
          "instruction": "",
          "label": "ToDate",
          "language": "English",
          "max": "",
          "maxRowSize": 2,
          "min": "",
          "recordId": 0,
          "refColumn": "",
          "refCondition": "",
          "refId": "",
          "refTable": "",
          "tableColumnId": 44,
          "tableId": 17,
          "type": "Date",
          "value": "1900-01-01"
      }
      ], 
      [
        {
          "newId": 4,
          "tableColumnId": 24,
          "tableId": 12,
          "entryMode": "A",
          "recordId": 0,
          "language": "English",
          "direction": "LTR",
          "access": "Editable",
          "accessId": 14001,
          "label": "AccountId",
          "value": "0",
          "inTransaction": true,
          "applicationOrder": 1,
          "designOrder": 1,
          "groupName": "",
          "min": "",
          "max": "",
          "type": "Number",
          "refTable": "",
          "refId": "",
          "refColumn": "",
          "refCondition": "",
          "cssClass": "",
          "instruction": "",
          "maxRowSize": 2
      },
      {
        "newId": 5,
          "tableColumnId": 26,
          "tableId": 12,
          "entryMode": "A",
          "recordId": 0,
          "language": "English",
          "direction": "LTR",
          "access": "Editable",
          "accessId": 14003,
          "label": "AccountCode",
          "value": "",
          "inTransaction": true,
          "applicationOrder": 3,
          "designOrder": 3,
          "groupName": "",
          "min": "",
          "max": "",
          "type": "Text",
          "refTable": "",
          "refId": "",
          "refColumn": "",
          "refCondition": "",
          "cssClass": "",
          "instruction": "",
          "maxRowSize": 2
      },
      {
        "newId": 6,
          "tableColumnId": 27,
          "tableId": 12,
          "entryMode": "A",
          "recordId": 0,
          "language": "English",
          "direction": "LTR",
          "access": "Editable",
          "accessId": 14003,
          "label": "AccountType",
          "value": "19001",
          "inTransaction": true,
          "applicationOrder": 4,
          "designOrder": 4,
          "groupName": "",
          "min": "",
          "max": "",
          "type": "dropdown",
          "refTable": "MiscDetail",
          "refId": "MiscDetailId",
          "refColumn": "MiscText",
          "refCondition": "miscid=19",
          "cssClass": "",
          "instruction": "",
          "maxRowSize": 2,
          "myarray": [
            {
                "id": 19001,
                "name": "Asset"
            },
            {
                "id": 19005,
                "name": "Equity"
            },
            {
                "id": 19003,
                "name": "Expense"
            },
            {
                "id": 19002,
                "name": "Liability"
            },
            {
                "id": 19006,
                "name": "Other"
            },
            {
                "id": 19004,
                "name": "Revenue"
            }
        ]
      },
      {
        "newId": 7,
          "access": "Editable",
          "accessId": 14003,
          "applicationOrder": 4,
          "cssClass": "",
          "designOrder": 4,
          "direction": "LTR",
          "entryMode": "A",
          "groupName": "",
          "inTransaction": true,
          "instruction": "",
          "label": "ToDate",
          "language": "English",
          "max": "",
          "maxRowSize": 2,
          "min": "",
          "recordId": 0,
          "refColumn": "",
          "refCondition": "",
          "refId": "",
          "refTable": "",
          "tableColumnId": 44,
          "tableId": 17,
          "type": "Date",
          "value": "1900-01-01"
      }
      ],
    ],
    child2: [
      [
        {
          "newId": 0,
          "tableColumnId": 24,
          "tableId": 12,
          "entryMode": "A",
          "recordId": 0,
          "language": "English",
          "direction": "LTR",
          "access": "Editable",
          "accessId": 14001,
          "label": "AccountId",
          "value": "0",
          "inTransaction": true,
          "applicationOrder": 1,
          "designOrder": 1,
          "groupName": "",
          "min": "",
          "max": "",
          "type": "Number",
          "refTable": "",
          "refId": "",
          "refColumn": "",
          "refCondition": "",
          "cssClass": "",
          "instruction": "",
          "maxRowSize": 2
      },
      {
        "newId": 1,
          "tableColumnId": 26,
          "tableId": 12,
          "entryMode": "A",
          "recordId": 0,
          "language": "English",
          "direction": "LTR",
          "access": "Editable",
          "accessId": 14003,
          "label": "AccountCode",
          "value": "",
          "inTransaction": true,
          "applicationOrder": 3,
          "designOrder": 3,
          "groupName": "",
          "min": "",
          "max": "",
          "type": "Text",
          "refTable": "",
          "refId": "",
          "refColumn": "",
          "refCondition": "",
          "cssClass": "",
          "instruction": "",
          "maxRowSize": 2
      },
      {
        "newId": 2,
          "tableColumnId": 27,
          "tableId": 12,
          "entryMode": "A",
          "recordId": 0,
          "language": "English",
          "direction": "LTR",
          "access": "Editable",
          "accessId": 14003,
          "label": "AccountType",
          "value": "19001",
          "inTransaction": true,
          "applicationOrder": 4,
          "designOrder": 4,
          "groupName": "",
          "min": "",
          "max": "",
          "type": "dropdown",
          "refTable": "MiscDetail",
          "refId": "MiscDetailId",
          "refColumn": "MiscText",
          "refCondition": "miscid=19",
          "cssClass": "",
          "instruction": "",
          "maxRowSize": 2,
          "myarray": [
            {
                "id": 19001,
                "name": "Asset"
            },
            {
                "id": 19005,
                "name": "Equity"
            },
            {
                "id": 19003,
                "name": "Expense"
            },
            {
                "id": 19002,
                "name": "Liability"
            },
            {
                "id": 19006,
                "name": "Other"
            },
            {
                "id": 19004,
                "name": "Revenue"
            }
        ]
      },
      {
        "newId": 3,
          "access": "Editable",
          "accessId": 14003,
          "applicationOrder": 4,
          "cssClass": "",
          "designOrder": 4,
          "direction": "LTR",
          "entryMode": "A",
          "groupName": "",
          "inTransaction": true,
          "instruction": "",
          "label": "ToDate",
          "language": "English",
          "max": "",
          "maxRowSize": 2,
          "min": "",
          "recordId": 0,
          "refColumn": "",
          "refCondition": "",
          "refId": "",
          "refTable": "",
          "tableColumnId": 44,
          "tableId": 17,
          "type": "Date",
          "value": "1900-01-01"
      }
      ], 
      [
        {
          "newId": 4,
          "tableColumnId": 24,
          "tableId": 12,
          "entryMode": "A",
          "recordId": 0,
          "language": "English",
          "direction": "LTR",
          "access": "Editable",
          "accessId": 14001,
          "label": "AccountId",
          "value": "0",
          "inTransaction": true,
          "applicationOrder": 1,
          "designOrder": 1,
          "groupName": "",
          "min": "",
          "max": "",
          "type": "Number",
          "refTable": "",
          "refId": "",
          "refColumn": "",
          "refCondition": "",
          "cssClass": "",
          "instruction": "",
          "maxRowSize": 2
      },
      {
        "newId": 5,
          "tableColumnId": 26,
          "tableId": 12,
          "entryMode": "A",
          "recordId": 0,
          "language": "English",
          "direction": "LTR",
          "access": "Editable",
          "accessId": 14003,
          "label": "AccountCode",
          "value": "",
          "inTransaction": true,
          "applicationOrder": 3,
          "designOrder": 3,
          "groupName": "",
          "min": "",
          "max": "",
          "type": "Text",
          "refTable": "",
          "refId": "",
          "refColumn": "",
          "refCondition": "",
          "cssClass": "",
          "instruction": "",
          "maxRowSize": 2
      },
      {
        "newId": 6,
          "tableColumnId": 27,
          "tableId": 12,
          "entryMode": "A",
          "recordId": 0,
          "language": "English",
          "direction": "LTR",
          "access": "Editable",
          "accessId": 14003,
          "label": "AccountType",
          "value": "19001",
          "inTransaction": true,
          "applicationOrder": 4,
          "designOrder": 4,
          "groupName": "",
          "min": "",
          "max": "",
          "type": "dropdown",
          "refTable": "MiscDetail",
          "refId": "MiscDetailId",
          "refColumn": "MiscText",
          "refCondition": "miscid=19",
          "cssClass": "",
          "instruction": "",
          "maxRowSize": 2,
          "myarray": [
            {
                "id": 19001,
                "name": "Asset"
            },
            {
                "id": 19005,
                "name": "Equity"
            },
            {
                "id": 19003,
                "name": "Expense"
            },
            {
                "id": 19002,
                "name": "Liability"
            },
            {
                "id": 19006,
                "name": "Other"
            },
            {
                "id": 19004,
                "name": "Revenue"
            }
        ]
      },
      {
        "newId": 7,
          "access": "Editable",
          "accessId": 14003,
          "applicationOrder": 4,
          "cssClass": "",
          "designOrder": 4,
          "direction": "LTR",
          "entryMode": "A",
          "groupName": "",
          "inTransaction": true,
          "instruction": "",
          "label": "ToDate",
          "language": "English",
          "max": "",
          "maxRowSize": 2,
          "min": "",
          "recordId": 0,
          "refColumn": "",
          "refCondition": "",
          "refId": "",
          "refTable": "",
          "tableColumnId": 44,
          "tableId": 17,
          "type": "Date",
          "value": "1900-01-01"
      }
      ],
    ]
  }

  ver2: Sources;
  light: Sources[] = [];
  dark: Sources[] = [];
  dropList: Sources[] = [];
  dropItem: Sources;
  container: any[][] =[];
  obj1: Sources;
  objC: Sources;
  childElem: any;
  childElem2: any;
  num: number = 8;
  num2: number = 8;

  constructor( private dapiService: AccountService,
    private _globals: AppGlobals,
      private _select: SelectService,
      
      ) {}

  ngOnInit(): void {
    
    
    
    
      this.data = this.testArrary.parent;
      this.child1Data = this.testArrary.child1;
      this.child2Data = this.testArrary.child2;
      this.sources = this.data;
      
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
  }

  addChild1() {

    this.childElem = [
      {
        "newId": this.num++,
        "tableColumnId": 24,
        "tableId": 12,
        "entryMode": "A",
        "recordId": 0,
        "language": "English",
        "direction": "LTR",
        "access": "Editable",
        "accessId": 14001,
        "label": "AccountId",
        "value": "0",
        "inTransaction": true,
        "applicationOrder": 1,
        "designOrder": 1,
        "groupName": "",
        "min": "",
        "max": "",
        "type": "Number",
        "refTable": "",
        "refId": "",
        "refColumn": "",
        "refCondition": "",
        "cssClass": "",
        "instruction": "",
        "maxRowSize": 2
    },
    {
      "newId": this.num++,
        "tableColumnId": 26,
        "tableId": 12,
        "entryMode": "A",
        "recordId": 0,
        "language": "English",
        "direction": "LTR",
        "access": "Editable",
        "accessId": 14003,
        "label": "AccountCode",
        "value": "",
        "inTransaction": true,
        "applicationOrder": 3,
        "designOrder": 3,
        "groupName": "",
        "min": "",
        "max": "",
        "type": "Text",
        "refTable": "",
        "refId": "",
        "refColumn": "",
        "refCondition": "",
        "cssClass": "",
        "instruction": "",
        "maxRowSize": 2
    },
    {
      "newId": this.num++,
        "tableColumnId": 27,
        "tableId": 12,
        "entryMode": "A",
        "recordId": 0,
        "language": "English",
        "direction": "LTR",
        "access": "Editable",
        "accessId": 14003,
        "label": "AccountType",
        "value": "19001",
        "inTransaction": true,
        "applicationOrder": 4,
        "designOrder": 4,
        "groupName": "",
        "min": "",
        "max": "",
        "type": "dropdown",
        "refTable": "MiscDetail",
        "refId": "MiscDetailId",
        "refColumn": "MiscText",
        "refCondition": "miscid=19",
        "cssClass": "",
        "instruction": "",
        "maxRowSize": 2,
        "myarray": [
          {
              "id": 19001,
              "name": "Asset"
          },
          {
              "id": 19005,
              "name": "Equity"
          },
          {
              "id": 19003,
              "name": "Expense"
          },
          {
              "id": 19002,
              "name": "Liability"
          },
          {
              "id": 19006,
              "name": "Other"
          },
          {
              "id": 19004,
              "name": "Revenue"
          }
      ]
    },
    {
      "newId": this.num++,
        "access": "Editable",
        "accessId": 14003,
        "applicationOrder": 4,
        "cssClass": "",
        "designOrder": 4,
        "direction": "LTR",
        "entryMode": "A",
        "groupName": "",
        "inTransaction": true,
        "instruction": "",
        "label": "ToDate",
        "language": "English",
        "max": "",
        "maxRowSize": 2,
        "min": "",
        "recordId": 0,
        "refColumn": "",
        "refCondition": "",
        "refId": "",
        "refTable": "",
        "tableColumnId": 44,
        "tableId": 17,
        "type": "Date",
        "value": "1900-01-01"
    }
    ];

    this.testArrary.child1.push(this.childElem);
    
  }
  addChild2() {

    this.childElem2 = [
      {
        "newId": this.num2++,
        "tableColumnId": 24,
        "tableId": 12,
        "entryMode": "A",
        "recordId": 0,
        "language": "English",
        "direction": "LTR",
        "access": "Editable",
        "accessId": 14001,
        "label": "AccountId",
        "value": "0",
        "inTransaction": true,
        "applicationOrder": 1,
        "designOrder": 1,
        "groupName": "",
        "min": "",
        "max": "",
        "type": "Number",
        "refTable": "",
        "refId": "",
        "refColumn": "",
        "refCondition": "",
        "cssClass": "",
        "instruction": "",
        "maxRowSize": 2
    },
    {
      "newId": this.num2++,
        "tableColumnId": 26,
        "tableId": 12,
        "entryMode": "A",
        "recordId": 0,
        "language": "English",
        "direction": "LTR",
        "access": "Editable",
        "accessId": 14003,
        "label": "AccountCode",
        "value": "",
        "inTransaction": true,
        "applicationOrder": 3,
        "designOrder": 3,
        "groupName": "",
        "min": "",
        "max": "",
        "type": "Text",
        "refTable": "",
        "refId": "",
        "refColumn": "",
        "refCondition": "",
        "cssClass": "",
        "instruction": "",
        "maxRowSize": 2
    },
    {
      "newId": this.num2++,
        "tableColumnId": 27,
        "tableId": 12,
        "entryMode": "A",
        "recordId": 0,
        "language": "English",
        "direction": "LTR",
        "access": "Editable",
        "accessId": 14003,
        "label": "AccountType",
        "value": "19001",
        "inTransaction": true,
        "applicationOrder": 4,
        "designOrder": 4,
        "groupName": "",
        "min": "",
        "max": "",
        "type": "dropdown",
        "refTable": "MiscDetail",
        "refId": "MiscDetailId",
        "refColumn": "MiscText",
        "refCondition": "miscid=19",
        "cssClass": "",
        "instruction": "",
        "maxRowSize": 2,
        "myarray": [
          {
              "id": 19001,
              "name": "Asset"
          },
          {
              "id": 19005,
              "name": "Equity"
          },
          {
              "id": 19003,
              "name": "Expense"
          },
          {
              "id": 19002,
              "name": "Liability"
          },
          {
              "id": 19006,
              "name": "Other"
          },
          {
              "id": 19004,
              "name": "Revenue"
          }
      ]
    },
    {
      "newId": this.num2++,
        "access": "Editable",
        "accessId": 14003,
        "applicationOrder": 4,
        "cssClass": "",
        "designOrder": 4,
        "direction": "LTR",
        "entryMode": "A",
        "groupName": "",
        "inTransaction": true,
        "instruction": "",
        "label": "ToDate",
        "language": "English",
        "max": "",
        "maxRowSize": 2,
        "min": "",
        "recordId": 0,
        "refColumn": "",
        "refCondition": "",
        "refId": "",
        "refTable": "",
        "tableColumnId": 44,
        "tableId": 17,
        "type": "Date",
        "value": "1900-01-01"
    }
    ];

    this.testArrary.child2.push(this.childElem2);
    
  }

  onChange1(val: number, id:number) {
    console.log(this.child1Data[id])
    
    this.childCont = this.child1Data[id]
    console.log(this.childCont)
    this.childCont.forEach((alaa) => {
      if(alaa && alaa.type === "Text"){
        
        alaa.value = val.toString()
      }

    })
      
    
  }
  onChange2(val: number, id:number) {
    console.log(val)
  }
  

  deleteFun1(id: number) {
    console.log('I ran from delete');
    this.child1Data.splice(id, 1);
    }
  deleteFun2(id: number) {
    console.log('I ran from delete');
    this.child2Data.splice(id, 1);
    }
  
  onSubmit() {

    this.data.forEach((Object)=> this.light.forEach((obj)=>
    {
      if(Object.tableColumnId === obj.tableColumnId){
        Object.value = obj.value.toString()
      }


    }));
    this.child1Data.forEach((Object)=>
    {
      this.last.child1Records.push(Object)

    });
    this.child2Data.forEach((Object)=>
    {
      this.last.child2Records.push(Object)

    });

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
    if(this.last.records[0].entryMode == "A"){
      console.log(this.last)
      // this.dapiService.accountEntryA(this.last).subscribe(nexto => {
      //   this.res = nexto;
      //   if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      //     this._msg.showInfo("Message", "Account saved succesfully");
      //   this.dialogRef.close();
      //   }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      //     this._msg.showInfo("رسالة", "تم حفظ الحساب بنجاح");
      //   this.dialogRef.close();
      //   }
        

      // }
      // , error => {
      //   console.log(error);
      //   if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      //     this._msg.showInfo("Message", "Error!!");
      //   this.dialogRef.close();
      //   }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
          
      //     this._msg.showInfo("رسالة", "توجد مشكلة");
      //   this.dialogRef.close();
      //   }
        
      // });
    }else if(this.last.records[0].entryMode == "E"){
      console.log(this.last)
      // this.dapiService.accountEntryE(this.last).subscribe(nexto => {
      //   this.res = nexto;
      //   if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      //     this._msg.showInfo("Message", "Account saved succesfully");
      //   this.dialogRef.close();
      //   }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      //     this._msg.showInfo("رسالة", "تم حفظ الحساب بنجاح");
      //   this.dialogRef.close();
      //   }

      // }, error => {
      //   console.log(error);
      //   if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      //     this._msg.showInfo("Message", "Error!!");
      //   this.dialogRef.close();
      //   }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
          
      //     this._msg.showInfo("رسالة", "توجد مشكلة");
      //   this.dialogRef.close();
      //   }
      // });
    }

      }

  onResize(event) {
    this.spacepoint =
      event.target.innerWidth <= 740
        ? (this.spacezone = false)
        : (this.spacezone = true);
    this.breakpoint =
      event.target.innerWidth <= 740
        ? 1
        : this.sources[0].maxRowSize;
  }
  
 
}
