import { Component, OnInit } from '@angular/core';
import { AccountInfoService } from '../account-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
flag = false;

  currentUser;
  constructor(private loged:AccountInfoService,
    private router:Router) { } 
  ngOnInit(): void {
    this.loged.userloged.subscribe(arg =>{
      this.currentUser = arg
      console.log(this.currentUser)
      if(this.currentUser){
        this.flag = true
        console.log(this.flag)
  
      }else{
        
        this.flag = false
        console.log(this.flag)
  
      }
    })
    
  }
  logout(){
    localStorage.removeItem('currentUser')
        this.router.navigate(['home'])

  }
}

