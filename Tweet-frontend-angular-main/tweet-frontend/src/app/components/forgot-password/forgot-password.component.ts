import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  questions = [
    'What is the name of your first school?',
    'What is the name of your favorite pet?',
    'In what city were you born?'
  ]
  forgotPassForm: FormGroup
  forgotPassRequest;
  subscribe: Subscription;
  showSuccess:Boolean;
  showError:Boolean
  error:String;
  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.showError=false;
    this.showSuccess=false;
    this.forgotPassForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      questions: new FormControl(null),
      answer: new FormControl('', Validators.required),
    });
    this.forgotPassForm.controls['questions'].setValue('What is the name of your first school?', { onlySelf: true });
  }

  onSubmit() {
    this.showError=false;
    this.showError=false;
    this.forgotPassRequest = {
      ques: this.forgotPassForm.controls['questions'].value,
      ans: this.forgotPassForm.controls['answer'].value,
      newPassword: this.forgotPassForm.controls['password'].value,
    }
    this.userService.forgotPassword(this.forgotPassRequest, this.forgotPassForm.controls['username'].value)
    .subscribe(result => {
      this.showSuccess=true;
    },
    error=>{
      this.showError=true;
      this.error=error.error;
    }
    )
  }

  ngOndestroy() {
    this.subscribe.unsubscribe;
  }

}
