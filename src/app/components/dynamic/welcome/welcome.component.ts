import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeService } from './welcome.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { CommonService } from 'src/app/components/common/common.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private _myService: WelcomeService,
    private _cf: CommonService,
    private _ui: UIService,
    private _msg: MessageBoxService,
    private router: Router,
    private _auth: AuthService, ) {
    this.activatedRoute.queryParams.subscribe(params => {
      const capParam = params['verify'];
      if (capParam !== '' || capParam !== null) {
        this._ui.loadingStateChanged.next(true);
        this._myService.validateLink(capParam).subscribe((result: SelectModel[]) => {
          if (result[0].id === 0) {
            this._ui.loadingStateChanged.next(false);
            this._auth.logout();
            this.router.navigate(['/welcome']);
          } else if (result[0].name === '1') {
            this._ui.loadingStateChanged.next(false);
            this._auth.logout();
            this.router.navigate(['/login']);
          } else if (result[0].id === 2) {
            this._ui.loadingStateChanged.next(false);
            this._auth.logout();
            // this.router.navigate(['/changepasswordanon']); // change later to change password page
            this.router.navigate(['/changepasswordanon', {userName: result[0].name}]);
          }
      }, error => {
        this._ui.loadingStateChanged.next(false);
        this._msg.showAPIError(error);
        return false;
      });
      }
  });
  }

  ngOnInit() {
  }

}
