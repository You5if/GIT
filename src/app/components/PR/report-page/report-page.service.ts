import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ReportPageService {
  reportId: number;
  restOfUrl: string;

  constructor() { }

  passReportData(data: any) {
    this.reportId = data.reportId;
    this.restOfUrl = data.restOfUrl;
  }

  getReportData() {
    const data = { reportId: this.reportId, restOfUrl: this.restOfUrl };
    return data;
  }



}
