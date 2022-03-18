import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-container-no',
  templateUrl: './by-container-no.component.html',
  styleUrls: ['./by-container-no.component.scss']
})
export class ContainerNoComponent implements OnInit {

  containerNo: string;

  constructor(
    private filter: FilterService,
  ) { }

  ngOnInit() {
    this.filter.myFilter.containerNo = this.containerNo;
  }

  onContainerNo() {
    if(this.containerNo.length > 0) {
    this.filter.myFilter.containerNo = this.containerNo;
    }
    else {
      this.filter.myFilter.containerNo = "''";
    }
  }

}
