import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
// import { UserService } from '../user.service';
import { Router } from '@angular/router';
// import { ChangePasswordModel } from './change-password.model';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { ChangePasswordAnonModel } from 'src/app/components/dynamic/change-passwordanon/change-passwordanon.model';
import { ChangePasswordAnonService } from './change-passwordanon.service';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-change-passwordanon',
  templateUrl: './change-passwordanon.component.html',
  styleUrls: ['./change-passwordanon.component.scss']
})
export class ChangePasswordAnonComponent implements OnInit {
  confirmpassword = '';
  smallScreen: boolean;

  constructor (
    private uiService: UIService,
    private _auth: AuthService,
    private _msg: MessageBoxService,
    private userService: ChangePasswordAnonService,
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  pModel: ChangePasswordAnonModel;

  ngOnInit() {
    this.pModel = {
      'requestId': 1,
      'userId': 1,
      'username': this.route.snapshot.paramMap.get('userName'),
      'password': ''
    };
  }

  changePassword(form: NgForm) {
    // this.uiService.loadingStateChanged.next(true);
    // const data: ChangePasswordAnonModel = {
    //   'requestId': 1,
    //   'userId': 0,
    //   'username': this._auth.getUserName(),
    //   'password': form.value.password
    // };
    this.pModel.password = form.value.password;
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
    this.userService.changepassword(this.pModel).subscribe((response: any) => {
      // this.uiService.loadingStateChanged.next(false);
      this.router.navigate(['/login']);
      // this._msg.success('Password changed successfully!!');
    }, error => {
      // this.uiService.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
    });
  }
}
