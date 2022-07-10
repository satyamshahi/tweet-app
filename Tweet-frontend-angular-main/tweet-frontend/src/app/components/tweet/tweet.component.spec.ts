import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { TweetComponent } from './tweet.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { TweetService } from 'src/app/Services/tweet.service';

var tweetMockData: ApiResponse = {
  "success": true,
  "data": [
    {
      "id": "628c86683a9ab16d5169bc48",
      "loginId": "satyam1",
      "avtar": "avtar2",
      "message": "q",
      "time": "2022-06-01T14:22:26.821",
      "isLikeList": ["satyam1"],
      "commentList": [
        {
          "commentMessage": "this is Awesome",
          "commentor": "satyam1",
          "time": "2022-06-01T20:08:04.778"
        },
        {
          "commentMessage": "this is Awesome",
          "commentor": "satyam1",
          "time": "2022-06-09T01:43:05.837"
        },
        {
          "commentMessage": "this is Awesome",
          "commentor": "satyam1",
          "time": "2022-06-09T01:43:51.427"
        },
        {
          "commentMessage": "this is Awesome",
          "commentor": "satyam1",
          "time": "2022-06-16T06:41:34.55"
        }
      ]
    },
    {
      "id": "62a0f1dabcad6e4e2d3df14b",
      "loginId": "satyam1",
      "avtar": "avtar2",
      "message": "this is first tweet from satyam",
      "time": "2022-06-09T00:30:41.884",
      "isLikeList": ["satyam1"],
      "commentList": [
        {
          "commentMessage": "this is Awesome",
          "commentor": "satyam1",
          "time": "2022-06-16T06:42:38.381"
        }
      ]
    },
    {
      "id": "62a0f904bcad6e4e2d3df14c",
      "loginId": "satyam1",
      "avtar": "avtar2",
      "message": "this is first tweet from satyam",
      "time": "2022-06-09T01:01:16.158",
      "isLikeList": ["satyam1"],
      "commentList": null
    },
    {
      "id": "62a9d3666f63cc6b6491f3c3",
      "loginId": "satyam1",
      "avtar": "avtar2",
      "message": "hihi",
      "time": "2022-06-15T18:11:10.671",
      "isLikeList": ["satyam1"],
      "commentList": [
        {
          "commentMessage": "are ye to chal gya",
          "commentor": "satyam1",
          "time": "2022-06-16T22:08:41.708"
        }
      ]
    },
    {
      "id": "62a9e6986f63cc6b6491f3c4",
      "loginId": "satyam1",
      "avtar": "avtar2",
      "message": "satyam tweet",
      "time": "2022-06-15T19:33:04.743",
      "isLikeList": [],
      "commentList": [
        {
          "commentMessage": "satyam is awesome!!",
          "commentor": "satyam1",
          "time": "2022-06-17T16:07:39.885"
        }
      ]
    }
  ],
  "error": null
};


describe('TweetComponent', () => {
  let component: TweetComponent;
  let fixture: ComponentFixture<TweetComponent>;
  const tweetServiceSpy: jasmine.SpyObj<TweetService> = jasmine.createSpyObj('TweetService', ['allTweets', 'userTweets', 'createTweet',
    'removeLike', 'likeTweet', 'replyTweet', 'deleteTweet']);
  let activatedRouteSpy = {
    snapshot: {
      paramMap: convertToParamMap({
        username: 'satyam1'
      })
    }
  };
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TweetComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy
        },
        {
          provide: TweetService,
          useValue: tweetServiceSpy
        },
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetComponent);
    component = fixture.componentInstance;

    tweetServiceSpy.userTweets.and.returnValue(of(tweetMockData));
    fixture.detectChanges();
  });

  it('should create', () => {
    localStorage.setItem('loginId', 'satyam1');

    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('like', fakeAsync(() => {
    component.setLike('/assets/like.png', 1);
    expect(tweetServiceSpy.removeLike).toHaveBeenCalled();

  }));

  it('un-like', fakeAsync(() => {

    component.setLike('/assets/un-like.png', 0);
    expect(tweetServiceSpy.likeTweet).toHaveBeenCalled();

  }));

  it('show Reply', fakeAsync(() => {

    component.showReply(0);
    expect(component.isReply.get(0)[1]).toEqual("Hide reply");

  }));

  it('Hide Reply', fakeAsync(() => {
    component.isReply.set(0, [true, "Hide reply"]);
    component.showReply(0);
    expect(component.isReply.get(0)[1]).toEqual("Show reply");

  }));

  it('reply Tweet', fakeAsync(() => {

    tweetServiceSpy.replyTweet.and.returnValue(new Subscription());
    component.replyTweet(0, 'satyam1', 'hyuhj');
    expect(tweetServiceSpy.replyTweet).toHaveBeenCalled();

  }));

  it('delete Tweet', fakeAsync(() => {
    tweetServiceSpy.deleteTweet.and.returnValue(new Subscription());
    component.deleteTweet(tweetMockData.data[0]);
    expect(tweetServiceSpy.deleteTweet).toHaveBeenCalled();

  }));

});


describe('TweetComponent', () => {
  let component: TweetComponent;
  let fixture: ComponentFixture<TweetComponent>;
  const tweetServiceSpy: jasmine.SpyObj<TweetService> = jasmine.createSpyObj('TweetService', ['allTweets', 'userTweets', 'createTweet',
    'removeLike', 'likeTweet', 'replyTweet', 'deleteTweet']);
  let activatedRouteSpy = {
    snapshot: {
      paramMap: convertToParamMap({
        username: 'all'
      })
    }
  };
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TweetComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy
        },
        {
          provide: TweetService,
          useValue: tweetServiceSpy
        },
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetComponent);
    component = fixture.componentInstance;

    tweetServiceSpy.allTweets.and.returnValue(of(tweetMockData));
    fixture.detectChanges();
  });

  it('should create', () => {
    localStorage.setItem('loginId', 'satyam1');

    component.ngOnInit();
    expect(component).toBeTruthy();
  });


});
