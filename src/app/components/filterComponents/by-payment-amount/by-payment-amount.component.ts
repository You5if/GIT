import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectService } from '../../common/select.service';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-payment-amount',
  templateUrl: './by-payment-amount.component.html',
  styleUrls: ['./by-payment-amount.component.scss']
})
export class ByPaymentAmountComponent implements OnInit {

  paymentAmount: number = null;
  paymentAmounts: number[] = this._select.generateNumbers(new Date().getFullYear() - 20, new Date().getFullYear());
  paymentAmounts2: number[] = [];

  planpaymentAmountFilter: FormGroup;

  constructor(private fb: FormBuilder,
    private _select: SelectService,
    private filter: FilterService, ) {
   }

  ngOnInit() {
    this.planpaymentAmountFilter = this.fb.group({
      from: '',
      to: '',
    })

    this.planpaymentAmountFilter.valueChanges.subscribe(
      this.filter.myFilter.paymentAmountFrom = this.planpaymentAmountFilter.value.from,
      this.filter.myFilter.paymentAmountTo = this.planpaymentAmountFilter.value.to
    )
  }

  onFromChange() {
    this.filter.myFilter.paymentAmountFrom = this.planpaymentAmountFilter.value.from
  }

  onToChange() {
    this.filter.myFilter.paymentAmountTo = this.planpaymentAmountFilter.value.to
  }

}
