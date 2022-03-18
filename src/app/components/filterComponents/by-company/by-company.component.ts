import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterService } from '../../filter/filter.service';
import { SelectModel } from '../../misc/SelectModel';
import { SelectService } from '../../common/select.service';

@Component({
  selector: 'by-company',
  templateUrl: './by-company.component.html',
  styleUrls: ['./by-company.component.scss']
})
export class ByCompanyComponent implements OnInit {
  companies: SelectModel[] = [];
  companyFilter: FormGroup;

  constructor(
    private fb: FormBuilder,
    private filter: FilterService,
    private _select: SelectService,
  ) { }

  ngOnInit() {
    this._select.getAllCompanies(false).subscribe((res: SelectModel[]) => {
      this.companies = res;
  });
    this.companyFilter = this.fb.group({
      company: '',
    })

    this.companyFilter.valueChanges.subscribe(res => this.filter.myFilter.company = res);
  }

  onCompanyChange() {
    this.filter.myFilter.company = this.companyFilter.value.company
  }

}
