import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterService } from '../../filter/filter.service';
import { SelectService } from '../../common/select.service';

@Component({
  selector: 'by-invoice-total-amount',
  templateUrl: './by-invoice-total-amount.component.html',
  styleUrls: ['./by-invoice-total-amount.component.scss']
})
export class ByInvoiceTotalAmountComponent implements OnInit {

  invoiceTotalAmount: number = null;
  invoiceTotalAmounts: number[] = this._select.generateNumbers(new Date().getFullYear() - 20, new Date().getFullYear());
  invoiceTotalAmounts2: number[] = [];

  planInvoiceTotalAmountFilter: FormGroup;

  constructor(private fb: FormBuilder,
    private _select: SelectService,
    private filter: FilterService, ) {
   }

  ngOnInit() {
    this.planInvoiceTotalAmountFilter = this.fb.group({
      from: '',
      to: '',
    })

    this.planInvoiceTotalAmountFilter.valueChanges.subscribe(
      this.filter.myFilter.planInvoiceTotalAmountFrom = this.planInvoiceTotalAmountFilter.value.from,
      this.filter.myFilter.planInvoiceTotalAmountTo = this.planInvoiceTotalAmountFilter.value.to
    )
  }

  onFromChange() {
    this.filter.myFilter.planInvoiceTotalAmountFrom = this.planInvoiceTotalAmountFilter.value.from
  }

  onToChange() {
    this.filter.myFilter.planInvoiceTotalAmountTo = this.planInvoiceTotalAmountFilter.value.to
  }

}
