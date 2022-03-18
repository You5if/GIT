import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectService } from '../../common/select.service';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-vehicle-cost-price',
  templateUrl: './by-vehicle-cost-price.component.html',
  styleUrls: ['./by-vehicle-cost-price.component.scss']
})
export class ByVehicleCostPriceComponent implements OnInit {

  costPrice: number = null;
  costPrices: number[] = this._select.generateNumbers(new Date().getFullYear() - 20, new Date().getFullYear());
  costPrices2: number[] = [];

  vehicleCostPriceFilter: FormGroup;

  constructor(private fb: FormBuilder,
    private _select: SelectService,
    private filter: FilterService, ) {
   }

  ngOnInit() {
    this.vehicleCostPriceFilter = this.fb.group({
      from: '',
      to: '',
    })

    this.vehicleCostPriceFilter.valueChanges.subscribe(
      this.filter.myFilter.vehicleCostPriceFrom = this.vehicleCostPriceFilter.value.from,
      this.filter.myFilter.vehicleCostPriceTo = this.vehicleCostPriceFilter.value.to
    )
  }

  onFromChange() {
    this.filter.myFilter.vehicleCostPriceFrom = this.vehicleCostPriceFilter.value.from
  }

  onToChange() {
    this.filter.myFilter.vehicleCostPriceTo = this.vehicleCostPriceFilter.value.to
  }

}
