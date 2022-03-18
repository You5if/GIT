import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { AuthService } from "../components/security/auth/auth.service";
import { OverlayContainer } from "@angular/cdk/overlay";
// import { AuthService2 } from "../components/security/auth/myauth.service";
import { MatDialog } from "@angular/material";
import { MasterReportComponent } from "../master-report/master-report.component";
import { ReportComponent } from "../report/report.component";
import { FinancialReportComponent } from "../financial-report/financial-report.component";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit {
  role = localStorage.getItem("role");
  // role = this._auth.getRole();
  childValue: boolean = true;
  @Output() childOutput = new EventEmitter<boolean>();

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private financialReportDialog: MatDialog,
    private masterReportDialog: MatDialog,
    private reportDialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private _auth: AuthService,
    
    public overlayContainer: OverlayContainer
  ) {
    this.role = localStorage.getItem("role");
    // this.role = this._auth.getRole();
  }

  ngOnInit() {
    this.role = localStorage.getItem("role");
    // this._auth2.sharedMessage.subscribe(message => this.role = message);
    // console.log('Nav Role: ', this.role);
  }

  changeChildValue() {
    return !this.childValue;
  }

  sendOutput() {
    if (!this.changeChildValue()) {
      this.overlayContainer.getContainerElement().classList.add("DarkTheme");
    } else {
      this.overlayContainer.getContainerElement().classList.remove("DarkTheme");
    }
    this.childValue = this.changeChildValue();
    this.childOutput.emit(this.childValue);
  }

  isLoggedIn() {
    return this._auth.loggedIn();
  }

  onSignOut() {
    this._auth.logout();
  }

  openFinancialReport() {
    const financialReportDialogRef = this.financialReportDialog.open(
      FinancialReportComponent
    );
  }

  openMasterReport() {
    const masterReportDialogRef = this.masterReportDialog.open(
      MasterReportComponent
    );
  }

  openReport() {
    const reportDialogRef = this.reportDialog.open(ReportComponent);
  }
}
