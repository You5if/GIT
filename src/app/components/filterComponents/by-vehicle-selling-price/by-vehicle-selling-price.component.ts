import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectService } from '../../common/select.service';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-vehicle-selling-price',
  templateUrl: './by-vehicle-selling-price.component.html',
  styleUrls: ['./by-vehicle-selling-price.component.scss']
})
export class ByVehicleSellingPriceComponent implements OnInit {

  SellingPrice: number = null;
  SellingPrices: number[] = this._select.generateNumbers(new Date().getFullYear() - 20, new Date().getFullYear());
  SellingPrices2: number[] = [];

  vehicleSellingPriceFilter: FormGroup;

  constructor(private fb: FormBuilder,
    private _select: SelectService,
    private filter: FilterService, ) {
   }

  ngOnInit() {
    this.vehicleSellingPriceFilter = this.fb.group({
      from: '',
      to: '',
    })

    this.vehicleSellingPriceFilter.valueChanges.subscribe(
      this.filter.myFilter.vehicleSellingPriceFrom = this.vehicleSellingPriceFilter.value.from,
      this.filter.myFilter.vehicleSellingPriceTo = this.vehicleSellingPriceFilter.value.to
    )
  }

  onFromChange() {
    this.filter.myFilter.vehicleSellingPriceFrom = this.vehicleSellingPriceFilter.value.from
  }

  onToChange() {
    this.filter.myFilter.vehicleSellingPriceTo = this.vehicleSellingPriceFilter.value.to
  }

}
