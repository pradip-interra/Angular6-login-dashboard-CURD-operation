import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private currentUrl: string = '';
  constructor(private router: Router, private authService: AuthService) {
    // to set the currentUrl such that it gets highligted when navigated in the currUrl
    this.router.events.subscribe((data: NavigationEnd) => {
      this.currentUrl = data.url;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.resetCookie();
  }
}

