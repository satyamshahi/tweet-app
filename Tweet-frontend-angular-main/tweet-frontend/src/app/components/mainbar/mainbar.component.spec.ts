import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

import { MainbarComponent } from './mainbar.component';
import { LoginComponent } from '../login/login.component';
import { UsersComponent } from '../users/users.component';
import { TweetComponent } from '../tweet/tweet.component';

describe('MainbarComponent', () => {
  let component: MainbarComponent;
  let fixture: ComponentFixture<MainbarComponent>;
  let router: Router;
  let location: Location;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainbarComponent,
        UsersComponent,
        LoginComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'users/:username', component: UsersComponent },
        {
          path: 'login', component: LoginComponent
        },
        { path: 'tweets/:username', component: TweetComponent }
      ])],
    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(MainbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login ', fakeAsync(() => {
    compiled.querySelector('a.logout').click();
    flush()
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/login');
    });
  }));
});
