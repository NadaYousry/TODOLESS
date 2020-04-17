import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectDisplayService {
private projectSource = new BehaviorSubject(JSON.parse(localStorage.getItem('currentProject')))
currentProject = this.projectSource.asObservable()
  constructor() { }
  displayProject(){
    this.projectSource.next(JSON.parse(localStorage.getItem('currentProject')))
  }
}
