import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleasideService {
  private statusSource = new BehaviorSubject(false)
  currentStatus = this.statusSource.asObservable() 

  togglerSlider(status){
    this.statusSource.next(status)
  }
  constructor() { }
}
