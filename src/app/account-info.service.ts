import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { usersService } from './users.service/users.service';

@Injectable({
  providedIn: 'root'
})
export class AccountInfoService {
  constructor(private users:usersService) { }


  private loginstatuts = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')))
  userloged = this.loginstatuts.asObservable()
  getAccount(){
    this.loginstatuts.next(JSON.parse(localStorage.getItem('currentUser')))
  }
}
