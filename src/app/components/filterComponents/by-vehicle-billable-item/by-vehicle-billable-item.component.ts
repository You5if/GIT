import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-vehicle-billable-item',
  templateUrl: './by-vehicle-billable-item.component.html',
  styleUrls: ['./by-vehicle-billable-item.component.scss']
})
export class ByVehicleBillableItemComponent implements OnInit {

  vehicleBillableItemFilter: FormGroup;

  constructor(
    private filter: FilterService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.vehicleBillableItemFilter = this.fb.group({
      vehicleBillableItem: '',
    })

    this.vehicleBillableItemFilter.valueChanges.subscribe(vehicleBillableItem => this.filter.myFilter.vehicleBillableItem = vehicleBillableItem.vehicleBillableItem);
  }

}
