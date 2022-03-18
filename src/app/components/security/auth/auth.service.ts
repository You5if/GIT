import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AppGlobals } from 'src/app/app.global';
import { map, catchError, switchMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CommonService } from '../../common/common.service';
import { Router } from '@angular/router';
// import getMAC, { isMAC } from 'getmac';
import { AuditModel } from '../../misc/AuditParams.Model';
// import { AuthService2 } from './myauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: any;
  userRole: any;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: Http,
    private _globals: AppGlobals,
    private _cf: CommonService,
    private jwtHelperService: JwtHelperService,
    // private _auth: AuthService2,
    private router: Router
  ) { }

  login(model: any) {
    return this.http.post(this._globals.baseAPIUrl + 'user/login', model, this._cf.requestOptions()).pipe(
      map((response: Response) => {
        const user = response.json();
        if (user) {
          console.log(user);
          //step 4 of security(next: login.model.ts)
          localStorage.setItem(this._globals.baseAppName + '_token', user.token);
          // console.log('Token: '+localStorage.getItem(this._globals.baseAppName + '_token'));
          // console.log('User', user);
          localStorage.setItem('role', user.roleId.toString());
          this.userRole = user.roleId.toString();
          localStorage.setItem('sdCompanyId', user.companyId.toString());
          this.userRole = user.roleId.toString();
          this.userToken = user.token;
          this.decodedToken = this.jwtHelper.decodeToken(user.token);

          return response.json();
        } else {
          return null;
        }
      }), catchError(this._cf.handleError)
    );
  }

  loggedIn() {
    const mToken = this.jwtHelperService.tokenGetter();
    // return !!mToken;
    return !this.jwtHelperService.isTokenExpired(mToken);
  }

  logout() {
    console.log(localStorage);
    console.log("cought in logout");
    this.userToken = null;
    this.userRole = null;
    this.decodedToken = null;
    localStorage.removeItem(this._globals.baseAppName + '_token');
    localStorage.removeItem('sdCompanyId');
    localStorage.removeItem('role');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getRole() {
    console.log(this.userRole);
    return this.userRole;
  }

  getToken() {
    return localStorage.getItem(this._globals.baseAppName + '_token');
  }

  getUserId() {
    // return 26;
    return this.jwtHelperService.decodeToken(this.getToken()).nameid;
  }

  getUserName() {
    return this.jwtHelperService.decodeToken(this.getToken()).given_name;
  }

  getUniqueName() {
    return this.jwtHelperService.decodeToken(this.getToken()).unique_name;
  }

  getDeviceType() {
    let x = '';
    try {
      x = window.clientInformation.platform;
    } catch(error) {
      x = 'unindentified';
    }
    return x;
  }

  getHostName() {
    return 'unidentified';
  }

  getIPAddress() {
    return 'unidentified';
  }

  getMACAddress() {
    return 'unidentified';
  }

  getScreenRights(pMenuId: number) {
    return this.http.post(this._globals.baseAPIUrl + 'menu/getScreenRights/' +
      this.getUserId() + '/' + pMenuId, [], this._cf.requestOptions()).pipe(
      map((response: Response) => {
          return response.json();
      }), catchError(this._cf.handleError)
    );
  }

  getAuditColumns() {
    const data = new AuditModel (
      1100001,
      10001,
      201,
      1,
      this.getUserId(),
      this.getMACAddress(),
      this.getHostName(),
      this.getIPAddress(),
      this.getDeviceType()
    );
    return data;
  }

}
