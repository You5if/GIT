import { Component, OnInit, ChangeDetectorRef, ViewChildren, ElementRef, QueryList } from "@angular/core";
import {
  MatDialog,
  PageEvent,
  MatTableDataSource,
  MatDialogRef,
} from "@angular/material";
import { CommonService } from "src/app/components/common/common.service";
import { UIService } from "src/app/components/shared/uiservices/UI.service";
import { MessageBoxService } from "src/app/components/messagebox/message-box.service";
import { AuthService } from "src/app/components/security/auth/auth.service";
import { SDVehicleDetailEntryComponent } from "./sdvehicledetail-entry/sdvehicledetail-entry.component";
import {
  SDVehicleDetailModel,
  SDVehicleDetailPic,
  PlanVehiclesBatch,
  SDDispatchPlanGroupVehicles,
} from "./sdvehicledetail.model";
import { RightModel } from "src/app/components/security/auth/rights.model";
import { RouterModule, Routes, Router } from "@angular/router";
import { PageSortComponent } from "src/app/components/common/pageevents/page-sort/page-sort.component";
import { SDVehicleDetailService } from "./sdvehicledetail.service";
import { SelectModel } from "src/app/components/misc/SelectModel";
import { SelectService } from "src/app/components/common/select.service";
import { FileListModel } from "../../common/upload/upload-file.model";
import { AttendanceuploadComponent } from "../../StatesDispatch/upload/upload.component";
import { APIResultModel } from "../../misc/APIResult.Model";
import { SDBatchVehicleEntryComponent } from "../sdbatchvehicleentry/sdbatchvehicleentry.component";
import { FilterService } from "../../filter/filter.service";
import { SDDispatchPlanExpenseModel } from "../sddispatchplanexpense/sddispatchplanexpense.model";
import { FilterComponent } from "../../filter/filter.component";
import { SDDispatchPlanExpenseEntryComponent } from "../sddispatchplanexpense/sddispatchplanexpense-entry/sddispatchplanexpense-entry.component";
import { BatchVehiclePlanEntryComponent } from "./batchvehicleplan-entry/batchvehicleplan-entry.component";
import { SDDispatchPlanService } from "../sddispatchplan/sddispatchplan.service";
import { SDDispatchPlanComponent } from "../sddispatchplan/sddispatchplan.component";
import { SDDispatchPlanModel } from "../sddispatchplan/sddispatchplan.model";
import { SDDispatchPlanEntryComponent } from "../sddispatchplan/sddispatchplan-entry/sddispatchplan-entry.component";
import { SDDispatchPlanExpenseService } from "../sddispatchplanexpense/sddispatchplanexpense.service";
import { SDDispatchPlanPaymentModel } from "../sddispatchplanpayment/sddispatchplanpayment.model";
import { SDDispatchPlanPaymentEntryComponent } from "../sddispatchplanpayment/sddispatchplanpayment-entry/sddispatchplanpayment-entry.component";
import { SDDispatchPlanPaymentService } from "../sddispatchplanpayment/sddispatchplanpayment.service";
import { ReportPageService } from "../../PR/report-page/report-page.service";
import { SDCarModelEntryComponent } from "../sdcarmodel/sdcarmodel-entry/sdcarmodel-entry.component";
import { SDCarModelModel } from "../sdcarmodel/sdcarmodel.model";
import { SDCarMakeEntryComponent } from "../sdcarmake/sdcarmake-entry/sdcarmake-entry.component";
import { SDCarMakeModel } from "../sdcarmake/sdcarmake.model";
import { AppGlobals } from "src/app/app.global";
import { ReportPageEmailService } from "../../PR/report-pageemail/report-pageemail.service";

@Component({
  selector: "app-sdvehicledetail",
  templateUrl: "./sdvehicledetail.component.html",
  styleUrls: ["./sdvehicledetail.component.scss"],
})
export class SDVehicleDetailComponent implements OnInit {
  @ViewChildren('formRow') rows: QueryList<ElementRef>;
  myFocus = false;
  role;
  cardCount: number;
  selectedCards = [];
  displayedColumns: string[] = [
    "SDCompanyId",
    "RunConditionId",
    "Vin",
    "Year",
    "Make",
    "Model",
    "options",
  ];
  dataList: any;
  breakpoint: number;

  lFilesRecovered: FileListModel[];
  childFiles: SDVehicleDetailPic[];
  dataSource: any;
  isLastPage = false;
  pTableName: string;
  pScreenId: number;
  pTableId: number;
  recordsPerPage: number;
  currentPageIndex: number;
  menuId: number;
  dialogRef2: MatDialogRef<SDBatchVehicleEntryComponent>;

  // Filters
  pYearFrom = "''";
  pYearTo = "''";
  pColor = "''";
  pVehicleType = "''";
  pLocation = "''";
  pCarMake = "''";
  pOrderBy = "''";

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
    viewFlag: true,
  };

  constructor(
    public dialog: MatDialog,
    private _cf: CommonService,
    private _ui: UIService,
    private _msg: MessageBoxService,
    private _auth: AuthService,
    private _select: SelectService,
    private sdvehicledetailservice: SDVehicleDetailService,
    private filter: FilterService,
    private sddispatchplanservice: SDDispatchPlanService,
    private sddispatchplanexpenseservice: SDDispatchPlanExpenseService,
    private sddispatchplanpaymentservice: SDDispatchPlanPaymentService,
    private router: Router,
    private _report: ReportPageService,
    private _reportEmail: ReportPageEmailService,
    private _globals: AppGlobals,
    private cd: ChangeDetectorRef,
  ) {
    this.pTableName = "SDVehicleDetail";
    this.pScreenId = 50075;
    this.pTableId = 50075;
    this.recordsPerPage = 10;
    this.currentPageIndex = 1;
    this.menuId = 1019000011;
  }

  ngOnInit() {
    this.role = localStorage.getItem("role");
    // this.role = this._auth.getRole();
    if (this.role === "5" || this.role === "-1") {
      this.router.navigate(["/notactivated"]);
    }
    this.filter.setVehicle(this);
    this.refreshMe();
    this.breakpoint = window.innerWidth <= 425 ? 1 : 5;
    if (window.innerWidth <= 600) {
      this.breakpoint = 1;
    } else if (window.innerWidth <= 895) {
      this.breakpoint = 2;
    } else if (window.innerWidth <= 1210) {
      this.breakpoint = 3;
    } else if (window.innerWidth <= 1440) {
      this.breakpoint = 4;
    } else if (window.innerWidth <= 2560) {
      this.breakpoint = 5;
    }
  }



  onResize(event) {
    if (window.innerWidth <= 600) {
      this.breakpoint = 1;
    } else if (window.innerWidth <= 895) {
      this.breakpoint = 2;
    } else if (window.innerWidth <= 1200) {
      this.breakpoint = 3;
    } else if (window.innerWidth <= 1440) {
      this.breakpoint = 4;
    } else if (window.innerWidth <= 2560) {
      this.breakpoint = 5;
    }
  }

  refreshMe() {
    this.cardCount = 0;
    this._ui.loadingStateChanged.next(true);
    this._cf
      .getPageData2(
        "SDVehicleDetail",
        this.pScreenId,
        this._auth.getUserId(),
        this.pTableId,
        this.recordsPerPage,
        this.currentPageIndex,
        false,
        this.pOrderBy
      )
      .subscribe((result) => {
        try {
          if (result[0]) {
            this._ui.loadingStateChanged.next(false);
            this.totalRecords = result[0].totalRecords
              ? result[0].totalRecords
              : 0;
            // this.recordsPerPage = this.recordsPerPage;
            this.dataSource = new MatTableDataSource(result);
            this.dataList = result;
            this.selectedCards = [];
          } else {
            this._ui.loadingStateChanged.next(false);
            this.dataList = [];
          }
        } catch (error) {
          this._ui.loadingStateChanged.next(false);
          // this.totalRecords = 0;
          // this.recordsPerPage = 0;
          // this.dataList = [];
        }
      });

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
        viewFlag: true,
      };
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  pleaseFocus() {
    this.filter.myFilter.planCode = 'PLNMar00080218205224';
    this.refreshMe();
    console.log(this.rows);
    this.filter.clearFilter2();
  }

  onAddPic = function (id: number) {
    this.sdvehicledetailservice
      .getSDVehicleDetailEntry(id)
      .subscribe((result: SDVehicleDetailModel) => {
        // this._ui.loadingStateChanged.next(false);
        result.entryMode = "E";
        result.readOnly = false;
        // this.openEntry(result);
        if (result === undefined) {
          this.dialogRef = this.dialog.open(AttendanceuploadComponent, {
            disableClose: true,
            data: {},
          });
        } else {
          this.lFilesRecovered = [];
          for (let i = 0; i < result.sdVehicleDetailPic.length; i++) {
            const rowFB: FileListModel = {
              apiPath: result.sdVehicleDetailPic[i].apiPath,
              apiImagePath: result.sdVehicleDetailPic[i].apiImagePath,
              extention: result.sdVehicleDetailPic[i].extension,
              fileName: result.sdVehicleDetailPic[i].fileName,
              fullPath: result.sdVehicleDetailPic[i].fullPath,
              originalFileName: result.sdVehicleDetailPic[i].originalFileName,
            };

            this.lFilesRecovered.push(rowFB);
          }
          this.dialogRef = this.dialog.open(AttendanceuploadComponent, {
            disableClose: true,
            data: this.lFilesRecovered, // result
          });
        }
        this.dialogRef.afterClosed().subscribe((res) => {
          this.lFilesRecovered = res.data;
          this.childFiles = [];
          for (let i = 0; i < this.lFilesRecovered.length; i++) {
            const rowFB: SDVehicleDetailPic = {
              sdVehicleDetailPicId: 0,
              srNo: i + 1,
              sdVehicleDetailId: result.sdVehicleDetailId,
              apiImagePath: this.lFilesRecovered[i].apiImagePath,
              apiPath: this.lFilesRecovered[i].apiPath,
              extension: this.lFilesRecovered[i].extention,
              fileName: this.lFilesRecovered[i].fileName,
              fullPath: this.lFilesRecovered[i].fullPath,
              originalFileName: this.lFilesRecovered[i].originalFileName,
              active: true,
              deleted: false,
              entryStatus: 0,
            };

            this.childFiles.push(rowFB);
          }
          result.sdVehicleDetailPic = this.childFiles;
          result.auditColumns = this._auth.getAuditColumns();
          try {
            // Calling the service(api) to submit the data
            this.sdvehicledetailservice
              .getSDVehicleDetailSubmit(result)
              .subscribe(
                (apiResult: APIResultModel) => {
                  if (apiResult.errorNo === 0) {
                    this._ui.loadingStateChanged.next(false);
                    this._msg.showInfo(apiResult.errorMessage);
                    this.dialogRef.close();
                  } else {
                    this._ui.loadingStateChanged.next(false);
                    this._msg.showError(apiResult.errorMessage);
                    return false;
                  }
                },
                (error) => {
                  this._ui.loadingStateChanged.next(false);
                  this._msg.showAPIError(error);
                  return false;
                }
              );
          } catch (error) {
            this._ui.loadingStateChanged.next(false);
            this._msg.showAPIError(error);
            return false;
          }
        });
      });
  };

  paginatoryOperation(event: PageEvent) {
    try {
      this._ui.loadingStateChanged.next(true);
      this._cf
        .getPageDataOnPaginatorOperation2(
          event,
          this.pTableName,
          this.pScreenId,
          this._auth.getUserId(),
          this.pTableId,
          this.totalRecords,
          this.pOrderBy
        )
        .subscribe(
          (result: SDVehicleDetailModel) => {
            this._ui.loadingStateChanged.next(false);
            this.totalRecords = result[0].totalRecords;
            this.recordsPerPage = event.pageSize;
            this.dataSource = result;
            this.dataList = result;
          },
          (error) => {
            this._ui.loadingStateChanged.next(false);
            this._msg.showAPIError(error);
            return false;
          }
        );
    } catch (error) {
      this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      return false;
    }
  }

  onSort = function () {
    this.dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId,
    });
  };

  onAdd = function () {
    const result: SDVehicleDetailModel = {
      sdVehicleDetailId: 0,
      srNo: 0,
      sdVehicleBatchId: 0,
      sdCompanyId: 0,
      vehicleName: "-",
      runConditionId: 0,
      vin: "",
      year: 0,
      sdCarMakeId: 0,
      sdCarModelId: 0,
      remarks: "",
      remarksDate: new Date(),
      sdUserId: 1,
      customerRemarks: "",
      customerUserId: 1,
      customerRemarksDate: new Date(),
      vehicleTypeId: 0,
      vehicleColor: "",
      lotNumber: "",
      licensePlate: "",
      sdCityId: 0,
      sdCityPostalCodeId: 0,
      wideLoad: false,
      additionalInformation: "",
      carLocation: "",
      carTagNumber: "",
      keysAvailable: false,
      titleAvailable: false,
      dispatchStatusId: 0,
      sdVehicleDetailPic: [],
      auditColumns: null,
      receivedOn: new Date(),
      receivedBy: 0,
      entryMode: "A",
      active: true,
      readOnly: false,
    };
    this.openEntry(result);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.sdvehicledetailservice
      .getSDVehicleDetailEntry(id)
      .subscribe((result: SDVehicleDetailModel) => {
        this._ui.loadingStateChanged.next(false);
        result.entryMode = "V";
        result.readOnly = true;
        this.openEntry(result);
      });
  };

  onEdit = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.sdvehicledetailservice
      .getSDVehicleDetailEntry(id)
      .subscribe((result: SDVehicleDetailModel) => {
        this._ui.loadingStateChanged.next(false);
        result.entryMode = "E";
        result.readOnly = false;
        this.openEntry(result);
      });
  };

  onEditPlan = (id: number) => {
    if (id > 1) {
      this._ui.loadingStateChanged.next(true);
      this.sddispatchplanservice
        .getSDDispatchPlanEntry(id)
        .subscribe((result: SDDispatchPlanModel) => {
          this._ui.loadingStateChanged.next(false);
          result.entryMode = "E";
          result.readOnly = false;
          this.openPlanEntry(result);
        });
    }
  };

  onDeletePlan = (id: number) => {
    if (id > 1) {
      this._ui.loadingStateChanged.next(true);
      this.sddispatchplanservice
        .getSDDispatchPlanEntry(id)
        .subscribe((result: SDDispatchPlanModel) => {
          this._ui.loadingStateChanged.next(false);
          result.entryMode = "D";
          result.readOnly = false;
          this.openPlanEntry(result);
        });
    }
  };

  openPlanEntry = function (result: SDDispatchPlanModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(SDDispatchPlanEntryComponent, {
        disableClose: true,
        data: {},
      });
    } else {
      this.dialogRef = this.dialog.open(SDDispatchPlanEntryComponent, {
        disableClose: true,
        data: result,
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

  onEditExpense = (id: number) => {
    if (id > 1) {
      this._ui.loadingStateChanged.next(true);
      this.sddispatchplanexpenseservice
        .getSDDispatchPlanExpenseEntry(id)
        .subscribe((result: SDDispatchPlanExpenseModel) => {
          this._ui.loadingStateChanged.next(false);
          result.entryMode = "E";
          result.readOnly = false;
          this.openExpenseEntry(result);
        });
    }
  };

  onDeleteExpense = (id: number) => {
    if (id > 1) {
      this._ui.loadingStateChanged.next(true);
      this.sddispatchplanexpenseservice
        .getSDDispatchPlanExpenseEntry(id)
        .subscribe((result: SDDispatchPlanExpenseModel) => {
          this._ui.loadingStateChanged.next(false);
          result.entryMode = "D";
          result.readOnly = false;
          this.openExpenseEntry(result);
        });
    }
  };

  openExpenseEntry = function (result: SDDispatchPlanExpenseModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(SDDispatchPlanExpenseEntryComponent, {
        disableClose: true,
        data: {},
      });
    } else {
      this.dialogRef = this.dialog.open(SDDispatchPlanExpenseEntryComponent, {
        disableClose: true,
        data: result,
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

  onAddExpense = function (id: number) {
    if (id > 0) {
      const result: SDDispatchPlanExpenseModel = {
        sdDispatchPlanExpenseId: 0,
        expenseTypeId: 60004800002,
        sdDispatchPlanId: 1,
        sdVehicleDetailId: id,
        amount: 0,
        costPrice: 0,
        billableItemId: 1,
        description: "",
        expenseDate: new Date(),
        paymentStatusId: 60004700002,
        paymentTypeId: 1,
        referenceNumber: "",
        auditColumns: null,
        entryMode: "A",
        active: true,
        readOnly: false,
      };
      this.openExpense(result);
    }
  };

  onAddPlanExpense = function (id: number) {
    if (id > 0) {
      const result: SDDispatchPlanExpenseModel = {
        sdDispatchPlanExpenseId: 0,
        expenseTypeId: 60004800001,
        sdDispatchPlanId: id,
        sdVehicleDetailId: 1,
        amount: 0,
        costPrice: 0,
        billableItemId: 1,
        description: "",
        expenseDate: new Date(),
        paymentStatusId: 60004700002,
        paymentTypeId: 1,
        referenceNumber: "",
        auditColumns: null,
        entryMode: "A",
        active: true,
        readOnly: false,
      };
      this.openExpense(result);
    }
  };

  onAddVehiclesToBatch() {
    if (this.selectedCards.length > 0) {
      let parentObject: PlanVehiclesBatch = {
        sdDispatchPlanId: 0,
        active: true,
        sdDispatchPlanVehicles: [],
        auditColumns: null,
      };
      let vehiclepicdata: SDDispatchPlanGroupVehicles[] = [];
      for (let i = 0; i < this.selectedCards.length; i++) {
        let rowFB: SDDispatchPlanGroupVehicles = {
          sdDispatchPlanVehicleId: 0,
          srNo: i + 1,
          sdDispatchPlanId: 0,
          sdVehicleDetailId: this.selectedCards[i],
          active: true,
          deleted: false,
          entryStatus: 0,
        };
        vehiclepicdata.push(rowFB);
      }
      parentObject.sdDispatchPlanVehicles = [...vehiclepicdata];
      this.openVehiclesBatchEntry(parentObject);
    }
  }

  onAddVehicleToCreate() {
    if (this.selectedCards.length > 0) {
      let parentObject: PlanVehiclesBatch = {
        sdDispatchPlanId: 0,
        active: true,
        sdDispatchPlanVehicles: [],
        auditColumns: null,
      };
      let vehiclepicdata: SDDispatchPlanGroupVehicles[] = [];
      for (let i = 0; i < this.selectedCards.length; i++) {
        let rowFB: SDDispatchPlanGroupVehicles = {
          sdDispatchPlanVehicleId: 0,
          srNo: i + 1,
          sdDispatchPlanId: 0,
          sdVehicleDetailId: this.selectedCards[i],
          active: true,
          deleted: false,
          entryStatus: 0,
        };
        vehiclepicdata.push(rowFB);
      }
      parentObject.sdDispatchPlanVehicles = [...vehiclepicdata];
      parentObject.auditColumns = this._auth.getAuditColumns();
      try {
        // Calling the service(api) to submit the data
        this.sdvehicledetailservice
          .getSDBatchVehiclesSubmit(parentObject)
          .subscribe(
            (result: APIResultModel) => {
              console.log(parentObject);
              if (result.errorNo === 0) {
                this._ui.loadingStateChanged.next(false);
                this._msg.showInfo("Info", result.errorMessage);
                this.refreshMe();
              } else {
                this._ui.loadingStateChanged.next(false);
                this._msg.showError(result.errorMessage);
                return false;
              }
            },
            (error) => {
              this._ui.loadingStateChanged.next(false);
              this._msg.showAPIError(error);
              return false;
            }
          );
      } catch (error) {
        this._ui.loadingStateChanged.next(false);
        this._msg.showAPIError(error);
        return false;
      }
    }
  }

  onDeleteVehicle(id) {
    this._ui.loadingStateChanged.next(true);
    this.sdvehicledetailservice
      .getSDVehicleDetailEntry(id)
      .subscribe((result) => {
        this._ui.loadingStateChanged.next(false);
        result.entryMode = "D";
        result.readOnly = false;
        this.openEntry(result);
      });
  }

  onAddPayment(id: number) {
    if (id > 0) {
      const result: SDDispatchPlanPaymentModel = {
        sdDispatchPlanPaymentId: 0,
        sdDispatchPlanInvoiceId: id,
        paymentDate: new Date(),
        paymentTypeId: 0,
        paymentAmount: 0,
        reference: "",
        memo: "",
        sdUserId: +this._auth.getUserId(),
        entryMode: "A",
        active: true,
        readOnly: false,
        auditColumns: null,
      };
      this.openPaymentEntry(result);
    }
  }

  openPaymentEntry = function (result: SDDispatchPlanPaymentModel) {
    if (result === undefined) {
      this.dialogRef2 = this.dialog.open(SDDispatchPlanPaymentEntryComponent, {
        disableClose: true,
        data: {},
      });
    } else {
      this.dialogRef2 = this.dialog.open(SDDispatchPlanPaymentEntryComponent, {
        disableClose: true,
        data: result,
      });
    }
    this.dialogRef2.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

  onEditPayment(id: number) {
    if (id > 0) {
      this._ui.loadingStateChanged.next(true);
      this.sddispatchplanpaymentservice
        .getSDDispatchPlanPaymentEntry(id)
        .subscribe((result: SDDispatchPlanPaymentModel) => {
          this._ui.loadingStateChanged.next(false);
          result.entryMode = "E";
          result.readOnly = false;
          this.openPaymentEntry(result);
        });
    }
  }

  onDeletePayment(id: number) {
    if (id > 0) {
      this._ui.loadingStateChanged.next(true);
      this.sddispatchplanpaymentservice
        .getSDDispatchPlanPaymentEntry(id)
        .subscribe((result: SDDispatchPlanPaymentModel) => {
          this._ui.loadingStateChanged.next(false);
          result.entryMode = "D";
          result.readOnly = false;
          this.openPaymentEntry(result);
        });
    }
  }

  onInvoiceReport(id: number) {
    if (id > 0) {
      let reportId: number = 23;
      let restOfUrl: string;
      restOfUrl = "invoiceid=" + id;
      this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
      this.router.navigate(["report"]);
    }
  }

  onInvoiceEmailReport(id: number) {
    if (id > 0) {
      if (confirm('Are you sure?')) {
      let reportId: number = 23;
      let restOfUrl: string;
      restOfUrl = "invoiceid=" + id;
      this._reportEmail.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
      this.router.navigate(["reportEmail"]);
      }
    }
  }

  onInvoiceReport2(id: number) {
    if (id > 0) {
      let reportId: number = 24;
      let restOfUrl: string;
      restOfUrl = "invoiceid=" + id;
      this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
      this.router.navigate(["report"]);
    }
  }

  onInvoiceEmailReport2(id: number) {
    if (id > 0) {
      if (confirm('Are you sure?')) {
      let reportId: number = 24;
      let restOfUrl: string;
      restOfUrl = "invoiceid=" + id;
      this._reportEmail.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
      this.router.navigate(["reportEmail"]);
      }
    }
  }

  onPlanReport(id: number) {
    if (id > 0) {
      let reportId: number = 25;
      let restOfUrl: string;
      restOfUrl = "planid=" + id;
      this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
      this.router.navigate(["report"]);
      // this.router.navigate([]).then(result => {  window.open(this._globals.baseAppUrl + '#/report'); });
      // window.open('#/report', '_blank');
    }
  }

  onDelete = function (id: number) {};

  openEntry = function (result: SDVehicleDetailModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(SDVehicleDetailEntryComponent, {
        disableClose: true,
        data: {},
      });
    } else {
      this.dialogRef = this.dialog.open(SDVehicleDetailEntryComponent, {
        disableClose: true,
        data: result,
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

  openBatchEntry = function () {
    let result = "";
    if (result === undefined) {
      this.dialogRef = this.dialog.open(SDBatchVehicleEntryComponent, {
        disableClose: true,
        data: {},
      });
    } else {
      this.dialogRef = this.dialog.open(SDBatchVehicleEntryComponent, {
        disableClose: true,
        data: result,
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

  openExpense = function (result: SDDispatchPlanExpenseModel) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(SDDispatchPlanExpenseEntryComponent, {
        disableClose: true,
        data: {},
      });
    } else {
      this.dialogRef = this.dialog.open(SDDispatchPlanExpenseEntryComponent, {
        disableClose: true,
        data: result,
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

  openVehiclesBatchEntry = function (result: PlanVehiclesBatch) {
    if (result === undefined) {
      this.dialogRef = this.dialog.open(BatchVehiclePlanEntryComponent, {
        disableClose: true,
        data: {},
      });
    } else {
      this.dialogRef = this.dialog.open(BatchVehiclePlanEntryComponent, {
        disableClose: true,
        data: result,
      });
    }
    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  };

  getIDs(id, checked) {
    if (checked === true) {
      this.selectedCards.push(id);
    } else {
      let index = this.selectedCards.indexOf(id);
      this.selectedCards.splice(index, 1);
    }
    this.cardCount = this.selectedCards.length;
    return this.selectedCards;
  }
}
