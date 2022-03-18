import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { DatePipe } from "@angular/common";
import { SelectService } from "../components/common/select.service";
import { ReportPageService } from "../components/PR/report-page/report-page.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-financial-report",
  templateUrl: "./financial-report.component.html",
  styleUrls: ["./financial-report.component.scss"]
})
export class FinancialReportComponent implements OnInit {
  myForm: FormGroup;
  invoices: any;
  role: string;

  constructor(
    public dialogRef: MatDialogRef<FinancialReportComponent>,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private selectService: SelectService,
    private _report: ReportPageService,
    private router: Router
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      invoice: "",
      fromDate: new Date(),
      toDate: new Date()
    });

    this.selectService.getInvoices().subscribe(data => (this.invoices = data));

    this.role = localStorage.getItem("role");
  }

  onSubmit() {
    let invoiceNo;
    if (this.myForm.value.invoice === "") {
      invoiceNo = 0;
    } else {
      invoiceNo = this.myForm.value.invoice;
    }
    const fromDate = this.datePipe.transform(
      this.myForm.value.fromDate,
      "yyyy-M-d"
    );
    const toDate = this.datePipe.transform(
      this.myForm.value.toDate,
      "yyyy-M-d"
    );
    const reportId: number = 28;
    const restOfUrl = `fromdate=${fromDate}&todate=${toDate}&invoiceno=${invoiceNo}`;
    this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
    console.log(restOfUrl);
    this.router.navigate(["report"]);
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close();
  }

  // onFinancialReport(fromDate, toDate, invoice = "0") {
  //   let reportId: number = 27;
  //   let restOfUrl: string;
  //   restOfUrl = `fromdate=${fromDate}&todate=${toDate}&invoiceno=${invoice}`;
  //   this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
  //   this.router.navigate(["report"]);
  //   // this.router.navigate([]).then(result => {  window.open(this._globals.baseAppUrl + '#/report'); });
  //   // window.open('#/report', '_blank');
  //   console.log(restOfUrl);
  // }

  // onSubmit() {
  //   const fromDate = this.datePipe.transform(
  //     this.myForm.value.fromDate,
  //     "yyyy-M-d"
  //   );
  //   const toDate = this.datePipe.transform(
  //     this.myForm.value.toDate,
  //     "yyyy-M-d"
  //   );
  //   this.onFinancialReport(fromDate, toDate, this.myForm.value.invoice);
  //   console.log(
  //     `${fromDate}\n${toDate}\n${this.myForm.value.invoice.toString()}`
  //   );
  //   this.dialogRef.close();
  // }

  // displayFn(id) {
  //   if (!id) return "";

  //   let index = this.invoices.findIndex(invoice => invoice.id === id);
  //   return this.invoices[index].name;
  // }
}
