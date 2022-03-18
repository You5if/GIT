import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-invoice-no',
  templateUrl: './by-plan-invoice-no.component.html',
  styleUrls: ['./by-plan-invoice-no.component.scss']
})
export class ByInvoiceNoComponent implements OnInit {

  planInvoiceNo: string;

  constructor(
    private filter: FilterService,
  ) { }

  ngOnInit() {
    this.filter.myFilter.planInvoiceNo = this.planInvoiceNo;
  }

  onplanInvoiceNo() {
    if(this.planInvoiceNo.length > 0) {
    this.filter.myFilter.planInvoiceNo = this.planInvoiceNo;
    }
    else {
      this.filter.myFilter.planInvoiceNo = "''";
    }
  }

}
