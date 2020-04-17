import { Component, OnInit } from '@angular/core';
import { ToggleasideService } from '../toggleaside.service';
import { AccountInfoService } from '../account-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-navbar',
  templateUrl: './account-navbar.component.html',
  styleUrls: ['./account-navbar.component.scss']
})
export class AccountNavbarComponent implements OnInit {
  buttonStatus:boolean = true;
  currentUser;
  constructor(private toggler:ToggleasideService,
    private loged:AccountInfoService,
    private router:Router) { }

  ngOnInit(): void {
    this.loged.userloged.subscribe(UserInfo =>{
      this.currentUser = UserInfo
    }
    )
  }
  menuOpen(event,navbar){
    this.toggler.togglerSlider(this.buttonStatus)
    this.buttonStatus = !this.buttonStatus
    
  }
  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home'])
  }
}
