import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-license-plate',
  templateUrl: './by-license-plate.component.html',
  styleUrls: ['./by-license-plate.component.scss']
})
export class LicensePlateComponent implements OnInit {

  licensePlate: string;

  constructor(
    private filter: FilterService,
  ) { }

  ngOnInit() {
    this.filter.myFilter.licensePlate = this.licensePlate;
  }

  onLicensePlate() {
    if(this.licensePlate.length > 0) {
    this.filter.myFilter.licensePlate = this.licensePlate;
    }
    else {
      this.filter.myFilter.licensePlate = "''";
    }
  }

}
