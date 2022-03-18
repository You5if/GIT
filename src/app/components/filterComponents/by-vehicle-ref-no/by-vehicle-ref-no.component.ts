import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-vehicle-ref-no',
  templateUrl: './by-vehicle-ref-no.component.html',
  styleUrls: ['./by-vehicle-ref-no.component.scss']
})
export class ByVehicleRefNoComponent implements OnInit {

  vehicleRefNo: string;

  constructor(
    private filter: FilterService,
  ) { }

  ngOnInit() {
    this.filter.myFilter.vehicleRefNo = this.vehicleRefNo;
  }

  onVehicleRefNo() {
    if(this.vehicleRefNo.length > 0) {
    this.filter.myFilter.vehicleRefNo = this.vehicleRefNo;
    }
    else {
      this.filter.myFilter.vehicleRefNo = "''";
    }
  }

}
