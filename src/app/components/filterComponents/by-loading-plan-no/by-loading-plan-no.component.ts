import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-loading-plan-no',
  templateUrl: './by-loading-plan-no.component.html',
  styleUrls: ['./by-loading-plan-no.component.scss']
})
export class ByLoadingPlanNoComponent implements OnInit {

  loadingPlanNo: string;

  constructor(
    private filter: FilterService,
  ) { }

  ngOnInit() {
    this.filter.myFilter.loadingPlanNo = this.loadingPlanNo;
  }

  onLoadingPlanNo() {
    if(this.loadingPlanNo.length > 0) {
    this.filter.myFilter.loadingPlanNo = this.loadingPlanNo;
    }
    else {
      this.filter.myFilter.loadingPlanNo = "''";
    }
  }

}
