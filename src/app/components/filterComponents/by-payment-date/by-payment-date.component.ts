import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SelectService } from '../../common/select.service';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-payment-date',
  templateUrl: './by-payment-date.component.html',
  styleUrls: ['./by-payment-date.component.scss']
})
export class ByPaymentDateComponent implements OnInit {

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
      this.filter.myFilter.paymentDateFrom = this.myForm.value.from;
      this.filter.myFilter.paymentDateTo = this.myForm.value.to;
    });
  }

  onFromChange() {
    this.myForm.value.from = this.myForm.value.from;
    this.filter.myFilter.paymentDateFrom = this.myForm.value.from;
  }
  
  onToChange() {
    this.myForm.value.to = this.myForm.value.to;
    this.filter.myFilter.paymentDateTo = this.myForm.value.to;
  }

}
