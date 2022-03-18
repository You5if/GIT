import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-consignee',
  templateUrl: './by-consignee.component.html',
  styleUrls: ['./by-consignee.component.scss']
})
export class ByConsigneeComponent implements OnInit {

  consignee: string;

  constructor(
    private filter: FilterService,
  ) { }

  ngOnInit() {
    this.filter.myFilter.consignee = this.consignee;
  }

  onConsignee() {
    if(this.consignee.length > 0) {
    this.filter.myFilter.consignee = this.consignee;
    }
    else {
      this.filter.myFilter.consignee = "''";
    }
  }

}
