import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CreateTweetComponent } from './components/create-tweet/create-tweet.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ModelPopupComponent } from './components/model-popup/model-popup.component';
import { MainbarComponent } from './components/mainbar/mainbar.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainbarComponent,
    TweetComponent,
    HomeComponent,
    CreateTweetComponent,
    UsersComponent,
    RegisterUserComponent,
    ForgotPasswordComponent,
    ModelPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
