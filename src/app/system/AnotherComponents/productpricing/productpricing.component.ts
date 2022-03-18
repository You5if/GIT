import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { ProductPricingEntryComponent } from './productpricing-entry/productpricing-entry.component';
import { ProductPricingModel } from './productpricing.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { ProductPricingService } from './productpricing.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { SelectionModel } from '@angular/cdk/collections';
import { Prod2Component } from './productpricing-entry/prod2.component';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-productpricing',
    templateUrl: './productpricing.component.html',
    styleUrls: ['./productpricing.component.scss']
  })

export class ProductPricingComponent implements OnInit {

  idS : number;
  direction: string;
  customerCode: string;
  customerName: string;
  customerMobile: string;
  balance: string;
  model: Send;
  edit: string;
  header: string;
  submit: string;
  product:string;
  cancel: string;
  clickedRows = new Set<ProductPricingModel>();
  selection = new SelectionModel<ProductPricingModel>(true, []);;

    displayedColumns: string[] =
        ['select','product','PriceType', 'FromDate', 'ToDate', 'Price'];

    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;

    priceType:string;
    productUnit:string;
    fromDate:string;
    toDate:string;
    price:string;
    indexes: ProductPricingModel



    totalRecords: number;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    screenRights: RightModel = {
        amendFlag: true,
        createFlag: true,
        deleteFlag: true,
        editFlag: true,
        exportFlag: true,
        printFlag: true,
        reverseFlag: true,
        shortCloseFlag: true,
        viewFlag: true
      };

    constructor(
        public dialog: MatDialog,
        private _cf: CommonService,
        private _globals: AppGlobals,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _select: SelectService,
        private productpricingservice: ProductPricingService,
        private titleService: Title,
      ) {
        this.pTableName = 'ProductPricing';
        this.pScreenId = 37;
        this.pTableId = 37;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    this.titleService.setTitle("Service pricing - GIS");
      this.refreshMe();
  }

  refreshMe() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Service pricing"
      this.product = "Service"
      this.priceType = "Price type"
      this.productUnit = "Product unit"
      this.fromDate = "From date"
      this.toDate = "To date"
      this.price = "Price"

      
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "تسعيرة الخدمات"
      this.product = "الخدمة"
      this.priceType = "نوع السعر"
      this.productUnit = "وحدة المنتج"
      this.fromDate = "من تاريخ"
      this.toDate = "الى تاريخ"
      this.price = "السعر"
      
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
    }
    this._cf.getPageData('ProductPricing', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);
          this.indexes = result
        }
      );

    this._auth.getScreenRights(this.menuId).subscribe((rights: RightModel) => {
      this.screenRights = {
        amendFlag: true,
        createFlag: true,
        deleteFlag: true,
        editFlag: true,
        exportFlag: true,
        printFlag: true,
        reverseFlag: true,
        shortCloseFlag: true,
        viewFlag: true
      };
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  paginatoryOperation(event: PageEvent) {
    try {
      this._cf.getPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        this.pTableId, this.totalRecords).subscribe(
          (result: ProductPricingModel) => {
            this._ui.loadingStateChanged.next(false);
            this.totalRecords = result[0].totalRecords;
            this.recordsPerPage = event.pageSize;
            this.dataSource = result;
          }, error => {
            this._ui.loadingStateChanged.next(false);
            this._msg.showAPIError(error);
            return false;
          });
    } catch (error) {
      this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      return false;
    }
  }

  onSort = function () {
    this.dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
  };

  onAdd = function () {
    this.model = {
      tableId: 37,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add pricing");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة تسعيرة");
    }
    
    this.openEntry2(this.model);
  };
  onAdd2 = function () {
    this.model = {
      tableId: 69,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add adjust price");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة تسعيرة");
    }
    
    this.openEntry3(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.productpricingservice.getProductPricingEntry(id).subscribe((result: ProductPricingModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    this.model = {
      tableId: 37,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: +localStorage.getItem(this._globals.baseAppName + '_language')
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit pricing");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل تسعيرة");
    }
    
    this.openEntry2(this.model)
  }

  onDelete = function(id: number) {
      
  };
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        (this.selection.clear() ,this.clickedRows.clear()):
        (this.selection.clear(), this.dataSource.data.forEach(row => {this.selection.select(row); if (!this.clickedRows.has(row)) {

          this.clickedRows.add(row)
        }}))
  }

  onId(id: number, row:ProductPricingModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  openEntry = function (result: ProductPricingModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(ProductPricingEntryComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(ProductPricingEntryComponent, {
        disableClose: false,
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };
  openEntry2 = function (result: Send) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(ProductPricingEntryComponent, {
        disableClose: true,
      //   maxWidth: '100vw',
      // maxHeight: '100vh',
      // height: '100%',
      // width: '100%',
      // panelClass: 'custom-dialog',
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(ProductPricingEntryComponent, {
        disableClose: true,
        
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };
  openEntry3 = function (result: Send) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(Prod2Component, {
        disableClose: true,
      //   maxWidth: '100vw',
      // maxHeight: '100vh',
      // height: '100%',
      // width: '100%',
      // panelClass: 'custom-dialog',
        data: {}
      });
    } else {
      this.dialogRef = this.dialog.open(Prod2Component, {
        disableClose: true,
        
        data: result
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

}
