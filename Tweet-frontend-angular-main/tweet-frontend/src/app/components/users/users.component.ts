import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() user:String;
username:String;
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router:Router) { }

  users;
  subscribe: Subscription;

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')
    this.setUp(this.user);  
  }

  setUp(user){
    if(this.username=='all' || this.user=='all'){
      this.userService.getAllUsers().subscribe(result=>{
        this.mapUsers(result.data);
      },
      error=>{
        if(error.error.error='JWT Token is Not Valid'){
          this.router.navigate(['/login']);
        }
      })
    }
    else {
      this.userService.searchUsers(this.user).subscribe(result=>{
        this.mapUsers(result.data);
      },
      error=>{
        if(error.error.error='JWT Token is Not Valid'){
          this.router.navigate(['/login']);
        }
        
      }
      )
    }
  }

  mapUsers(data){
    this.users=data.map(ele=>{
      return{
        ...ele,
      avtar:'/assets/' + ele.avtar + '.png'
      }
    })

  }

  ngOndestroy() {
    this.subscribe.unsubscribe;
  }

}
