import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/components/security/auth/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  userid = '';

  constructor(private activatedRoute: ActivatedRoute,
    private _auth: AuthService, ) {
    this.activatedRoute.queryParams.subscribe(params => {
      const date = params['startdate'];
  });
  }

  ngOnInit() {
    this.userid =  this._auth.getUserName();
  }

}
