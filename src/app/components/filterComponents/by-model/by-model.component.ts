import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../filter/filter.service';
import { Observable, of } from 'rxjs';
import { SelectModel } from '../../misc/SelectModel';
import { FormControl } from '@angular/forms';
import { SelectService } from '../../common/select.service';
import { startWith, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'by-model',
  templateUrl: './by-model.component.html',
  styleUrls: ['./by-model.component.scss']
})
export class ByModelComponent implements OnInit {
  filteredModel: Observable<SelectModel[]>;
  modelAC = new FormControl();

  model: string;

  constructor(
    private filter: FilterService,
    private _select: SelectService,
  ) { }

  ngOnInit() {
    this.filter.myFilter.model = this.model;
    this.filteredModel = this.modelAC.valueChanges.pipe(startWith(''),
    switchMap(value => this._modelFilter(value)));
  }

  private _modelFilter(fieldName: string = '') {
    if (fieldName.length >= 3)
    {
        return this._select.getModelName(fieldName).pipe(
            map((results) => {
                return results;
            }));
    }
    else
    {
        return of(null);
    }
}

onModelSelect(pId: string) {
 this.model = pId;
 if(this.model.length > 0) {
  this.filter.myFilter.model = this.model;
  }
  else {
    this.filter.myFilter.model = "''";
  }
}

onModelChange(pId: string) {
  this.model = pId;
 if(this.model.length > 0) {
  this.filter.myFilter.model = this.model;
  }
  else {
    this.filter.myFilter.model = "''";
  }
}

  onModel() {
    if(this.model.length > 0) {
    this.filter.myFilter.model = this.model;
    }
    else {
      this.filter.myFilter.model = "''";
    }
  }

}
