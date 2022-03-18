import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { DatePipe } from '@angular/common';
import { SelectService } from '../components/common/select.service';
import { ReportPageService } from '../components/PR/report-page/report-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  myForm: FormGroup;
  companyies: any;
  role: string;

  constructor(
    public dialogRef: MatDialogRef<ReportComponent>,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private selectService: SelectService,
    private _report: ReportPageService,
    private router: Router,
    ) { 
    this.dialogRef.disableClose = true
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      company: '',
      fromDate: new Date(),
      toDate: new Date(),
    });

    this.selectService.getCompanies().subscribe(
      data => this.companyies = data,
    );

    this.role = localStorage.getItem('role');
  }

  onClose() {
    this.dialogRef.close()
  }

  onReport(fromDate, toDate, id) {
    if(id > 0) {
      let reportId: number = 26;
      let restOfUrl: string;
      restOfUrl = 'fromdate=' + fromDate + "&todate=" + toDate + "&companyid=" + id;
      this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
      this.router.navigate(['report']);
      // this.router.navigate([]).then(result => {  window.open(this._globals.baseAppUrl + '#/report'); });
      // window.open('#/report', '_blank');
      console.log(restOfUrl)
    }
  }
  

  onSubmit() {
    if(this.role == '4') this.myForm.value.company = localStorage.getItem('sdCompanyId');
    const fromDate = this.datePipe.transform(this.myForm.value.fromDate, 'yyyy-M-d')
    const toDate = this.datePipe.transform(this.myForm.value.toDate, 'yyyy-M-d')
    this.onReport(
      fromDate,
      toDate,
      this.myForm.value.company
    );
    this.dialogRef.close()
  }
}
