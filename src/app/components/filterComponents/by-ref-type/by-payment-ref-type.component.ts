import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-payment-ref-type',
  templateUrl: './by-payment-ref-type.component.html',
  styleUrls: ['./by-payment-ref-type.component.scss']
})
export class ByPaymentRefTypeComponent implements OnInit {

  paymentRefType: string;

  constructor(
    private filter: FilterService,
  ) { }

  ngOnInit() {
    this.filter.myFilter.paymentRefType = this.paymentRefType;
  }

  onPaymentRefType() {
    if(this.paymentRefType.length > 0) {
    this.filter.myFilter.paymentRefType = this.paymentRefType;
    }
    else {
      this.filter.myFilter.paymentRefType = "''";
    }
  }

}
