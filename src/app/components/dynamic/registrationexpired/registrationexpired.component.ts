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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { SDNewKeyModel } from './notactivated.model';

@Component({
  selector: 'app-registrationexpired',
  templateUrl: './registrationexpired.component.html',
  styleUrls: ['./registrationexpired.component.scss']
})
export class RegistrationExpiredComponent implements OnInit {

  userid = '';
  userCompany: number = +localStorage.getItem('sdCompanyId');
  smallScreen: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private _auth: AuthService,
    public dialog: MatDialog,
        private _cf: CommonService,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _select: SelectService,
        private router: Router,
        private breakpointObserver: BreakpointObserver,
        ) {
          breakpointObserver.observe([
            Breakpoints.XSmall
          ]).subscribe(result => {
            this.smallScreen = result.matches;
          });
  //   this.activatedRoute.queryParams.subscribe(params => {
  //     const date = params['startdate'];
  // });
  }

  ngOnInit() {

  }


}
