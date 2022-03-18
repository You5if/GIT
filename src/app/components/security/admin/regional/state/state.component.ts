import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { RegionalService } from '../regional.service';
import { Http } from '@angular/http';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  myControl = new FormControl();

  //  filteredOptions: Observable<SelectModel[]>;
  public filteredOptions: SelectModel[] = [];
  constructor(
    private _regionalService: RegionalService, private http: Http
  ) { }


  ngOnInit() {
    // this.populatedata();
    this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value))).subscribe(data => {
      this.filteredOptions = data;
    });
  }

  click1() {

  }



  // private _filter(value: string) {
  //   value   = value.toLowerCase();
  //   if ( value.length > 0 ) {
  //     return this._regionalService.getCountry(value).filter( option => option.name.toLowerCase().search( value ) > -1 );
  //   }
  //   return [];
  // }

  populatedata() {

    this._regionalService.getCountry('none').subscribe(data => {
      this.filteredOptions = data;
    });
  }

  private _filter(value: string) {
    if (value.length > 0) {
      value = value.toLowerCase();
      try {
        this._regionalService.getCountry(value).subscribe(data => {
          this.filteredOptions = data;
          return data.filter(option => option.name.toLowerCase().includes(value));
        });
      } catch (err) {
      }
    } else {
      return [];
    }
  }

}
