import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FilterService } from '../../filter/filter.service';

export interface Color {
  name: string;
}

@Component({
  selector: 'by-color',
  templateUrl: './by-color.component.html',
  styleUrls: ['./by-color.component.sass']
})

export class ByColorComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  colors: string[] = [];

  constructor(
    private filter: FilterService,
  ) { }

  ngOnInit() {
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our color
    if ((value || '').trim()) {
      this.colors.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    if(this.colors.length >= 1) {
    this.filter.myFilter.colors = this.colors;
    }
    else {
      this.filter.myFilter.colors = [];
    }
  }

  remove(color: string): void {
    const index = this.colors.indexOf(color);

    if (index >= 0) {
      this.colors.splice(index, 1);
    }

    if(this.colors.length >= 1) {
      this.filter.myFilter.colors = this.colors;
      }
      if(this.colors.length === 0) {
        this.filter.myFilter.colors = [];
      }
  }

}
