import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { TweetService } from './tweet.service';
import { UserService } from './user.service';
import { ApiResponse } from '../model/ApiResponse';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

describe('TweetService', () => {
  let service: TweetService;
  let httpMock: HttpTestingController;
  let httpClientspy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
  const userServiceSpy: jasmine.SpyObj<UserService> = jasmine.createSpyObj('UserService', ['getUser']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: UserService,
        useValue: userServiceSpy
      },
      {
        provide: HttpClient,
        useValue: httpClientspy
      }]
    });
    service = TestBed.inject(TweetService);
  });

  beforeEach(waitForAsync(inject([HttpTestingController], (http: HttpTestingController) => {
    httpMock = http;
  })));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be set Auth Header', () => {
    localStorage.setItem('token', 'jwtToken');
    service.setAuthHeader();
    expect(service.httpOptions['responseType']).toEqual('json');
  });

  it('should be call userTweets api', () => {
    let spy = spyOn(service, 'setAuthHeader');
    const apiResponse: ApiResponse = { data: { tweetId: 'tweetId' } };
    httpClientspy.get.and.returnValue(of(apiResponse));
    service.userTweets('satyam1');
    expect(spy).toHaveBeenCalled();

  });

  it('should be call allTweets api', () => {
    let spy = spyOn(service, 'setAuthHeader');
    const apiResponse: ApiResponse = { data: { tweetId: 'tweetId' } };
    httpClientspy.get.and.returnValue(of(apiResponse));
    service.allTweets();
    expect(spy).toHaveBeenCalled();

  });

  it('should be call callTweetApi api', () => {
    let spy = spyOn(service, 'callTweetApi');
    const apiResponse: ApiResponse = { data: { avtar: 'avtar1' } };
    userServiceSpy.getUser.and.returnValue(of(apiResponse));
    service.createTweet('createTweet', 'satyam1', ['satyam2']);
    expect(spy).toHaveBeenCalled();

  });

  it('should be call callTweetApi api', () => {
    let spy = spyOn(service, 'setTag');
    const apiResponse: ApiResponse = { data: { tweetId: 'tweetId' } };
    httpClientspy.post.and.returnValue(of(apiResponse));
    service.callTweetApi('createTweet', 'satyam1', 'avtar1', ['satyam2']);
    expect(spy).toHaveBeenCalled();

  });

  it('should be call callTweetApi api having emplt userList', () => {
    const apiResponse: ApiResponse = { data: { tweetId: 'tweetId' } };
    httpClientspy.post.and.returnValue(of(apiResponse));
    service.callTweetApi('createTweet', 'satyam1', 'avtar1');

  });

  it('should be call likeTweet api', () => {
    let spy = spyOn(service, 'setAuthHeader');
    const apiResponse: ApiResponse = { data: { tweetId: 'tweetId' } };
    httpClientspy.put.and.returnValue(of(apiResponse));
    service.likeTweet('satyam1', 'avtar1');
    expect(spy).toHaveBeenCalled();

  });

  it('should be call removelikeTweet api', () => {
    let spy = spyOn(service, 'setAuthHeader');
    const apiResponse: ApiResponse = { data: { tweetId: 'tweetId' } };
    httpClientspy.put.and.returnValue(of(apiResponse));
    service.removeLike('satyam1', 'avtar1');
    expect(spy).toHaveBeenCalled();

  });

  it('should be call reply tweet api', () => {
    let comentObj = <Comment>{}
    let spy = spyOn(service, 'setAuthHeader');
    const apiResponse: ApiResponse = { data: { tweetId: 'tweetId' } };
    httpClientspy.put.and.returnValue(of(apiResponse));
    service.replyTweet('satyam1', 'avtar1', comentObj);
    expect(spy).toHaveBeenCalled();

  });

  it('should be call updateTweet api', () => {
    let spy = spyOn(service, 'setAuthHeader');
    const apiResponse: ApiResponse = { data: { tweetId: 'tweetId' } };
    httpClientspy.put.and.returnValue(of(apiResponse));
    service.updateTweet('satyam1', 'avtar1', 'update message');
    expect(spy).toHaveBeenCalled();

  });

  it('should be call deleteTweet api', () => {
    let spy = spyOn(service, 'setAuthHeader');
    const apiResponse: ApiResponse = { data: { tweetId: 'tweetId' } };
    httpClientspy.delete.and.returnValue(of(apiResponse));
    service.deleteTweet('satyam1', 'avtar1');
    expect(spy).toHaveBeenCalled();

  });

  it('should be call taggedTweets api', () => {
    let spy = spyOn(service, 'setAuthHeader');
    const apiResponse: ApiResponse = { data: { tweetId: 'tweetId' } };
    httpClientspy.get.and.returnValue(of(apiResponse));
    httpClientspy.post.and.returnValue(of(apiResponse));
    service.taggedTweets();
    expect(spy).toHaveBeenCalled();

  });

  it('should be give error while calling taggedTweets api', () => {
    const apiResponse: ApiResponse = { data: { tweetId: 'tweetId' } };
    httpClientspy.get.and.returnValue(of(apiResponse));
    httpClientspy.post.and.returnValue(throwError({ status: 404 }));
    service.taggedTweets();

  });

  it('should be give error while calling taggedTweets api', () => {
    httpClientspy.get.and.returnValue(throwError({ status: 404 }));
    httpClientspy.post.and.returnValue(throwError({ status: 404 }));
    service.taggedTweets();

  });

  it('should be call setTag api', () => {
    const apiResponse: ApiResponse = { data: { tweetId: 'tweetId' } };
    httpClientspy.put.and.returnValue(of(apiResponse));
    service.setTag(['satyam1'], 'tweetId');

  });

});
