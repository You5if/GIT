import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { SelectService } from "../components/common/select.service";
import { ReportPageService } from "../components/PR/report-page/report-page.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-master-report",
  templateUrl: "./master-report.component.html",
  styleUrls: ["./master-report.component.scss"]
})
export class MasterReportComponent implements OnInit {
  myForm: FormGroup;
  companyies: any;
  role: string;

  constructor(
    public dialogRef: MatDialogRef<MasterReportComponent>,
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
      company: 0,
      fromDate: new Date(),
      toDate: new Date()
    });

    this.selectService
      .getCompanies()
      .subscribe(data => (this.companyies = data));

    this.role = localStorage.getItem("role");
  }

  onClose() {
    this.dialogRef.close();
  }

  onMasterReport(fromDate, toDate, id = 0) {
    if (id >= 0) {
      let reportId: number = 27;
      let restOfUrl: string;
      // restOfUrl =
      //   "fromdate=" +
      //   fromDate +
      //   "&todate=" +
      //   toDate +
      //   "&companyid=" +
      //   id.toString();
      restOfUrl = `fromdate=${fromDate}&todate=${toDate}&companyid=${id}`;
      this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
      this.router.navigate(["report"]);
      // this.router.navigate([]).then(result => {  window.open(this._globals.baseAppUrl + '#/report'); });
      // window.open('#/report', '_blank');
      console.log(restOfUrl);
    }
  }

  onSubmit() {
    if (this.role == "4")
      this.myForm.value.company = localStorage.getItem("sdCompanyId");
    const fromDate = this.datePipe.transform(
      this.myForm.value.fromDate,
      "yyyy-M-d"
    );
    const toDate = this.datePipe.transform(
      this.myForm.value.toDate,
      "yyyy-M-d"
    );
    this.onMasterReport(fromDate, toDate, this.myForm.value.company);
    console.log(
      `${fromDate}\n${toDate}\n${this.myForm.value.company.toString()}`
    );
    this.dialogRef.close();
  }

  // displayFn(id) {
  //   if (!id) return "";

  //   let index = this.companyies.findIndex(company => company.id === id);
  //   return this.companyies[index].name;
  // }
}
