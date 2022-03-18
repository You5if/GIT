import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectService } from '../../common/select.service';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-vehicle-expense-date',
  templateUrl: './by-vehicle-expense-date.component.html',
  styleUrls: ['./by-vehicle-expense-date.component.scss']
})
export class ByExpenseDateComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private filter: FilterService,
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      from: '',
      to: '',
    })

    this.myForm.valueChanges.subscribe(() => {
      this.filter.myFilter.vehicleExpenseDateFrom = this.myForm.value.from;
      this.filter.myFilter.vehicleExpenseDateTo = this.myForm.value.to;
    });
  }

  onFromChange() {
    this.myForm.value.from = this.myForm.value.from;
    this.filter.myFilter.vehicleExpenseDateFrom = this.myForm.value.from;
  }
  
  onToChange() {
    this.myForm.value.to = this.myForm.value.to;
    this.filter.myFilter.vehicleExpenseDateTo = this.myForm.value.to;
  }

}
