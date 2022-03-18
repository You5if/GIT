import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterService } from '../../filter/filter.service';
import { SelectModel } from '../../misc/SelectModel';
import { SelectService } from '../../common/select.service';

@Component({
  selector: 'by-shipping-company',
  templateUrl: './by-shipping-company.component.html',
  styleUrls: ['./by-shipping-company.component.scss']
})
export class ByShippingCompanyComponent implements OnInit {
  companies: SelectModel[] = [];
  shippingCompanyFilter: FormGroup;

  constructor(
    private fb: FormBuilder,
    private filter: FilterService,
    private _select: SelectService,
    ) { }

  ngOnInit() {
    this._select.getShippingCompany(false).subscribe((res: SelectModel[]) => {
      this.companies = res;
  });
    this.shippingCompanyFilter = this.fb.group({
      shippingCompany: '',
    })

    this.shippingCompanyFilter.valueChanges.subscribe(res => this.filter.myFilter.shippingCompany = res);
  }

  onShippingCompanyChange() {
    this.filter.myFilter.shippingCompany = this.shippingCompanyFilter.value.shippingCompany
  }

}
