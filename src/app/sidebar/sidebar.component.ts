import { Component, OnInit } from '@angular/core';
import { ToggleasideService } from '../toggleaside.service';
import { AccountInfoService } from '../account-info.service';
import { userInfo } from 'os';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private sidebarToggler:ToggleasideService,
    private loged:AccountInfoService) { }
id;
curretUser:any ;
  ngOnInit(): void {
      this.loged.userloged.subscribe(UserInfo =>{
        this.curretUser = UserInfo
        this.id = UserInfo.id
      }
      )
    const aside = document.getElementsByClassName("aside")
    this.sidebarToggler.currentStatus.subscribe(arg =>{
      if(arg){
        aside[0].classList.add('return')
      }else{
        aside[0].classList.remove('return')

      }
    })
  }

}
