import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-plan-status',
  templateUrl: './by-plan-status.component.html',
  styleUrls: ['./by-plan-status.component.scss']
})
export class ByPlanStatusComponent implements OnInit {

  planStatusFilter: FormGroup;

  constructor(
    private fb: FormBuilder,
    private filter: FilterService,
    ) { }

  ngOnInit() {
    this.planStatusFilter = this.fb.group({
      planStatus: '',
    })

    this.planStatusFilter.valueChanges.subscribe(res => this.filter.myFilter.planStatus = res);
  }

  onPlanStatusChange() {
    this.filter.myFilter.planStatus = this.planStatusFilter.value.planStatus;
  }

}
