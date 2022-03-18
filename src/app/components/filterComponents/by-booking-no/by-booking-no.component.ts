import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../filter/filter.service';

@Component({
  selector: 'by-booking-no',
  templateUrl: './by-booking-no.component.html',
  styleUrls: ['./by-booking-no.component.scss']
})
export class ByBookingNoComponent implements OnInit {

  bookingNo: string;

  constructor(
    private filter: FilterService,
  ) { }

  ngOnInit() {
    this.filter.myFilter.bookingNo = this.bookingNo;
  }

  onBookingNo() {
    if(this.bookingNo.length > 0) {
    this.filter.myFilter.bookingNo = this.bookingNo;
    }
    else {
      this.filter.myFilter.bookingNo = "''";
    }
  }

}
