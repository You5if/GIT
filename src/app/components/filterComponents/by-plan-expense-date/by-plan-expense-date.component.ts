import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectService } from '../../common/select.service';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-plan-expense-date',
  templateUrl: './by-plan-expense-date.component.html',
  styleUrls: ['./by-plan-expense-date.component.scss']
})
export class ByPlanExpenseDateComponent implements OnInit {

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
      this.filter.myFilter.planExpenseDateFrom = this.myForm.value.from;
      this.filter.myFilter.planExpenseDateTo = this.myForm.value.To;
    });
  }

  onFromChange() {
    this.myForm.value.from = this.myForm.value.from;
    this.filter.myFilter.planExpenseDateFrom = this.myForm.value.from;
  }

  onToChange() {
    this.myForm.value.to = this.myForm.value.to;
    this.filter.myFilter.planExpenseDateTo = this.myForm.value.to;
  }

}
