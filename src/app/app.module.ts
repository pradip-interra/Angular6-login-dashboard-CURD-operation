import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { PostsService } from './services/posts.service';

import { HttpClientModule } from '@angular/common/http';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostDeleteComponent } from './posts/post-delete/post-delete.component';
import { MiscsComponent } from './miscs/miscs.component';

import { ChartModule } from 'angular-highcharts';
import { PerformanceComponent } from './home/performance/performance.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    routingComponents,
    PostDetailsComponent,
    PostCreateComponent,
    PostEditComponent,
    PostDeleteComponent,
    MiscsComponent,
    PerformanceComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    ChartModule
  ],
  providers: [PostsService, AuthService, AuthGuardService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
