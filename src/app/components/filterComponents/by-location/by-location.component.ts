import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-location',
  templateUrl: './by-location.component.html',
  styleUrls: ['./by-location.component.sass']
})

export class ByLocationComponent implements OnInit {

  locationFilter: FormGroup;

  constructor(
    private fb: FormBuilder,
    private filter: FilterService,
    ) { }

  ngOnInit() {
    this.locationFilter = this.fb.group({
      location: '',
    })

    this.locationFilter.valueChanges.subscribe(res => this.filter.myFilter.locations = res);
  }

  onLocationChange() {
    this.filter.myFilter.locations = this.locationFilter.value.location
  }

}
