import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthService, public router: Router) { }

    // this is a router guard implementation
    canActivate(): boolean {
        return this.checkAuth();
    }

    private checkAuth(): boolean {
        if (!this.auth.authenticateFromCookie()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}