import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TagRequest } from 'src/app/model/TagRequest';
import { TweetService } from 'src/app/Services/tweet.service';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss']
})
export class CreateTweetComponent implements OnInit {

  @Input() username: String;
  form: FormGroup;
  tagRequest: TagRequest;
  taggedUsers: String[];


  constructor(private service: TweetService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      message: new FormControl,
      tagValue: new FormControl
    })

  }


  createTweet() {
    if (this.form.controls['tagValue'].value != null) {
      var users = this.form.controls['tagValue'].value.split(" ");
      this.service.createTweet(this.username, this.form.controls['message'].value, users).add(result => {
        setTimeout(()=>{
          window.location.reload();
         },200);
        
      });
    }
    else {
      this.service.createTweet(this.username, this.form.controls['message'].value).add(result => {
        setTimeout(()=>{
          window.location.reload();
         },200);
      });
    }

  }

}
