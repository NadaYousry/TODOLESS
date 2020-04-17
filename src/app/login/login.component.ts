import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {usersService} from './../users.service/users.service';
import { users } from '../modals/users';
import { Router } from '@angular/router';
import { AccountInfoService } from '../account-info.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

/* --------------------------- Get All Users Data --------------------------- */

  allUsers:users[]
  currentUser:users;
  currentUserId;
/* ----------------------- Specific Error Validationg ----------------------- */

  login:FormGroup;
  hide = true;
  emailOrUsername:boolean;
  password:boolean;
/* -------------------------------------------------------------------------- */
/*                                 Constructor                                */
/* -------------------------------------------------------------------------- */


  constructor(private fb:FormBuilder,
    private userData:usersService,
    private router:Router,
    private loged:AccountInfoService) { }


/* -------------------------------------------------------------------------- */
/*                            NgOnInInit lifeCycle                            */
/* -------------------------------------------------------------------------- */

  ngOnInit(): void {

/* -------------------- Looking for anychange in userData ------------------- */

    this.userData.getUser().subscribe(users => {
      this.allUsers = users;
      // console.log(this.allUsers)
    })

    this.login = this.fb.group({
      emailOrUsername:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

/* ------------------------------- login info ------------------------------- */

  onLogin(loginInfo){
    if(this.login.valid){
      this.currentUser = this.allUsers.find(account =>{
        return account.email === loginInfo.value.emailOrUsername || account.name === loginInfo.value.emailOrUsername
      })
      if(this.currentUser){
        if(this.currentUser.password === loginInfo.value.password){
          localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
          this.loged.getAccount()
          this.router.navigate(['account',JSON.parse(localStorage.getItem('currentUser')).id,'profile'])
        }else{
          this.emailOrUsername = false
          this.password = true
          console.log("wrong password")
        }
      }else{
        this.emailOrUsername = true
        console.log("This account doesn't exist")
      }
    }
  }
}
