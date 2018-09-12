import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostDeleteComponent } from './posts/post-delete/post-delete.component';
import { MiscsComponent } from './miscs/miscs.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'posts/create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'posts/:id', component: PostDetailsComponent, canActivate: [AuthGuard] },
  { path: 'posts/edit/:id', component: PostEditComponent, canActivate: [AuthGuard] },
  { path: 'posts/delete/:id', component: PostDeleteComponent, canActivate: [AuthGuard] },
  { path: 'misc', component: MiscsComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [PostsComponent,
  HomeComponent,
  PostDetailsComponent,
  PostCreateComponent,
  PostEditComponent,
  PostDeleteComponent,
  MiscsComponent,
  LoginComponent
];
