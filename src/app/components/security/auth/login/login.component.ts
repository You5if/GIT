import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
// import { AuthService2 } from '../myauth.service';
import { Router } from '@angular/router';
import { UserModule } from '../../user/user.model';
import { LoginModule } from './login.model';
// import { AuthService, GoogleLoginProvider } from 'angular4-social-login';
import { SDNewKeyModel } from 'src/app/components/dynamic/notactivated/notactivated.model';
import { NotActivatedService } from 'src/app/components/dynamic/notactivated/notactivated.service';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { UserModel, SDUserModel, SDCompanyModel } from '../../signup/signup.model';
import { AppGlobals } from 'src/app/app.global';
import { SignUpService } from '../../signupcont/signup.service';
import { UploadService } from 'src/app/components/common/upload/upload.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pModel: LoginModule;
  user: any;
  valUserObject: UserModel;
  initialCheckup = false;
  userObject: SDUserModel;
  companyObject: SDCompanyModel;
  loginUserObject: LoginModule;
  googleImagePath = '';
  smallScreen: boolean;
  loging: boolean = false;

  constructor(
    private _ui: UIService,
    private _msg: MessageBoxService,
    private _auth: AuthService,
    
    private _myService: NotActivatedService,
    private _globals: AppGlobals,
    private _picService: UploadService,
    private _signupService: SignUpService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private titleService: Title,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  ngOnInit() {
    this.titleService.setTitle("GIS - Login");
    // this.googleImagePath = this._globals.baseAPIFileUrl+'/resources/images/btn_google_signin_light_normal_web.png';
    this.valUserObject = {
      username: '',
      password: '',
      roleId: 0,
    };
    this.loginUserObject = {
      'username': '',
      'password': '',
      'loginType': 0
    };
    this.userObject = {
      sdUserId: 0,
      sdUserName: '',
      displayName: '',
      password: '',
      externalTypeId: 1,
      externalId: 'app',
      activationStatusId: 60000800001,
      sdCompanyId: 0,
      roleId: 0,
      active: true,
      entryMode: 'A',
      readOnly: false,
      auditColumns: null,
};
this.companyObject = {
  sdCompanyId: 0,
  sdCityId: 0,
  sdCityPostalCodeId: 0,
  address: '',
  otherInformation: '',
  company: '',
  sdCompanyLocation: [],
  active: true,
  entryMode: 'A',
  readOnly: false,
  auditColumns: null,
};
  }

  // signin(platform: string): void {
  //   platform = GoogleLoginProvider.PROVIDER_ID;
  //   this._socioAuthServ.signIn(platform).then(response => {
  //     this.user = response;
  //     this.valUserObject.username = response.email;
  //     this.valUserObject.password = 'none';
  //     this._ui.loadingStateChanged.next(true);
  //     this._signupService.validateUserName(this.valUserObject).subscribe((result: SelectModel[]) => {
  //         this.userObject.sdUserName = this.valUserObject.username;
  //         this.userObject.password = this.valUserObject.password;
  //         this.userObject.displayName = response.name;
  //         this.userObject.externalId = 'google';
  //         this.userObject.externalTypeId = 60004600001;
  //         if (result[0].id === 0) {
  //           this._ui.loadingStateChanged.next(false);
  //           this.initialCheckup = true;
  //           // continue with sign up
  //           this._signupService.saveData(this.userObject, this.companyObject);
  //           this.router.navigate(['/signupcont']);
  //           // end of continue with sign up
  //         } else {
  //           this._ui.loadingStateChanged.next(false);
  //           // this._msg.showInfo('Error!!', 'User Already Exists');
  //           // code to continue login
  //             // check if has local password
  //             if (result[0].id === 1) {
  //               this._ui.loadingStateChanged.next(false);
  //               this.router.navigate(['/applogin']);
  //             }
  //             // end of check if has local password
  //             else {
  //               // this._msg.showInfo('Error!!', 'Can\'t create token');
  //               this._ui.loadingStateChanged.next(false);
  //               this.loginUserObject.username = response.email;
  //               this.loginUserObject.password = 'none';
  //               this.loginUserObject.loginType = 60004600001;
  //               try {
  //                 this._auth.login(this.loginUserObject).subscribe((data: UserModule) => {
  //                   if (data.userStatus === 60000800001 && data !== null) {
  //                     this._ui.loadingStateChanged.next(false);
  //                     this.router.navigate(['/notactivated']);
  //                     return true;
  //                   } else if (data.userStatus === 60000800002 && data.registrationActive === true) {
  //                     this._ui.loadingStateChanged.next(false);
  //                     this.router.navigate(['/accountactivated']);
  //                     return true;
  //                   } else if (data.registrationActive === false) {
  //                     this._ui.loadingStateChanged.next(false);
  //                     this.router.navigate(['/registrationexpired']);
  //                     return true;
  //                   } else if (data.userStatus === 60000800003 && data.registrationActive === true) {
  //                     this._ui.loadingStateChanged.next(false);
  //                     // if (data.userStatus === 60000800001) {
  //                     //   this.router.navigate(['/notactivated']);
  //                     // }
  //                     localStorage.setItem('dashPage',  '0');
  //                     localStorage.setItem('sdCompanyId', data.companyId.toString());
  //                     this.router.navigate(['/dashboard']);
  //                     // localStorage.setItem('planPage', '0');
  //                     return true;
  //                   } else {
  //                     this._ui.loadingStateChanged.next(false);
  //                     this._msg.showError('Unable to login!');
  //                   }
  //                 }, error => {
  //                   this._ui.loadingStateChanged.next(false);
  //                   this._msg.showAPIError(error);
  //                   return false;
  //                 });
  //               } catch (error) {
  //                 this._ui.loadingStateChanged.next(false);
  //                 this._msg.showAPIError(error);
  //                 return false;
  //               }
  //             }
  //           // end of code to continue login
  //         }
  //     }, error => {
  //       this._ui.loadingStateChanged.next(false);
  //       this._msg.showAPIError(error);
  //       return false;
  //     });
  //   }
  //   );
  // }

  onForgotPassword(param: string) {
    const data: SDNewKeyModel = {
      'sdRequestId': 2,
      'sdUserId': 'aa',
      'sdUserName': param,
      'sdDisplayName': 'aa'
    };
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

  submit(form: NgForm) {
    this.loging = true
    if (form.invalid) {
      this._msg.FillRequired();
      this.loging = false
      return false;
    }
    if (this.validateForm(form) !== true) {
      this.loging = false
      return false;
    }
    this._ui.loadingStateChanged.next(true);
    this._signupService.validateUserName(form.value).subscribe((result: SelectModel[]) => {
      this._ui.loadingStateChanged.next(false);
      if (result[0].id !== 0) {
        if (result[0].id === 1) {
          try {
            form.value.loginType = 1;
            this._auth.login(form.value).subscribe((data: UserModule) => {
              if (data !== null) {
                localStorage.setItem('sdCompanyId', data.companyId.toString());
                this.router.navigate(['/System']);
                this.loging = false
                return true;
              } else {
                this.loging = false
                this._msg.showInfo("Error!!", "wrong username or password");
                // this._msg.showError('Unable to login!');
              }
            }, error => {
              this.loging = false
              this._msg.showInfo("Error!!", "wrong username or password");
              // this._msg.showAPIError(error);
              return false;
            });

          } catch (error) {
            this.loging = false
            this._msg.showInfo("Error!!", "wrong username or password");
            // this._msg.showAPIError(error);
            return false;
          }
        }
        else {
          this.loging = false
          this.router.navigate(['/googlelogin']);
        }
      }
    });

  }

  validateForm(form: NgForm) {
    if (form.value.username === '' || form.value.username === null) {
      this._msg.blank('Email address');
      return false;
    }
    if (form.value.password === '' || form.value.password === null) {
      this._msg.blank('Password');
      return false;
    }

    return true;
  }

}
