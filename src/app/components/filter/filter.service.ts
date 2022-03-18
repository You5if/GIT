import { Injectable } from '@angular/core';
import { SDVehicleDetailComponent } from '../AlaadinShipping/sdvehicledetail/sdvehicledetail.component';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  myFilter = {
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
  parentVehicle: SDVehicleDetailComponent;

  reCheck: boolean;

  constructor() { }

  paymentAmountFrom() {
    return this.myFilter.paymentAmountFrom;
  }

  paymentAmountTo() {
    return this.myFilter.paymentAmountTo;
  }

  paymentRefType() {
    return this.myFilter.paymentRefType;
  }

  getPaymentType() {
    let x = "''";
    for(let i = 0; i < this.myFilter.paymentType.length; i++) {
      if(i === 0) {
        x = this.myFilter.paymentType[i];
      } else {
        x = x + ',' + this.myFilter.paymentType[i];
      }
    }
    return x;
  }

  paymentDateFrom() {
    return this.myFilter.paymentDateFrom;
  }

  paymentDateTo() {
    return this.myFilter.paymentDateTo;
  }

  planInvoiceTotalAmountFrom() {
    return this.myFilter.planInvoiceTotalAmountFrom;
  }

  planInvoiceTotalAmountTo() {
    return this.myFilter.planInvoiceTotalAmountTo;
  }

  planInvoiceNo() {
    return this.myFilter.planInvoiceNo;
  }

  planSellingPriceFrom() {
    return this.myFilter.planSellingPriceFrom;
  }

  planSellingPriceTo() {
    return this.myFilter.planSellingPriceTo;
  }

  planCostPriceFrom() {
    return this.myFilter.planCostPriceFrom;
  }

  planCostPriceTo() {
    return this.myFilter.planCostPriceTo;
  }

  getPlanRefNo() {
    return this.myFilter.planRefNo;
  }

  getPlanBillableItem() {
    let x = "''";
    for(let i = 0; i < this.myFilter.planBillableItem.length; i++) {
      if(i === 0) {
        x = this.myFilter.planBillableItem[i];
      } else {
        x = x + ',' + this.myFilter.planBillableItem[i];
      }
    }
    return x;
  }

  getPlanExpenseDateFrom() {
    return this.myFilter.planExpenseDateFrom;
  }

  getPlanExpenseDateTo() {
    return this.myFilter.planExpenseDateTo;
  }

  vehicleSellingPriceFrom() {
    return this.myFilter.vehicleSellingPriceFrom;
  }

  vehicleSellingPriceTo() {
    return this.myFilter.vehicleSellingPriceTo;
  }

  vehicleCostPriceFrom() {
    return this.myFilter.vehicleCostPriceFrom;
  }

  vehicleCostPriceTo() {
    return this.myFilter.vehicleCostPriceTo;
  }

  getVehicleRefNo() {
    return this.myFilter.vehicleRefNo;
  }

  getVehicleSupplier() {
    return this.myFilter.vehicleSupplier;
  }

  getVehicleBillableItem() {
    let x = "''";
    for(let i = 0; i < this.myFilter.vehicleBillableItem.length; i++) {
      if(i === 0) {
        x = this.myFilter.vehicleBillableItem[i];
      } else {
        x = x + ',' + this.myFilter.vehicleBillableItem[i];
      }
    }
    return x;
  }

  getVehicleExpenseDateFrom() {
    return this.myFilter.vehicleExpenseDateFrom;
  }

  getVehicleExpenseDateTo() {
    return this.myFilter.vehicleExpenseDateTo;
  }

  getPlanStatus() {
    let x = "''";
    for(let i = 0; i < this.myFilter.planStatus.length; i++) {
      if(i === 0) {
        x = this.myFilter.planStatus[i];
      } else {
        x = x + ',' + this.myFilter.planStatus[i];
      }
    }
    return x;
  }

  getplanDispatchDateFrom() {
    return this.myFilter.planDispatchDateFrom;
  }

  getplanDispatchDateTo() {
    return this.myFilter.planDispatchDateTo;
  }

  getConsignee() {
    return this.myFilter.consignee;
  }

  getLoadingPlanNo() {
    return this.myFilter.loadingPlanNo;
  }

  getContainerNo() {
    return this.myFilter.containerNo;
  }

  getBookingNo() {
    return this.myFilter.bookingNo;
  }

  getShippingCompany() {
    let x = "''";
    for(let i = 0; i < this.myFilter.shippingCompany.length; i++) {
      if(i === 0) {
        x = this.myFilter.shippingCompany[i];
      } else {
        x = x + ',' + this.myFilter.shippingCompany[i];
      }
    }
    return x;
  }

  getCustomerName() {
    return this.myFilter.customerName;
  }

  getPlanCode() {
    return this.myFilter.planCode;
  }

  getVehicleDispatchStatus() {
    let x = "''";
    for(let i = 0; i < this.myFilter.vehicleDispatchStatus.length; i++) {
      if(i === 0) {
        x = this.myFilter.vehicleDispatchStatus[i];
      } else {
        x = x + ',' + this.myFilter.vehicleDispatchStatus[i];
      }
    }
    return x;
  }

  getTagNo() {
    return this.myFilter.tagNo;
  }

  getlicensePlate() {
    return this.myFilter.licensePlate;
  }

  getLotNo() {
    return this.myFilter.lotNo;
  }

  getModel() {
    return this.myFilter.vin;
  }

  getCompany() {
    let x = "''";
    for(let i = 0; i < this.myFilter.company.length; i++) {
      if(i === 0) {
        x = this.myFilter.company[i];
      } else {
        x = x + ',' + this.myFilter.company[i];
      }
    }
    return x;
  }

  getVin() {
    return this.myFilter.vin;
  }

  getLocation() {
    let x = "''";
    for(let i = 0; i < this.myFilter.locations.length; i++) {
      if(i === 0) {
        x = this.myFilter.locations[i];
      } else {
        x = x + ',' + this.myFilter.locations[i];
      }
    }
    return x;
  }

  getBrand() {
    return this.myFilter.brands;
  }

  getColor() {
    let x = "''";
    if(this.myFilter.colors.length !== 0) {
    for(let i = 0; i < this.myFilter.colors.length; i++) {
      if(i === 0) {
        x = this.myFilter.colors[i].name
      } else {
        x = x + ',' + this.myFilter.colors[i].name
      }
    }
  }
    return x;
  }

  getVehicleType() {
    let x = "''";
    for(let i = 0; i < this.myFilter.vehicleType.length; i++) {
      if(i === 0) {
        x = this.myFilter.vehicleType[i];
      } else {
        x = x + ',' + this.myFilter.vehicleType[i];
      }
    }
    return x;
  }

  getFrom() {
    return this.myFilter.from;
  }

  getTo() {
    return this.myFilter.to;
  }

  setVehicle(x: SDVehicleDetailComponent) {
    this.parentVehicle = x;
  }

  clearFilter2() {
    this.myFilter = {
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
    };
  }

}
