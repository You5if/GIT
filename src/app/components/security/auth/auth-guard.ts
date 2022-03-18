import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MessageBoxService } from '../../messagebox/message-box.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(
        private router: Router,
        private _auth: AuthService,
        private _msg: MessageBoxService) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this._auth.loggedIn() === true) {
            return true;
        } else {
            this.router.navigate(['/login']);
            this._msg.showError('You need to be logged in to access this area!');
            return false;
        }
    }
}
