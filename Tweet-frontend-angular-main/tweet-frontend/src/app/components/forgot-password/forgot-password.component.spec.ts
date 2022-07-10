import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let userServiceSpy = jasmine.createSpyObj('UserService', ['forgotPassword']);
  const successResult = 'Succesfuly changed Password';
  const failResult = 'Error Occurred'


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      providers: [HttpClientModule,
        {
          provide: UserService,
          useValue: userServiceSpy
        }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow user to submit form', () => {
    component.forgotPassForm.setValue({
      username: 'sasha',
      password: 'qwe',
      questions: 'What is the name of your first school?',
      answer: 'dsps',
    });
    userServiceSpy.forgotPassword.and.returnValue(of(successResult));
    expect(component.forgotPassForm.valid).toEqual(true);
    component.onSubmit();
    expect(userServiceSpy.forgotPassword).toHaveBeenCalled();
  });

  it('should require valid form details', () => {
    component.forgotPassForm.setValue({
      username: 'sasha',
      password: null,
      questions: 'What is the name of your first school?',
      answer: 'dsps',
    });
    expect(component.forgotPassForm.valid).toEqual(false);
  });

  it('should show error on screen if service send error response', () => {
    component.forgotPassForm.setValue({
      username: 'sasha',
      password: 'qwe',
      questions: 'What is the name of your first school?',
      answer: 'dsps',
    });
    userServiceSpy.forgotPassword.and.callFake(() => {
      return throwError(failResult);
    })
    component.onSubmit();
    expect(userServiceSpy.forgotPassword).toHaveBeenCalled();
    expect(component.showError).toBeTrue;
  });


});
