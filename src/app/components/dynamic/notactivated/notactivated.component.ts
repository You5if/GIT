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
import { SDNewKeyModel } from './notactivated.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-notactivated',
  templateUrl: './notactivated.component.html',
  styleUrls: ['./notactivated.component.scss']
})
export class NotActivatedComponent implements OnInit {

  role = '';
  userid = '';
  smallScreen: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private _auth: AuthService,
    public dialog: MatDialog,
        private _cf: CommonService,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _select: SelectService,
        private _myService: NotActivatedService,
        private router: Router,
        private breakpointObserver: BreakpointObserver
        ) {
          breakpointObserver.observe([
            Breakpoints.XSmall
          ]).subscribe(result => {
            this.smallScreen = result.matches;
          });
          this.activatedRoute.queryParams.subscribe(params => {
            const date = params['startdate'];
            });

  }

  ngOnInit() {
    this.userid =  this._auth.getUserName();
    this.role = localStorage.getItem('role');
    // this.role = this._auth.getRole();
  }

  onNext() {
    const data: SDNewKeyModel = {
      'sdRequestId': 1,
      'sdUserId': this._auth.getUserId(),
      'sdUserName': this._auth.getUniqueName(),
      'sdDisplayName': this._auth.getUserName()
    };
    // this._auth.getUserId();
    this._ui.loadingStateChanged.next(true);
    try {
      // calling the service(api) to submit the data
      this._myService.generateNewKey(data).subscribe((result: APIResultModel) => {
          if (result.errorNo === 0) {
              this._ui.loadingStateChanged.next(false);
              this._msg.showInfo('info', result.errorMessage);
              // this.dialogref.close();
          } else {
              this._ui.loadingStateChanged.next(false);
              this._msg.showError(result.errorMessage);
              return false;
          }
      }, error => {
          this._ui.loadingStateChanged.next(false);
          this._msg.showAPIError(error);
          return false;
        });
  } catch (error) {
      this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      return false;
  }
  }

}
