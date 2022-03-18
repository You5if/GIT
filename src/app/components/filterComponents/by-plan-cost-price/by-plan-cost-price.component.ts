import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectService } from '../../common/select.service';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-plan-cost-price',
  templateUrl: './by-plan-cost-price.component.html',
  styleUrls: ['./by-plan-cost-price.component.scss']
})
export class ByPlanCostPriceComponent implements OnInit {

  costPrice: number = null;
  costPrices: number[] = this._select.generateNumbers(new Date().getFullYear() - 20, new Date().getFullYear());
  costPrices2: number[] = [];

  planCostPriceFilter: FormGroup;

  constructor(private fb: FormBuilder,
    private _select: SelectService,
    private filter: FilterService, ) {
   }

  ngOnInit() {
    this.planCostPriceFilter = this.fb.group({
      from: '',
      to: '',
    })

    this.planCostPriceFilter.valueChanges.subscribe(
      this.filter.myFilter.planCostPriceFrom = this.planCostPriceFilter.value.from,
      this.filter.myFilter.planCostPriceTo = this.planCostPriceFilter.value.to
    )
  }

  onFromChange() {
    this.filter.myFilter.planCostPriceFrom = this.planCostPriceFilter.value.from
  }

  onToChange() {
    this.filter.myFilter.planCostPriceTo = this.planCostPriceFilter.value.to
  }

}
