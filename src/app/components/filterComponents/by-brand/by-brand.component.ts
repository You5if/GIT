import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FilterService } from '../../filter/filter.service';
import { Observable, of } from 'rxjs';
import { SelectModel } from '../../misc/SelectModel';
import { FormControl } from '@angular/forms';
import { SelectService } from '../../common/select.service';
import { startWith, switchMap, map } from 'rxjs/operators';

export interface Brand {
  name: string;
}

@Component({
  selector: 'by-brand',
  templateUrl: './by-brand.component.html',
  styleUrls: ['./by-brand.component.sass']
})

export class ByBrandComponent implements OnInit {
  filteredBrand: Observable<SelectModel[]>;
  brandAC = new FormControl();
  brand: string;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  brands: Brand[] = [];
  @Output() sendbrandsList = new EventEmitter<any>();
  brandstring: string = '';

  constructor(
    private filter: FilterService,
    private _select: SelectService,
  ) { }

  ngOnInit() {
    this.filter.myFilter.brands = this.brand;
    this.filteredBrand = this.brandAC.valueChanges.pipe(startWith(''),
    switchMap(value => this._brandFilter(value)));
  }

  private _brandFilter(fieldName: string = '') {
    if (fieldName.length >= 3)
    {
        return this._select.getBrandName(fieldName).pipe(
            map((results) => {
                return results;
            }));
    }
    else
    {
        return of(null);
    }
}

onBrandSelect(pId: string) {
 this.brand = pId;
 if(this.brand.length > 0) {
  this.filter.myFilter.brands = this.brand;
  }
  else {
    this.filter.myFilter.brands = "''";
  }
}

onBrandChange(pId: string) {
  this.brand = pId;
 if(this.brand.length > 0) {
  this.filter.myFilter.brands = this.brand;
  }
  else {
    this.filter.myFilter.brands = "''";
  }
}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our brand
    if ((value || '').trim()) {
      this.brands.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.filter.myFilter.brands = this.brand;

  }

  remove(color: Brand): void {
    const index = this.brands.indexOf(color);

    if (index >= 0) {
      this.brands.splice(index, 1);
    }

    this.filter.myFilter.brands = this.brand;

  }

}
