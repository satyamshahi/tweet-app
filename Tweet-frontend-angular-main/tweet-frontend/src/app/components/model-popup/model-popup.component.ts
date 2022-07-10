import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Tweet } from 'src/app/model/Tweet';
import { TweetService } from 'src/app/Services/tweet.service';

@Component({
  selector: 'app-model-popup',
  templateUrl: './model-popup.component.html',
  styleUrls: ['./model-popup.component.scss']
})
export class ModelPopupComponent {

  @ViewChild('myModal', {static: false}) modal: ElementRef;

  @ViewChild('updateModal', {static: false}) updateModal: ElementRef;

  tweet:Tweet;
  updateMessage: any;
  elementRefHolder:ElementRef;
  constructor(private tweetService:TweetService) { }

  open(type:String,tweet?:Tweet) {
    if(type==='update'){
this.tweet=tweet;
this.updateMessage=tweet.message;
      this.elementRefHolder = this.updateModal;
    this.updateModal.nativeElement.style.display = 'block';

    } else{
      this.elementRefHolder = this.modal;
    this.modal.nativeElement.style.display = 'block';
    }
  }

  close() {
    if( this.elementRefHolder===this.updateModal){
      this.elementRefHolder.nativeElement.style.display = 'none';
      window.location.reload();
    } else{
      this.elementRefHolder.nativeElement.style.display = 'none';
    }
  }

updateTweet(){
  this.tweetService.updateTweet(this.tweet.loginId,this.tweet.id,this.updateMessage).add(()=>{
    window.location.reload();
  });
}
}
