import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-vehicle-dispatch-status',
  templateUrl: './by-vehicle-dispatch-status.component.html',
  styleUrls: ['./by-vehicle-dispatch-status.component.scss']
})
export class ByVehicleDispatchStatusComponent implements OnInit {

  vehicleDispatchStatusFilter: FormGroup;

  constructor(
    private fb: FormBuilder,
    private filter: FilterService,
    ) { }

  ngOnInit() {
    this.vehicleDispatchStatusFilter = this.fb.group({
      dispatchStatus: '',
    })

    this.vehicleDispatchStatusFilter.valueChanges.subscribe(res => this.filter.myFilter.vehicleDispatchStatus = res);
  }

  onVehicleDispatchStatusChange() {


    this.filter.myFilter.vehicleDispatchStatus = this.vehicleDispatchStatusFilter.value.dispatchStatus;
  }

}
