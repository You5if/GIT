import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-tag-no',
  templateUrl: './by-tag-no.component.html',
  styleUrls: ['./by-tag-no.component.scss']
})
export class TagNoComponent implements OnInit {

  tagNo: string;

  constructor(
    private filter: FilterService,
  ) { }

  ngOnInit() {
    this.filter.myFilter.tagNo = this.tagNo;
  }

  onTagNo() {
    if(this.tagNo.length > 0) {
    this.filter.myFilter.tagNo = this.tagNo;
    }
    else {
      this.filter.myFilter.tagNo = "''";
    }
  }


}
