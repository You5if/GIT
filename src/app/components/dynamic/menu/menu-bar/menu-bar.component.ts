import { Component, OnInit } from '@angular/core';
import { IMenuItem } from 'src/app/components/dynamic/menu/menu.interface';
import { AppGlobals } from 'src/app/app.global';
import { MenuService } from '../menu.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/components/security/auth/auth.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  navItems: IMenuItem[];
  applicationName = 'WebApp';
  pShowUserNav = false;
  mSearchText: string;
  constructor(
    private _auth: AuthService,
    private _globals: AppGlobals,
    private menuService: MenuService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/amtlogo.svg'));
      iconRegistry.addSvgIcon(
        'userimage',
        sanitizer.bypassSecurityTrustResourceUrl('assets/images/users/srinivas.svg'));
  }

  ngOnInit() {
    this.menuService.getMenus().subscribe((data: IMenuItem[]) => {
      this.navItems = data;
      this.pShowUserNav = true;
    });
  }

  getApplicationName() {
    return this._globals.baseAppName;
  }

  isLoggedIn() {
    return this._auth.loggedIn();
  }

  getUserName() {
    return 'WVI';
  }

  onSignOut() {
    this._auth.logout();
  }

  onToggleSidenav() {
    return false;
   }
}
