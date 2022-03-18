import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../filter/filter.service';
import { SelectCodeModel, SelectModel } from '../../misc/SelectModel';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { switchMap, startWith, map } from 'rxjs/operators';
import { SelectService } from '../../common/select.service';

@Component({
  selector: 'by-vin',
  templateUrl: './by-vin.component.html',
  styleUrls: ['./by-vin.component.scss']
})
export class ByVinComponent implements OnInit {
  filteredVin: Observable<SelectModel[]>;
  vinAC = new FormControl();

  vin: string;

  constructor(
    private filter: FilterService,
    private _select: SelectService,
  ) { }

  ngOnInit() {
    this.filter.myFilter.vin = this.vin;
    this.filteredVin = this.vinAC.valueChanges.pipe(startWith(''),
    switchMap(value => this._vinFilter(value)));
  }

  private _vinFilter(fieldName: string = '') {
    if (fieldName.length >= 3)
    {
        return this._select.getVinName(fieldName).pipe(
            map((results) => {
                return results;
            }));
    }
    else
    {
        return of(null);
    }
}

onVinSelect(pId: string) {
 this.vin = pId;
 if(this.vin.length > 0) {
  this.filter.myFilter.vin = this.vin;
  }
  else {
    this.filter.myFilter.vin = "''";
  }
}

onVinChange(pId: string) {
  this.vin = pId;
 if(this.vin.length > 0) {
  this.filter.myFilter.vin = this.vin;
  }
  else {
    this.filter.myFilter.vin = "''";
  }
}

  onVin() {
    if(this.vin.length > 0) {
    this.filter.myFilter.vin = this.vin;
    }
    else {
      this.filter.myFilter.vin = "''";
    }
  }

}
