import { Component, OnInit } from '@angular/core';
import { ToggleasideService } from '../toggleaside.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private toggle:ToggleasideService) { }

  ngOnInit(): void {

    this.toggle.currentStatus.subscribe(arg =>{
      const webContainer = document.getElementById('webContainer')
      if(arg){
        webContainer.classList.add("move")
      }else{
        webContainer.classList.remove("move")
      }
    })
  }

}
