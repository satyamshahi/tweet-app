import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { Tweet } from 'src/app/model/Tweet';
import { TweetService } from 'src/app/Services/tweet.service';

import { ModelPopupComponent } from './model-popup.component';

const mockElementRef :any = {
  nativeElement: {
    style : { 
      display : 'block'
    }
  }
}

const tweetMock : Tweet = {
  "id":"628c86683a9ab16d5169bc48",
  "loginId":"satyam1",
  "avtar":"avtar2",
  "message":"q",
  "time":new Date(),
  "isLikeList":["satyam1"],
  "commentList":null
  };

describe('ModelPopupComponent', () => {
  let component: ModelPopupComponent;
  let fixture: ComponentFixture<ModelPopupComponent>;
  const tweetServiceSpy: jasmine.SpyObj<TweetService>  = jasmine.createSpyObj('TweetService', ['updateTweet']);
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelPopupComponent ],
      providers: [
        {
          provide: TweetService,
          useValue: tweetServiceSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('open Update popup', () => {
   component.updateModal = mockElementRef;
   component.open('update',tweetMock);
    expect(component.updateMessage).toEqual('q');
  });

  it('open other popup', () => {
    component.modal = mockElementRef;
    component.open('model');
     expect(component.modal.nativeElement.style.display).toEqual('block');
   });

   it('close other popup', () => {
    component.modal = mockElementRef;
    component.elementRefHolder = mockElementRef;
    component.close();
     expect(component.modal.nativeElement.style.display).toEqual('none');
   });

   it('update tweet', () => {
    tweetServiceSpy.updateTweet.and.returnValue(new Subscription());
    component.tweet = tweetMock;
    component.updateTweet();
     expect(tweetServiceSpy.updateTweet).toHaveBeenCalled();
   });
   
});
