import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [{
  path: 'login', component: LoginComponent
},
{
  path: 'home/:username', component: HomeComponent,
  children: [
  ]
},
{ path: 'tweets/:username', component: TweetComponent },
{ path: 'register-user', component: RegisterUserComponent },
{ path: 'users/:username', component: UsersComponent },
{ path: 'forgot-password', component: ForgotPasswordComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
