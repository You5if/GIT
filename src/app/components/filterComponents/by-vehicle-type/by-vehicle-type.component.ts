import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterService } from '../../filter/filter.service'

@Component({
  selector: 'by-vehicle-type',
  templateUrl: './by-vehicle-type.component.html',
  styleUrls: ['./by-vehicle-type.component.sass']
})

export class ByVehicleTypeComponent implements OnInit {

  vehicleTypeFilter: FormGroup;

  constructor(
    private filter: FilterService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.vehicleTypeFilter = this.fb.group({
      vehicleType: '',
    })

    this.vehicleTypeFilter.valueChanges.subscribe(vehicleType => this.filter.myFilter.vehicleType = vehicleType.vehicleType);
  }

}
