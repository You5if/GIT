import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-vehicle-supplier',
  templateUrl: './by-vehicle-supplier.component.html',
  styleUrls: ['./by-vehicle-supplier.component.scss']
})
export class ByVehicleSupplierComponent implements OnInit {

  vehicleSupplier: string;

  constructor(
    private filter: FilterService,
  ) { }

  ngOnInit() {
    this.filter.myFilter.vehicleSupplier = this.vehicleSupplier;
  }

  onVehicleSupplier() {
    if(this.vehicleSupplier.length > 0) {
    this.filter.myFilter.vehicleSupplier = this.vehicleSupplier;
    }
    else {
      this.filter.myFilter.vehicleSupplier = "''";
    }
  }

}
