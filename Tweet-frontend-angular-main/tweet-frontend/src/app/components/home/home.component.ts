import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService) { }

   username:String;
   showAllTweets:Boolean;
   showAllUsers:Boolean;
   showSearchUser:Boolean;
   showUserTweets:Boolean
   showHome:Boolean;
   showTaggedTweets:Boolean;
   childInfo:String;

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
   
    this.userService.getUser(this.username).subscribe((user)=>{
      localStorage.setItem('avtar',user.data['avtar']);
      localStorage.setItem('userName',user.data['name']);
      localStorage.setItem('loginId',user.data['loginId']);
      this.showHome=true;
    });
  }

  getItem(item: string){
    if(item=='avtar')
    return '/assets/'+localStorage.getItem(item)+'.png';
    return localStorage.getItem(item);
  }

  onClick(value){
    if(value=='allUsers'){
      this.showAllUsers=true;
      this.childInfo='all';
      this.showHome=false;
      this.showAllTweets=false;
      this.showTaggedTweets=false;
      this.showSearchUser=false;
    }
    else if(value=='allTweets'){
      this.showAllTweets=true;
      this.showAllUsers=false;
      this.showHome=false;
      this.showTaggedTweets=false;
      this.childInfo='all';
      this.showSearchUser=false;
    }
    else if(value=='taggedTweets'){
      this.showTaggedTweets=true;
      this.showAllTweets=false;
      this.showAllUsers=false;
      this.showHome=false;
      this.childInfo='tags';
      this.showSearchUser=false;
    }
    else if(value=='home'){
      this.showHome=true;
      this.showAllUsers=false;
      this.showAllTweets=false;
      this.showTaggedTweets=false;
      this.showSearchUser=false;
    }
    else if(value=='search'){
      this.showSearchUser=true;
      this.showAllUsers=false;
      this.showAllTweets=false;
      this.showTaggedTweets=false;
      this.showHome=false;    
    }
  }
  
  @ViewChild('search', {static: false}) searchUser: UsersComponent

  search(user:String){
    this.childInfo=user;
setTimeout(()=>{
  this.searchUser.ngOnInit();
})

  }


}
