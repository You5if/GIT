import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppGlobals } from 'src/app/app.global';
import { ReportPageService } from './report-page.service';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent implements OnInit {

  test = 'http://172.168.0.137:8085/default.aspx?reportid=12&month=4&year=2019';
  url: any;

  constructor(
    private _globals: AppGlobals,
    private _reportService: ReportPageService,

  ) { }

  ngOnInit() {
    this.url = this._reportService.getReportData();
  }


  reportURL() {
    return this._globals.baseReportUrl + 'reportid=' + this.url.reportId + '&' + this.url.restOfUrl;
    // return 'http://shippingreports.autopay-mcs.com/default.aspx?reportid=23&invoiceid=6';
  }
}
