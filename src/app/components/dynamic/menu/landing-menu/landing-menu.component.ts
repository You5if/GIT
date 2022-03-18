import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserModule } from 'src/app/components/security/user/user.model';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AppGlobals } from 'src/app/app.global';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-menu',
  templateUrl: './landing-menu.component.html',
  styleUrls: ['./landing-menu.component.scss']
})
export class LandingMenuComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  _user: UserModule;

  constructor(
    private _auth: AuthService,
    private _cf: CommonService,
    private _msg: MessageBoxService,
    private _global: AppGlobals,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer

  ) {
    iconRegistry.addSvgIcon(
      'logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/amtlogo.svg'));
    iconRegistry.addSvgIcon(
      'userimage',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/users/srinivas.svg'));
  }

  ngOnInit() {

  }

  getApplicationName() {
    return this._global.baseAppName;
  }




  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  isLoggedIn() {
    return this._auth.loggedIn();
  }


}
