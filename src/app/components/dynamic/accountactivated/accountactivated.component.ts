import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { MatDialog } from '@angular/material';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { SelectService } from 'src/app/components/common/select.service';
import { NotActivatedService } from 'src/app/components/dynamic/notactivated/notactivated.service';
import { Router } from '@angular/router';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { MessageBoxService } from '../../messagebox/message-box.service';
import { AccountActivatedService } from 'src/app/components/dynamic/accountactivated/accountactivated.service';
import { SDAccountActivationModel } from 'src/app/components/dynamic/accountactivated/accountactivated.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-accountactivated',
  templateUrl: './accountactivated.component.html',
  styleUrls: ['./accountactivated.component.scss']
})
export class AccountActivatedComponent implements OnInit {

  userid = '';
  registrationdate = new Date();
  smallScreen: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private _auth: AuthService,
    public dialog: MatDialog,
        private _cf: CommonService,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _select: SelectService,
        private _myService: AccountActivatedService,
        private router: Router,
        private breakpointObserver: BreakpointObserver,
        ) {
          breakpointObserver.observe([
            Breakpoints.XSmall
          ]).subscribe(result => {
            this.smallScreen = result.matches;
          });
  }

  ngOnInit() {
    const data: SDAccountActivationModel = {
      'requestId': 1,
      'sdUserId': this._auth.getUserId()
    };
    this._ui.loadingStateChanged.next(true);
    try {
      // calling the service(api) to submit the data
      this._myService.checkActivation(data).subscribe((result: APIResultModel) => {
          if (result.errorNo === 0) {
              this._ui.loadingStateChanged.next(false);
              localStorage.setItem('dashPage',  '0');
              this._msg.showInfo('info', result.errorMessage);
              this.router.navigate(['/login']);
              // this.dialogref.close();
          } else {
              this._ui.loadingStateChanged.next(false);
              this._msg.showError(result.errorMessage);
              this.router.navigate(['/registrationexpired']);
              return false;
          }
      }, error => {
          this._ui.loadingStateChanged.next(false);
          this._msg.showAPIError(error);
          this.router.navigate(['/registrationexpired']);
          return false;
        });
  } catch (error) {
      this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      return false;
  }
  }

}
