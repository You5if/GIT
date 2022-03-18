import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectService } from '../../common/select.service';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-plan-selling-price',
  templateUrl: './by-plan-selling-price.component.html',
  styleUrls: ['./by-plan-selling-price.component.scss']
})
export class ByPlanSellingPriceComponent implements OnInit {

  SellingPrice: number = null;
  SellingPrices: number[] = this._select.generateNumbers(new Date().getFullYear() - 20, new Date().getFullYear());
  SellingPrices2: number[] = [];

  planSellingPriceFilter: FormGroup;

  constructor(private fb: FormBuilder,
    private _select: SelectService,
    private filter: FilterService, ) {
   }

  ngOnInit() {
    this.planSellingPriceFilter = this.fb.group({
      from: '',
      to: '',
    })

    this.planSellingPriceFilter.valueChanges.subscribe(
      this.filter.myFilter.planSellingPriceFrom = this.planSellingPriceFilter.value.from,
      this.filter.myFilter.planSellingPriceTo = this.planSellingPriceFilter.value.to
    )
  }

  onFromChange() {
    this.filter.myFilter.planSellingPriceFrom = this.planSellingPriceFilter.value.from
  }

  onToChange() {
    this.filter.myFilter.planSellingPriceTo = this.planSellingPriceFilter.value.to
  }
}
