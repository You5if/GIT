import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Component, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { AppGlobals } from 'src/app/app.global';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './components/security/auth/auth.service';
import { UIService } from './components/shared/uiservices/UI.service';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { PleaseWaitComponent } from './components/shared/uiservices/please-wait/please-wait.component';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {

  jwtHelperService: JwtHelperService = new JwtHelperService();
  isLoading = false;
  private loadingSubs: Subscription;
  parentValue: boolean;

  constructor(
    private _globals: AppGlobals,
    private _auth: AuthService,
    private _ui: UIService,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {
   }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f2f5f7';
  }

  ngOnInit() {
    this.loadingSubs = this._ui.loadingStateChanged.subscribe(isLoading => {
      if (isLoading === true) {
        this.dialog.open(PleaseWaitComponent);
      }
    });
    const token = localStorage.getItem(this._globals.baseAppName + '_token');
    if (token) {
      this._auth.decodedToken = this.jwtHelperService.decodeToken(token);
    }

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => this.titleService.setTitle(event['title']));
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  isLoggedIn() {
    return this._auth.loggedIn();
  }

  receiveOutput($event) {
    this.parentValue = $event;
    this.parentValue = !this.parentValue;
  }



}
