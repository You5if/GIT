import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-plan-billable-item',
  templateUrl: './by-plan-billable-item.component.html',
  styleUrls: ['./by-plan-billable-item.component.scss']
})
export class ByPlanBillableItemComponent implements OnInit {

  planBillableItemFilter: FormGroup;

  constructor(
    private filter: FilterService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.planBillableItemFilter = this.fb.group({
      planBillableItem: '',
    })

    this.planBillableItemFilter.valueChanges.subscribe(planBillableItem => this.filter.myFilter.planBillableItem = planBillableItem.planBillableItem);
  }

}
