import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-payment-type',
  templateUrl: './by-payment-type.component.html',
  styleUrls: ['./by-payment-type.component.scss']
})
export class ByPaymentTypeComponent implements OnInit {

  paymentTypeFilter: FormGroup;

  constructor(
    private filter: FilterService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.paymentTypeFilter = this.fb.group({
      paymentType: '',
    })

    this.paymentTypeFilter.valueChanges.subscribe(paymentType => this.filter.myFilter.paymentType = paymentType.paymentType);
  }
}
