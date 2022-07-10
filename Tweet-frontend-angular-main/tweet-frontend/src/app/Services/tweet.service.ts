import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Subject } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse';
import { TagRequest } from '../model/TagRequest';

export interface CreateTweet {
  avtar: String
  username: String;
  message: String;
}
@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private baseUrl = 'http://3.111.245.87:9090/api/v1.0/tweets/';
  constructor(private client: HttpClient,
    private userService: UserService) { }

  httpOptions: Object;

  setAuthHeader(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'json'
    }
  }

  public userTweets(username: String) {
    this.setAuthHeader();
    return this.client.get<ApiResponse>(this.baseUrl + username, this.httpOptions);
  }

  public allTweets() {
    this.setAuthHeader();
    return this.client.get<ApiResponse>(this.baseUrl+'all', this.httpOptions);
  }

  public createTweet(username: String, message: String, users? : String[]) {
    var avatar;
    return this.userService.getUser(username).subscribe(result => {
      avatar = result.data['avtar'];
     this.callTweetApi(username,message,avatar,users);
    }) 

  }

  public callTweetApi(username: String, message: String, avatar:String,users?:String[]){
    let createTweet={
      avtar:avatar,
      loginId: username,
      message: message
    }
    var tweetId;
    this.setAuthHeader();
    return this.client.post<ApiResponse>(this.baseUrl + username + '/add', createTweet ,this.httpOptions).subscribe(result=>{
      tweetId=result.data['tweetId'];
      if(users!=null)
      this.setTag(users,tweetId);
    })
  }

  public likeTweet(username: String, tweetId: String) {
    this.setAuthHeader();
    this.client.put(this.baseUrl + username + '/like/'+tweetId , {},this.httpOptions).subscribe(result=>{
    }) 

  }

  public taggedTweets(){
    var subject=new Subject<ApiResponse>();
    this.setAuthHeader();
    let tweetIdList:String[];
    const loginId=localStorage.getItem('loginId');
    this.client.get<ApiResponse>(this.baseUrl+loginId+'/tags',this.httpOptions).subscribe(result=>{
      tweetIdList = result.data['tweetId'];
      this.client.post(this.baseUrl+'/get-tweets',tweetIdList, this.httpOptions).subscribe((data)=>{
        subject.next(data);
      },
      error=>{
        subject.next(error);
      });
    },
    error=>{
      subject.next(error);
    })
return subject;
  }

  public setTag(users:String[],tweetId:String){
    let tagRequest:TagRequest={
      tweetId:tweetId,
      users: users
    }
    this.client.put(this.baseUrl+'tag',tagRequest,this.httpOptions).subscribe(result=>{
    });
   
  }

  public removeLike(username: String, tweetId: String) {
    this.setAuthHeader();
    this.client.put(this.baseUrl + username + '/remove-like/'+tweetId , {},this.httpOptions).subscribe(result=>{
    }) 

  }

replyTweet( username:String, tweetId:String, commentObj:Comment, ){
  this.setAuthHeader();
  return this.client.put(this.baseUrl + username + '/reply/'+tweetId , commentObj,this.httpOptions).subscribe(result=>{
  })
}

updateTweet( username:String, tweetId:String, updateMessage:String ){
  let updateObj = {
    message:updateMessage
  }
  this.setAuthHeader();
  return this.client.put(this.baseUrl + username + '/update/'+tweetId , updateObj,this.httpOptions).subscribe(result=>{
  })
}

deleteTweet( username:String, tweetId:String){
  this.setAuthHeader();
  return this.client.delete(this.baseUrl + username + '/delete/'+tweetId ,this.httpOptions).subscribe(result=>{
  })
}

}
