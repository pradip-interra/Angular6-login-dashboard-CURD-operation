import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private cookieService: CookieService) { }

  authenticateFromCookie(): boolean {
    // read from cookie
    let savedCred = this.cookieService.get('Cred');

    if (savedCred != '') {
      return true;
    } else {
      return false;
    }
  }

  // this is a hacky method just to auth for the first time :)
  hardcodedAuth(username, password): boolean {
    const hackedCredSaving = 'YWRtaW46YWRtaW4=';  // admin, admin - Hack
    let encodedcred = btoa(username + ':' + password);
    if (hackedCredSaving === encodedcred) {
      // storing to cookie.
      this.cookieService.set("Cred", hackedCredSaving);
      return true;
    } else {
      return false;
    }
  }

  resetCookie() {
    this.cookieService.delete("Cred");
  }
}
