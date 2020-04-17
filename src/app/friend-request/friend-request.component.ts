
import { Component, OnInit } from '@angular/core';
import { users } from '../modals/users';
import { usersService } from "../users.service/users.service";
import { AccountInfoService } from '../account-info.service';
@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.scss']
})
export class FriendRequestComponent implements OnInit {

/* -------------------------------------------------------------------------- */
/*                             UserData Variables                             */
/* -------------------------------------------------------------------------- */

  friendrequests:users[];
  users:users[];
  friendsUser=[];
  currentUser;

/* -------------------------------------------------------------------------- */
/*                                 Constructor                                */
/* -------------------------------------------------------------------------- */


  constructor(private usersService : usersService,
    private loged:AccountInfoService) { }


/* -------------------------------------------------------------------------- */
/*                          NgOninit lifeCycle Start                          */
/* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this.loged.userloged.subscribe(UserInfo =>{
      this.currentUser = UserInfo
    })
    this.usersService.getUser().subscribe(users=>{
      let currentFriends = [];
      for(var i = 0 ; i < users.length ; i++){
        if(this.currentUser.friendrequest){
        for(var j = 0 ; j < this.currentUser.friendrequest.length ; j++){
          // console.log(users[i].id,this.currentUser.friendrequest[j])
          if(users[i].id === this.currentUser.friendrequest[j]){
            // console.log(this.currentUser.friendrequest);

            currentFriends.push(users[i])
          }
        }
      }
    }
      this.friendrequests = currentFriends;
      console.log(this.friendrequests);
      
    }
    )
  }
/* -------------------------------------------------------------------------- */
/*                              Ng LifeCycle End                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 Add Friend                                 */
/* -------------------------------------------------------------------------- */

  addFriend(event,user){
    if(this.currentUser.friends){
      this.currentUser.friends.push(user.id);
    }else{
      this.currentUser.friends = [];
      this.currentUser.friends.push(user.id);
    }
    if(user.friends){
      user.friends.push(this.currentUser.id);
    }else{
      user.friends = [];
      user.friends.push(this.currentUser.id);
    }
    let userIndex = this.currentUser.friendrequest.indexOf(user.id);
    let currentIndex = user.pendingRequest.indexOf(this.currentUser.id)
    user.pendingRequest.splice(currentIndex , 1);
    this.currentUser.friendrequest.splice(userIndex , 1);
    localStorage.setItem("currentUser",JSON.stringify(this.currentUser));
    this.loged.getAccount();
    this.usersService.updateUser(this.currentUser);
    this.usersService.updateUser(user)
  }

/* -------------------------------------------------------------------------- */
/*                                Reject Friend                               */
/* -------------------------------------------------------------------------- */

  rejectFriend(event,item){
    let itemIndex = this.currentUser.friendrequest.indexOf(item.id);
    let currentIndex = item.pendingRequest.indexOf(this.currentUser.id)
    this.currentUser.friendrequest.splice(itemIndex , 1);
    item.pendingRequest.splice(currentIndex , 1);
    localStorage.setItem("currentUser",JSON.stringify(this.currentUser));
    this.loged.getAccount();
    this.usersService.updateUser(item)
    this.usersService.updateUser(this.currentUser);
  }

}