import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';

import { RegisterUserComponent } from './register-user.component';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;
  let userServiceSpy = jasmine.createSpyObj('UserService', ['registerUser']);
  const result = 'Succesfuly Registered with login id sasha';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterUserComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: UserService,
          useValue: userServiceSpy
        }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid email', () => {
    component.profileForm.setValue({
      username: 'sasha',
      firstName: 'Sasha',
      lastName: 'Harris',
      emailId: 'invalidemail',
      password: 'qwe',
      confirmPassword: 'qwe',
      contactNumber: '9876543210',
      questions: 'question',
      avtar: 'avtar1',
      answer: 'ans',
    });
    expect(component.profileForm.valid).toEqual(false);
  });
  it('should require valid contact number', () => {
    component.profileForm.setValue({
      username: 'sasha',
      firstName: 'Sasha',
      lastName: 'Harris',
      emailId: 'invalidemail',
      password: 'qwe',
      confirmPassword: 'qwe',
      contactNumber: '123',
      questions: 'question',
      avtar: 'avtar1',
      answer: 'ans',
    });
    expect(component.profileForm.valid).toEqual(false);
  });


  it('should allow user to register', () => {
    const formData = {
      username: 'sasha',
      firstName: 'Sasha',
      lastName: 'Harris',
      emailId: 'valid@email.com',
      password: 'qwe',
      confirmPassword: 'qwe',
      contactNumber: '9876543210',
      questions: 'question',
      avtar: 'avtar1',
      answer: 'ans',
    };
    component.profileForm.setValue(formData);
    userServiceSpy.registerUser.and.callFake(() => {
      return of(result);
    })
    component.onSubmit();
    expect(userServiceSpy.registerUser).toHaveBeenCalled();
    expect(component.isRegistered).toBeTrue;
  })

  it('should show error if password and confirm password does not match', () => {
    component.profileForm.setValue({
      username: 'sasha',
      firstName: 'Sasha',
      lastName: 'Harris',
      emailId: 'valid@email.com',
      password: 'qwe',
      confirmPassword: 'qwer',
      contactNumber: '9876543210',
      questions: 'question',
      avtar: 'avtar1',
      answer: 'ans',
    });
    component.onSubmit();
    expect(component.passwordError).toEqual(true);
  });

  it('should show error on screen if service send error response', () => {
    const formData = {
      username: 'sasha',
      firstName: 'Sasha',
      lastName: 'Harris',
      emailId: 'valid@email.com',
      password: 'qwe',
      confirmPassword: 'qwe',
      contactNumber: '9876543210',
      questions: 'question',
      avtar: 'avtar1',
      answer: 'ans',
    };
    component.profileForm.setValue(formData);
    userServiceSpy.registerUser.and.callFake(() => {
      return throwError(result);
    })
    component.onSubmit();
    expect(userServiceSpy.registerUser).toHaveBeenCalled();
    expect(component.showError).toBeTrue;
  })


});


