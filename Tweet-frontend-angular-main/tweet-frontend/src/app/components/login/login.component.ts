import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: Boolean;
  errorMessage: String;
  loading: boolean
  subscribe: Subscription;
  loginForm: FormGroup

   

  constructor(private userService: UserService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.error = false;
    this.loading = false;
  }


  onSubmit() {
    this.userService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe(result => {
      if (result === true) {
        this.router.navigate(['home', this.loginForm.controls['username'].value]);
      }
      else {
        this.error = true;
        if (this.userService.error != null && this.userService.error == 'UserCredential is not authorized....')
          this.errorMessage = 'Invalid username or password'
        else
          this.errorMessage = 'System Error';
      }
    })

  }

  forgotPass(){
    this.router.navigate(['forgot-password']);

  }
  ngOndestroy() {
    this.subscribe.unsubscribe;
  }
}
