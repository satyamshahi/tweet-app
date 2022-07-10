import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Tweet } from 'src/app/model/Tweet';
import { TweetService } from 'src/app/Services/tweet.service';
import { ModelPopupComponent } from '../model-popup/model-popup.component';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  
  @ViewChild('modal', {static: false}) modal: ModelPopupComponent
  username: String;
  tweets:Tweet[];
  message: String;
  isReply = new Map();
  heading:String;
  comment=[];
  loginId:string;
  showThreeDots=false;
  popup=false;
  @Input() user:String;

  constructor(private service:TweetService,
    private route: ActivatedRoute,
    private router:Router) { }
    
  ngOnInit(): void {
    this.getTweets();
  }

  getTweets() {
    this.username = this.route.snapshot.paramMap.get('username');
    if(this.username=='all' || this.user=='all'){
      this.loginId=localStorage.getItem('loginId');
      this.heading='ALL';
      this.service.allTweets().subscribe(result => {
        this.tweets=<Tweet[]>result.data;
        this.mapTweets(result.data);
      },
        (error) => {
          if(error.error.error=='JWT Token is Not Valid'){
            this.router.navigate(['/login']);
          }
        });
    }
    else if(this.username=='tags' || this.user=='tags'){
      this.service.taggedTweets().subscribe(result=>{
       if(result.data){
        this.tweets=<Tweet[]>result.data
      this.mapTweets(result.data);
       }
      },
      (error) => {
        if(error.error.error=='JWT Token is Not Valid'){
          this.router.navigate(['/login']);
        }
      })

    }
    else{
       this.loginId=localStorage.getItem('username');
    
      this.heading=this.username.toUpperCase();
    this.service.userTweets(this.username).subscribe(result => {
       this.tweets=<Tweet[]>result.data
      this.mapTweets(result.data);
    },
      (error) => {
        if(error.error.error=='JWT Token is Not Valid'){
          this.router.navigate(['/login']);
        }
      });
    }
  }

  mapTweets(data: any) {
    let i = 0;
    this.tweets = data.map(element => {
      this.isReply.set(i, [false, "Show reply"]);
      i = i + 1;
      return {
        ...element,
        avtar: '/assets/' + element.avtar + '.png',
        time: moment(element.time).fromNow(),
        commentList: this.formatComment(element.commentList),
        likeImage: this.setLikeImage(element)
      }
    });
  }

  formatComment(commentList: any) {
    if (commentList)
      return commentList.map(element => {
        return {
          ...element,
        time: moment(element.time).fromNow()
        }
      });
  }
  setLikeImage(tweet:any){
    if(tweet.isLikeList!=null){
     if( tweet.isLikeList.find(x=>x===tweet.loginId)!=null){
      return '/assets/like.png';
     } else{
      return '/assets/un-like.png';
     }
    }else
    return '/assets/un-like.png';
  }
 setLike(like: any, index:number){
  index=this.tweets.length-index-1;
  if(like==="/assets/like.png"){
    this.tweets[index]['likeImage']='/assets/un-like.png';
  this.service.removeLike(this.tweets[index]['loginId'],this.tweets[index]['id']);
  } else{
    this.tweets[index]['likeImage']='/assets/like.png';
    this.service.likeTweet(this.tweets[index]['loginId'],this.tweets[index]['id']);
  }
  }

  showReply(index: any) {
    if (this.isReply.get(index)[1] == "Show reply") {
      this.isReply.set(index, [true, "Hide reply"]);
    } else {
      this.isReply.set(index, [false, "Show reply"]);
    }
  }

  replyTweet(index:number, username:String, tweetId:String){
    let commentObj = <Comment><unknown>{
      'commentMessage': this.comment[index],
      'commentor': localStorage.getItem('loginId'),
      'time':new Date()
    }
    this.comment[index]="";
    this.service.replyTweet(username,tweetId,commentObj).add(()=>{
      this.ngOnInit();
    });
  }

  openModal(tweet:Tweet) {
    this.popup=true;
   setTimeout(()=>{
this.modal.open("update", tweet);
   }); 
    
  }

deleteTweet(tweet: Tweet){
  this.service.deleteTweet(tweet.loginId,tweet.id).add(()=>{
    this.ngOnInit();
  });
}

}
