import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-lot-no',
  templateUrl: './by-lot-no.component.html',
  styleUrls: ['./by-lot-no.component.scss']
})
export class ByLotNoComponent implements OnInit {

  lotNo: string;

  constructor(
    private filter: FilterService,
  ) { }

  ngOnInit() {
    this.filter.myFilter.lotNo = this.lotNo;
  }

  onLotNo() {
    if(this.lotNo.length > 0) {
    this.filter.myFilter.lotNo = this.lotNo;
    }
    else {
      this.filter.myFilter.lotNo = "''";
    }
  }

}
