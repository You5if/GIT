import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ChangePasswordModel } from './change-password.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  confirmpassword = '';
  smallScreen: boolean;

  constructor (
    private uiService: UIService,
    private _auth: AuthService,
    private _msg: MessageBoxService,
    private userService: UserService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  pModel: ChangePasswordModel;

  ngOnInit() {

  }

  changePassword(form: NgForm) {
    // this.uiService.loadingStateChanged.next(true);
    const data: ChangePasswordModel = {
      'requestId': 1,
      'userId': this._auth.getUserId(),
      'username': this._auth.getUniqueName(),
      'password': form.value.password
    };
    // form.userId = this._auth.getUserId();
    if (form.invalid) {
      // this.uiService.loadingStateChanged.next(false);
      this._msg.FillRequired();
      return false;
    }
    if (form.value.password !== form.value.confirmpassword) {
      // this.uiService.loadingStateChanged.next(false);
      this._msg.showError('Password not matching with confirm password!');
      return false;
    }
    this.userService.changepassword(data).subscribe((response: any) => {
      // this.uiService.loadingStateChanged.next(false);
      this.router.navigate(['/dashboard']);
      this._msg.success('Password changed successfully!!');
    }, error => {
      // this.uiService.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
    });
  }
}
