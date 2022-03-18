import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectService } from '../../common/select.service';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-plan-dispatch-date',
  templateUrl: './by-plan-dispatch-date.component.html',
  styleUrls: ['./by-plan-dispatch-date.component.scss']
})
export class ByPlanDispatchDateComponent implements OnInit {

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
      this.filter.myFilter.planDispatchDateFrom = this.myForm.value.from;
      this.filter.myFilter.planDispatchDateTo = this.myForm.value.to;
    });
  }

  onFromChange() {
    this.myForm.value.from = this.myForm.value.from;
    this.filter.myFilter.planDispatchDateFrom = this.myForm.value.from;
  }
  
  onToChange() {
    this.myForm.value.to = this.myForm.value.to;
    this.filter.myFilter.planDispatchDateTo = this.myForm.value.to;
  }

}
