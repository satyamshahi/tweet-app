import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterModule } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule,
        RouterModule.forRoot([]),]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all users on screen', () => {
    component.onClick('allUsers');
    expect(component.showAllUsers).toBeTrue;
    expect(component.childInfo).toBe('all');
  });

  it('should show all tweets on screen', () => {
    component.onClick('allTweets');
    expect(component.showAllTweets).toBeTrue;
    expect(component.childInfo).toBe('all');
  });

  it('should show taggedTweets on screen', () => {
    component.onClick('taggedTweets');
    expect(component.showTaggedTweets).toBeTrue;
    expect(component.childInfo).toBe('tags');
  });

  it('should show home on screen', () => {
    component.onClick('home');
    expect(component.showHome).toBeTrue;
  });

  it('should show search on screen', () => {
    component.onClick('search');
    expect(component.showHome).toBeTrue;
  });



});
