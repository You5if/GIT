import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FilterService } from './filter.service';
import { SDVehicleDetailComponent } from '../AlaadinShipping/sdvehicledetail/sdvehicledetail.component';
import { Router } from '@angular/router';
import { AuthService } from '../security/auth/auth.service';
// import { AuthService2 } from '../security/auth/myauth.service';

export interface Color {
  name: string;
}

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  route: Router;
  role = '';

  @ViewChild(SDVehicleDetailComponent) childFileListComponent: SDVehicleDetailComponent;

  constructor(
    private filter: FilterService,
    private _auth: AuthService,
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    // this.role = this._auth.getRole();
  }

  onSubmit() {
    this.filter.parentVehicle.refreshMe();
  }

  onClearFilters() {
    this.filter.myFilter = this.filter.myFilter = {
      vin: "''",
      colors: [],
      vehicleType: [],
      brands: "''",
      locations: [],
      from: "''",
      to: "''",
      company: [],
      model: "''",
      lotNo: "''",
      licensePlate: "''",
      tagNo: "''",
      vehicleDispatchStatus: [],
      planCode: "''",
      customerName: "''",
      shippingCompany: [],
      bookingNo: "''",
      containerNo: "''",
      loadingPlanNo: "''",
      consignee: "''",
      planDispatchDateFrom: "''",
      planDispatchDateTo: "''",
      planStatus: [],
      vehicleExpenseDateFrom: "''",
      vehicleExpenseDateTo: "''",
      vehicleBillableItem: [],
      vehicleSupplier: "''",
      vehicleRefNo: "''",
      vehicleCostPriceFrom: "''",
      vehicleCostPriceTo: "''",
      vehicleSellingPriceFrom: "''",
      vehicleSellingPriceTo: "''",
      planExpenseDateFrom: "''",
      planExpenseDateTo: "''",
      planBillableItem: [],
      planSupplier: "''",
      planRefNo: "''",
      planCostPriceFrom: "''",
      planCostPriceTo: "''",
      planSellingPriceFrom: "''",
      planSellingPriceTo: "''",
      planInvoiceNo: "''",
      planInvoiceTotalAmountFrom: "''",
      planInvoiceTotalAmountTo: "''",
      paymentDateFrom: "''",
      paymentDateTo: "''",
      paymentType: [],
      paymentRefType: "''",
      paymentAmountFrom: "''",
      paymentAmountTo: "''",
    }
    this.filter.parentVehicle.refreshMe();
  }

  onClearFilters2() {
    this.filter.myFilter = this.filter.myFilter = {
      vin: "''",
      colors: [],
      vehicleType: [],
      brands: "''",
      locations: [],
      from: "''",
      to: "''",
      company: [],
      model: "''",
      lotNo: "''",
      licensePlate: "''",
      tagNo: "''",
      vehicleDispatchStatus: [],
      planCode: "''",
      customerName: "''",
      shippingCompany: [],
      bookingNo: "''",
      containerNo: "''",
      loadingPlanNo: "''",
      consignee: "''",
      planDispatchDateFrom: "''",
      planDispatchDateTo: "''",
      planStatus: [],
      vehicleExpenseDateFrom: "''",
      vehicleExpenseDateTo: "''",
      vehicleBillableItem: [],
      vehicleSupplier: "''",
      vehicleRefNo: "''",
      vehicleCostPriceFrom: "''",
      vehicleCostPriceTo: "''",
      vehicleSellingPriceFrom: "''",
      vehicleSellingPriceTo: "''",
      planExpenseDateFrom: "''",
      planExpenseDateTo: "''",
      planBillableItem: [],
      planSupplier: "''",
      planRefNo: "''",
      planCostPriceFrom: "''",
      planCostPriceTo: "''",
      planSellingPriceFrom: "''",
      planSellingPriceTo: "''",
      planInvoiceNo: "''",
      planInvoiceTotalAmountFrom: "''",
      planInvoiceTotalAmountTo: "''",
      paymentDateFrom: "''",
      paymentDateTo: "''",
      paymentType: [],
      paymentRefType: "''",
      paymentAmountFrom: "''",
      paymentAmountTo: "''",
    }
    // this.filter.parentVehicle.refreshMe();
  }
}
