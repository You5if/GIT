import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import {
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatBottomSheetModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DIALOG_DATA,
  MatDialogRef
} from "@angular/material";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JwtModule } from "@auth0/angular-jwt";
import { HttpModule } from "@angular/http";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DatePipe } from "@angular/common";
import { MaterialModule } from "src/app/material.module";
import { MenuItemComponent } from "./components/dynamic/menu/menu-item/menu-item.component";
import { AppGlobals } from "./app.global";
import { CommonService } from "./components/common/common.service";
import { MenuBarComponent } from "./components/dynamic/menu/menu-bar/menu-bar.component";
import { DashboardComponent } from "./components/dynamic/dashboard/dashboard.component";
import { ChartModule } from "angular2-chartjs";
import { ChangePasswordComponent } from "./components/security/user/change-password/change-password.component";
import { UIService } from "./components/shared/uiservices/UI.service";
import { MessageBoxService } from "./components/messagebox/message-box.service";
import { UserService } from "./components/security/user/user.service";
import { ErrorBoxComponent } from "./components/messagebox/error-box/error-box.component";
import { ErrorApiBoxComponent } from "./components/messagebox/error-api-box/error-api-box.component";
import { WarningBoxComponent } from "./components/messagebox/warning-box/warning-box.component";
import { PleaseWaitComponent } from "./components/shared/uiservices/please-wait/please-wait.component";
import { LoginComponent } from "./components/security/auth/login/login.component";
import { LandingMenuComponent } from "./components/dynamic/menu/landing-menu/landing-menu.component";
import { WelcomeComponent } from "./components/dynamic/welcome/welcome.component";
import { TokenInterceptor } from "./token-interceptor";
import { AuthGuard } from "./components/security/auth/auth-guard";
import { AuthService } from "./components/security/auth/auth.service";
import { CityComponent } from "./components/security/admin/regional/city/city.component";
import { RegionalService } from "./components/security/admin/regional/regional.service";
import { CountryComponent } from "./components/security/admin/regional/country/country.component";
import { CountryEntryComponent } from "./components/security/admin/regional/country/country-entry/country-entry.component";
import { PageEventsService } from "./components/common/pageevents/page-events.service";
import { SelectService } from "./components/common/select.service";
import { PageSortComponent } from "./components/common/pageevents/page-sort/page-sort.component";
import { UploadComponent } from "./components/common/upload/upload.component";
import { UploadFilesComponent } from "./components/common/upload/upload-files/upload-files.component";
import {
  ReportPageComponent,
  SafePipe
} from "./components/PR/report-page/report-page.component";
import { MenuSetupComponent } from "./components/security/admin/menu-setup/menu-setup.component";
import { StateComponent } from "./components/security/admin/regional/state/state.component";
import { NotActivatedComponent } from "src/app/components/dynamic/notactivated/notactivated.component";
import { SignUpComponent } from "src/app/components/security/signup/signup.component";
import { SignUpService } from "./components/security/signup/signup.service";
import { AccountActivatedComponent } from "./components/dynamic/accountactivated/accountactivated.component";
import { RegistrationExpiredComponent } from "src/app/components/dynamic/registrationexpired/registrationexpired.component";
import { ChangePasswordAnonComponent } from "./components/dynamic/change-passwordanon/change-passwordanon.component";
import { AttendanceuploadComponent } from "./components/StatesDispatch/upload/upload.component";
import { NgxImageCompressService } from "ngx-image-compress";
import { Ng2ImgMaxModule } from "ng2-img-max";
import { SDBatchVehicleEntryComponent } from "./components/AlaadinShipping/sdbatchvehicleentry/sdbatchvehicleentry.component";
import { SDVehicleDetailComponent } from "./components/AlaadinShipping/sdvehicledetail/sdvehicledetail.component";
import { SDVehicleDetailEntryComponent } from "./components/AlaadinShipping/sdvehicledetail/sdvehicledetail-entry/sdvehicledetail-entry.component";
import { SDShippingLineCompaniesEntryComponent } from "./components/AlaadinShipping/sdshippinglinecompanies/sdshippinglinecompanies-entry/sdshippinglinecompanies-entry.component";
import { SDShippingLineCompaniesComponent } from "./components/AlaadinShipping/sdshippinglinecompanies/sdshippinglinecompanies.component";
import { SDDispatchPlanComponent } from "./components/AlaadinShipping/sddispatchplan/sddispatchplan.component";
import { SDDispatchPlanEntryComponent } from "./components/AlaadinShipping/sddispatchplan/sddispatchplan-entry/sddispatchplan-entry.component";
import { SDDispatchPlanExpenseEntryComponent } from "./components/AlaadinShipping/sddispatchplanexpense/sddispatchplanexpense-entry/sddispatchplanexpense-entry.component";
import { SDDispatchPlanExpenseComponent } from "./components/AlaadinShipping/sddispatchplanexpense/sddispatchplanexpense.component";
import { SDDispatchPlanInvoiceComponent } from "./components/AlaadinShipping/sddispatchplaninvoice/sddispatchplaninvoice.component";
import { SDDispatchPlanInvoiceEntryComponent } from "./components/AlaadinShipping/sddispatchplaninvoice/sddispatchplaninvoice-entry/sddispatchplaninvoice-entry.component";
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from "angular4-social-login";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { SignUpContComponent } from "./components/security/signupcont/signup.component";
// import { LoginGoogleComponent } from "./components/security/auth/logingoogle/login.component";
// import { LoginAppComponent } from "./components/security/auth/loginapp/login.component";
import { SDAppFeedbackComponent } from "./components/AlaadinShipping/sdappfeedback/sdappfeedback.component";
import { SDAppFeedbackEntryComponent } from "./components/AlaadinShipping/sdappfeedback/sdappfeedback-entry/sdappfeedback-entry.component";
import { SDVehicleBatchEntryComponent } from "./components/AlaadinShipping/sdvehiclebatch/sdvehiclebatch-entry/sdvehiclebatch-entry.component";
import { SDVehicleBatchComponent } from "./components/AlaadinShipping/sdvehiclebatch/sdvehiclebatch.component";
import { SDCityComponent } from "./components/AlaadinShipping/sdcity/sdcity.component";
import { SDCityEntryComponent } from "./components/AlaadinShipping/sdcity/sdcity-entry/sdcity-entry.component";
import { SDCompanyEntryComponent } from "./components/AlaadinShipping/sdcompany/sdcompany-entry/sdcompany-entry.component";
import { SDCompanyContactsEntryComponent } from "./components/AlaadinShipping/sdcompanycontacts/sdcompanycontacts-entry/sdcompanycontacts-entry.component";
import { SDCountryEntryComponent } from "./components/AlaadinShipping/sdcountry/sdcountry-entry/sdcountry-entry.component";
import { SDDispatchPlanInvoicePaymentEntryComponent } from "./components/AlaadinShipping/sddispatchplaninvoicepayment/sddispatchplaninvoicepayment-entry/sddispatchplaninvoicepayment-entry.component";
import { SDStateEntryComponent } from "./components/AlaadinShipping/sdstate/sdstate-entry/sdstate-entry.component";
import { SDCompanyComponent } from "./components/AlaadinShipping/sdcompany/sdcompany.component";
import { SDCompanyContactsComponent } from "./components/AlaadinShipping/sdcompanycontacts/sdcompanycontacts.component";
import { SDCountryComponent } from "./components/AlaadinShipping/sdcountry/sdcountry.component";
import { SDDispatchPlanInvoicePaymentComponent } from "./components/AlaadinShipping/sddispatchplaninvoicepayment/sddispatchplaninvoicepayment.component";
import { SDStateComponent } from "./components/AlaadinShipping/sdstate/sdstate.component";
import { VerifyComponent } from "./components/dynamic/verify/verify.component";
import { AttendanceuploadReadComponent } from "./components/StatesDispatch/uploadRead/uploadRead.component";
import { UploadFilesReadComponent } from "./components/common/uploadMainRead/upload-files/upload-files.component";
import { UploadReadComponent } from "./components/common/uploadMainRead/upload.component";
import { SDCarMakeEntryComponent } from "./components/AlaadinShipping/sdcarmake/sdcarmake-entry/sdcarmake-entry.component";
import { SDCarMakeComponent } from "./components/AlaadinShipping/sdcarmake/sdcarmake.component";
import { SDCarModelComponent } from "./components/AlaadinShipping/sdcarmodel/sdcarmodel.component";
import { SDCarModelEntryComponent } from "./components/AlaadinShipping/sdcarmodel/sdcarmodel-entry/sdcarmodel-entry.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { SDUserComponent } from "./components/AlaadinShipping/sduser/sduser.component";
import { SDUserEntryComponent } from "./components/AlaadinShipping/sduser/sduser-entry/sduser-entry.component";
import { SDDispatchPlanPaymentComponent } from "./components/AlaadinShipping/sddispatchplanpayment/sddispatchplanpayment.component";
import { SDDispatchPlanPaymentEntryComponent } from "./components/AlaadinShipping/sddispatchplanpayment/sddispatchplanpayment-entry/sddispatchplanpayment-entry.component";
import { ByYearComponent } from "./components/filterComponents/by-year/by-year.component";
import { FilterComponent } from "./components/filter/filter.component";
import { ByBrandComponent } from "./components/filterComponents/by-brand/by-brand.component";
import { ByVehicleTypeComponent } from "./components/filterComponents/by-vehicle-type/by-vehicle-type.component";
import { ByLocationComponent } from "./components/filterComponents/by-location/by-location.component";
import { ByColorComponent } from "./components/filterComponents/by-color/by-color.component";
import { FilterService } from "./components/filter/filter.service";
import { ByVinComponent } from "./components/filterComponents/by-vin/by-vin.component";
import { ByCompanyComponent } from "./components/filterComponents/by-company/by-company.component";
import { ByModelComponent } from "./components/filterComponents/by-model/by-model.component";
import { ByLotNoComponent } from "./components/filterComponents/by-lot-no/by-lot-no.component";
import { LicensePlateComponent } from "./components/filterComponents/by-license-plate/by-license-plate.component";
import { TagNoComponent } from "./components/filterComponents/by-tag-no/by-tag-no.component";
import { ByVehicleDispatchStatusComponent } from "./components/filterComponents/by-vehicle-dispatch-status/by-vehicle-dispatch-status.component";
import { ByPlanCodeComponent } from "./components/filterComponents/by-plan-code/by-plan-code.component";
import { ByCustomerNameComponent } from "./components/filterComponents/by-customer-name/by-customer-name.component";
import { ByShippingCompanyComponent } from "./components/filterComponents/by-shipping-company/by-shipping-company.component";
import { ByBookingNoComponent } from "./components/filterComponents/by-booking-no/by-booking-no.component";
import { ContainerNoComponent } from "./components/filterComponents/by-container-no/by-container-no.component";
import { ByLoadingPlanNoComponent } from "./components/filterComponents/by-loading-plan-no/by-loading-plan-no.component";
import { ByConsigneeComponent } from "./components/filterComponents/by-consignee/by-consignee.component";
import { ByPlanDispatchDateComponent } from "./components/filterComponents/by-plan-dispatch-date/by-plan-dispatch-date.component";
import { ByPlanStatusComponent } from "./components/filterComponents/by-plan-status/by-plan-status.component";
import { ByExpenseDateComponent } from "./components/filterComponents/by-vehicle-expense-date/by-vehicle-expense-date.component";
import { ByVehicleBillableItemComponent } from "./components/filterComponents/by-vehicle-billable-item/by-vehicle-billable-item.component";
import { ByVehicleSupplierComponent } from "./components/filterComponents/by-vehicle-supplier/by-vehicle-supplier.component";
import { ByVehicleRefNoComponent } from "./components/filterComponents/by-vehicle-ref-no/by-vehicle-ref-no.component";
import { ByVehicleCostPriceComponent } from "./components/filterComponents/by-vehicle-cost-price/by-vehicle-cost-price.component";
import { ByVehicleSellingPriceComponent } from "./components/filterComponents/by-vehicle-selling-price/by-vehicle-selling-price.component";
import { ByPlanExpenseDateComponent } from "./components/filterComponents/by-plan-expense-date/by-plan-expense-date.component";
import { ByPlanBillableItemComponent } from "./components/filterComponents/by-plan-billable-item/by-plan-billable-item.component";
import { ByPlanSupplierComponent } from "./components/filterComponents/by-plan-supplier/by-plan-supplier.component";
import { ByPlanRefNoComponent } from "./components/filterComponents/by-plan-ref-no/by-plan-ref-no.component";
import { ByPlanCostPriceComponent } from "./components/filterComponents/by-plan-cost-price/by-plan-cost-price.component";
import { ByPlanSellingPriceComponent } from "./components/filterComponents/by-plan-selling-price/by-plan-selling-price.component";
import { ByInvoiceNoComponent } from "./components/filterComponents/by-plan-invoice-no/by-plan-invoice-no.component";
import { ByInvoiceTotalAmountComponent } from "./components/filterComponents/by-invoice-total-amount/by-invoice-total-amount.component";
import { ByPaymentDateComponent } from "./components/filterComponents/by-payment-date/by-payment-date.component";
import { ByPaymentTypeComponent } from "./components/filterComponents/by-payment-type/by-payment-type.component";
import { ByPaymentRefTypeComponent } from "./components/filterComponents/by-ref-type/by-payment-ref-type.component";
import { ByPaymentAmountComponent } from "./components/filterComponents/by-payment-amount/by-payment-amount.component";
import { BatchVehiclePlanEntryComponent } from "./components/AlaadinShipping/sdvehicledetail/batchvehicleplan-entry/batchvehicleplan-entry.component";
import { FinancialReportComponent } from "./financial-report/financial-report.component";
import { MasterReportComponent } from "./master-report/master-report.component";
import { ReportComponent } from "./report/report.component";
import { ConfirmComponent } from './components/common/confirm/confirm.component';
import { ReportPageEmailComponent } from "./components/PR/report-pageemail/report-pageemail.component";


import { DApiSerivce } from "./api.service";


import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";

import { SystemNavigationComponent } from './system/system-navigation/system-navigation.component';
import { SystemHomeComponent } from './system/system-home/system-home.component';

import { SystemBusinessProfileComponent } from './system/system-business-profile/system-business-profile.component';
import { SystemTaxComponent } from './system/tax/system-tax/system-tax.component';
import { SystemAccountComponent } from './system/account/system-account/system-account.component';
import { SystemForexComponent } from './system/forex/system-forex/system-forex.component';
import { AccountComponent } from "./system/account/account.component";
import { ForexComponent } from "./system/forex/forex.component";
import { TaxComponent } from "./system/tax/tax.component";
import { JournalEntryComponent } from "./system/journalentry/journalentry.component";
import { JournalEntryEntryComponent } from "./system/journalentry/journalentry-entry/journalentry-entry.component";
import { UploadProfileComponent } from "./system/upload/upload.component";
import { UploadFiles2Component } from "./system/upload/upload-files/upload-files.component";
import { ExpenseFilingEntryComponent } from "./system/expensefiling/expensefiling/expensefiling-entry/expensefiling-entry.component";
import { ExpenseFilingComponent } from "./system/expensefiling/expensefiling/expensefiling.component";
import { SystemLoginComponent } from './system/system-login/system-login.component';
import { AccountConfigurationComponent } from "./system/GeneratedComponents01Apr/accountconfiguration/accountconfiguration.component";
import { AccountConfigurationEntryComponent } from "./system/GeneratedComponents01Apr/accountconfiguration/accountconfiguration-entry/accountconfiguration-entry.component";
import { CustomerComponent } from "./system/GeneratedComponents01Apr/customer/customer.component";
import { CustomerEntryComponent } from "./system/GeneratedComponents01Apr/customer/customer-entry/customer-entry.component";
import { ProductCategoryComponent } from "./system/GeneratedComponents01Apr/productcategory/productcategory.component";
import { ProductCategoryEntryComponent } from "./system/GeneratedComponents01Apr/productcategory/productcategory-entry/productcategory-entry.component";
import { ProductGroupComponent } from "./system/GeneratedComponents01Apr/productgroup/productgroup.component";
import { ProductGroupEntryComponent } from "./system/GeneratedComponents01Apr/productgroup/productgroup-entry/productgroup-entry.component";
import { ProductUnitComponent } from "./system/GeneratedComponents01Apr/productunit/productunit.component";
import { ProductUnitEntryComponent } from "./system/GeneratedComponents01Apr/productunit/productunit-entry/productunit-entry.component";
import { ProductUnitConversionService } from "./system/GeneratedComponents01Apr/productunitconversion/productunitconversion.service";
import { ProductUnitConversionComponent } from "./system/GeneratedComponents01Apr/productunitconversion/productunitconversion.component";
import { ProductUnitConversionEntryComponent } from "./system/GeneratedComponents01Apr/productunitconversion/productunitconversion-entry/productunitconversion-entry.component";
import { WareHouseComponent } from "./system/GeneratedComponents01Apr/warehouse/warehouse.component";
import { WareHouseEntryComponent } from "./system/GeneratedComponents01Apr/warehouse/warehouse-entry/warehouse-entry.component";
import { ProductEntryComponent } from "./system/GeneratedComponents01Apr/product/product-entry/product-entry.component";
import { ProductComponent } from "./system/GeneratedComponents01Apr/product/product.component";
import { ExpensedynamicComponent } from './system/expensedynamic/expensedynamic.component';
import { ExpensedynamicEntryComponent } from "./system/expensedynamic/expensedynamic-entry/expensedynamic-entry.component";
import { CompanyBankComponent } from "./system/AnotherComponents/companybank/companybank.component";
import { CompanyBankEntryComponent } from "./system/AnotherComponents/companybank/companybank-entry/companybank-entry.component";
import { CompanyBankBranchComponent } from "./system/AnotherComponents/companybankbranch/companybankbranch.component";
import { CompanyBankBranchEntryComponent } from "./system/AnotherComponents/companybankbranch/companybankbranch-entry/companybankbranch-entry.component";
import { CompanyBankBranchAccountComponent } from "./system/AnotherComponents/companybankbranchaccount/companybankbranchaccount.component";
import { CompanyBankBranchAccountEntryComponent } from "./system/AnotherComponents/companybankbranchaccount/companybankbranchaccount-entry/companybankbranchaccount-entry.component";
import { InvoiceComponent } from "./system/AnotherComponents/invoice/invoice.component";
import { InvoiceEntryComponent } from "./system/AnotherComponents/invoice/invoice-entry/invoice-entry.component";
import { PaymentFromCompanyComponent } from "./system/AnotherComponents/paymentfromcompany/paymentfromcompany.component";
import { PaymentFromCompanyEntryComponent } from "./system/AnotherComponents/paymentfromcompany/paymentfromcompany-entry/paymentfromcompany-entry.component";
import { PaymentToCompanyComponent } from "./system/AnotherComponents/paymenttocompany/paymenttocompany.component";
import { PaymentToCompanyEntryComponent } from "./system/AnotherComponents/paymenttocompany/paymenttocompany-entry/paymenttocompany-entry.component";
import { ProductPricingComponent } from "./system/AnotherComponents/productpricing/productpricing.component";
import { ProductPricingEntryComponent } from "./system/AnotherComponents/productpricing/productpricing-entry/productpricing-entry.component";
import { StockInEntryComponent } from "./system/AnotherComponents/stockin/stockin-entry/stockin-entry.component";
import { StockInComponent } from "./system/AnotherComponents/stockin/stockin.component";
import { StockMovementComponent } from "./system/AnotherComponents/stockmovement/stockmovement.component";
import { StockMovementEntryComponent } from "./system/AnotherComponents/stockmovement/stockmovement-entry/stockmovement-entry.component";
import { JournaldynamicComponent } from "./system/journaldynamic/journaldynamic.component";
import { JournaldynamicEntryComponent } from "./system/journaldynamic/journaldynamic-entry/journaldynamic-entry.component";
import { ProductStockComponent } from "./system/GeneratedComponents01Apr/productstock/productstock.component";
import { ProductStockEntryComponent } from "./system/GeneratedComponents01Apr/productstock/productstock-entry/productstock-entry.component";
import { DecimalComponent } from './system/decimal/decimal.component';
import { IsDecimalDirectiveDirective } from './system/is-decimal-directive.directive';
import { ReportsComponent } from './system/reports/reports.component';
import { FinancialComponent } from './system/reports/financial/financial.component';
import { Prod2Component } from "./system/AnotherComponents/productpricing/productpricing-entry/prod2.component";
import { ChequeToCompanyEntryComponent } from "./system/AnotherComponents/chequetocompany/chequetocompany-entry/chequetocompany-entry.component";
import { ChequeToCompanyComponent } from "./system/AnotherComponents/chequetocompany/chequetocompany.component";
import { ChartsComponent } from './system/charts/charts.component';
import { ChartsModule } from "ng2-charts";
import { EchartsComponent } from "./system/echarts/echarts.component";


import { BarCodeComponent } from './system/bar-code/bar-code.component';


import { WorkspaceComponent } from "./system/workspace/workspace.component";
import { WorkspaceEntryComponent } from "./system/workspace/workspace-entry/workspace-entry.component";
import { BoardComponent } from "./system/workspace/board/board.component";
import { BrdStateComponent } from "./system/workspace/brdstate/brdstate.component";
import { BoardEntryComponent } from "./system/workspace/board/board-entry/board-entry.component";
import { BrdStateEntryComponent } from "./system/workspace/brdstate/brdstate-entry/brdstate-entry.component";
import { AlertifyService } from "./alertify.service";
import { BoardTComponent } from "./system/template/board/board.component";

import { BrdStateTComponent } from "./system/template/brdstate/brdstate.component";
import { BoardTEntryComponent } from "./system/template/board/board-entry/board-entry.component";
import { BoardsComponent } from "./system/workspace/boards#/boards.component";
import { CardEntryComponent } from "./system/workspace/card-entry/card-entry.component";
import { UploadCardComponent } from "./system/workspace/card-entry/upload/upload.component";
import { UploadFiles3Component } from "./system/workspace/card-entry/upload/upload-files/upload-files.component";
import { ClientUserEntryComponent } from "./system/clientuser/clientuser-entry/clientuser-entry.component";
import { ClientUserComponent } from "./system/clientuser/clientuser.component";
import { CheckfordeleteComponent } from "./system/workspace/card-entry/checkfordelete/checkfordelete.component";
import { ChangePasswordNewComponent } from "./system/system-navigation/change-password.component";
import { CardUserEntryComponent } from "./system/workspace/card-entry/carduser-entry/carduser-entry.component";










// local
// const google_oauth_client_id = '744138061341-gvqlm05t8e5bf4qj3ioscavd0ktb0j4t.apps.googleusercontent.com';
// global
const google_oauth_client_id =
  "744138061341-so8uhp36vi2pgkus63cn8diqjv0j9fta.apps.googleusercontent.com";

export let config: AuthServiceConfig = null;

export function prepareGoogleKey(): AuthServiceConfig {
  config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(google_oauth_client_id)
    }
  ]);
  return config;
}

config = prepareGoogleKey();

//step 1 of security (next: app.global.ts: baseAppName)
export function getAccessToken(): string {
  return localStorage.getItem("QUALITY_HOUSE_token");
}

export const jwtConfig = {
  tokenGetter: getAccessToken,
  // local
  // whiteListedDomains: ['localhost:4200']
  // global
  whiteListedDomains: ["89.34.16.77"]
};



@NgModule({
  
  declarations: [
    AppComponent,
    NotActivatedComponent,
    AccountActivatedComponent,
    RegistrationExpiredComponent,
    ChangePasswordComponent,
    ChangePasswordAnonComponent,
    DashboardComponent,
    ErrorBoxComponent,
    ErrorApiBoxComponent,
    WarningBoxComponent,
    PleaseWaitComponent,
    MenuBarComponent,
    MenuItemComponent,
    LoginComponent,
    LandingMenuComponent,
    WelcomeComponent,
    CountryComponent,
    CountryEntryComponent,
    CityComponent,
    PageSortComponent,
    UploadComponent,
    UploadFilesComponent,
    ReportPageComponent,
    MenuSetupComponent,
    SafePipe,
    StateComponent,
    SignUpComponent,
    UploadComponent,
    AttendanceuploadComponent,
    SDBatchVehicleEntryComponent,
    SDVehicleDetailComponent,
    SDVehicleDetailEntryComponent,
    SDShippingLineCompaniesComponent,
    SDShippingLineCompaniesEntryComponent,
    SDDispatchPlanComponent,
    SDDispatchPlanEntryComponent,
    SDDispatchPlanExpenseComponent,
    SDDispatchPlanExpenseEntryComponent,
    SDDispatchPlanInvoiceComponent,
    SDDispatchPlanInvoiceEntryComponent,
    SignUpContComponent,
    SDAppFeedbackComponent,
    SDAppFeedbackEntryComponent,
    SDVehicleBatchComponent,
    SDVehicleBatchEntryComponent,
    SDCityComponent,
    SDCityEntryComponent,
    SDDispatchPlanInvoiceComponent,
    SDDispatchPlanInvoiceEntryComponent,
    SDCompanyComponent,
    SDCompanyEntryComponent,
    SDCompanyContactsComponent,
    SDCompanyContactsEntryComponent,
    SDCountryComponent,
    SDCountryEntryComponent,
    SDDispatchPlanInvoicePaymentComponent,
    SDDispatchPlanInvoicePaymentEntryComponent,
    SDStateComponent,
    SDStateEntryComponent,
    VerifyComponent,
    AttendanceuploadReadComponent,
    UploadFilesReadComponent,
    UploadReadComponent,
    SDCarMakeComponent,
    SDCarMakeEntryComponent,
    SDCarModelComponent,
    SDCarModelEntryComponent,
    NavigationComponent,
    SDUserComponent,
    SDUserEntryComponent,
    SDDispatchPlanPaymentComponent,
    SDDispatchPlanPaymentEntryComponent,
    SDCompanyComponent,
    SDCompanyEntryComponent,
    FilterComponent,
    ByYearComponent,
    ByColorComponent,
    ByBrandComponent,
    ByVehicleTypeComponent,
    ByLocationComponent,
    ByVinComponent,
    ByCompanyComponent,
    ByModelComponent,
    ByLotNoComponent,
    LicensePlateComponent,
    TagNoComponent,
    ByVehicleDispatchStatusComponent,
    ByPlanCodeComponent,
    ByCustomerNameComponent,
    ByShippingCompanyComponent,
    ByBookingNoComponent,
    ContainerNoComponent,
    ByLoadingPlanNoComponent,
    ByConsigneeComponent,
    ByPlanDispatchDateComponent,
    ByPlanStatusComponent,
    ByExpenseDateComponent,
    ByVehicleBillableItemComponent,
    ByVehicleSupplierComponent,
    ByVehicleRefNoComponent,
    ByVehicleCostPriceComponent,
    ByVehicleSellingPriceComponent,
    ByPlanExpenseDateComponent,
    ByPlanBillableItemComponent,
    ByPlanSupplierComponent,
    ByPlanRefNoComponent,
    ByPlanCostPriceComponent,
    ByPlanSellingPriceComponent,
    ByInvoiceNoComponent,
    ByInvoiceTotalAmountComponent,
    ByPaymentDateComponent,
    ByPaymentTypeComponent,
    ByPaymentRefTypeComponent,
    ByPaymentAmountComponent,
    BatchVehiclePlanEntryComponent,
    MasterReportComponent,
    ReportComponent,
    ReportPageEmailComponent,
    FinancialReportComponent,
    ConfirmComponent,
    AccountComponent,
    ForexComponent,
    TaxComponent,
    DynamicFormComponent,
    SystemNavigationComponent,
    SystemHomeComponent,
    SystemBusinessProfileComponent,
    SystemTaxComponent,
    SystemAccountComponent,
    SystemForexComponent,
    JournalEntryComponent,
    JournalEntryEntryComponent,
    UploadProfileComponent,
    UploadCardComponent,
    UploadFiles2Component,
    UploadFiles3Component,
    ExpenseFilingEntryComponent,
    ExpenseFilingComponent,
    SystemLoginComponent,
    AccountConfigurationComponent,
    AccountConfigurationEntryComponent,
    CustomerComponent,
    CustomerEntryComponent,
    ProductCategoryComponent,
    ProductCategoryEntryComponent,
    ProductGroupComponent,
    ProductGroupEntryComponent,
    ProductUnitComponent,
    ProductUnitEntryComponent,
    ProductUnitConversionComponent,
    ProductUnitConversionEntryComponent,
    WareHouseComponent,
    WareHouseEntryComponent,
    ProductEntryComponent,
    ProductComponent,
    ExpensedynamicComponent,
    ExpensedynamicEntryComponent,
    CompanyBankComponent,
    CompanyBankEntryComponent,
    CompanyBankBranchComponent,
    CompanyBankBranchEntryComponent,
    CompanyBankBranchAccountComponent,
    CompanyBankBranchAccountEntryComponent,
    InvoiceComponent,
    InvoiceEntryComponent,
    PaymentFromCompanyComponent,
    PaymentFromCompanyEntryComponent,
    PaymentToCompanyComponent,
    PaymentToCompanyEntryComponent,
    ProductPricingComponent,
    ProductPricingEntryComponent,
    StockInComponent,
    StockInEntryComponent,
    StockMovementComponent,
    StockMovementEntryComponent,
    JournaldynamicComponent,
    JournaldynamicEntryComponent,
    ProductStockComponent,
    ProductStockEntryComponent,
    DecimalComponent,
    IsDecimalDirectiveDirective,
    ReportsComponent,
    FinancialComponent,
    Prod2Component,
    ChequeToCompanyComponent,
    ChequeToCompanyEntryComponent,
    ChartsComponent,
    EchartsComponent,
    WorkspaceEntryComponent,
    WorkspaceComponent,
    BarCodeComponent,
    
    BoardComponent,
    BoardsComponent,
    
    BrdStateTComponent,
    BrdStateComponent,
    BoardTComponent,
    BoardEntryComponent,
    
    BrdStateEntryComponent,
    BoardTEntryComponent,
    CardEntryComponent,
    ClientUserComponent,
    ClientUserEntryComponent,
    CheckfordeleteComponent,
    ChangePasswordNewComponent,
    CardUserEntryComponent,
    
  ],
  imports: [
    SocialLoginModule.initialize(config),
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    Ng2ImgMaxModule,
    MatToolbarModule,
    AppRoutingModule,
    ChartModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    JwtModule.forRoot({
      config: jwtConfig
    }),
    MaterialModule,
    MatBottomSheetModule,
    ChartsModule,
    
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
{ provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AppGlobals,
    DApiSerivce,
    AuthGuard,
    AuthService,
    CommonService,
    RegionalService,
    DatePipe,
    MessageBoxService,
    FilterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    UIService,
    UserService,
    PageEventsService,
    SelectService,
    SignUpService,
    NgxImageCompressService,
    AlertifyService,


  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ErrorBoxComponent,
    ErrorApiBoxComponent,
    WarningBoxComponent,
    PleaseWaitComponent,
    CountryEntryComponent,
    PageSortComponent,
    SDVehicleDetailEntryComponent,
    SDShippingLineCompaniesEntryComponent,
    UploadComponent,
    AttendanceuploadComponent,
    SDDispatchPlanEntryComponent,
    SDDispatchPlanExpenseEntryComponent,
    SDDispatchPlanInvoiceEntryComponent,
    SDAppFeedbackEntryComponent,
    SDVehicleBatchEntryComponent,
    SDCityEntryComponent,
    SDDispatchPlanInvoiceEntryComponent,
    SDCompanyEntryComponent,
    SDCompanyContactsEntryComponent,
    SDCountryEntryComponent,
    SDDispatchPlanInvoicePaymentEntryComponent,
    SDStateEntryComponent,
    AttendanceuploadReadComponent,
    UploadFilesReadComponent,
    UploadReadComponent,
    SDCarMakeEntryComponent,
    SDCarModelEntryComponent,
    SDBatchVehicleEntryComponent,
    SDUserEntryComponent,
    SDDispatchPlanPaymentEntryComponent,
    SDCompanyEntryComponent,
    FilterComponent,
    BatchVehiclePlanEntryComponent,
    FinancialReportComponent,
    MasterReportComponent,
    ReportComponent,
    // ReportPageEmailComponent,
    ConfirmComponent,
    SystemAccountComponent,
    SystemForexComponent,
    SystemTaxComponent,
    JournalEntryEntryComponent,
    ExpenseFilingEntryComponent,
    AccountConfigurationEntryComponent,
    
    CustomerEntryComponent,
    ProductEntryComponent,
    
    ProductCategoryEntryComponent,
    
    ProductGroupEntryComponent,
    
    ProductUnitEntryComponent,
    
    ProductUnitConversionEntryComponent,
    
    WareHouseEntryComponent,
    ExpensedynamicEntryComponent,
    CompanyBankEntryComponent,
    CompanyBankBranchEntryComponent,
    CompanyBankBranchAccountEntryComponent,
    InvoiceEntryComponent,
    PaymentFromCompanyEntryComponent,
    PaymentToCompanyEntryComponent,
    ProductPricingEntryComponent,
    StockInEntryComponent,
    StockMovementEntryComponent,
    JournaldynamicEntryComponent,
    ProductStockEntryComponent,
    Prod2Component,
    ChequeToCompanyEntryComponent,
    WorkspaceEntryComponent,
    BoardEntryComponent,
    BrdStateEntryComponent,
    BoardTEntryComponent,
    CardEntryComponent,
    ClientUserEntryComponent,
    CheckfordeleteComponent,
    ChangePasswordNewComponent,
    CardUserEntryComponent,
  ]
})
export class AppModule {}
