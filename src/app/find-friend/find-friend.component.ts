import { Component, OnInit } from '@angular/core';
import { users } from '../modals/users';
import { usersService } from "../users.service/users.service";
import { AccountInfoService } from '../account-info.service';

@Component({
  selector: 'app-find-friend',
  templateUrl: './find-friend.component.html',
  styleUrls: ['./find-friend.component.scss']
})
export class FindFriendComponent implements OnInit {

  friends:users[];
  friendsUser=[];
  friend;
  currentUser;
  people:any;
  constructor(private usersService : usersService,
    private loged:AccountInfoService) { }

  ngOnInit(): void {
    this.loged.userloged.subscribe(UserInfo =>{
      this.currentUser = UserInfo
    })
    this.usersService.getUser().subscribe(users=>{
      this.loged.getAccount();

      let currentFriends = [];
      let find = [];
      for(var i = 0 ; i < users.length ; i++){
        let flag = true;
        if(this.currentUser.friends){
          for(var j = 0 ; j < this.currentUser.friends.length ; j++){
            if(users[i].id === this.currentUser.friends[j]){
                currentFriends.push(users[i])
                flag = false;
            }
          }
      }
      if(this.currentUser.friendrequest){
        for(var j = 0 ; j < this.currentUser.friendrequest.length ; j++){
          if(users[i].id === this.currentUser.friendrequest[j]){
              currentFriends.push(users[i])
              flag = false;
          }
        }
    }
    if(this.currentUser.pendingRequest){
      for(var j = 0 ; j < this.currentUser.pendingRequest.length ; j++){
        if(users[i].id === this.currentUser.pendingRequest[j]){
            currentFriends.push(users[i])
            flag = false;
        }
      }
  }
      if(users[i].id !== this.currentUser.id){
        if(flag){
          find.push(users[i])
        }
      }
      }
      this.friends = currentFriends;
      this.people = [...new Set(find)];
    }
    )
  }
  
  addFriend(event,item){
    // this.friendsUser.push(item.id);
    // this.usersService.editUser(item.id);
    // console.log(this.friendsUser); 
    // let itemIndex = this.people.indexOf(item.id);
    // this.people.splice(itemIndex , 1);
    // localStorage.setItem("currentUser",JSON.stringify(this.currentUser));
    // this.loged.getAccount();
    // this.usersService.updateUser(this.currentUser);
      if(item.friendrequest){
        item.friendrequest.push(this.currentUser.id);
      }else{
        item.friendrequest = []
        item.friendrequest.push(this.currentUser.id);
      }
      if(this.currentUser.pendingRequest){
        this.currentUser.pendingRequest.push(item.id)
      }else{
        this.currentUser.pendingRequest = [];
        this.currentUser.pendingRequest.push(item.id)
      }
      localStorage.setItem("currentUser",JSON.stringify(this.currentUser));
      this.loged.getAccount();
      this.usersService.updateUser(this.currentUser)
      this.usersService.updateUser(item)
      event.target.parentNode.parentNode.style.display = "none"

  }

}
