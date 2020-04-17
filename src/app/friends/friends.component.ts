import { Component, OnInit } from '@angular/core';
import { users } from '../modals/users';
import { usersService } from "../users.service/users.service";
import { AccountInfoService } from '../account-info.service';
import { VisitProfileService } from '../visit-profile.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

/* -------------------------------------------------------------------------- */
/*                             UserData Variables                             */
/* -------------------------------------------------------------------------- */

friends:users[];
findFriend:users[];
users:users[];
blockFriends=[];
currentUser;

/* -------------------------------------------------------------------------- */
/*                                 Constructor                                */
/* -------------------------------------------------------------------------- */

  constructor(private usersService : usersService,
    private loged:AccountInfoService,
    private visitAccount:VisitProfileService) { }

/* -------------------------------------------------------------------------- */
/*                          NgOninit lifeCycle Start                          */
/* -------------------------------------------------------------------------- */

  ngOnInit(): void {


/* --------------------- Current User from localStorage --------------------- */


    this.loged.userloged.subscribe(UserInfo =>{
      this.currentUser = UserInfo
    })



/* ------------------ All Users to check who in friend list ----------------- */


    this.usersService.getUser().subscribe(users=>{
      let currentFriends = [];
      let find = [];
      for(var i = 0 ; i < users.length ; i++){
        if(this.currentUser.friends){
        for(var j = 0 ; j < this.currentUser.friends.length ; j++){
          if(users[i].id === this.currentUser.friends[j]){
            currentFriends.push(users[i])
          }else{
            find.push(users[i])
          }
        }
      }
    }
      this.friends = currentFriends;
      this.findFriend = find
    }
    )
  }

/* -------------------------------------------------------------------------- */
/*                              Ng LifeCycle End                              */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                             Delete From Friends                            */
/* -------------------------------------------------------------------------- */

  deleteFriend(event,user){
/* ------------------------ Delete From Current User ------------------------ */
    let userindex = this.currentUser.friends.indexOf(user.id)
    this.currentUser.friends.splice(userindex,1);
/* ----------------------- Delete From The second User ---------------------- */
    let currentindexFriends = user.friends.indexOf(this.currentUser.id)
    let currentIndex = user.pendingRequest.indexOf(this.currentUser.id)
    user.pendingRequest.splice(currentIndex , 1);
    user.friends.splice(currentindexFriends,1);
    localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
    this.usersService.updateUser(user)
    this.loged.getAccount()
    this.usersService.updateUser(this.currentUser)
  }

/* -------------------------------------------------------------------------- */
/*                                 Block User                                 */
/* -------------------------------------------------------------------------- */

  blockFriend(event,user){
    console.log(user);
    this.blockFriends.push(user);
    console.log(this.blockFriends);
    // this.users[1].blockFriends = this.usersService.createUser(user);
  }
  strangProfile(event,friendObj){
  //  this.visitAccount.activeVistor(friendObj)
   localStorage.setItem("friend",JSON.stringify(friendObj))
   this.visitAccount.activeVistor()
  }
}
