import { Component, OnInit } from '@angular/core';
import { MatDialog, matDrawerAnimations } from '@angular/material';
import { ResizeEvent } from 'angular-resizable-element';
import { AppGlobals } from 'src/app/app.global';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { LoginModule } from 'src/app/components/security/auth/login/login.model';
import { ChangePasswordNewComponent } from './change-password.component';

@Component({
  selector: 'app-system-navigation',
  templateUrl: './system-navigation.component.html',
  styleUrls: ['./system-navigation.component.scss']
})
export class SystemNavigationComponent implements OnInit {

  showFiller = false;
  showButton: boolean = false;
  key: number;
  lang: string = "Arabic";
  direction: string = "ltr";
  lang_LS: string = "16001";
  break: boolean = true;
  title = 'SystemHR1';
  home: string;
  businessP: string;
  profile:string;
  journal: string;
  expense: string;
  tax: string;
  forex: string;
  account: string;
  paymentFromCompany: string;
  userManagement:string;
  clientUser: string;
  paymentToCompany: string;
  invoice: string;
  bank: string;
  bankBranch: string;
  bankAccount: string;
  cheque: string;
  customer: string;
  accountConfiguration: string;
  accounting: string;
  config: string;
  sales: string;
  inventory: string;
  product: string;
  productCategory: string;
  changePassword:string;
  productGroup: string;
  productUnit: string;
  productPricing: string;
  productStock: string;
  productUnitConversion: string;
  warehouse: string;
  stockIn: string;
  stockMovement: string;
  logout: string;
  change: string;
  resizeStyle: object = {};
  taskManagement: string;
  workSpace:string;

  isOpen_YourVariable = true;
  

  navigation: string;
  role = localStorage.getItem("role");
  

  model: LoginModule = {
    'username': 'milesh@markoncs.com',
    'password': '123456789',
    'loginType': 1
  }
  workSpace2: string;

  constructor(
    private _globals: AppGlobals,
    public dialog: MatDialog,
    private _auth: AuthService,) { }
    

    
ngOnInit(): void {

  this.role = localStorage.getItem("role");
  console.log(this.role);
  

  this.resizeStyle = {
    "max-width": `30%`,
  };
  this.home = "Home"
      this.businessP = "Company profile"
      this.journal = "Journal"
      this.expense = "Expense"
      this.bank = "Bank"
      this.profile = "Profile"
      this.invoice = "Invoice"
      this.changePassword = "Change password"
      this.bankBranch = "Bank branch"
      this.bankAccount = "Bank account"
      this.paymentFromCompany = "Company payment"
      this.paymentToCompany = "Customer payment"
      this.accountConfiguration = "Account configuration"
      this.taskManagement = "Task management"
      this.workSpace = "Workspace"
      this.workSpace2 = "Template"
      this.tax = "Tax"
      this.userManagement = "User management"
      this.clientUser = "Users"
      this.forex = "Forex"
      this.customer = "Customer"
      this.account = "Account"
      this.accounting = "Accounting"
      this.config = "Configrations"
      this.sales = "Sales"
      this.inventory = "Service management"
      this.product = "Service"
      this.productCategory = "Service category"
      this.productGroup = "Service group"
      this.productUnit = "Product unit"
      this.productPricing = "Service pricing"
      this.productStock = "Product stock"
      this.productUnitConversion = "Product unit conversion"
      this.warehouse = "Warehouse"
      this.stockIn = "Stock in"
      this.stockMovement = "Stock movement"
      this.cheque = "Cheque"
      this.logout = "Logout"
      this.change = "Language:"
  if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Home") {
    this.key = 0
    this.navigation = "Home"
    this.onClickListItem('H')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "BusinessProfile") {
    this.key = 1
    this.navigation = "BusinessProfile"
    this.onClickListItem('BP')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "JournalEntry") {
    this.key = 2
    this.navigation = "JournalEntry"
    this.onClickListItem('J')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Expense") {
    this.key = 3
    this.navigation = "Expense"
    this.onClickListItem('E')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Tax") {
    this.key = 4
    this.navigation = "Tax"
    this.onClickListItem('T')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Forex") {
    this.key = 5
    this.navigation = "Forex"
    this.onClickListItem('F')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Account") {
    this.key = 6
    this.navigation = "Account"
    this.onClickListItem('A')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "AccountConfig") {
    this.key = 7
    this.navigation = "AccountConfig"
    this.onClickListItem('AC')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Customer") {
    this.key = 8
    this.navigation = "Customer"
    this.onClickListItem('C')
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "") {
    this.key = 0
    this.navigation = "Home"
    this.onClickListItem('H')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ExpenseDynamic") {
    this.key = 0
    this.navigation = "ExpenseDynamic"
    this.onClickListItem('ED')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Product") {
    this.key = 0
    this.navigation = "Product"
    this.onClickListItem('P')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ProductCat") {
    this.key = 0
    this.navigation = "ProductCat"
    this.onClickListItem('PC')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ProductGroup") {
    this.key = 0
    this.navigation = "ProductGroup"
    this.onClickListItem('PG')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ProductUnit") {
    this.key = 0
    this.navigation = "ProductUnit"
    this.onClickListItem('PU')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ProductUnitCon") {
    this.key = 0
    this.navigation = "ProductUnitCon"
    this.onClickListItem('PUC')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "WareHouse") {
    this.key = 0
    this.navigation = "WareHouse"
    this.onClickListItem('W')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Bank") {
    this.key = 0
    this.navigation = "Bank"
    this.onClickListItem('B')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "BankBranch") {
    this.key = 0
    this.navigation = "BankBranch"
    this.onClickListItem('BB')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "BankAccount") {
    this.key = 0
    this.navigation = "BankAccount"
    this.onClickListItem('BA')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Invoice") {
    this.key = 0
    this.navigation = "Invoice"
    this.onClickListItem('I')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "PaymentFromCompany") {
    this.key = 0
    this.navigation = "PaymentFromCompany"
    this.onClickListItem('PFC')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "PaymentToCompany") {
    this.key = 0
    this.navigation = "PaymentToCompany"
    this.onClickListItem('PTC')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ProductPricing") {
    this.key = 0
    this.navigation = "ProductPricing"
    this.onClickListItem('PP')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "StockIn") {
    this.key = 0
    this.navigation = "StockIn"
    this.onClickListItem('SI')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "StockMovement") {
    this.key = 0
    this.navigation = "StockMovement"
    this.onClickListItem('SM')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "JournalDynamic") {
    this.key = 0
    this.navigation = "JournalDynamic"
    this.onClickListItem('JD')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ProductStock") {
    this.key = 0
    this.navigation = "ProductStock"
    this.onClickListItem('PS')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "StockMovement") {
    this.key = 0
    this.navigation = "StockMovement"
    this.onClickListItem('SM')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "BarCode") {
    this.key = 0
    this.navigation = "BarCode"
    this.onClickListItem('BC')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "FinancialReports") {
    this.key = 0
    this.navigation = "FinancialReports"
    this.onClickListItem('FR')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "FinancialReportsPage") {
    this.key = 0
    this.navigation = "FinancialReportsPage"
    this.onClickListItem('FRP')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Cheque") {
    this.key = 0
    this.navigation = "Cheque"
    this.onClickListItem('CTC')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Charts") {
    this.key = 0
    this.navigation = "Charts"
    this.onClickListItem('Charts')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "WorkSpace") {
    this.key = 0
    this.navigation = "WorkSpace"
    this.onClickListItem('WS')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }
  else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ClientUser") {
    this.key = 0
    this.navigation = "ClientUser"
    this.onClickListItem('CU')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "Template") {
    this.key = 0
    this.navigation = "Template"
    this.onClickListItem('WS2')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else if(localStorage.getItem(this._globals.baseAppName + '_nav') == "ECharts") {
    this.key = 0
    this.navigation = "ECharts"
    this.onClickListItem('ECharts')
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
  }else {
    this.navigation = "Home"
    localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation)
    this.onClickListItem('H')
  }

//   var header = document.getElementById("myDIV");
// var btns = header.getElementsByClassName("side_list_item");
//   var current = document.getElementsByClassName("active");
//   current[0].className = current[0].className.replace(" active", "");
//   btns[this.key].className += " active";

  // this._auth.login(this.model);
  // this._auth.logout();
  localStorage.setItem(this._globals.baseAppName + '_language', this.lang_LS);
  var header = document.getElementById("myDIV");
var btns = header.getElementsByClassName("side_list_item");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}
  console.log(this.navigation);
    this.break =
    window.innerWidth <= 740
      ? false
      : true;
  }

  

  onSignOut() {
    this._auth.logout();
  }

  onBusiness(name: string) {
    this.navigation = "Home"
    localStorage.getItem(this._globals.baseAppName + '_nav');
    var header = document.getElementById("myDIV");
var btns = header.getElementsByClassName("side_list_item");
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  btns[0].className += " active";
  
  
}

onToggle() {
  this.break = !this.break
}
  
  onClickListItem(event: string) {
    if(event == 'H' ) {
      this.navigation = "Home"
      var header = document.getElementById("myDIV");
      var btns = header.getElementsByClassName("side_list_item");
      var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  btns[0].className += " active";
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Home clicked", this.navigation);
    }else if(event == 'A' ) {
      this.navigation = "Account"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Account clicked", this.navigation);
    }else if(event == 'T' ) {
      this.navigation = "Tax"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Tax clicked", this.navigation);
    }else if(event == 'F' ) {
      this.navigation = "Forex"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Forex clicked", this.navigation);
    }
    else if(event == 'BP' ) {
      this.navigation = "BusinessProfile"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Bussiness Profile clicked", this.navigation);
    }
    else if(event == 'J' ) {
      this.navigation = "JournalEntry"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Journal entry clicked", this.navigation);
    }else if(event == 'E' ) {
      this.navigation = "Expense"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'ED' ) {
      this.navigation = "ExpenseDynamic"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'BC' ) {
      this.navigation = "BarCode"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'AC' ) {
      this.navigation = "AccountConfig"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("AccountConfig entry clicked", this.navigation);
    }else if(event == 'BO' ) {
      this.navigation = "Boards"
      console.log("AccountConfig entry clicked", this.navigation);
    }else if(event == 'BS' ) {
      this.navigation = "BoardState"
      console.log("AccountConfig entry clicked", this.navigation);
    }else if(event == 'BS2' ) {
      this.navigation = "BoardState2"
      console.log("AccountConfig entry clicked", this.navigation);
    }else if(event == 'C' ) {
      this.navigation = "Customer"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'P' ) {
      this.navigation = "Product"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PC' ) {
      this.navigation = "ProductCat"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PG' ) {
      this.navigation = "ProductGroup"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PU' ) {
      this.navigation = "ProductUnit"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PUC' ) {
      this.navigation = "ProductUnitCon"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'W' ) {
      this.navigation = "WareHouse"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'B' ) {
      this.navigation = "Bank"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'BB' ) {
      this.navigation = "BankBranch"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'BA' ) {
      this.navigation = "BankAccount"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'CU' ) {
      this.navigation = "ClientUser"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'I' ) {
      this.navigation = "Invoice"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PFC' ) {
      this.navigation = "PaymentFromCompany"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PTC' ) {
      this.navigation = "PaymentToCompany"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PP' ) {
      this.navigation = "ProductPricing"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'SI' ) {
      this.navigation = "StockIn"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'WS' ) {
      this.navigation = "WorkSpace"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'WS2' ) {
      this.navigation = "Template"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'SM' ) {
      this.navigation = "StockMovement"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'JD' ) {
      this.navigation = "JournalDynamic"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'PS' ) {
      this.navigation = "ProductStock"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'FR' ) {
      this.navigation = "FinancialReports"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'FRP' ) {
      this.navigation = "FinancialReportsPage"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'CTC' ) {
      this.navigation = "Cheque"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'Charts' ) {
      this.navigation = "Charts"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }else if(event == 'ECharts' ) {
      this.navigation = "ECharts"
      localStorage.setItem(this._globals.baseAppName + '_nav', this.navigation);
      console.log("Expense entry clicked", this.navigation);
    }
  }

  onChangeLanguage() {
    this.navigation = "Home"
    var header = document.getElementById("myDIV");
    var btns = header.getElementsByClassName("side_list_item");
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      btns[0].className += " active";
    if (localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.lang = "Arabic"
      this.direction = "ltr"
      this.home = "Home"
      this.businessP = "Company profile"
      this.journal = "Journal"
      this.expense = "Expense"
      this.paymentFromCompany = "Company payment"
      this.paymentToCompany = "Customer payment"
      this.tax = "Tax"
      this.invoice = "Invoice"
      this.bank = "Bank"
      this.bankBranch = "Bank branch"
      this.bankAccount = "Bank account"
      this.forex = "Forex"
      this.customer = "Customer"
      this.accountConfiguration = "Account configuration"
      this.account = "Account"
      this.accounting = "Accounting"
      this.config = "Configrations"
      this.sales = "Sales"
      this.inventory = "Service management"
      this.product = "Service"
      this.workSpace2 = "Template"
      this.userManagement = "User management"
      this.clientUser = "Users"
      this.profile = "Profile"
      this.changePassword = "Change password"
      this.productCategory = "Service category"
      this.productGroup = "Service group"
      this.productUnit = "Product unit"
      this.productPricing = "Service pricing"
      this.productStock = "Product stock"
      this.productUnitConversion = "Product unit conversion"
      this.warehouse = "Warehouse"
      this.stockIn = "Stock in"
      this.stockMovement = "Stock movement"
      this.taskManagement = "Task management"
      this.workSpace = "Workspace"
      this.cheque = "Cheque"
      this.logout = "Logout"
      this.change = "Language:"
      
      
      this.lang_LS = "16001"
    }else if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.lang = "الانجليزية"
      this.lang_LS = "16002"
      this.direction = "rtl"
      this.home = " الرئيسية "
      this.businessP = "حساب الشركة"
      this.journal = "السجلات"
      this.invoice = "الفواتير"
      this.bank = "البنك"
      this.changePassword = "تغيير كلمة السر"
      this.paymentFromCompany = "الدفع من الشركة"
      this.paymentToCompany = "الدفع الى الشركة"
      this.bankBranch = "فرع البنك"
      this.bankAccount = "حساب البنك"
      this.accountConfiguration = "اعدادات الحساب"
      this.expense = "المصروفات"
      this.tax = "الضرائب"
      this.customer = "العميل"
      this.forex = "فوركس"
      this.account = "الحسابات"
      this.accounting = "الحسابات"
      this.config = "الاعدادات"
      this.sales = "المبيعات"
      this.inventory = "ادارة الخدمات"
      this.userManagement = "ادارة المستخدمين"
      this.clientUser = "المستخدمين"
      this.workSpace2 = "عينات"
      this.profile = "ملف المستخدم"
      this.product = "الخدمات"
      this.productCategory = "فئات الخدمات"
      this.taskManagement = "ادارة المهام"
      this.workSpace = "مساحة العمل"
      this.productGroup = "مجموعات الخدمات"
      this.productUnit = "وحدات المنتجات"
      this.productPricing = "تسعيرة الخدمات"
      this.productStock = "مخزون المنتجات"
      this.productUnitConversion = "تحولات وحدات المنتجات"
      this.warehouse = "المخازن"
      this.stockIn = "المخزون الداخل"
      this.stockMovement = "المخزون الخارج"
      this.cheque = "الشيكات"
      this.logout = "تسجيل الخروج"
      this.change = "اللغة:"
    }else if (localStorage.getItem(this._globals.baseAppName + '_language') == "") {
      this.lang = "Arabic"
      this.direction = "ltr"
      this.home = "Home"
      this.businessP = "Business Profile"
      this.journal = "journal"
      this.invoice = "Invoice"
      this.paymentFromCompany = "Company payment"
      this.paymentToCompany = "Customer payment"
      this.expense = "Expense"
      this.customer = "Customer"
      this.accountConfiguration = "Account Configuration"
      this.userManagement = "User management"
      this.clientUser = "Users"
      this.tax = "Tax"
      this.changePassword = "Change password"
      this.forex = "Forex"
      this.workSpace2 = "Template"
      this.account = "Account"
      this.accounting = "Accounting"
      this.config = "Configrations"
      this.sales = "Sales"
      this.profile = "Profile"
      this.inventory = "Service management"
      this.product = "Service"
      this.productCategory = "Service category"
      this.productGroup = "Service group"
      this.productUnit = "Product unit"
      this.productPricing = "Service pricing"
      this.productStock = "Product stock"
      this.productUnitConversion = "Product unit conversion"
      this.warehouse = "Warehouse"
      this.stockIn = "Stock in"
      this.stockMovement = "Stock movement"
      this.taskManagement = "Task management"
      this.workSpace = "Workspace"
      this.cheque = "Cheque"
      this.logout = "Logout"
      this.change = "Change to:"
      
      this.lang_LS = "16001"
    }
    localStorage.setItem(this._globals.baseAppName + '_language', this.lang_LS);
    console.log("lang: ",localStorage.getItem(this._globals.baseAppName + '_language'))
  }

  onResize(event: any){
    this.break =
    window.innerWidth <= 740
      ? false
      : true;
  }
  resizeValidate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  resizeEdges(){
    if(localStorage.getItem(this._globals.baseAppName + '_language') == '16001'){
      return {right: true}
    } else {return{left: true}}
  }
 
                    /**
                     * Finilizes resize positions
                     * (used for drawer/sidenav width)
                     * @param event 
                     */
  onResizeEnd(event: ResizeEvent): void {
    this.resizeStyle = {
                     // enable/disable these per your needs
      // position: 'fixed',
      // left: `${event.rectangle.left}px`,
      // top: `${event.rectangle.top}px`,
      // height: `${event.rectangle.height}px`,
      width: `${event.rectangle.width}px`,
    };
  }

  onChangePassword = function () {
    
      this.dialogRef = this.dialog.open(ChangePasswordNewComponent, {
        disableClose: true,
        
        data: {}
      });
    
    this.dialogRef.afterClosed().subscribe(() => {});
  };
 

}
