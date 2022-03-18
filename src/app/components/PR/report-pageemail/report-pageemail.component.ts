import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppGlobals } from 'src/app/app.global';
import { ReportPageEmailService } from './report-pageemail.service';

@Component({
  selector: 'app-report-pageemail',
  templateUrl: './report-pageemail.component.html',
  styleUrls: ['./report-pageemail.component.scss']
})
export class ReportPageEmailComponent implements OnInit {

  test = 'http://172.168.0.137:8085/default.aspx?reportid=12&month=4&year=2019';
  url: any;

  constructor(
    private _globals: AppGlobals,
    private _reportService: ReportPageEmailService,

  ) { }

  ngOnInit() {
    this.url = this._reportService.getReportData();
  }


  reportURL() {
    return this._globals.baseReportEmailUrl + 'reportid=' + this.url.reportId + '&' + this.url.restOfUrl;
    // return 'http://shippingreports.autopay-mcs.com/default.aspx?reportid=23&invoiceid=6';
  }
}
