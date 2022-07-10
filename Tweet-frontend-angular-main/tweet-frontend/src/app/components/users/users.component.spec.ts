import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Location } from '@angular/common';

import { UsersComponent } from './users.component';
import { LoginComponent } from '../login/login.component';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { UserService } from 'src/app/Services/user.service';
var userMockData: ApiResponse =
  { "success": true, 
  "data":
   [{ "avtar": "avtar1", 
   "loginId": "sam",
    "name": "sam harris" },
   { "avtar": "avtar1",
    "loginId": "sasha", 
    "name": "sam harris" }, 
   { "avtar": "avtar1",
    "loginId": "in28minutes", 
    "name": "Smriti Arora" }, 
   { "avtar": "avtar3",
    "loginId": "sameer",
     "name": "Sam Harris" },  
    ], "error": null }

    var mockJWTError={
    error: {success: false, data: null, error: 'JWT Token is Not Valid'},
message: "Http failure response for http://localhost:9090/api/v1.0/tweets/all: 401 OK",
name: "HttpErrorResponse",
ok: false,
status: 401,
statusText: "OK",
url: "http://localhost:9090/api/v1.0/tweets/all"}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userServiceSpy = jasmine.createSpyObj('UserService', ['getAllUsers', 'searchUsers']);
  let activatedRouteSpy = {
    snapshot: {
      paramMap: convertToParamMap({
        username: 'all'
      })
    }
  };
  let router: Router;
  let location: Location;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent,
        LoginComponent],
      imports: [RouterTestingModule.withRoutes([
        {
          path: 'login', component: LoginComponent
        }
      ])],
      providers: [
        {
          provide: UserService,
          useValue: userServiceSpy
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy
        },
        {
          provide: Router,
          useValue: mockRouter
        }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    userServiceSpy.getAllUsers.and.returnValue(of());
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all users on screen', () => {
    userServiceSpy.getAllUsers.and.returnValue(of());
    expect(userServiceSpy.getAllUsers).toHaveBeenCalled();
  });

});

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userServiceSpy = jasmine.createSpyObj('UserService', ['searchUsers']);
  let activatedRouteSpy = {
    snapshot: {
      paramMap: convertToParamMap({
        username: 'search'
      })
    }
  };
  let router: Router;
  let location: Location;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: UserService,
          useValue: userServiceSpy
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy
        },
        {
          provide: Router,
          useValue: mockRouter
        }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    userServiceSpy.searchUsers.and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show searched users on screen', () => {
    component.username = 'search';
    expect(userServiceSpy.searchUsers).toHaveBeenCalled();
  });
});
