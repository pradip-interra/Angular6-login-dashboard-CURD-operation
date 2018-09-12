import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private username = undefined;
  private password = undefined;
  private loginClicked = false;
  private loginSuccess = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginClicked = true;
    if (this.authService.hardcodedAuth(this.username, this.password)) {
      this.loginSuccess = true;
      this.router.navigate(['/dashboard']);
    }
  }
}
