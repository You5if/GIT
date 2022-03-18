import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectService } from '../../common/select.service';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-year',
  templateUrl: './by-year.component.html',
  styleUrls: ['./by-year.component.sass']
})

export class ByYearComponent implements OnInit {
  year: number = null;
  years: number[] = this._select.generateNumbers(1950, new Date().getFullYear());
  years2: number[] = [];

  yearFilter: FormGroup;

  constructor(private fb: FormBuilder,
    private _select: SelectService,
    private filter: FilterService, ) {
   }

  ngOnInit() {
    this.yearFilter = this.fb.group({
      from: '',
      to: '',
    })

    this.yearFilter.valueChanges.subscribe(
      this.filter.myFilter.from = this.yearFilter.value.from,
      this.filter.myFilter.to = this.yearFilter.value.to
    )
  }

  onFromChange() {
    this.years2 = this._select.generateNumbers(this.yearFilter.value.from, new Date().getFullYear());
    this.filter.myFilter.from = this.yearFilter.value.from
    this.filter.myFilter.to = "''"
  }

  onToChange() {
    this.filter.myFilter.to = this.yearFilter.value.to
  }

}
