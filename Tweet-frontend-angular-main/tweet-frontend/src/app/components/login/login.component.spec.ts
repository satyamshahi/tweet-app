import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
//import { RegisterUserComponent } from '../register-user/register-user.component';
//import { UserService } from '../Services/user.service';
import { Location } from '@angular/common';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { UserService } from 'src/app/Services/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy = jasmine.createSpyObj('UserService', ['login']);
  let compiled: any;
  let router: Router;
  let location: Location;

  var resultTrue: Subject<Boolean>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent,
        ForgotPasswordComponent,
        RegisterUserComponent,
        HomeComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'forgot-password', component: ForgotPasswordComponent },
        { path: 'register-user', component: RegisterUserComponent },
        { path: 'home/:username', component: HomeComponent }
      ])],
      providers: [
        {
          provide: UserService,
          useValue: userServiceSpy
        }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate to forgot password page ', fakeAsync(() => {
    compiled.querySelector('button.forgot-button').click();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/forgot-password');
    });
  }));

  it('should allow user to submit form', () => {
    component.loginForm.setValue({
      username: 'sasha',
      password: 'qwe',
    });
    userServiceSpy.login.and.returnValue(of());
    expect(component.loginForm.valid).toEqual(true);
    component.onSubmit();
    expect(userServiceSpy.login).toHaveBeenCalled();
  });

  // it('navigate to register user page ', fakeAsync(() => {
  //   compiled.querySelector('a.link').click();
  //   // flush()
  //   tick();
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //    expect(location.path()).toBe('/register-user');
  //   });
  // }));

  it('navigate to forgot password page ', fakeAsync(() => {
    fixture.whenStable().then(() => {
      component.loginForm.setValue({
        username: 'sasha',
        password: 'qwe',
      });
      var subject = new Subject<boolean>();
      subject.next(true)
      userServiceSpy.login.and.callFake(() => {
        return of(subject);
      })
      component.onSubmit();
      //expect(location.path()).toBe('/home/sasha');
    });
  }));


});
