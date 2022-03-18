import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-customer-name',
  templateUrl: './by-customer-name.component.html',
  styleUrls: ['./by-customer-name.component.scss']
})
export class ByCustomerNameComponent implements OnInit {

  customerName: string;

  constructor(
    private filter: FilterService,
  ) { }

  ngOnInit() {
    this.filter.myFilter.customerName = this.customerName;
  }

  onCustomerName() {
    if(this.customerName.length > 0) {
    this.filter.myFilter.customerName = this.customerName;
    }
    else {
      this.filter.myFilter.customerName = "''";
    }
  }

}
