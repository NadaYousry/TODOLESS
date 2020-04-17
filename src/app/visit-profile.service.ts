import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitProfileService {
  
  private profileSoruce = new BehaviorSubject(JSON.parse(localStorage.getItem("friend")))
  vistedprofile = this.profileSoruce.asObservable()
  constructor() { }

  activeVistor(){
    // this.profileSoruce.next(obj)
    // console.log(obj)
    this.profileSoruce.next(JSON.parse(localStorage.getItem("friend")))
  }
}
