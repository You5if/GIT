import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-plan-code',
  templateUrl: './by-plan-code.component.html',
  styleUrls: ['./by-plan-code.component.scss']
})
export class ByPlanCodeComponent implements OnInit {

  planCode: string;

  constructor(
    private filter: FilterService,
  ) { }

  ngOnInit() {
    this.filter.myFilter.planCode = this.planCode;
  }

  onPlanCode() {
    if(this.planCode.length > 0) {
    this.filter.myFilter.planCode = this.planCode;
    }
    else {
      this.filter.myFilter.planCode = "''";
    }
  }

}
