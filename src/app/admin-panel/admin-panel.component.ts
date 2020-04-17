import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { usersService } from "../users.service/users.service";
import { users } from "../modals/users";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  item: any = {
    email: '',
    title:"",
    name: ''
  }
  
  users: users[];
  editState:boolean=false;
  itemtoEdit:users;
  filterValue = "";
  itemLength;
  edituser;

  myForm: FormGroup;

  constructor(private usersService: usersService,
              private fb:FormBuilder) { }

  ngOnInit(): any {
   
    

    
    this.usersService.getUser().subscribe(items=>{
      console.log(items);
      this.users = items;
      this.itemLength = this.users.length;
    })
    
    this.usersService.currentId.subscribe((message: any) => {
      this.edituser = message;
      console.log(this.edituser)
      this.myForm = this.fb.group({
        name:[this.edituser.name,[Validators.required]],
        title:[this.edituser.title,[Validators.required]],
        email:[this.edituser.email,[Validators.required, Validators.pattern(/^\w.+@[a-zA-Z]+.com$/)]],
      })
    })
  }

  //function-subbmit-to-create-user-object
  onSubmit(myForm: FormGroup) {
    if (myForm.valid) {      
      console.log("valid")  
      this.usersService.createUser(this.myForm.value);
  }
}

//edit Data of object
  editdata(event,item){
    item = this.myForm.value
    item.id = this.edituser.id
    console.log(item)
    this.usersService.updateUser(item);
  }

  //delete-user
  deleteUser(event,item) {
    this.usersService.deleteUser(item);
    console.log(item);
  }
  
  //edit-user get-id of user  
  editUser(event,item) {
    this.usersService.editUser(item);
  }

}
